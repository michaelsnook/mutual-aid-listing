import React, { useState } from "react"
import PropTypes from "prop-types"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { ExternalLinkIcon } from "@heroicons/react/outline"

export const DonateLink = (props) => {
  const { href, children, className } = props
  let url = new URL(href)
  url.searchParams.set("utm_source", "MutualAidIndia.com")

  return (
    <OutboundLink
      {...props}
      className={`inline-block border border-urgent-600 text-center hover:shadow-lg
        shadow-md rounded-md text-urgent-600 text-lg px-6 py-2 hover:bg-urgent-600
        hover:text-white mr-3 mb-2 ${className}`}
      href={url.href}
      target="_blank"
    >
      {children || "Donate Online"}{" "}
      <ExternalLinkIcon className="inline h-4 w-4" />
    </OutboundLink>
  )
}

DonateLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
}

DonateLink.defaultProps = {
  className: "",
}
