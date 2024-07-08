const log = require('node-file-logger');
const path = require('path');
const fs = require('fs');

// Get the current date and time in IST (Delhi)
const nowIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
const dateIST = new Date(nowIST);

// Example log file naming with Indian Standard Time
const logFileName = 'DailyLogs_' + dateIST.toLocaleDateString('en-IN').replace(/\//g, '_') + '.log';
// console.log('Current IST:', dateIST.toLocaleString('en-IN', { timeZone: "Asia/Kolkata" }));

const logFolderPath = path.join(__dirname, '../../logs'); // Adjust the path relative to your project structure

const logFilePath = path.join(logFolderPath, logFileName);

// Ensure the log folder exists
if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath);
}

// Configure node-file-logger
const options = {
    folderPath: logFolderPath,
    dateBasedFileNaming: true,
    fileNamePrefix: 'logfile_', // No need for prefix as logFileName already includes it
    fileNameExtension: '.log',
    dateFormat: 'DD_MM_yyyy',
    timeFormat: 'h:mm:ss A',
    timeZone: 'Asia/Kolkata', // Ensuring logger uses IST
};

log.SetUserOptions(options);

// Export the log object for use in other modules
module.exports = log;
