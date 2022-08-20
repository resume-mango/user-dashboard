/**
 * customizes window.onbeforeunload event
 * @param event onbeforeunloadEvent
 * @param showExitPrompt state
 * @returns void
 */
export const onbeforeunloadEvent = (event: any, showExitPrompt: boolean) => {
  if (showExitPrompt) {
    const e = event || window.event

    e.preventDefault()
    if (e) {
      e.returnValue = ''
    }
    return ''
  }
}
