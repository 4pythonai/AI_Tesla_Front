/* eslint-ingore */

export function makePrompt(cfg) {
  console.log(cfg);
  let { car, logoText, color, matte, style, background } = cfg;

  let carm = car.replace("车型-", "");
  let backgroundstr;

  if (background === "背景-车间") {
    backgroundstr = `  (in  an clean factory Workshop : 1.4) ,`;
  }

  if (background === "背景-森林") {
    backgroundstr = `  (in  forest :1.4) ,`;
  }

  if (background === "背景-沙漠") {
    backgroundstr = `  (in  forest :1.4) ,`;
  }

  if (background === "背景-马路") {
    backgroundstr = ` (in U.S. Route 66 :1.4) ,`;
  }

  let publicStr =
    "best quality, ultra-detailed, masterpiece, finely detail, highres, 8k wallpaper, ";

  let colorStr = `which color is  ${color} , `;
  let str =
    publicStr +
    `(a single ${color}  car of  1Tesla ${carm} :1.3), ` +
    colorStr +
    backgroundstr +
    ` solo,side view, (motion:1.5) `;

  //   if (matte) {
  //     str += "matte ";
  //   }

  //   if (color) {
  //     str += `${color} color `;
  //   }

  //   str += style;

  //   str += `, ${background}`;

  return str;
}
