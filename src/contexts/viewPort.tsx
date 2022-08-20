import React, { useEffect, useState } from 'react'

const viewportContext = React.createContext({
  width: 0,
  height: 0,
  screenWidth: 0,
  screenHeight: 0,
  desktop: false,
  tablet: false,
  mobile: false,
})

const ViewportProvider = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [desktop, setDesktop] = useState(false)
  const [tablet, setTablet] = useState(false)
  const [mobile, setMobile] = useState(false)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    setScreenWidth(window.screen.width)
    setScreenHeight(window.screen.height)
    reponsive(window.innerWidth)
  }

  const setState = (mobile: boolean, tablet: boolean, desktop: boolean) => {
    setMobile(mobile)
    setTablet(tablet)
    setDesktop(desktop)
  }

  const reponsive = (width: number) => {
    if (width <= 480) {
      setState(true, false, false)
    }

    if (width > 480 && width < 900) {
      setState(false, true, false)
    }

    if (width >= 900) {
      setState(false, false, true)
    }
    return
  }

  useEffect(() => {
    if (width === 0 && height === 0) {
      handleWindowResize()
    } else {
      window.addEventListener('resize', handleWindowResize)
      return () => {
        window.removeEventListener('resize', handleWindowResize)
      }
    }
  }, [width, height])

  return (
    <viewportContext.Provider
      value={{
        width,
        height,
        screenWidth,
        screenHeight,
        desktop,
        tablet,
        mobile,
      }}
    >
      {children}
    </viewportContext.Provider>
  )
}

const useViewport = () => {
  const { width, height, screenHeight, screenWidth, desktop, tablet, mobile } =
    React.useContext(viewportContext)

  return { width, height, screenHeight, screenWidth, desktop, tablet, mobile }
}

export { ViewportProvider, useViewport }
