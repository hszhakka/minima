// This hashing algorithm is from 
//   https://cp-algorithms.com/string/string-hashing.html
function hashingToColor(str) {
  // It is reasonable to make p a prime number roughly equal to the number of 
  // characters in the input alphabet. Here all values in a byte are viewed as 
  // characters, so let p = 257.
  const p = 257;
  // Obviously m should be a large number, since the probability of two random
  // strings colliding is about 1/m. Since this function returns a color value,
  // m can be set as 16^6 = 16777216.
  const m = 16777216;
  let hash = 0;
  let pow = 1;
  for (let i = 0; i < str.length; i++) {
      const c = str.codePointAt(i);
      hash = (hash + c * pow) % m;
      pow = (pow * p) % m;
  }
  return hash;
}

function isLight(color) {
  const hexColor = parseInt(color.toString(16), 16);
  const r = hexColor >> 16 & 0xFF;
  const g = hexColor >> 8 & 0xFF;
  const b = hexColor & 0xFF;
  // Use weighted Euclidean distance in 3D RGB space. See
  //   https://thoughtbot.com/blog/closer-look-color-lightness
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  return hsp > 127.5 ? true : false;
}

function calcColor() {
  const elements = document.getElementsByClassName("tag");
  for (let element of elements) {
    var backgroundColor = hashingToColor(element.textContent);
    element.style.background = `#${backgroundColor.toString(16).padStart(6, "0")}`;
    element.style.color = `#${isLight(backgroundColor) ? "000000" : "FFFFFF"}`;
    element.style.borderColor = 'grey';
  }
}

calcColor();
