const isGoodGrade = grade => grade && ["A", "B"].includes(grade.charAt(0));
const randomListItem = list => Math.floor(Math.random() * list.length);
const getRandomListItem = list => list[randomListItem(list)];
const print = xo => console.log(xo);
const { keys } = Object;

const statusOk = status => status > 199 && status < 300;

const isGoodInstance = http =>
	http && statusOk(http.status_code) && isGoodGrade(http.grade);

const getGoodSearchxInstances = instances =>
	keys(instances).reduce(
		(result, key) =>
			isGoodInstance(instances[key].http) ? [...result, key] : result,
		[]
	);

function processInstances(instances) {
	const goodSearchxInstances = getGoodSearchxInstances(instances);
	print(getRandomListItem(goodSearchxInstances));
}

(() => {
	let dev = true;
	const searchxInstancesPage = dev
		? "http://localhost:5000/search-instances.json"
		: "https://searx.space/data/instances.json";
	fetch(searchxInstancesPage)
		.then(response => response.json())
		.then(data => {
			const { instances } = data;
			processInstances(instances);
		});
})();
