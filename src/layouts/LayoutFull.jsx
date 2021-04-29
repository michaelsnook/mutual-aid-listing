import { Link } from "gatsby"
import React from "react"
import { DarkModeToggle, Footer, SignupForm } from "../components"
import { useDarkMode } from "../hooks"

export const LayoutFull = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useDarkMode()
  var fund_cta
  if (window.location.search == "") {
    fund_cta = (
      <a
        href="/?foriegn_fund=true"
        className="bg-pink-600 shadow-sm rounded-md text-white px-3 py-1 mr-2"
      >
        {" "}
        View Only Foreign Funds
      </a>
    )
  } else {
    fund_cta = (
      <a
        href="/"
        className="bg-pink-600 shadow-sm rounded-md text-white px-3 py-1 mr-2"
      >
        {" "}
        View All Funds{" "}
      </a>
    )
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-transparent py-6">
        <div className="container text-center">
          <div className="relative">
            <Link to="/" className="inline-block w-20 md:w-28 lg:w-36">
              <img alt="Logo" src="/icon.png" />
            </Link>

            <div className="absolute top-0 right-0">{fund_cta}</div>
          </div>
        </div>
      </header>
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
