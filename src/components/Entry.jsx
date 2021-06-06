import { Link } from 'gatsby-plugin-modal-routing-3'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Feature, Tag, DonateLink, Progress } from '.'
import { openUPIURL } from '../utils'
import { CurrencyRupeeIcon } from '@heroicons/react/outline'

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
      <Progress
        reached={Rupees_Reached}
        goal={Rupees_Goal}
        isForeignDonor={isForeignDonor}
      />
      {Urgent && <Tag color="urgent" text="Urgent" />}
      {Foreign_Funds && <Tag color="secondary" text="£ $ €" />}
      {Status === 'Met Goal and Increased' && (
        <Tag color="yellow" text={Status} />
      )}
      {Status === 'Met Goal' && <Tag color="gray" text="Goal reached!" />}
      {Status === 'Deceased' && <Tag color="gray" text="Campaign closed" />}
      {Region && <Feature label="Location" value={Region} />}
      <h4 className="text-primary-800 uppercase text-xxs tracking-wide font-medium pb-px my-2">
        Description
      </h4>
      <div
        className="airtable-markdown text-sm lg:text-base leading-normal text-primary-900"
        dangerouslySetInnerHTML={{
          __html: Description.childMarkdownRemark.html,
        }}
      />
      <div className="my-4 flex flex-wrap">
        {UPI_ID && (
          <div className="flex flex-col mr-3 mb-2 sm:hidden">
            <button
              className="cursor-pointer border border-secondary-600 text-center hover:shadow-lg shadow-md rounded-md text-secondary-600 text-lg px-5 py-2 hover:bg-secondary-600 hover:text-white"
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
        {URL && <DonateLink href={URL} />}
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
