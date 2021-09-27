const api = {
    key:"4257a705b0393b50f66fe638920b406b",
    base:"https://api.openweathermap.org/data/2.5/",
    lang:"pt_br",
    units:"metric"
}

const city = document.querySelector('.city');
const date = document.querySelector('.date');
const container_img = document.querySelector('.container-img');
const container_temp = document.querySelector('.container-temp');
const temp_number = document.querySelector('.container-temp div');
const temp_unit = document.querySelector('.container-temp span');
const weather_t = document.querySelector('.weather');
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');
const low_high = document.querySelector('.low-high');

function getData() {

var semana = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
var mes    = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
var d = new Date();

var data = document.querySelector('.date').innerHTML = semana[d.getDay()]+", "+d.getDate()+" de "+mes[d.getMonth()]+" de "+d.getFullYear();
return data;

}

search_button.addEventListener('click', function() {
    searchResults(search_input.value);
})

search_input.addEventListener('keypress', enter)
  function enter(e) {
      key = e.keycode
      if (key === 13) {
          searchResults(search_input.value);
      }
  }

function searchResults(city) {
    fetch(`${api.base}/weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
      .then(response => {
          if (!response.ok) {
              document.querySelector('.city').innerHTML = '<p style=color:red;>Cidade não localizada</p>';
          }

          return response.json();
      })
      .catch (error => {
          alert(error.message)
      })

      .then(response => {
          displayResults(response)
      });
}
function displayResults(weather) {
    getData();
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let iconName = weather.weather[0].icon;
    container_img.innerHTML = `<img src="assets/icons/${iconName}.png">`;

    let temperature = `${Math.round(weather.main.temp)}`
    temp_number.innerHTML = temperature;
    temp_unit.innerHTML = `°C`;

    weather_t.innerHTML = weather.weather[0].description;

    let max_min = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
    low_high.innerHTML = max_min;
}
 