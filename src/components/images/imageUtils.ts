// UNIVERSAL IMAGE LOADER
// Attempts PNG → JPG → JPEG
export function loadImage(path: string) {
  try {
    return require(`${path}.png`);
  } catch {
    try {
      return require(`${path}.jpg`);
    } catch {
      try {
        return require(`${path}.jpeg`);
      } catch {
        return null;
      }
    }
  }
}

// Converts name → correct kebab-case filename
export function normalizeName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}
