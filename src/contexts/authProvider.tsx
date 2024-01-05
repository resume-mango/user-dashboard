import React, { ReactNode, useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { fetchAuthData } from "../helpers/fetchAuthData"
import { useWindowFocus } from "./windowFocus"
import ReactGA from "react-ga4"

type User = {
  id: string
  firstName: string
  lastName: string
  plan: {
    name: string
    expires_on: string
  }
  role: string[]
  ref: string
}
interface IContext {
  user: User | Record<string, any> | undefined
  token: string
  isLoading: boolean
  setUser: (_val: any) => void
  setToken: (_val: any) => void
}
/* istanbul ignore next */
const contextValues = {
  token: "",
  isLoading: true,
  user: {},
  setUser: (_val: any) => {
    return undefined
  },
  setToken: (_val: any) => {
    return undefined
  },
}
const AuthContext = React.createContext<IContext>(contextValues)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("")
  const [user, setUser] = useState<User | Record<string, any> | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(true)
  const cookies = new Cookies()
  const isSess = cookies.get("rm_ia")
  const { windowIsActive } = useWindowFocus()
  const location = `${process.env.AUTH_HOST}/login?rm_path=${window.location.pathname}&rm_name=app`

  const checkAuth = async () => {
    await fetchAuthData(location, setUser, setToken, setIsLoading)
  }

  useEffect(() => {
    if (!user) return
    ReactGA.gtag("set", "user_properties", {
      name: `${user.firstName}${user.lastName && " " + user.lastName}`,
    })
    ReactGA.gtag("set", "user_id", user.id)
  }, [user])

  useEffect(() => {
    if (!windowIsActive) return

    if (isSess) {
      if (token) return
      checkAuth()
    } else {
      setUser(undefined)
      setToken("")
      window.location.href = location
    }
  }, [token, isSess, windowIsActive])

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const { token, user, isLoading, setUser, setToken } =
    React.useContext(AuthContext)

  return { token, user, isLoading, setUser, setToken }
}

export { AuthProvider, useAuth }
