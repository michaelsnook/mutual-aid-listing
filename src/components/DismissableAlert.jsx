import React, { useState } from 'react'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

export const DismissableAlert = (props) => {
  const [isAlertClosed, setIsAlertClosed] = useState(false)

  return isAlertClosed ? (
    <></>
  ) : (
    <div className="md:container pt-2 mb-2 md:pt-4 md:mb-4 lg:pt-6 lg:mb-6">
      <div className="mx-3 md:mx-0 relative bg-yellow-100 shadow-md rounded-md py-5 px-8">
        <button
          className="absolute top-0 right-0 p-3"
          onClick={() => {
            setIsAlertClosed(true)
          }}
          area-pressed="false"
        >
          ✕
        </button>
        <h1 className="mt-2 mb-1 font-bold">Info for donors/supporters:</h1>
        <p className="mb-2">
          <ul className="list-disc pl-5">
            <li>
              We vet and track everything we add to the website –{' '}
              <OutboundLink
                className="text-primary-700 font-bold hover:text-primary-500"
                href="https://docs.google.com/document/d/1HzDK589lbyUtS-sDyUF9U2T-zkkT6CyCa3RY7WYBk3E/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                click here to read about our internal process for vetting and
                listing fundraisers, our commitment to equity, and our team in
                the document here.
              </OutboundLink>
            </li>
            <li>
              Please look for the most urgent needs first, marked in red as
              "Urgent".
            </li>
            <li>
              If you are donating from abroad, please look for fundraisers
              accepting foreign donations, marked with "£&nbsp;$&nbsp;€".
            </li>
            <li>
              If you are an NRI donating from an Indian bank account, your
              donations don't count as "foreign" and you don't have to worry
              about this.
            </li>
            <li>
              If you have a campaign you want us to add, email{' '}
              <span className="italic">
                covidmutualaidindia
                <wbr />
                @protonmail.com
              </span>
              .
            </li>
          </ul>
        </p>
        <p className="italic text-gray-600 my-2">
          Disclaimer: this list is curated by an informal group of volunteers.
          Nothing on this site should be taken as a warantee or legal advice.
          Give at your own discretion, but please do give generously.
        </p>
      </div>
    </div>
  )
}
