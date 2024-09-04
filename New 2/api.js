__path = process.cwd();

require("../settings.js");
var express = require("express");
var axios = require("axios");
var qs = require("qs");
var fetch = require("node-fetch");
var cheerio = require("cheerio");
var request = require("request");
var fs = require("fs");
var router = express.Router();
var creator = global.creator;
const listkey = global.apikey;

const os = require('os');
const { performance } = require('perf_hooks');
const { color, bgcolor } = require(__path + "/lib/color.js");
const { fetchJson } = require(__path + "/lib/fetcher.js");
const options = require(__path + "/lib/options.js");
const { getBuffer } = require(__path + "/lib/functions.js");

_ = require("lodash");

var len = 15;
var arr = "123456789abcdefghijklmnopqrstuvwxyz";
var random = "";

for (var i = len; i > 0; i--) {
random += arr[Math.floor(Math.random() * arr.length)];
}

var lenn = 5;
var randomlagi = "";

for (var i = lenn; i > 0; i--) {
randomlagi += arr[Math.floor(Math.random() * arr.length)];
}

var randomTextNumber =
random + randomlagi + "---------Apriliya-Putri-Fatmawati" + "LOLI--KILLERS";

function muptime(seconds) {
const pad = (s) => (s < 10 ? '0' : '') + s;
const hours = Math.floor(seconds / 3600);
const minutes = Math.floor((seconds % 3600) / 60);
const sec = Math.floor(seconds % 60);
return `${pad(hours)}:${pad(minutes)}:${pad(sec)}`;
}

/** @note
 * Liat cara nulis code yang bener
 */

//===============[ Info Server ]===============\\
router.get('/status', async (req, res) => {
try {
const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const start = performance.now();
const end = performance.now();
const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
const cpu = os.cpus()[0].model;
const port = process.env.PORT || 8080;
const ipResponse = await fetch('https://api.ipify.org/?format=json');
const ipData = await ipResponse.json();

const status = {
status: 'online',
memory: `${memoryUsage} MB / ${totalMemory} MB`,
cpu: cpu,
port: port,
ip: ipData.ip,
time: `${hours} : ${minutes} : ${seconds}`,
uptime: muptime(process.uptime()),
speed: `${(end - start).toFixed(2)} ms`,
};

res.json(status);
} catch (error) {
console.error(error);
res.json(`${error.message}`);
}
});

//========================================\\
// Ai

router.get("/ai", async (req, res, next) => {
const { aiResponse } = require('../New 2/scraper/ai')
var apikey = req.query.apikey;
var q = req.query.q;
const response = await aiResponse(question);
if (!apikey) return res.json(loghandler.noapikey);
if (listkey.includes(apikey)) {
status: true,
creator: `${global.creator}`,
result: response,
})
} else {
res.json(loghandler.apikey);
}
});

router.get("/ai", async (req, res, next) => {
const { aiResponse } = require('../New 2/scraper/ai');
var apikey = req.query.apikey;
var q = req.query.q;
var response;
if (!apikey) {
return res.json(loghandler.noapikey);
}
if (listkey.includes(apikey)) {
try {
response = await aiResponse(q); 
return res.json({
status: true,
creator: `${global.creator}`,
result: response,
});
} catch (error) {
console.error('Error fetching AI response:', error);
return res.status(500).json({ error: 'Internal Server Error' });
}
} else {
return res.json(loghandler.apikey);
}
});

module.exports = router;
