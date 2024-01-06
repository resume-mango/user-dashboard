import ReactGA from "react-ga4"

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
export const trackDownload = (type: "coverletter" | "resume") => {
  ReactGA.event({
    category: "Downloads",
    action: type + "_downloaded",
    label: `${capitalize(type)} Downloads`,
  })
}
export const trackCreation = (type: "coverletter" | "resume") => {
  ReactGA.event({
    category: "Created",
    action: type + "_created",
    label: `${capitalize(type)}. Created`,
  })
}
