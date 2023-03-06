const express = require('express')
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const app = express()
const port = 9000

app.use('/', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})