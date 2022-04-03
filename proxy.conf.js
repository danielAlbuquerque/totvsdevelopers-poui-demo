const PROXY_CONFIG = {
  "/api": {
      "target": "http://localhost:9999/app-root",
      "secure": false,
      "bypass": function (req, res, proxyOptions) {
          req.headers["Authorization"] = "Basic YWRtaW46IA==";
      }
  }
}

module.exports = PROXY_CONFIG;