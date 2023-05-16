import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton";
import WeatherBox from "./component/WeatherBox";
/* 
1. 앱 실행 하면 현재 위치 기반 날씨
2. 날씨 정보 (도시, 섭씨, 화씨, 날씨 상태)
3. 5개 버튼(현재 위치, 4개 도시)
4. 도시 버튼 클릭시 도시별 날씨
5. 현재 위치 버튼 누르면 현재위치 기반 날씨
6. 데이터 들고 오는 동안 로딩 스피너
*/
function App() {
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재 위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=53fac83dfefb75f61fef696ac09a4962&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };
  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53fac83dfefb75f61fef696ac09a4962&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    console.log(data);
  };
  useEffect(() => {
    if(city==""){
    getCurrentLocation();}
    else{
      getWeatherByCity();
    }
  }, [city]);


  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>
    </div>
  );
}

export default App;
