import PropTypes from 'prop-types'
import React from 'react'
import { showCurrency } from '../utils'

export const Progress = (props) => {
  const { goal, reached, isForeignDonor } = props
  const reached_string = showCurrency(
    reached,
    isForeignDonor ? 'dollars' : 'rupees'
  )
  const goal_string = showCurrency(
    goal,
    isForeignDonor ? 'dollars' : 'rupees',
    true
  )

  return goal || reached ? (
    <div className="mt-2 mb-5">
      <p className=" text-base text-primary-900 font-medium">
        {`${reached_string} raised `}
        {goal > 0 ? `of ${goal_string}` : `so far`}
      </p>
      {goal > 0 && (
        <div class="h-3 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-200 absolute"></div>
          <div
            class="h-full bg-gradient-to-r from-secondary-500 via-secondary-500 to-urgent-500 absolute"
            style={{
              width: `${(100 * reached) / goal}%`,
              minWidth: '5%',
            }}
          ></div>
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}

Progress.propTypes = {
  goal: PropTypes.number.isRequired,
  reached: PropTypes.number.isRequired,
  isForeignDonor: PropTypes.bool,
}

Progress.defaultProps = {
  isForeignDonor: false,
}
