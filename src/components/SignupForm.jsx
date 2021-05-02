import React from "react"

export const SignupForm = () => {
  return (
    <form action="//" target="_blank" method="post">
      <div className="flex flex-wrap lg:justify-between lg:items-center">
        <div>
          <h3 className="text-2xl lg:text-4xl font-bold text-green-500 tracking-tight">
            Do you have a fundraiser to add to the cause?
          </h3>
          <p className="text-green-800 font-medium text-base lg:text-lg pb-4 lg:pb-0 pt-1">
            Let us know, or get in touch to volunteer.
          </p>
        </div>
        <div className="flex w-full md:w-1/2 lg:w-auto">
          <input
            aria-label="E-mail address"
            className="flex-1 lg:w-64 rounded-l-lg bg-white dark:bg-gray-900 placeholder-green-800 text-green-800 px-4 py-1 border border-green-700 appearance-none rounded-left text-lg leading-loose focus:outline-none focus:shadow-outline"
            maxLength="60"
            name="email"
            placeholder="Your e-mail"
            required
            type="email"
          />
          <input
            className="rounded-r-lg text-center px-4 py-1 leading-loose text-lg font-medium transition-colors duration-200 focus:outline-none focus:shadow-outline bg-green-700 text-white cursor-pointer hover:bg-green-500"
            type="submit"
            value="Sign up"
          />
        </div>
      </div>
    </form>
  )
}
