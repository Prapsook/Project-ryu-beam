const route = require("express")();
const e = require("express");
const { response } = require("express");
const TokenManager = require("./token_manager");
const bodyParser = require('body-parser');
const http = require('http');

route.use(require("cors")());
route.use(require("express").json());
route.use(bodyParser.urlencoded({ extended: false }));

const LoginAPI = require("../controller/LoginUser");
const WeatherDataAPI = require("../controller/WeatherData");

route.get("/",(req,res)=>{
    res.send("hello");
})
    // Login API
    route.get("/get_user_data",LoginAPI.GetDataUser);
    route.post("/login",LoginAPI.LoginUser);
    route.post("/check_authen",LoginAPI.CheckToken);
    //

     // WeatherData API
    route.get("/weather_data",WeatherDataAPI.getWeatherForCities)


route.listen(3000,(err)=>{
    console.log("server started !!!");
})