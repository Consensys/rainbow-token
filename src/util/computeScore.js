export const computeScore = rgb => {
  return Math.floor(Math.sqrt( (rgb[0] - 44) * (rgb[0] - 44) + (rgb[1] - 86) * (rgb[1] - 86) + (rgb[2] - 221) * (rgb[2] - 221) ));
}
