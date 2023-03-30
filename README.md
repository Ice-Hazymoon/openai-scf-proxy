> OpenAI 已经开始大规模对未绑卡的，和邮箱状态异常的账号进行封号（基本全是是从网上买的号，我使用自己的账号配合云函数使用了很长时间目前没有问题），所以如果你的账号并不是从官方渠道注册的，请暂时不要使用本项目和任何公共代理服务，包括选择云函数美国地区，Cloudflare Worker， Azure 等。
> 
> 如果大家需要使用代理，请选择一台美国地区，IP固定的的服务器按照下方的【自托管】部分自行搭建。

<div style="font-size: 1.5rem;">
  <a href="./README.md">腾讯云</a> |
  <a href="./README-aliyun.md">阿里云</a>
</div>
</br>

***

# 猴子也能学会的腾讯云函数搭建 OpenAI 国内代理教程

> 优势：免费！比 Cloudflare Worker 简单，支持香港等多地区可选，部署简单，一行代码都不用写，有 QQ、微信账号就能注册，猴子也能学会！
> 
> 劣势：不支持 SSE，用户体验欠佳，但完全能用！

PS：本教程不仅仅针对云函数，你也可以托管在自己的服务器上，或者 Azure 等平台，只要能运行 Node.js 程序即可，参加下方[【自托管】](#自托管)部分。

注意：本教程只是教你搭建一个 OpenAI 的代理，需要配合其他类似软件使用，直接访问会出现 404 的错误。

本文档可能有所不足，各位大佬欢迎补充。

## 你需要准备什么：

- 一台电脑
- 一个腾讯旗下的账号或者手机号
- 一个脑子

## 教程开始

在 [https://cloud.tencent.com/](https://cloud.tencent.com/) 注册账号

进入云函数控制台：[https://console.cloud.tencent.com/scf/list](https://console.cloud.tencent.com/scf/list)

依次点击【新建】->【从头开始】，然后按照以下配置，**没写出来的就不用管，使用默认设置**

- 函数类型：Web函数
- 函数名称：openai-proxy（也可以随便取个名字）
- 地域：香港（也可以是中国之外的任何国家）
- 运行环境：Nodejs 16.13（或者更高的版本）
- 高级配置:
    - 内存：64M
    - 执行超时时间：900 秒
    - 请求多并发：2 并发
- 日志配置 -> 日志投递：启用（可以选择不开，开的话一个月应该几分钱）
- 函数代码：本地上传zip包（[点我下载 ZIP 包](https://github.com/Ice-Hazymoon/openai-scf-proxy/releases/download/0.0.3/openai-proxy.zip)）
- 触发器配置（这里可能要创建一个新的触发器）：
    - 默认触发器
    - 触发别名/版本：默认流量
    - 请求方法：ANY
    - 发布环境：发布
    - 鉴权方法：免鉴权

之后点击“完成”按钮，进入【函数管理】，点击【函数代码】，往下拉，找到【访问路径】，这里就是你的代理地址

使用的时候需要把 "/release" 部分删除

例如：`https://service-aaaaa.hk.apigw.tencentcs.com/release/`

改为：`https://service-aaaaa.hk.apigw.tencentcs.com/`

## 如何使用

### 第三方项目

你可以在任何支持配置 OpenAI 域名的软件中使用这个服务，例如在 CatGPT 中配置：

进入：[https://ai.okmiku.com/](https://ai.okmiku.com/)

点击右上角的🔑图标，在接口地址中输入这个地址，点击保存即可

愉快的与 OpenAI 一起冲浪吧~

### OpenAI 官方 Node.js 库

```
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  basePath: 'https://service-aaaaa.hk.apigw.tencentcs.com/v1'
})
```

## 自托管

```
git clone https://github.com/Ice-Hazymoon/openai-scf-proxy
cd openai-scf-proxy
npm install
npm run start
```
