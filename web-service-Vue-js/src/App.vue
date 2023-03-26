<template>
  <v-app>
   <div id="app">

      <!-- <Header />
      <Weather />   -->
      <nav>
    <ul>
      
      <li><RouterLink to="/">Home</RouterLink></li>
      <li  v-if="loggedIn"><button @click="logout()" style="color: red">LOGOUT</button></li>
      <li v-if="loggedIn"><span>User : {{ThisIsAnameForUserNaKrub}}</span></li>
    </ul>
  </nav>

      <RouterView />
   </div>
  </v-app>
</template>

<script>
 import axios from "axios";
 import {privateAPI} from "../src/util/axios.private";
// import Header from './components/Header.vue';
// import Weather from './components/Weather.vue';
// import { RouterLink, RouterView } from 'vue-router'

export default {
  data(){
    return {ThisIsAnameForUserNaKrub : ""}
  },
  mounted(){
    this.getAPI();
  },

  computed: {

    loggedIn() {
      // replace with your authentication system check for logged in state
      if(localStorage.access_token){
        return true; 
      }else{
        return false; 
      }
   
    },
    userName() {
      // replace with your authentication system method for retrieving the user's name
      return 'John Doe'; 
    }
,
   
  },
  methods: {
    async getAPI() {

          try {
            const response = await privateAPI.get(`/get_user_data`);
            this.dataAPI = response.data;
            console.log("User Data",this.dataAPI);
            // this.userName(this.dataAPI.lname);
            this.ThisIsAnameForUserNaKrub = this.dataAPI.lname;
          } catch (error) {
              console.log(error);
          }
    },

    logout(){
        localStorage.setItem("access_token","");
        location.href = location.origin + `/`;    
      },
      }
    };

</script>

<style scoped>
  #app{
    background: url('./assets/img/background-weather.jpg') no-repeat center center fixed;
    background-size: cover;
    text-align: center;
    animation: change 20s infinite none;
  }


  @keyframes change{
    0% {
      background: url('./assets/img/background-weather.jpg') no-repeat center center fixed
    }
    20% {
      background: url('./assets/img/background1.jpg') no-repeat center center fixed
    }
    40% {
      background: url('./assets/img/background2.jpg') no-repeat center center fixed
    }
    60% {
      background: url('./assets/img/background-weather.jpg') no-repeat center center fixed
    }
    80% {
      background: url('./assets/img/background1.jpg') no-repeat center center fixed
    }
    100% {
      background: url('./assets/img/background2.jpg') no-repeat center center fixed
    }
  }

  main{
    margin-top: 100px;
  }

nav {
  background-color: #333;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
    width: 100%;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 20px;
}

li:last-child {
  margin-right: 0;
}

a {
  color: #fff !important;
  text-decoration: none;
}

span {
  color: #fff;
  margin-left: 20px;
}

</style>
