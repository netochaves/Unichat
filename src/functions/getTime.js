const getTime = date => {
  let TimeType
  let hour
  let minutes

  hour = date.getHours()
  if (hour <= 11) {
    TimeType = "AM"
  } else {
    TimeType = "PM"
  }
  if (hour > 12) {
    hour -= 12
  }
  if (hour === 0) {
    hour = 12
  }
  minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = 0 + minutes.toString()
  }
  return `${hour.toString()} : ${minutes.toString()} ${TimeType.toString()}`
}

export default getTime
