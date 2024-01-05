import ReactGA from "react-ga4"

export const trackDownload = (type: "Coverletter" | "Resume") => {
  ReactGA.event({
    category: "Downloads",
    action: "downloaded",
    label: `${type} Downloads`,
  })
}
export const trackCreation = (type: "Coverletter" | "Resume") => {
  ReactGA.event({
    category: "Created",
    action: "created",
    label: `${type} Created`,
  })
}
