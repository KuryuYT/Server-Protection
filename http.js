const fs = require('fs');
const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');
var http = require('http');
var blacklist = new Map();
var files = new Map();
const express = require('express');

const ipvps = "127.0.0.1";
const udpport = "17091";
const messagemaintenance = "Server under maintance";
const port = 443;
const textantiread = "";

const app = express();
let FLOOD_TIME = 20000;
let FLOOD_MAX = 200;
let flood = {
    floods: {},
    lastFloodClear: new Date(),
    protect: (io, socket) => {
        if (Math.abs( new Date() - flood.lastFloodClear) > FLOOD_TIME) {
            flood.floods = {};
            flood.lastFloodClear = new Date();
        }
        flood.floods[socket.id] == undefined ? flood.floods[socket.id] = {} : flood.floods[socket.id];
        flood.floods[socket.id].count == undefined ? flood.floods[socket.id].count = 0 : flood.floods[socket.id].count;
        flood.floods[socket.id].count++;
        if (flood.floods[socket.id].count > FLOOD_MAX) {
            io.sockets.connected[socket.id].disconnect();
            return false;
        }
        return true;
    }
};

var timeout = 10 * 1000;
function add_address(address) {
    blacklist.set(address, Date.now() + timeout);
}

app.post("/growtopia/server_data.php", (req, res) => {
  let IPAddress = req.connection.remoteAddress;
  let url = req.url.split("/growtopia/")[1];
  IPAddress = IPAddress.split(/::ffff:/g).filter(a => a).join('');
  res.status(200).send(pack).end();
  console.log(`[Growtopia] New User Login`)
    if (req.url == "/growtopia/server_data.php") {

          if (req.headers['accept'] == "*/*" && req.headers['connection'] == "close") {
              if (mt.toLowerCase() == "yes") {
                  res.write(`server|${ipvps}\nport|17091\ntype|1\nmaint|404 Not Found\n\nbeta_server|127.0.0.1\nbeta_port|17091\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001`);
                  res.end();
              }
              else if (mt.toLowerCase() == "no") {
                  res.write(`server|${ipvps}\nport|17091\ntype|1\n#maint|404 Not Found\n\nbeta_server|127.0.0.1\nbeta_port|17091\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001`);
                  res.end();
              }
          }
          else if (req.headers['accept'] == "*/*" && req.httpVersion == "1.0") {
              if (mt.toLowerCase() == "yes") {
                  res.write(`server|${ipvps}\nport|17091\ntype|1\nmaint|404 Not Found\n\nbeta_server|127.0.0.1\nbeta_port|17091\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001`);
                  res.end();
              }
              else if (mt.toLowerCase() == "no") {
                  res.write(`server|${ipvps}\nport|17091\ntype|1\n#maint|404 Not Found\n\nbeta_server|127.0.0.1\nbeta_port|17091\nbeta_type|1\nmeta|defined\nRTENDMARKERBS1001`);
                  res.end();
              }
              console.log(`| [GROWTOPIA] Someone entered ${req.url} (Mac/Windows/Android/IOS)`);
          }

          else if (req.headers['user-agent'] == "python-requests/2.25.0") {
              res.write(textantiread());
              res.end();
              res.destroy();
          }
          else if (req.headers['connection'] == "close") {
              res.write(textantiread());
              res.end();
              res.destroy();
          }
          else if (req.headers['connection'] == "Keep-Alive") {
              res.write(textantiread());
              res.end();
              res.destroy();
              
          }
      }
 else if (url && files.has(url.replace(/\//g, "")) && req.method.toLowerCase() === "GET") {
      if (!fs.existsSync(`.${req.url}`)) {
          console.log(`[ERROR] CUSTOM ITEM ${req.url} NOT FOUND!`.red);
          res.writeHead(404, `.${req.url} Not Found`)
          res.write(`.${req.url} Not Found`);
          res.end();
          return;
      }
      res.writeHead(200, {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Disposition": "attachment; filename=" + !url.endsWith(".rttex") ? url + ".rttex" : url,
          'Content-Length': req.url.length,
          "beserver": "06",
          "Connection": "keep-alive",
          "Accept-Ranges": "bytes"
      });
      console.log(`[LOAD]${ipvps}:17091 => Load Custom Item In:${req.url}[${req.method}]`);
      res.write(files.get(url), function (err) {
          if (err)
              console.log(err);
      });
  }
});

const https = require('https');
const server = https.createServer({ key, cert }, app);

const client = http.createServer(function(req, res) {
    let ipAddress = req.connection.remoteAddress;
    ipAddress = ipAddress.split(/::ffff:/g).filter(a => a).join('');
          if (req.url == "/growtopia/server_data.php") {
            if (req.url = "TRACE") {
                res.write(`server|`+ ipvps +`\nport|`+ udpport +`\ntype|1\n#maint|`+ messagemaintenance +`\n\nbeta_server|127.0.0.1\nbeta_port|17091\n\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001`);
                            res.end();
                            console.log(`New Connection Growtopia with IP = ${ipAddress} / Method = ${req.method} / in : ${req.url}`);
                          }
                        }
                        else {
                        console.log(`New Connection with IP = ${ipAddress} / Method = ${req.method} / in : ${req.url}`);
					    return res.end();
                        }
                        if (req.url == "/") {
                            if (req.url = "TRACE") {
                                res.writeHead(308, "OK");
                                res.write(`<script>alert('GTPS HTTP')</script>`)
                                console.log(`New Connection = ${ipAddress} / Method = ${req.method} / in : ${req.url}`);
							}
                            res.end();
                            res.destroy();
                          };
		});

client.listen(8080)
function add_address(address) {
    blacklist.set(address, Date.now() + 5000);
}
client.on("connection", function (socket) {
    let ipsocket = socket.remoteAddress;
    ipsocket = ipsocket.split(/::ffff:/g).filter(i => i).join("");
    if (!blacklist.has(socket.remoteAddress)) {
        add_address(socket.remoteAddress);
    }
    else {
        var not_allowed = blacklist.get(socket.remoteAddress);
        if (Date.now() > not_allowed) {
            blacklist.delete(socket.remoteAddress);
        }
        else
            socket.destroy();
            console.log(`banned Connection With IP = ${ipsocket}`);
            process.env.BLACKLIST
    }
});
const pack = `
server|${ipvps}
port|17091
type|1
#maint|${messagemaintenance}
beta_server|127.0.0.1
beta_port|17091
beta_type|1
meta|defined
RTENDMARKERBS1001|unknown
`;

app.post("/growtopia/server_data.php", (req, res) => {
  res.status(200).send(pack).end();
});

console.log(`Anti DDos Active`)
server.listen(port, () => {
});
