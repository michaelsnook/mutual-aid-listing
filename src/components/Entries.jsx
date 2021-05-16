import PropTypes from 'prop-types'
import React from 'react'
import { Entry } from '.'

export const Entries = (props) => {
  const { nodes, isForeignDonor } = props

  return (
    <div className="flex flex-wrap -mx-3 lg:-mx-4 xl:-mx-6">
      {nodes.map((item, i) => (
        <div
          className="w-full px-3 xl:px-6 lg:px-4 py-6"
          key={`card_${item.data.Slug}`}
        >
          <Entry
            {...item.data}
            navigation={{
              current: i,
              items: nodes.map((item) => `/${item.data.Slug}`),
            }}
            isForeignDonor={isForeignDonor}
            current={i}
          />
        </div>
      ))}
    </div>
  )
}

Entries.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isForeignDonor: PropTypes.bool,
}
