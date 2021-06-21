import React from 'react'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import ZineImage from '../images/zine-square.jpg'

export const PromoZine = (props) => {
  return (
    <div className="lg:container px-2 sm:px-4 md:px-7 mb-6 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:py-6">
        <div className="relative z-10 md:col-start-2 col-start-1 row-start-1 px-4 pt-40 md:pt-4 pb-3 bg-gradient-to-t from-black md:bg-none">
          <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 md:text-black md:text-3xl">
            The MAI Zine is here
          </h2>
        </div>
        <div className="col-start-1 md:col-start-2 row-start-2 px-4 pt-4 md:pt-3 md:pb-3">
          <p className="my-2 text-md">
            In April 2021 the second wave of the Covid-19 pandemic decimated the
            healthcare infrastructure in India. Time, it felt, had gone mad.
          </p>
          <p className="my-2 text-md">
            But for many of us at MAI, time has always been a little strange in
            the ways it slips into our lives. We made a small book about our
            time. You can buy the digital book on Gumroad at a suggested price
            of $12 if you’re in India and $15, if you’re outside India.
          </p>
          <p className="my-2 text-md italic">
            100% of proceeds will be donated to a campaign supporting the trans
            community in Manipur with daily essentials.
          </p>
        </div>
        <div className="col-start-1 md:col-start-2 row-start-3 md:px-4">
          <OutboundLink
            className="bg-urgent-600 my-4 block w-full md:w-max text-center shadow-sm rounded-md text-white text-xl px-8 py-2 mb-2 md:mb-0 hover:bg-urgent-400"
            href="https://artformutualaid.gumroad.com/"
          >
            Donate for the MAI&nbsp;Zine
          </OutboundLink>
          <Link
            className="border border-primary-600 text-primary-600 my-4 block w-full md:w-max text-center shadow-sm rounded-md hover:bg-primary-600 hover:text-white text-xl px-8 py-2 mb-2 md:mb-0 hover:bg-primary-400"
            to="/zine"
          >
            More Info
          </Link>
        </div>
        <div class="col-start-1 md:col-start-1 row-start-1 flex md:row-span-3">
          <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
            <div className="relative col-span-3 row-span-2">
              <img
                src={ZineImage}
                alt="Cover art showing MAI Zine preview"
                className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
