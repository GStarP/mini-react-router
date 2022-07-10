import React, { useContext, useEffect, useState } from "react"

/**
 * RouterContext manages common things
 */
interface BrowserRouterContext {
  navigate: (path: string) => void
  curPath: string
}
const RouterContext = React.createContext<BrowserRouterContext>({
  navigate: (path: string) => {},
  curPath: ''
})

/**
 * <Router> is just a <Context.Provider>
 */
interface BrowserRouterProps {
  children?: React.ReactNode
}
function BrowserRouter(props: BrowserRouterProps) {
  // listen window.location.pathname change
  const [curPath, setCurPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPopState = () => {
      setCurPath(window.location.pathname)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  // window.history.pushState doesn't trigger 'popstate' event
  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    setCurPath(window.location.pathname)
  }
  // provide common things to <Route>
  return (
    <RouterContext.Provider value={{
      navigate,
      curPath
    }}>
      {props.children}
    </RouterContext.Provider>
  )
}

/**
 * <Route> matches current path and render component
 */
interface RouteProps {
  path: string
  component: JSX.Element
}
function Route(props: RouteProps) {
  const routerContext = useContext(RouterContext)
  // simplify: path exactly the same
  if (props.path === routerContext.curPath) {
    return props.component
  }
  return null
}

/**
 * <Link> navigate to specific path
 */
interface LinkProps {
  to: string
  children: React.ReactNode
}
function Link(props: LinkProps) {
  const routerContext = useContext(RouterContext)
  const onLinkClick = (e: React.MouseEvent) => {
    routerContext.navigate(props.to)
    // prever <a>'s function
    e.preventDefault()
  }
  return (
    <a href="/" onClick={e => onLinkClick(e)}>{props.children}</a>
  )
}

export {
  BrowserRouter,
  Route,
  Link
}