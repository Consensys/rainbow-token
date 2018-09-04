export const computeScore = (color, targetColor) => {
  return (color.r - targetColor.r) ** 2 + (color.g - targetColor.g) ** 2 + (color.b - targetColor.b) ** 2;
}

export const color = (rawColor) => ({
  r: rawColor[0], 
  g: rawColor[1], 
  b: rawColor[2],
})

export const computeToken = (rawToken) => ({
  blendingPrice: rawToken[0],
  color: color(rawToken.slice(1,4)),
  defaultColor: color(rawToken.slice(4,7)),
})