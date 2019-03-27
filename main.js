window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let tempSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/ea0130e937e2afe0fd2173000bee6036/${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                const timezone = data.timezone;
                 //forumula  for celcius
                 let celcius = (temperature - 12) * ( 5 / 9);
                // html elements from darksky api
                temperatureDegree.textContent =  Math.floor(celcius) + "°C";
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = timezone;
                //seticon
                setIcons(icon, document.querySelector(".icon"));
                //CHANGE TO CELCIUS
                degreeSection.addEventListener('click', () => {
                    if (tempSpan.textContent === "°F"){
                        tempSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    }else {
                        tempSpan.textContent = "°F";
                        temperatureDegree.textContent = temperature
                    }
                })
            })
        })

       
        
    }else {
        h1.textContent = "Please allow location for this to work";
    }


    function setIcons(icon, iconID){
        const skycons = new Skycons ({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
})