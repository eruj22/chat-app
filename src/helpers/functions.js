export const timeConverter = (UNIX_timestamp) => {
  const date = new Date(UNIX_timestamp * 1000)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = date.getDate()
  const hour = "0" + date.getHours()
  const min = "0" + date.getMinutes()

  const time =
    day +
    " " +
    month +
    ", " +
    year +
    " " +
    hour.substr(-2) +
    ":" +
    min.substr(-2)
  return time
}
