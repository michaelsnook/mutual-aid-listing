import React from 'react'
import { Footer, SignupForm } from '../components'

export const LayoutFull = ({ children }) => {
  return (
    <div className="bg-gray-100">
      {children}
      <div className="bg-white border-t border-b border-transparent pt-8 bp-4 lg:py-16 mt-8">
        <div className="container">
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
