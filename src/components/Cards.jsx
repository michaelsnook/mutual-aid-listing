import PropTypes from "prop-types"
import React from "react"
import { Card } from "."

export const Cards = (props) => {
  const {
    nodes,
    isForeignDonor,
  } = props

  return (

      <div className="flex flex-wrap -mx-3 xl:-mx-6">
        {nodes.map((item, i) => (
          <div
            className="w-full sm:w-1/2 xl:w-1/3 px-3 xl:px-6 py-6"
            key={`card_${item.data.Slug}`}
          >
            <Card
              {...item.data}
              navigation={{
                current: i,
                items: nodes.map((item) => `/${item.data.Slug}`),
              }}
              isForeignDonor={isForeignDonor}
            />
          </div>
        ))}
      </div>

  )
}

Cards.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isForeignDonor: PropTypes.bool
}
