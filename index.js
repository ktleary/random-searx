const dev = false;
const https = dev ? require("http") : require("https");
const { keys } = Object;
const print = xo => console.info(xo);

const searchxInstancesPage = dev
	? "http://localhost:5000/search-instances.json"
	: "https://searx.space/data/instances.json";

const randomListItem = list => Math.floor(Math.random() * list.length);
const getRandomListItem = list => list[randomListItem(list)];

const statusOk = status => status > 199 && status < 300;

function processInstances(instances) {
	const goodSearchxInstances = getGoodSearchxInstances(instances);
	print(getRandomListItem(goodSearchxInstances));
}

const fetchHtml = url =>
	https
		.get(url, res => {
			let data = "";
			res.on("data", chunk => {
				data += chunk;
			});
			res.on("end", () => {
				const { instances } = JSON.parse(data);
				processInstances(instances);
			});
		})
		.on("error", err => {
			console.log("Error: ", err.message);
		});

const isGoodGrade = grade => {
	if (!grade) return false;
	return ["A", "B"].includes(grade.charAt(0));
};

const isGoodInstance = http => {
	return http && statusOk(http.status_code) && isGoodGrade(http.grade);
};

const getGoodSearchxInstances = instances =>
	keys(instances).reduce(
		(result, key) =>
			isGoodInstance(instances[key].http) ? [...result, key] : result,
		[]
	);

function main() {
	fetchHtml(searchxInstancesPage);
}

main();
