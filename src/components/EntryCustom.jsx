import React from 'react'
import { Feature, Tag, Progress } from '../components'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

export const EntryCustom = (props) => {
  const {
    Region,
    Name,
    Category,
    Status,
    Rupees_Goal,
    Rupees_Reached,
    Urgent,
    Foreign_Funds,
    isForeignDonor = true,
    Description,
    Bank_Details,
    donate_text,
    donate_link,
    show_bank_details = false,
  } = props

  return (
    <div className="mb-10 bg-white shadow-md rounded-md">
      <div className="pt-8 pb-6 md:pt-10 lg:pt-12 px-6 md:px-8 lg:px-10">
        <h4 className="text-primary-800 uppercase text-sm tracking-wide font-medium pb-px">
          {Category}
        </h4>
        <div className="overflow-x-hidden">
          <h2 className="text-3xl text-primary-600 font-bold leading-snug mb-2">
            {Name}
          </h2>
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
          {(Status === 'Deceased' || Status === 'Completed') && (
            <Tag color="gray" text="Campaign closed" />
          )}
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
            <OutboundLink
              className="bg-urgent-600 my-4 block w-full md:w-max text-center shadow-sm
              rounded-md text-white text-xl px-8 py-2 mb-2 md:mb-0 hover:bg-urgent-400"
              href={donate_link}
              target="_blank"
            >
              {donate_text}
            </OutboundLink>
          </div>
          {show_bank_details && Bank_Details && (
            <>
              <h4 className="text-primary-800 text-xl tracking-wide font-medium my-2">
                Or use these bank details to make a direct transfer:
              </h4>
              <p className="whitespace-pre-line text-sm lg:text-base leading-normal text-primary-900">
                {Bank_Details}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
