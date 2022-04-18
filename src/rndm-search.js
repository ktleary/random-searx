const isGoodGrade = (grade) => grade && ["A"].includes(grade.charAt(0));
const randomListItem = (list) => Math.floor(Math.random() * list.length);
const getRandomListItem = (list) => list[randomListItem(list)];
const print = (xo) => console.log(xo);
const { keys } = Object;

let dev = false;
const searchxInstancesPage = dev
	? "http://localhost:5000/search-instances.json"
	: "https://searx.space/data/instances.json";

const statusOk = (status) => status > 199 && status < 300;

const isGoodHttp = (instanceUrl) =>
	instanceUrl && instanceUrl.indexOf("https") > -1;

function googleWorks(engines, instanceUrl) {
	return Number(engines?.google?.error_rate) < 1;
}

function isGoodInstance(instanceUrl, engines) {
	return isGoodHttp(instanceUrl) && googleWorks(engines, instanceUrl);
}

function getGoodSearchxInstances(instances) {
	return keys(instances).reduce((result, key) => {
		const { engines } = instances[key];
		return isGoodInstance(key, engines) ? [...result, key] : result;
	}, []);
}

function processInstances(instances) {
	const goodSearchxInstances = getGoodSearchxInstances(instances);
	goodSearchxInstances.forEach((instance) => console.log(instance));
	document.location.href = getRandomListItem(goodSearchxInstances);
	// print(getRandomListItem(goodSearchxInstances));
}

function redirectRandomSearx() {
	fetch(searchxInstancesPage)
		.then((response) => response.json())
		.then((data) => {
			const { instances } = data;
			processInstances(instances);
		})
		.catch((err) => {
			let { name, message } = err;
			let display = document.getElementById("display");
			if (display) {
				display.innerHTML = `${name}: ${message}`;
			}
			print({ name, message });
		});
}
