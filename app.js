const express = require('express')
const request = require('request')
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const app = express()
const port = 9000

// app.use('/', createProxyMiddleware({
//   target: 'https://api.openai.com/',
//   changeOrigin: true,
//   onProxyReq: (proxyReq, req, res) => {
//     // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
//     proxyReq.removeHeader('x-forwarded-for');
//     proxyReq.removeHeader('x-real-ip');
//   },
//   onProxyRes: function (proxyRes, req, res) {
//     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// }));

app.use('/', (req, res) => {
  const targetUrl = req.query.url; // 从查询参数中获取目标 URL
  req.pipe(request(targetUrl)).pipe(res);
});


// app.use('/google', createProxyMiddleware({
//   target: 'https://google.com/',
//   changeOrigin: true,
//   onProxyReq: (proxyReq, req, res) => {
//     // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
//     proxyReq.removeHeader('x-forwarded-for');
//     proxyReq.removeHeader('x-real-ip');
//   },
//   onProxyRes: function (proxyRes, req, res) {
//     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// }));

// app.use('/github', createProxyMiddleware({
//   target: 'https://github.com/',
//   changeOrigin: true,
//   onProxyReq: (proxyReq, req, res) => {
//     // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
//     proxyReq.removeHeader('x-forwarded-for');
//     proxyReq.removeHeader('x-real-ip');
//   },
//   onProxyRes: function (proxyRes, req, res) {
//     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})