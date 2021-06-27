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
		const { data, status, statusText } = response;
		console.log({ status, statusText });
		return data;
	} catch (error) {
		const { errno, code, hostname } = error;
		console.log(`Error processing ${hostname}: ${errno} ${code}.`);
		return false;
	}
};

module.exports = { fetchHtml, statusOk };
