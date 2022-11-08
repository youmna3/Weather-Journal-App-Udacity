/* Global Variables */
const apiKey = "f1d3260bfc47846225a10b38eb15583b";
const btn = document.querySelector("#generate");
btn.addEventListener("click", function () {
  try {
    const zipCode = document.querySelector("#zip").value;
    const userResponse = document.querySelector("#feelings").value;
    if (!zipCode) {
      alert("enter your zip code");
      return;
    }
    getWeather(zipCode).then((tempDegree) => {
      postData(tempDegree, userResponse, newDate).then(() => {
        updateUI();
      });
    });
  } catch (error) {
    console.log("error");
  }
});

const getWeather = async (zipCode, key) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
  const res = await fetch(baseUrl);
  const tempDegree = await res.json();

  console.log(tempDegree.main.temp);
  return tempDegree.main.temp;
};
const getData = async () => {
  const getDataRoute = await fetch("/getData");
  try {
    //convert json to JS
    const data = await getDataRoute.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log("errrr");
  }
};

const postData = async (tempDegree, userResponse, newDate) => {
  const postRoute = await fetch("/postData", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      temp: tempDegree,
      content: userResponse,
      date: newDate,
    }),
  });
};
const updateUI = async () => {
  //use fetch to get data from server
  // use url from GET route
  const dataToUpdateUi = await fetch("/getData");
  try {
    //convert data from json
    const convertData = await dataToUpdateUi.json();
    console.log(convertData);
    document.querySelector("#temp").innerHTML = convertData.temp;
    document.querySelector("#date").innerHTML = convertData.date;
    document.querySelector("#content").innerHTML = convertData.content;
  } catch (err) {
    console.log("errrrrr");
  }
};
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
