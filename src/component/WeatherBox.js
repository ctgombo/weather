import React from 'react'

const WeatherBox = ({weather}) => {
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <div>{weather?.main.temp}C</div>
      <div>{weather?.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox
