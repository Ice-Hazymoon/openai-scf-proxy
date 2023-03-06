# 猴子也能学会的腾讯云函数搭建 OpenAI 国内代理教程

> 优势：比 cloudflare worker 简单，支持香港等多地区可选，部署速度快，有 QQ、微信账号就能注册，猴子也能学会！
> 
> 劣势：不支持 SSE，用户体验欠佳，但完全能用！

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
- 日志配置 -> 日志投递：启用
- 函数代码：本地上传zip包（[点我下载 ZIP 包](https://github.com/Ice-Hazymoon/openai-scf-proxy/raw/master/openai-proxy.zip)）

之后点击“完成”按钮，进入【函数管理】，点击【函数配置】，往下拉，找到【访问路径】，这里就是你的代理地址，但需要把 "/release" 部分替换为 "/chat"

例如：`https://service-aaaaa.hk.apigw.tencentcs.com/release/`
需要替换为：`https://service-aaaaa.hk.apigw.tencentcs.com/chat/`

## 如何使用

你可以在任何支持配置 OpenAI 代理的软件中使用这个服务，例如在 ChatGPT 中配置：

进入：[https://ai.okmiku.com/](https://ai.okmiku.com/)

点击右上角的🔑图标，在接口地址中输入这个地址，点击保存即可

愉快的与 OpenAI 一起冲浪吧~
