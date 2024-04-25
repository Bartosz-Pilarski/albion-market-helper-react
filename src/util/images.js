const getImageHref = (filename) => new URL(`../images/${filename}.png`, import.meta.url).href

export {
  getImageHref
}