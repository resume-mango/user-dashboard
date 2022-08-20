/**
 * Loads Fonts
 * @param fonts templateData.fonts from getResumeTemplate()
 */
export const loadFonts = async (fonts: Array<Record<string, any>>) => {
  if ('fonts' in document) {
    Promise.all(
      fonts.map((font: any) => {
        const face = new FontFace(
          font.name,
          `url(${font.url}) format('${font.format}')`
        )
        face.style = font.style
        face.weight = font.weight
        return face.load()
      })
    ).then(function (loadedFonts) {
      loadedFonts &&
        loadedFonts.forEach(function (font) {
          document.fonts.add(font)
        })
    })
    return true
  } else return false
}
