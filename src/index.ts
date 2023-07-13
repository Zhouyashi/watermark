/*
 * @Author: zhouyashi zhouys@andata.cn
 * @Date: 2023-07-12 17:07:30
 * @LastEditors: zhouyashi zhouys@andata.cn
 * @LastEditTime: 2023-07-13 15:17:50
 * @FilePath: /andata-frontend-monorepo/web/judge-analysis/src/page/main/waterMark.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 配置类型
type watermarkOptions = {
  // 宽度
  width?: number;
  // 高度
  height?: number;
  // 文案内容
  content?: Array<string>;
  // 字体
  fontFamily?: string;
  // 字体字号
  fontSize?: number;
  // 颜色
  color?: string;
  // 偏转角度
  rotate?: number;
  // 定位方式
  position?: string;
  // 顶部距离
  top?: number;
  // 左侧距离
  left?: number;
  // 层级
  zIndex?: number;

};

//水印分行显示
const fillTextMultiLine = (ctx: any, text: Array<string>, x: number, y: number) => {
  const lineHeight = ctx.measureText("M").width * 1.2;
  text.forEach((item: string) => {
    ctx.fillText(item, x, y);
    y += lineHeight;
  })
}

// 配置类型定义
type imgOptions = {
  // 宽度
  width: number;
  // 高度
  height: number;
  // 水印内容
  content: Array<string>;
  // 水印字体
  font: string,
  // 水印颜色
  color: string;
  // 偏转角度（deg）
  rotateDegree: number;
  // X轴偏移量
  x: number;
  // Y轴偏移量
  y: number;
};

const createImgBase = (options: imgOptions): string => {
  const canvas = document.createElement('canvas');
  const text = options.content;
  // 因为要实现文字交错效果，所以这里生成两倍宽度的图片
  canvas.width = options.width * 2;
  canvas.height = options.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // X轴阴影距离，负值表示往上，正值表示往下
    ctx.shadowOffsetX = 2;
    // Y轴阴影距离，负值表示往左，正值表示往右
    ctx.shadowOffsetY = 2;
    // 阴影的模糊程度
    ctx.shadowBlur = 2;
    ctx.font = options.font;
    ctx.fillStyle = options.color;
    ctx.rotate(options.rotateDegree);
    ctx.textAlign = 'left';
    // ctx.fillText(text, options.x, options.y);
    fillTextMultiLine(ctx, text, options.x, options.y)
  }
  return canvas.toDataURL('image/png');
}


/**
 * 生成水印
 * @param {Number} width 宽度
 * @param {Number} height 高度
 * @param {Array<string>} content 内容
 * @param {String} font 字体
 * @param {String} color 自定义样式: 如字体颜色(使用RGBA)
 * @param {Number} rotate 翻转角度
 * @param {String} position 水印定位方式
 * @param {Number} top 距离顶部位置
 * @param {Number} left 距离左部位置
 * @param {Number} zIndex 水印层级
 */

export const genWaterMark = ({
  width = 400,
  height = 400,
  content = ['水印'],
  fontFamily = 'PingFang SC',
  fontSize = 20,
  color = 'rgba(6, 27, 46, 0.15)',
  rotate = (-40 * Math.PI) / 180,
  position = 'absolute',
  top = 0,
  left = 0,
  zIndex = 1001,
}: watermarkOptions): void => {
  let WATERMARKDIV: any = null;

  if (WATERMARKDIV) {
    WATERMARKDIV = null;
  }

  const option = {
    width,
    height,
    content,
    font: `${fontSize}px ${fontFamily}`,
    color,
    rotateDegree: rotate,
  };

  // 为了实现交错水印的效果，此处生成两张位置不同的水印 固定相对位置
  const dataUri1 = createImgBase({
    ...option,
    x: -30,
    y: 200,
  });
  const dataUri2 = createImgBase({
    ...option,
    x: 120,
    y: 620,
  });

  const styleStr = `
		content: '';
    display: block;
    width: 100%;
    height: 100%;
    ${top || top === 0 ? `top: ${top}px;` : ''}
    ${left || left === 0 ? `left: ${left}px;` : ''}
    background-repeat: repeat;
    pointer-events: none;
    ${position ? `position: ${position}` : ''};
    ${zIndex ? `z-index:${zIndex}` : ''};
    background-image: url(${dataUri1}), url(${dataUri2});
    background-size: ${option.width * 2}px ${option.height}px;
    `
  const __wm = document.querySelector(".__wm");
  WATERMARKDIV = __wm || document.createElement("div");
  WATERMARKDIV.setAttribute("style", styleStr);
  WATERMARKDIV.classList.add("__wm");
  document.body.appendChild(WATERMARKDIV);
}

