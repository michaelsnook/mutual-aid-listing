import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

export const SignupForm = () => {
  return (
    <>
      <div className="flex flex-wrap md:justify-between md:items-center">
        <div>
          <h3 className="text-2xl lg:text-4xl font-bold text-primary-500 tracking-tight">
            Do you have a fundraiser to add to the cause?
          </h3>
          <p className="text-primary-800 font-medium text-base md:text-lg pb-4 md:pb-2 pt-1">
            Let us know, or get in touch to volunteer.
          </p>
        </div>
        <div className="flex w-full flex-col md:flex-row md:w-1/2 lg:w-auto">
          <OutboundLink
            href="mailto:covidmutualaidindia@protonmail.com?subject=Please%20add%20this%20fundraiser"
            className="bg-primary-600 text-center shadow-sm rounded-md text-white text-xl
            px-4 py-2 mb-2 md:mb-0 hover:bg-primary-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit a Fundraiser
          </OutboundLink>
          <OutboundLink
            href="mailto:covidmutualaidindia@protonmail.com?subject=Volunteering"
            className="bg-primary-600 text-center shadow-sm rounded-md text-white text-xl
            px-4 py-2 mt-2 md:mt-0 hover:bg-primary-400 md:ml-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Volunteer
          </OutboundLink>
        </div>
      </div>
    </>
  )
}
