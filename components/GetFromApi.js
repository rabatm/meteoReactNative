const GetFromApi = () => {
    const apiKey ='850f27fce52c74a592c8106cd088d0a6';
    const city='PERPIGNAN'

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
        .catch((error) => {
          return(error);
        });
    }

    export default GetFromApi;


/*
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${json[0].lat}&lon=${json[0].lon}&appid=${apiKey}&units=metric&lang=fr`)
    .then((res) => res.json())
    .then((meteo) => {
      return (meteo)
    })
    .catch((error) => {
      return(error);
    });*/