/**
 * @param {string} url
 */
export function parseURILink(url) {
	try {
		let params = {};
		params.url = url;
		let [header, parameters] = url.split("?", 2);
		let [left, right] = header.split("://", 2);
		params.protocol = left;
		params.mode = right;

		// Setting up the params variable
		params.q = {};
		for (const param of parameters.split("&")) {
			let [key, val] = param.split("=", 2);
			if (!key || !val) continue;
			params.q[key] = val.replace("%20", " ").replace("+", " ") || null;
		}

		return params;
	} catch (e) {
		return false;
	}
}

/**
 *
 * @param {object} data
 * @param {number} amount
 * @returns {string}
 */
export function constructUPILink(data, amount) {
	if (!data?.q?.am && Number(data?.q?.am) !== 0) {
		return data.url;
	}

	const q = { ...data?.q };
	q.am = String(amount);

	let url = [];
	for (const param in q) {
		if (!q[param]) continue;
		url.push(param + "=" + q[param]);
	}

	return "upi://pay?" + url.join("&");
}
