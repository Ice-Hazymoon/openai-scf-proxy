const express = require('express')
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const app = express()
const port = 9000

app.use('/', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    const headers = Object.keys(proxyReq.getHeaders());
    headers.forEach(header => {
      if (header.startsWith('x-fc')) {
        // 移除以'x-fc'开头的请求头(x-fc开头请求头是云函数给加上的，OpenAI接口对请求头size做了限制，不删的话会报错)
        proxyReq.removeHeader(header);
      }
    });
    // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
    proxyReq.removeHeader('x-forwarded-for');
    proxyReq.removeHeader('x-real-ip');
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
