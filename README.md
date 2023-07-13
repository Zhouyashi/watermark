# **实现水印交错显示**

描述：给前端 html 页面增加水印功能，区别于大部分的平铺水印，实现水印交错显示使用：默认值

使用：默认值均已配置好，无需额外配置

示例：

```js
import {genWaterMark} from "@zhouys/watermark"

genWaterMark({
	content: ["水印水印"],
	//字体、颜色均已有默认配置，也可自行配置
	fontSize: 20,
	color: "rgba(6, 27, 46, 0.15)",
})
```
