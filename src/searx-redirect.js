// ---- config ----
const INSTANCES_URL = "https://searx.space/data/instances.json";
const TIMEOUT_MS = 8_000;
const REQUIRED_ENGINE = "google";
const MAX_ENGINE_ERROR_RATE = 1; // percent
const MIN_UPTIME_DAY = 99;
const POOL_SIZE = 5; // random among the top N, ranked by reliability

// ---- pure predicates ----
const isHttps = (url) => url.startsWith("https://");
const engineErrorRate = (engines, name) => engines?.[name]?.error_rate ?? Infinity;
const engineWorks = (engines, name) =>
  engineErrorRate(engines, name) < MAX_ENGINE_ERROR_RATE;

const isHealthy = ([url, instance]) =>
  isHttps(url) &&
  instance.http?.status_code === 200 &&
  (instance.uptime?.uptimeDay ?? 0) >= MIN_UPTIME_DAY &&
  engineWorks(instance.engines, REQUIRED_ENGINE);

const reliability = ([, instance]) =>
  (instance.uptime?.uptimeDay ?? 0) +
  (instance.uptime?.uptimeWeek ?? 0) / 10;

const randomOf = (list) => list[Math.floor(Math.random() * list.length)];

// ---- io ----
const fetchJson = async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
};

// ---- main ----
try {
  const { instances } = await fetchJson(INSTANCES_URL);

  const pool = Object.entries(instances)
    .filter(isHealthy)
    .sort((a, b) => reliability(b) - reliability(a))
    .slice(0, POOL_SIZE)
    .map(([url]) => url);

  if (pool.length === 0) throw new Error("no healthy instances found");

  location.replace(randomOf(pool));
} catch (err) {
  document.getElementById("display")?.append(`${err.name}: ${err.message}`);
  console.error(err);
}
