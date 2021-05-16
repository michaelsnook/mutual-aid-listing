function addCommasLakhs(value) {
  const strVal = value.toString()

  if (strVal.length <= 3) return strVal

  const lastThree = `,${strVal.substring(strVal.length - 3)}`
  const otherNumbers = strVal.substring(0, strVal.length - 3)

  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
}

function addCommasDollars(value, round) {
  const roundingFactor = value >= 1000000 ? 1000 : 100
  const roundedInt = round
    ? Math.round(value / roundingFactor) * roundingFactor
    : Math.round(value)
  return roundedInt.toLocaleString('en-US')
}

export function showCurrency(value, currency = 'rupees', round = false) {
  const rupeesInt = parseInt(value)
  const rupeesPerDollar = 73.86 // on May 3

  return currency === 'rupees'
    ? `₹${addCommasLakhs(rupeesInt)}`
    : `$${addCommasDollars(rupeesInt / rupeesPerDollar, round)}`
}
