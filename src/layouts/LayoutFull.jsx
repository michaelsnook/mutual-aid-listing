import { Link } from "gatsby"
import React from "react"
import { DarkModeToggle, Footer, SignupForm } from "../components"
import { useDarkMode } from "../hooks"

export const LayoutFull = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useDarkMode()
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {children}
      <div className="bg-white dark:bg-transparent border-t border-b border-transparent py-8 lg:py-16 mt-8">
        <div className="container">
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
