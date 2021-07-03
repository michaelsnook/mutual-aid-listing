import React from 'react'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import Mixtape2Image from '../images/mixtape-2-square.jpg'

export const PromoMixtape2 = (props) => {
  return (
    <div className="lg:container px-2 sm:px-4 md:px-7 mb-6 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:py-6">
        <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 md:pt-4 pb-3 bg-gradient-to-t from-black md:bg-none">
          <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 md:text-black md:text-3xl">
            The MAI Mixtape: 2nd Edition is here
          </h2>
        </div>
        <div className="col-start-1 row-start-2 px-4 pt-4 md:pt-0 md:pb-6">
          <p className="my-2 text-md">
            Thanks to our rad musician friends we now have a Mutual Aid India
            Mixtape, available on Bandcamp when you donate to one of the Mixtape
            campaigns.
          </p>
          <ol className="my-2 text-md list-decimal pl-7">
            <li>
              Buy the mixtape on Bandcamp or make a donation of at INR 500 to
              the featured campaign.
            </li>
            <li>
              Send the receipt/screenshot of your donation to{' '}
              <a
                className="text-primary-700 font-bold hover:text-primary-500"
                href="mailto:mixtapeformai@gmail.com"
              >
                MixtapeForMAI@gmail.com
              </a>
              , or{' '}
              <OutboundLink
                className="text-primary-700 font-bold hover:text-primary-500"
                href="https://docs.google.com/forms/d/e/1FAIpQLSf-tfzfukazFDqwA59pAenESCoZ7KGgiW-OsSQmilZa_JqN8Q/viewform"
                target="_blank"
              >
                attach the receipt to this form
              </OutboundLink>
              .
            </li>
            <li>
              Then we'll send you the Bandcamp download code for the mixtape.
            </li>
          </ol>
        </div>
        <div className="col-start-1 row-start-3 md:px-4">
          <Link
            className="bg-urgent-600 my-4 block w-full md:w-max text-center shadow-sm rounded-md text-white text-xl px-8 py-2 mb-2 md:mb-0 hover:bg-urgent-400"
            to="/mixtape-2"
          >
            Donate for the MAI&nbsp;Mixtape
          </Link>
          <OutboundLink
            className="border border-primary-600 text-primary-600 my-4 block w-full md:w-max text-center shadow-sm rounded-md hover:bg-primary-600 hover:text-white text-xl px-8 py-2 mb-2 md:mb-0 hover:bg-primary-400"
            href="https://maimixtape.bandcamp.com/releases"
          >
            Preview on Bandcamp
          </OutboundLink>
        </div>
        <div class="col-start-1 row-start-1 flex md:col-start-2 md:row-span-3">
          <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
            <div className="relative col-span-3 row-span-2">
              <img
                src={Mixtape2Image}
                alt="Cover art showing MAI Mixtape Edition 1"
                className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
