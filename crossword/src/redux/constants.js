
const URL = "http://localhost:3000"

const formatTime = (time) => {
  if (time === "N/A" || time === undefined) {
    return "N/A"
  }
  let minutes = Math.floor(time/60)
  minutes.toString().length === 1 ? minutes = `0${minutes.toString()}` : minutes = minutes.toString()
  let hours = Math.floor(minutes/60).toString()
  if (hours.length === 1) {
    hours = `0${hours}`
  }
  let seconds = (time % 60).toString()
  if (seconds.length === 1) {
    seconds = `0${seconds}`
  }
  return `${hours}:${minutes}:${seconds}`
}

export { URL, formatTime }
