export function generateRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const pastel = 'hsl(' + hue + ', 70%, 80%)'; // Lowered saturation to 30%
    return pastel;
  }
  