import { Link } from "gatsby-plugin-modal-routing-3"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { Feature, Tag } from "."
import { showCurrency } from "../utils"
import { ExternalLinkIcon, CurrencyRupeeIcon } from "@heroicons/react/outline"

function openUPIURL(UPI_ID) {
  window.open(
    `upi://pay?pa=${UPI_ID}&pn=Mutual+Aid+Recipient&tn=&cu=INR`,
    "_blank"
  )
  return true
}

export const Entry = (props) => {
  const {
    Region,
    Name,
    navigation,
    Slug,
    Status,
    Rupees_Goal,
    Rupees_Reached,
    Urgent,
    Foreign_Funds,
    isForeignDonor = false,
    Description,
    current,
    URL,
    UPI_ID,
  } = props

  const [isUPIPressed, setIsUPIPressed] = useState(false)

  return (
    <div className="overflow-x-hidden">
      <Link
        className="text-3xl hover:underline text-primary-600 font-bold leading-snug mb-2"
        to={`/${Slug}`}
        state={{ navigation }}
        asModal
      >
        <h2>
          {current + 1}. {Name}
        </h2>
      </Link>
      {Urgent && <Tag color="urgent" text="Urgent" />}
      {Foreign_Funds && <Tag color="secondary" text="£ $ €" />}
      {Status === "Met Goal and Increased" && (
        <Tag color="yellow" text={Status} />
      )}
      {Rupees_Reached > 0 && (
        <p className="mt-2 text-base text-primary-900 mb-5 font-medium">
          {showCurrency(Rupees_Reached, isForeignDonor ? "dollars" : "rupees")}{" "}
          raised
          {Rupees_Goal > 0
            ? ` of ${showCurrency(
                Rupees_Goal,
                isForeignDonor ? "dollars" : "rupees",
                true
              )}`
            : " so far"}
        </p>
      )}
      {Region && <Feature label="Location" value={Region} />}
      <h4 className="text-primary-800 uppercase text-xxs tracking-wide font-medium pb-px mt-2">
        Description
      </h4>
      <p className="mt-4 whitespace-pre-line text-sm lg:text-base leading-normal text-primary-900">
        {Description}
      </p>
      <div className="my-4 flex flex-wrap">
        {UPI_ID && (
          <div className="flex flex-col  mr-3 mb-2">
            <button
              className="sm:hidden cursor-pointer border border-secondary-600 text-center hover:shadow-lg shadow-md rounded-md text-secondary-600 text-lg px-5 py-2 hover:bg-secondary-600 hover:text-white"
              to={URL}
              onClick={() => {
                openUPIURL(UPI_ID)
                setIsUPIPressed(true)
              }}
            >
              Donate via UPI <CurrencyRupeeIcon className="inline h-4 w-4" />
            </button>
            {isUPIPressed && (
              <span className="text-sm italic">
                This option only works on certain devices
              </span>
            )}
          </div>
        )}
        {URL && (
          <Link
            className="inline-block border border-urgent-600 text-center hover:shadow-lg shadow-md rounded-md text-urgent-600 text-lg px-5 py-2 hover:bg-urgent-600 hover:text-white mr-3 mb-2"
            to={URL}
          >
            Donate <ExternalLinkIcon className="inline h-4 w-4" />
          </Link>
        )}
        <Link
          className="inline-block border border-primary-600 text-center hover:shadow-lg shadow-md rounded-md text-primary-600 text-lg px-5 py-2 hover:bg-primary-600 hover:text-white mb-2"
          to={`/${Slug}`}
          state={{ navigation }}
          asModal
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

Entry.propTypes = {
  Region: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    current: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
  Slug: PropTypes.string.isRequired,
  Rupees_Goal: PropTypes.number,
  Rupees_Reached: PropTypes.number,
  Urgent: PropTypes.bool,
  Foreign_Funds: PropTypes.bool,
  isForeignDonor: PropTypes.bool,
  Description: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  URL: PropTypes.string,
  UPI_ID: PropTypes.string,
}

Entry.defaultProps = {
  navigation: {},
}
