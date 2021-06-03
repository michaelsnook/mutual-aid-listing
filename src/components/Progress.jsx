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
    <p className="mt-2 text-base text-primary-900 mb-5 font-medium">
      {`${reached_string} raised `}
      {goal > 0 ? `of ${goal_string}` : `so far`}
    </p>
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
