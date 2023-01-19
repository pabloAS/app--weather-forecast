import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiCloud,
  FiMapPin,
  FiMoon,
  FiSearch,
  FiSun,
} from "react-icons/fi";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [dataApi, setDataApi] = useState(null);

  useEffect(() => {
    geolocation();
  }, []);
  const geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
         
          getApiTemp(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        (error) => {
          console.log("Erro ao obter localização.", error);
        }
      );
    } else {
      console.log("Navegador não suporta Geolocalização!");
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const handleSearch = () => {
    getApiTemp(city);
  };
  const getApiTemp = (city) => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setDataApi(data);
      });
  };
  return (
    <>
      <div className="App">
        <>
          <header>
            <FiSearch />
            <input
              value={city}
              placeholder="Cidade..."
              onChange={handleChange}
              autoComplete="off"
            />
            <button onClick={handleSearch}>
              <FiArrowRight size={20} />
            </button>
          </header>
          <section className="infos">
            {dataApi ? (
              <div className="infosApi">
                <img src={dataApi.current.condition.icon} alt="icone" />

                <h1>{dataApi.current.feelslike_c}°</h1>
                <p>
                  <FiMapPin size={20} />
                  {dataApi.location.name} - {dataApi.location.region}
                </p>
                <span>{dataApi.current.condition.text}</span>
              </div>
            ) : (
              <div className="default">
                <FiSun size={50} />
                <FiCloud size={50} />
                <FiMoon size={50} />
              </div>
            )}
          </section>
        </>
      </div>
    </>
  );
}

export default App;
