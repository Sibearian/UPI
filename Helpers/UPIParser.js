/**
 * @param {string} url
 */
export function parseURILink(url) {
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
    if(!key || !val) continue;
    params.q[key] = val.replace("%20", " ").replace("+", " ") || null;
  }

  return params;
}

export function constructUPILink(data, amount) {
  if (data?.q?.am) {
    return data.url;
  }

  data.q.am = Number(amount).toFixed(2);

  let url = "upi://pay?";
  for (const param in data.q) {
    if (!data.q[param]) continue;
    url += param + "=" + data.q[param] + "&";
  }

  return url.slice(0, -1).replace(" ", "%20");
}
