//runs the function as soon as the pages loads.
window.addEventListener("load", () => {
  let long; //longitiude variable
  let lat; //latitude variable
  let timezone = document.querySelector(".timezone");
  let icon = document.getElementById("icon");
  let temperature = document.querySelector(".temperature");
  let tempDescription = document.querySelector(".desc");
  let tempDegree = document.querySelector(".degree");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      //gets the current position
      //console.log(position);             //to check the object we have to use with position variable
      long = position.coords.longitude; //storing the longitude coordinate with postion variable
      lat = position.coords.latitude; //storing the latitude coordinate with postion variable
      const api = `http://api.weatherunlocked.com/api/current/${lat},${long}?app_id=8c2ac397&app_key=87faee7fcabf9f6d59e9823795463b06`; //weather api
      fetch(api)
        .then(response => {
          return response.json(); //to get respons ein JSON format
        })
        .then(data => {
          //console.log(data);
          const { temp_c, temp_f, wx_desc } = data; //fetching data from the api
          var { wx_icon } = data;
          temperature.textContent = temp_c; //setting temperature field
          tempDescription.textContent = wx_desc + "," + wx_icon.slice(0, -4); //setting description field
          wx_icon = wx_icon.slice(0, -4);
          wx_icon = wx_icon + ".png";
          icon.setAttribute("src", `./icons/${wx_icon}`); //fetching icon from directory based on the fetched name
          icon.setAttribute("alt", wx_icon.slice(0, -4));
          timezone.textContent = lat + "," + long; //setting the coordinates(timezone) field
        });
    });
  }
});
