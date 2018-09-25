export const computeScore = (color, targetColor) => {
    const maxDistance = Math.sqrt(Math.pow(255 - 44, 2) + Math.pow(255 - 86, 2) + Math.pow(0 - 221, 2));
    return 100 - Math.floor(100 * Math.sqrt(Math.pow(color.r - targetColor.r, 2) + Math.pow(color.g - targetColor.g, 2) + Math.pow(color.b - targetColor.b, 2)) / maxDistance);
};

export const color = (rawColor) => ({
    r: rawColor[0],
    g: rawColor[1],
    b: rawColor[2],
});

export const computeToken = (rawToken) => {
  console.log(rawToken)
    return {
        blendingPrice: rawToken[6],
        color: color([rawToken[0], rawToken[1], rawToken[2]]),
        defaultColor: color([rawToken[3], rawToken[4], rawToken[5]]),
    };
};
