import React from 'react'
import { Link } from 'gatsby'
import { Hero, SiteMetadata } from '../components'
import { Layout } from '../layouts/Layout'
import { HomeIcon } from '@heroicons/react/outline'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const About = () => {
  return (
    <Layout>
      <SiteMetadata
        title="MutualAidIndia.com | Home"
        description="A curated list of opportunities to donate for COVID relief."
      />

      <Hero
        title="About MutualAidIndia.com, our team, and our values"
        tag="about"
      />

      <nav className="shadow-lg z-40 p-5 sticky top-0 bg-white w-full">
        <div className="flex flex-row justify-between w-full">
          <Link
            to="/"
            className="flex focus:outline-none focus:ring focus:border-primary-300 rounded-sm"
          >
            <HomeIcon className="block h-6 w-6 text-primary-900 mr-2" />
            <span
              className="pt-0.5 inline-flex flex-shrink-0 relative h-6 mr-2
            text-primary-900 align-bottom"
            >
              Back to home
            </span>
          </Link>
        </div>
      </nav>

      <div className="container overflow-hidden -mt-14 pt-20 max-w-2xl">
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight text-black">
          About MutualAidIndia.com
        </h1>
        <p className="text-primary-800 uppercase text-sm tracking-wide font-medium mb-2">
          4th May, 2021
        </p>
        <p className="py-2">
          What started just a few days ago (late April, 2021) as a google doc
          with a list of links, has grown through social media and hard work, to
          a rag-tag operation with over 30 volunteers, with protocols and
          guidelines and statements of ethics. As we have grown and put some
          structure to our labour, we wanted to share with you, the public
          (hopefully the donor or the volunteer) what it is, and the values that
          drive it.
        </p>
        <p className="py-2">
          We vet and track everything we add to the website.{' '}
          <OutboundLink
            className="text-primary-700 font-bold hover:text-primary-500"
            href="https://docs.google.com/document/d/1HzDK589lbyUtS-sDyUF9U2T-zkkT6CyCa3RY7WYBk3E/edit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to read about our internal process for vetting and
            listing fundraisers, our commitment to equity, and our team in the
            document here.
          </OutboundLink>
        </p>
        <p className="py-2">
          That said, We are not a formal organization, so please don’t treat us
          or this website as one. We are doing our best to support mutual aid in
          these terrible times. Our priority is to support vulnerable people,
          and we do not ask for photos as "evidence" &ndash; since this
          requirement of proof of suffering goes against our ethics. We are not
          a formal NGO with a staff who chases down every Rupee spent and gives
          "charity" with these strings attached. Such NGO will naturally
          establish barriers that the most disadvantaged members of society will
          not be able to scale. It is our hope that the practice of mutual aid
          can be a way to fill in that gap, rather than to recreate it.
        </p>
        <p className="py-2">
          If you'd like to get more of a look at the process of our work, please
          follow our Instagram account{' '}
          <OutboundLink
            className="text-primary-700 font-bold hover:text-primary-500"
            href="https://instagram.com/mutualaidindia"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mutualaidindia
          </OutboundLink>{' '}
          where we share graphics highlighting many of the individual recipients
          and informal groups doing amazing work, who are otherwise overlooked
          by mainstream NGOs.
        </p>
        <h2 className="mt-3 text-xl lg:text-2xl font-bold leading-tight text-black">
          Legal Info
        </h2>
        <p className="text-primary-800 uppercase text-sm tracking-wide font-medium mb-2">
          A lawyer wrote this
        </p>
        <p className="py-2">
          The information published on this site has been compiled by a group of
          volunteers from information available on public platforms, or emailed
          to us through our account covidmutualaidindia@protonmail.com, and is
          provided here for general information purposes only. While we
          endeavour to keep the information up-to-date and accurate, we make no
          representations or warranties, express or implied, about the accuracy,
          reliability, suitability or availability with respect to the
          information contained here. Any reliance you place on the information
          on this site is strictly at your own risk. None of our volunteers have
          received any benefit (monetary or otherwise) from any of these
          fundraisers. Every effort is made to keep the document up and running
          smoothly, however, we are not responsible for any malpractice
          conducted by any of the individual fundraisers.
        </p>
        <p className="py-2">
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising out of, or in connection with, the use of
          this document. Through this document you are able to link to other
          websites which are not under the control of any of the volunteers. We
          have no control over the nature, content and availability of those
          sites. The inclusion of any links does not necessarily imply a
          recommendation or endorsement of the views expressed within them. Our
          purpose is only to help vulnerable people in need and our concerns are
          strictly humanitarian. You are therefore advised to use any of the
          information available here for the purpose of transaction, or
          otherwise, at your discretion.
        </p>
      </div>
    </Layout>
  )
}

export default About
