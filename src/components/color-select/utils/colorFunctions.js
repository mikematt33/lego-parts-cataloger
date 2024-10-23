// Convert hex to HSL
export function hexToHSL(hex) {
  hex = hex.replace("#", "");

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l;
  l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360), // Hue (0-360)
    s: Math.round(s * 100), // Saturation (0-100)
    l: Math.round(l * 100), // Lightness (0-100)
  };
}

export function categorizeColorByHue(hsl) {
  const { h, s, l } = hsl;

  // Handle whites, grays, blacks based on lightness and saturation
  if (s < 15) {
    if (l > 90) return "white"; // Whites (very light)
    if (l < 20) return "black"; // Blacks (very dark)
    return "gray"; // Grays or neutral tones (low saturation)
  }

  // Special handling for very dark colors based on hue
  if (l < 30) {
    if (h >= 0 && h < 60) return "dark red"; // Dark reds and oranges
    if (h >= 60 && h < 150) return "dark green"; // Dark yellows and greens
    if (h >= 150 && h < 240) return "dark blue"; // Dark blue range
    if (h >= 240 && h < 320) return "dark purple"; // Dark purple range
    return "gray"; // Any other dark neutral tones
  }

  // Fine-tuned hue ranges for vibrant colors
  if ((h >= 0 && h < 15) || (h >= 345 && h <= 360)) {
    return "red"; // Narrower red range
  } else if (h >= 15 && h < 45) {
    return "orange";
  } else if (h >= 45 && h < 75) {
    return "yellow";
  } else if (h >= 75 && h < 150) {
    return "green";
  } else if (h >= 150 && h < 240) {
    return "blue";
  } else if (h >= 240 && h < 320) {
    return "purple";
  }

  return "other"; // Fallback category (not shown)
}
