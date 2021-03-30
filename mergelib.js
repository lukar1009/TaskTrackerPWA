const merge = require('concat');

const files = [
    "./dist/TaskTrackerPWA/main.js",
    "./dist/TaskTrackerPWA/polyfills.js",
    "./dist/TaskTrackerPWA/runtime.js"
]

merge(files, "./dist/TaskTrackerPWA/TaskTrackerPWA.js");