var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var morgan = require("morgan");
const log = require('./app/database-connection/logfile');
var colors = require('colors');
const dotenv = require("dotenv");
dotenv.config(); 

var appRouter = require("./app/routers/app-router");

// Include package.json for version information
var packageJson = require('./package.json');

require("./app/database-connection/mysql-connection");
var app = express();
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function customHeaders(req, res, next) {
    app.disable("x-powered-by");
    res.setHeader("X-Powered-By", `Organizations v${packageJson.version}`);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("X-Content-Security-Policy", "default-src 'self'");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
    res.setHeader(
        "Feature-Policy",
        "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'"
    );
    res.setHeader("X-DNS-Prefetch-Control", "off");
    res.setHeader("X-Download-Options", "noopen");
    res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
    res.setHeader("origin", req.hostname);
    next();
}

app.use(cors({
    origin: process.env.SERVICE_API_URL
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//app.use(logger("combined"));
app.use(express.json({ limit: "5mb", strict: false }));
app.use(express.urlencoded({ extended: false }));
app.use(customHeaders);

// Middleware to log request info
app.use((req, res, next) => {
    log.Info(`Incoming request: ${req.method} ${req.url}`);
    log.Info(`Request body: ${JSON.stringify(req.body)}`);

    // Capture the original send function
    const originalSend = res.send;

    // Override the send function to log the response
    res.send = function(body) {
        log.Info(`Response status: ${res.statusCode}`);
        log.Info(`Response body: ${body}`);
        return originalSend.call(this, body);
    };

    next();
});

/* Router components */
app.use("/api", appRouter);
/* Automation testing */
// app.get('/run', (req, res) => {
//     require('./app/feature/automation/app/school-stg');
// })
// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Log the error message
    log.Error(`Error: ${err.message}`);
    log.Error(`Detailed error: ${JSON.stringify(err)}`);

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});




module.exports = app;
