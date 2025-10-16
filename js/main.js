// fetch wether data in API

const apiKey = "9093e8e77912426fb0c164841251110";

let city = document.getElementById("city");

function fetchWetherReport() {
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.value}&aqi=yes`)
    .then((res)=>{
        return res.json();
    })
    .then((response)=>{
        let result = response;
        load(result)
    })
    .catch((err)=>{
        errorHandle();
    })    
}
function load(res) {
    document.getElementById("heading").innerText = `${res.location.name}, ${res.location.region}, ${res.location.country} `
    document.getElementById("load").innerHTML = `
                                                  <div class="container">
                                                    <div class="inside-container">
                                                        <div id="backImage"  class="city">${res.location.name}
                                                        <P>${res.location.localtime}</P></div>
                                                        <div class="temp">Temperature ${res.current.temp_c} <sup>0</sup>C</div>
                                                        <div class="wind-chill">Windchill ${res.current.windchill_c} <sup>0</sup>C</div> 
                                                        <div class="humidity">Humidity  ${res.current.humidity}%</div>
                                                        <div class="pressure">Pressure ${res.current.pressure_in}"</div>
                                                        <div class="wind-speed">Wind-Speed ${res.current.wind_kph}kmh</div>
                                                        <div class="state">${res.location.region}</div>
                                                        <div class="country">${res.location.country}</div>  
                                                    </div>    
                                                </div>      
    
                                    `
        // change background image according to weather condition
        let backImage = document.getElementById("backImage");
    if(res.current.condition.text === "Sunny" || res.current.condition.text ==="Clear"){
        document.body.style.backgroundImage = "url('../Components/sunny.jpg')";
        backImage.style.backgroundImage = "url('./Components/sunny.jpg')";
    }else if(res.current.condition.text ==="Cloudy" || res.current.condition.text === "Partly cloudy"){
        document.body.style.backgroundImage = "url('../Components/clouds.jpg')";
        backImage.style.backgroundImage = "url('./Components/clouds.jpg')";
    }else if(res.current.condition.text === "Light freezing rain" || res.current.condition.text === "Freezing drizzle" || res.current.condition.text === "Fog" || res.current.condition.text === "Freezing fog"){
        document.body.style.backgroundImage = "url('../Components/freezing.jpg')";
        backImage.style.backgroundImage = "url('./Components/freezing.jpg')";
    }else if(res.current.condition.text === "Heavy rain" || res.current.condition.text === "Heavy rain at times" || res.current.condition.text === "Patchy rain possible"){
        document.body.style.backgroundImage = "url('../Components/Thander.png')";
        backImage.style.backgroundImage = "url('../Components/Thander.png')";
    }else{
        document.body.style.backgroundImage = "url('../Components/sunny.jpg')";
        backImage.style.backgroundImage = "url('../Components/sunny.jpg')";
    }
    city.value = "";
}

let isDisplay = true;

function errorHandle() {
    if(isDisplay === true || isDisplay === false){
        document.getElementById("deleteModal").style.display = "flex";
        setTimeout(()=>{
            document.getElementById("deleteModal").style.display = "none";
        }, 2000);
        isDisplay = false
        document.body.style.backgroundImage = "url('../Components/Thander.png')";
        city.value = "";
        document.getElementById("load").innerHTML = ""
        document.getElementById("heading").innerText = ""

    }
}