import { OutboundLink } from "gatsby-plugin-google-gtag"
import PropTypes from "prop-types"
import React from "react"

export const Feature = ({ label, value }) => {
  if (typeof value === "string") {
    if (value.startsWith("http") || value.startsWith("mailto")) {
      value = (
        <div className="truncate">
          <OutboundLink
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-700 transition-colors duration-200"
          >
            {value}
          </OutboundLink>
        </div>
      )
    } else {
      value = <div className="truncate">{value}</div>
    }
  } else if (Array.isArray(value)) {
    value = value.map((item, i) => (
      <span key={`${label}_${i}`} className="inline-block mr-4 break-normal">
        {item}
      </span>
    ))
  }

  return (
    <>
      <h4 className="text-primary-800 uppercase text-xxs tracking-wide font-medium pb-px mt-2">
        {label}
      </h4>
      <div className="font-medium text-primary-800 text-base leading-tight mb-4">
        {value}
      </div>
    </>
  )
}

Feature.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
}
