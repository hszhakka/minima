function calcSize() {
  let allCounts = 0;

  const elements = document.getElementsByClassName("tag");
  for (let element of elements) {
    const count = parseInt(element.dataset.count);
    allCounts += count;
  }

  const averageCount = allCounts / elements.length;

  const style = getComputedStyle(document.querySelector("body"));
  const baseFontSize = parseInt(style.fontSize);
  const minFontSize = baseFontSize / 2;

  for (let element of elements) {
    const count = parseInt(element.dataset.count);
    const fontSize = baseFontSize + count - Math.floor(averageCount);
    if (fontSize < minFontSize) {
      fontSize = minFontSize;
    }
    element.style.fontSize = `${fontSize}px`;
  }
}

calcSize();
