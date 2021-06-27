const dev = false;

const searchxInstancesPage = dev
	? "http://localhost:5000/search-instances.json"
	: "https://searx.space/data/instances.json";

module.exports = {
	searchxInstancesPage,
};
