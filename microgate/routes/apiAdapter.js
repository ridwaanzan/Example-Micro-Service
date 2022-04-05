const axios = require("axios");
const { REQ_TIMEOUT } = process.env;

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: REQ_TIMEOUT,
  });
};
