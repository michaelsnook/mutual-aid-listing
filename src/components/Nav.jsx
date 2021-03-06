import React, { useState } from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Switch } from '@headlessui/react'
import { Link } from 'gatsby-plugin-modal-routing-3'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

function link({ url, text }, clickCB) {
  const isOutbound = url.indexOf('https://') === 0

  return isOutbound ? (
    <li>
      <OutboundLink
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-primary-700 px-3 py-3 hover:bg-primary-200 rounded-md"
      >
        {text}
      </OutboundLink>
    </li>
  ) : (
    <li>
      <Link
        to={url}
        className="block text-primary-700 px-3 py-3 hover:bg-primary-200 rounded-md"
        onClick={clickCB}
      >
        {text}
      </Link>
    </li>
  )
}

export const Nav = (props) => {
  const { categories, isToggled, setToggled } = props
  const page_links = categories
    ? Object.keys(categories).map((name) => {
        return {
          url: `#category_${name}`,
          text: categories[name],
        }
      })
    : []
  const show_toggle = !(typeof isToggledd === 'undefined' && typeof setToggled === 'undefined')

  const extra_links = [
    {
      url: '/',
      text: 'Home',
    },
    {
      url: '/about',
      text: 'About',
    },
    {
      url: '/completed',
      text: 'Completed Fundraisers',
    },
  ]

  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <nav
      className={`lg:ml-auto lg:max-w-sm
        z-50 fixed lg:sticky top-0 w-full
        lg:h-screen ${isNavOpen ? 'h-screen' : 'h-auto'} overflow-y-hidden
        shadow-md lg:shadow-none bg-white lg:bg-transparent`}
    >
      <div
        id="scrolling-navbar"
        className="w-full h-full overflow-y-auto py-5 px-3 lg:pl-5 lg:pr-0"
      >
        <div className="flex flex-row justify-between lg:justify-start">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="lg:hidden focus:outline-none focus:ring focus:border-primary-300 rounded-sm"
          >
            <MenuIcon
              className={`block h-6 w-6 ${isNavOpen ? 'hidden' : 'block'}`}
              aria-hidden={isNavOpen ? true : false}
            />
            <XIcon
              className={`block h-6 w-6  ${isNavOpen ? 'block' : 'hidden'}`}
              aria-hidden={isNavOpen ? false : true}
            />
          </button>
          {show_toggle && 
            <span>
              <span className="inline-flex flex-shrink-0 relative mr-2 align-text-bottom text-primary-900">
                Donate from overseas
              </span>
              <Switch
                checked={isToggled}
                onChange={() => {
                  setToggled(!isToggled)
                  setIsNavOpen(false)
                }}
                className={`relative inline-flex items-center flex-shrink-0 ${
                  isToggled ? 'bg-primary-700' : 'bg-gray-600'
                } w-11 h-6 rounded-full cursor-pointer focus:outline-none focus:shadow-outline transition-colors duration-200 ease-in-out`}
              >
                <span
                  className={`${
                    isToggled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transition duration-200 ease-in-out transform bg-white rounded-full`}
                />
              </Switch>
            </span>
          }
        </div>

        <div className={`lg:block ${isNavOpen ? 'block' : 'hidden'} `}>
          {show_toggle && <hr className="mt-3" />}
          {categories && (
            <>
              <span className="inline-flex flex-shrink-0 relative mt-3 mr-2 align-text-bottom text-primary-900">
                Categories
              </span>
              <ul>
                {page_links.map((ob) =>
                  link(ob, () => {
                    setIsNavOpen(false)
                  })
                )}
              </ul>
              <hr className="my-3" />
            </>
          )}
          <ul>{extra_links.map((ob) => link(ob))}</ul>
        </div>
      </div>
    </nav>
  )
}
