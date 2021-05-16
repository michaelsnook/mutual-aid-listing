import React from 'react'
import { SiteMetadata } from '../components'
import { Link } from 'gatsby'

import 'typeface-roboto'
import 'typeface-averia-serif-libre'
import '../styles/style.css'

const _404 = () => {
  return (
    <div className="flex min-h-screen items-center">
      <SiteMetadata title="Error 404" description="Page not found" />
      <div className="container">
        <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight">
          Error 404
        </h1>
        <h3 className="text-lg lg:text-xl font-medium">
          The page you're looking for doesn't exist.
          <br />
          <br />
          <Link to="/" className="text-primary-600">
            Go back to homepage
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default _404
