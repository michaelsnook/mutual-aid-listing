import { useEffect } from "react"
import { useLocalStorage } from "./index"
import useMedia from "use-media"

export function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled")
  const prefersDarkMode = usePrefersDarkMode()

  const enabled =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode

  useEffect(() => {
    const className = "dark"
    const element = window.document.body
    element.classList.remove(className)
  }, [false])

  return [false, setEnabledState]
}

function usePrefersDarkMode() {
  return useMedia("(prefers-color-scheme: dark)")
}
