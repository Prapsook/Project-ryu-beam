<template>
    <div class="container">


      <div class="content">
        <v-btn v-if="show" type="submit" color="red" elevation="2" @click="closeBox()">
          Cancel
        </v-btn>
  
        <v-btn v-else type="submit" color="primary" elevation="2" @click="openBox()">
          Start
        </v-btn>
  
        <div class="input-city">
          <v-text-field
            v-if="inputing"
            ref="weatherInput"
            color="primary"
            shaped
            outlined
            v-model="inputText"
            class="custom-label-color"
            label="Input your city"
            placeholder="Enter your city"
            append-icon="X"
            @click:append="clearText()"
            @keyup.enter="getAPI()"
          >
          </v-text-field>
        </div>
  
        <WeatherInfo :dataAPI="dataAPI" :inputText="inputText" />
  
        <h2>Weather in the provinces of Thailand</h2>
        <div class="table-wrapper">
          <table id="weatherTable" class="fl-table">
            <thead>
              <tr>
                <th>City Name</th>
                <th>Country</th>
                <th>Temperature (C)</th>
                <th>Feels Like (C)</th>
                <th>Minimum Temperature (C)</th>
                <th>Maximum Temperature (C)</th>
                <th>Pressure</th>
                <th>Humidity</th>
                <th>Wind Speed</th>
                <th>Wind Degree</th>
                <th>Cloudiness</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import WeatherInfo from "./WeatherInfo.vue";
  export default {
    name: "Weather",
    components: { WeatherInfo },
    mounted() {
      this.getDataBulk();

       this.checkLocalStorage();
  
    },
    data() {
      return {
        show: false,
        alertBox: "alertBox",
        inputing: false,
        inputText: "",
        dataAPI: null,
        key: "c4e7b399b485192946342267e9f1dfa9",
        rules: {
          name: [(val) => (val || "").length > 0 || "This field is required"],
        },
      };
    },
    methods: {
      clearText() {
        this.inputText = "";
        this.$refs.weatherInput.focus();
      },

  
  
      showToastMessage() {
        const app = document.getElementById("app");
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.style.animation = "";
        toast.innerHTML = `
                      <img class="toast-icon" src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/58/000000/external-alert-emergencies-set-sbts2018-outline-color-sbts2018.png"/>
                      
                      <div class="toast-message">
                              <h3>Danger</h3>
                              <h5>There's not have any city</h5>
                      </div>
                  `;
        app.appendChild(toast);
  
        setTimeout(() => {
          app.removeChild(toast);
        }, 3000);
      },
  
      closeBox() {
        this.inputing = false;
        this.show = !this.show;
      },
  
      openBox() {
        this.inputing = true;
        this.show = !this.show;
      },
  
      async getAPI() {
        if (this.inputText == "") {
          this.showToastMessage();
          this.$refs.weatherInput.focus();
        } else {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${this.inputText}&appid=a127cfb99db6554f471efc165a9eece4`
            );
            this.dataAPI = response.data;
            this.inputText = "";
          } catch (error) {
            this.showToastMessage();
            this.inputText = "";
          }
        }
      },

  async checkLocalStorage(){

      if(localStorage.access_token){
        console.warn("localStorage IS HERE",localStorage.access_token);
      }else{
        location.href = location.origin + `/login`;    
      }

        
  }
      ,
  
      async getDataBulk() {
        try {
          const response = await axios.get("http://178.128.30.60:3000/weather_data");
          const getBulk = response.data;
          const tableBody = document.querySelector("#weatherTable tbody");
          getBulk.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.sys.country}</td>
                        <td>${(item.main.temp - 273).toFixed(2)}</td>
                        <td>${(item.main.feels_like - 273).toFixed(2)}</td>
                        <td>${(item.main.temp_min - 273).toFixed(2)}</td>
                        <td>${(item.main.temp_max - 273).toFixed(2)}</td>
                        <td>${item.main.pressure}</td>
                        <td>${item.main.humidity}</td>
                        <td>${item.wind.speed}</td>
                        <td>${item.wind.deg}</td>
                        <td>${item.clouds.all}</td>
    `;
            tableBody.appendChild(row);
          });
          console.log("getBulk->", getBulk);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      },
      data() {
        return {
          tableData: [],
        };
      },
    },
  };
  </script>
  
  <style>
  .down-arrow {
    fill: var(--white-color);
  }
  
  .custom-label-color input {
    color: var(--white-color) !important;
  }
  .input-city {
    margin-top: 20px;
  }
  .container {
    margin: 0 auto;
    position: relative;
  }
  
  .content {
    margin: 0 auto;
    width: 1200px;
  }
  
  /* toast  */
  .toast {
    background-color: #ff4949;
    position: absolute;
    top: 20px;
    right: 10px;
    border-radius: 15px;
    height: 60px;
    width: 250px;
    display: flex;
    align-items: center;
    animation: slideIn ease 1.5s, fadeOut linear 1s 3s;
    box-shadow: -1px 2px 10px 0px rgba(0, 0, 0, 0.75);
  }
  
  .toast-message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: var(--white-color);
  }
  
  .toast-icon {
    height: 30px;
    padding: 0 10px;
  }
  
  @keyframes slideIn {
    from {
      right: -40px;
      opacity: 0;
    }
    to {
      right: 10px;
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
  
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  body {
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    background: rgba(71, 147, 227, 1);
  }
  h2 {
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    padding: 30px 0;
  }
  
  /* Table Styles */
  
  .table-wrapper {
    margin-bottom: 100px !important;
    box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
  }
  
  .fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
  }
  
  .fl-table td,
  .fl-table th {
    text-align: center;
    /* padding: 20px; */
  }
  
  .fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 14px;
  }
  
  .fl-table thead th {
    color: #ffffff;
    background: #4fc3a1;
  }
  
  .fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
  }
  
  .fl-table tr:nth-child(even) {
    background: #f8f8f8;
  }
  
  /* Responsive */
  
  @media (max-width: 767px) {
    .fl-table {
      display: block;
      width: 100%;
    }
    .table-wrapper:before {
      content: "Scroll horizontally >";
      display: block;
      text-align: right;
      font-size: 11px;
      color: white;
      padding: 0 0 10px;
    }
    .fl-table thead,
    .fl-table tbody,
    .fl-table thead th {
      display: block;
    }
    .fl-table thead th:last-child {
      border-bottom: none;
    }
    .fl-table thead {
      float: left;
    }
    .fl-table tbody {
      width: auto;
      position: relative;
      overflow-x: auto;
    }
    .fl-table td,
    .fl-table th {
      padding: 20px 0.625em 0.625em 0.625em;
      height: 60px;
      vertical-align: middle;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      width: 120px;
      font-size: 13px;
      text-overflow: ellipsis;
    }
    .fl-table thead th {
      text-align: left;
      border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
      display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
      background: none;
    }
    .fl-table tr:nth-child(even) {
      background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
      background: #f8f8f8;
      border-right: 1px solid #e6e4e4;
    }
    .fl-table tr td:nth-child(even) {
      border-right: 1px solid #e6e4e4;
    }
    .fl-table tbody td {
      display: block;
      text-align: center;
    }
  }
  </style>
  