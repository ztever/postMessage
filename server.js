const http = require("http");
const fs = require("fs");
const url = require("url");

// const os = require("os");
// ///////////////////获取本机ip///////////////////////
// function getIPAdress() {
//   const interfaces = os.networkInterfaces();
//   console.log("interfaces", interfaces);
//   for (const devName in interfaces) {
//     const iface = interfaces[devName];
//     for (const i = 0; i < iface.length; i++) {
//       const alias = iface[i];
//       if (
//         alias.family === "IPv4" &&
//         alias.address !== "127.0.0.1" &&
//         !alias.internal
//       ) {
//         return alias.address;
//       }
//     }
//   }
// }
// const hostname = getIPAdress();
const hostname = "127.0.0.1";
const port = 8888;
const server = http.createServer(function(request, response) {
  // 解析请求，包括文件名
  const pathname = url.parse(request.url).pathname;
  // 输出请求的文件名
  console.log("Request for " + pathname + " received.");

  // // 从文件系统中读取请求的文件内容
  // fs.readFile(pathname.substr(1), function(err, data) {
  //   if (err) {
  //     console.log(err);
  //     // HTTP 状态码: 404 : NOT FOUND
  //     // Content Type: text/html
  //     response.writeHead(404, { "Content-Type": "text/html" });
  //   } else {
  //     // HTTP 状态码: 200 : OK
  //     // Content Type: text/html
  //     response.writeHead(200, { "Content-Type": "text/html" });

  //     // 响应文件内容
  //     response.write(data.toString());
  //   }
  //   //  发送响应数据
  //   response.end();
  // });
  try {
    const fileData = fs.readFileSync(pathname.substr(1));
    response.write(fileData);
    response.end();
  } catch (error) {
    console.log("readFileSync error", error);
  }
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
