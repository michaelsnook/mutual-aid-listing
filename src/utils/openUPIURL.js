export function openUPIURL(UPI_ID) {
  window.open(
    `upi://pay?pa=${UPI_ID}&pn=Mutual+Aid+Recipient&tn=&cu=INR`,
    "_blank"
  )
  return true
}
