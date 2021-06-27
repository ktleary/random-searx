const { keys } = Object;
const print = xo => console.info(xo);

const dev = false;

const searchxInstancesPage = dev
	? "http://localhost:5000/search-instances.json"
	: "https://searx.space/data/instances.json";

const randomListItem = list => Math.floor(Math.random() * list.length);
const getRandomListItem = list => list[randomListItem(list)];

const axios = require("axios");
const UserAgent = require("user-agents");

const userAgent = UserAgent.random({ userAgent: /Chrome/ });
const statusOk = status => status > 199 && status < 300;

const fetchHtml = async url => {
	try {
		const response = await axios({
			url: url,
			headers: {
				"User-Agent": userAgent,
			},
			method: "GET",
		});
		const { data } = response;
		return data;
	} catch (error) {
		const { errno, code, hostname } = error;
		console.log(`Error processing ${hostname}: ${errno} ${code}.`);
		return false;
	}
};

const isGoodGrade = grade => {
	if (!grade) return false;
	return ["A", "B"].includes(grade.charAt(0));
};

const isGoodInstance = http => {
	return http && statusOk(http.status_code) && isGoodGrade(http.grade);
};

async function getGoodSearchxInstances() {
	let { instances } = await fetchHtml(searchxInstancesPage);
	let goodInstances = keys(instances).reduce(
		(result, key) =>
			isGoodInstance(instances[key].http) ? [...result, key] : result,
		[]
	);
	return goodInstances;
}

async function getRandomGoodInstance() {
	const goodSearchxInstances = await getGoodSearchxInstances();
	print(getRandomListItem(goodSearchxInstances));
}

function main() {
	getRandomGoodInstance();
}

main();
