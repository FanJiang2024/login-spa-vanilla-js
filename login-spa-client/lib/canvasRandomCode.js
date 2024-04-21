import { randomDarkColor, randomLightColor, randomNum } from ".";

/**
 *
 * @param {HTMLCanvasElement} element
 * @param {number} codeLen
 */
export const randomCodeInCanvas = (element, codeCount = 4, lineCount = 3, arcCount = 3) => {
  const codes = Array(codeCount)
    .fill(0)
    .map((_) => randomNum(0, 10));

  const height = element.height;
  const width = element.width;
  const averageWidth = width / codeCount;

  element.style.backgroundColor = randomLightColor();

  const ctx = element.getContext("2d");
  ctx.clearRect(0, 0, width, height);

  codes.forEach((code, index) => {
    ctx.textBaseline = "top";
    ctx.font = `${randomNum(averageWidth * 0.8, averageWidth)}px serif`;
    ctx.fillStyle = randomDarkColor();
    ctx.save();
    ctx.translate((index + 0.25) * averageWidth, randomNum(0.2 * height, 0.6 * height));
    ctx.rotate((randomNum(-30, 30) * Math.PI) / 180);
    ctx.fillText(code, 0, 0);
    ctx.restore();
  });

  // 干扰线
  Array(lineCount).fill(0).forEach((_, index) => {
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width * 0.5), randomNum(0, height));
    ctx.lineTo(randomNum(0.5 * width, width), randomNum(0, height));
    ctx.strokeStyle = randomLightColor();
    ctx.closePath();
    ctx.stroke();
  })

  // 干扰圆形
  Array(arcCount).fill(0).forEach(() => {
    ctx.beginPath();
    ctx.arc(
      randomNum(0, width),
      randomNum(0, height),
      randomNum(0, height / 8),
      0,
      Math.PI * 2,
      true
    );
    // ctx.strokeStyle = randomLightColor();
    // ctx.stroke();
    ctx.fillStyle = randomDarkColor();
    ctx.fill();
    ctx.closePath();
  })

  console.log(codes);
  return codes.join("");
};
