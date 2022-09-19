const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/note"];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: "https://localhost:7161",
        secure: false,
    });

    app.use(appProxy);
};
