"use strict";

// reference: https://gist.github.com/kellyrmilligan

const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const paths = require("./paths");
const fs = require("fs");

const protocol = process.env.HTTPS === "true" ? "https" : "http";
const host = process.env.HOST || "0.0.0.0";

module.exports = function (proxy, allowedHost) {
   return {
      clientLogLevel: "none",
      compress: true,
      contentBase: paths.appPublic,
      disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
      historyApiFallback: { disableDotRule: true },
      host,
      hot: true,
      https: protocol === "https",
      overlay: false,
      proxy,
      public: allowedHost,
      publicPath: "/",
      quiet: true,
      watchContentBase: false,
      watchOptions: { ignored: ignoredFiles(paths.appSrc) },
      before(app, server) {
         if (fs.existsSync(paths.proxySetup)) {
            require(paths.proxySetup)(app);
         }
         app.use(evalSourceMapMiddleware(server));
         app.use(errorOverlayMiddleware());
         app.use(noopServiceWorkerMiddleware());
      }
   };
};
