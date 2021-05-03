import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import {
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa"

export const Footer = () => {
  const {
    site: {
      meta: { links },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        meta: siteMetadata {
          links {
            email
            instagram
            facebook
            twitter
          }
        }
      }
    }
  `)

  return (
    <footer className="bg-white dark:bg-transparent">
      <div className="container pt-12 pb-12 flex flex-wrap text-center lg:flex-row-reverse lg:justify-between lg:items-center">
        <ul className="w-full lg:w-auto">
          <FooterIconLink
            href={links.instagram}
            icon={FaInstagram}
            label="Instagram"
          />
          <FooterIconLink
            href={links.facebook}
            icon={FaFacebookF}
            label="Facebook"
          />
          <FooterIconLink
            href={links.twitter}
            icon={FaTwitter}
            label="Twitter"
          />
          <FooterIconLink
            href={links.email}
            icon={FaEnvelope}
            label="E-mail"
          />
        </ul>
        <div className="w-full lg:w-auto pt-6 lg:pt-0 text-primary-800 text-sm">
          &copy; Copyright: there is no copyright on any of the information in this document.
          Please feel free to share, swipe, copy, paste at will. That said, we have about 12
          volunteers curating this info so if be aware it may become out of date quickly.
          If you want to help us curate the info, add new entries, or promote on media, get in touch
          at covidmutualaidindia@protonmail.com.
        </div>
      </div>
    </footer>
  )
}

const FooterIconLink = ({ href, label, icon: Icon }) => {
  const linkParams = { href }

  if (href.startsWith("http")) {
    linkParams.target = "_blank"
    linkParams.rel = "noreferrer noopener"
  }

  return (
    <li className="inline-block px-2">
      <a
        {...linkParams}
        className="inline-flex h-8 w-8 border border-primary-800 text-primary-800 rounded-full items-center justify-center transition-colors duration-200 hover:text-white hover:bg-primary-400 hover:border-primary-400"
      >
        <span className="sr-only">{label}</span>
        <Icon className="w-3 h-3 fill-current" />
      </a>
    </li>
  )
}
