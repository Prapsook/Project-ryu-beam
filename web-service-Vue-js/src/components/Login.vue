<template>
  
<div class="login">
  <h2>Login</h2>
  <form>
    <div class="form-group">
      <label for="email">Username</label>
      <input type="text" class="button-pass-user" placeholder="username" id="username_inp">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="button-pass-user" placeholder="password" id="pass_inp">
    </div>
    <button type="button" class="button-login" data-wait="Please wait..." @click="login" value="เข้าสู่ระบบ">Login</button>
  </form>
</div>

</template>


<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default  {
        data() {
            return {
                name: 'Login.js',
                BACKEND_URL : `http://localhost:8080`
            }
        },
        methods: {
            get(target){ 
                return document.querySelector(target);
            }
            ,login : async function(event) {
                try{

                    let username = this.get(`#username_inp`).value;
                    let password = this.get(`#pass_inp`).value;

                    console.log(username,password);
                    let form = {username , password};

                    console.log("form",form);

                      const responseData = await axios.post("http://localhost:3000/login",form);
                      const getBulk =  responseData.data;
                      console.log("getBulk",getBulk);

                      if(getBulk.status == 1){   
     
                        console.log("getBulk",getBulk);
                        console.log("responseData",responseData);

                        localStorage.setItem("access_token",getBulk.access_token);
                        location.href = location.origin + `/`;    
                    }else{
                      Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด!',
                            text: "รหัสไม่ถูกต้อง",
                            })
                    }


                }catch(error){

                  console.log(error);
    
                }

            }
        }
}
</script>


<style >
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  margin-top: 200px;
}

.login h2 {
  text-align: center;
  color: black;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

 .button-pass-user {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

 .button-login {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
}

.button-login:hover {
  background-color: #0069d9;
}
</style>
