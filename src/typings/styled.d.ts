import 'styled-components'
interface IShades {
  1: string
  2: string
  3: string
  4: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      success: string
      info: string
      warning: string
      danger: string
      dark: string
      grey: string
      light: string
      white: string
    }
    shades: {
      primary: IShades
      dark: IShades
      success: string
      info: string
      warning: string
      danger: string
    }
    gradient: {
      1: string
      2: string
    }
    fonts: {
      small: string
      default: string
      header: string
      subHeader: string
      label: string
    }
  }
}
