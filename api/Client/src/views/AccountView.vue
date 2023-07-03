<template>
  <div class="login-container">
    <div class="image-container">
      <img src="https://img.freepik.com/premium-vector/food-delivery_24908-48920.jpg?w=2000" alt="Image de connexion">
    </div>
    <div class="login-card">
      <div class="form-container">
        <h1 class="title">Connexion</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Adresse e-mail:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button class="btnn" type="submit">Se connecter</button>
        </form>
        <br>
       <RouterLink to="/CreateAccount">

        <button class="btnc" type="submit">Creer un compte</button>

       </RouterLink> 
      
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TheFooter from '@/components/TheFooter.vue'
import axios from 'axios';

import jwt_decode from 'jwt-decode';


export default {
  components: {
    TheFooter,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ''
    };
  },
  methods: {

    
    login() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;

            // Include the latitude and longitude in the login request
            const loginData = {
              email: this.email,
              password: this.password,
              latitude,
              longitude,
            };




            
            axios.post('http://localhost/app/auth/login', loginData)
              .then((response) => {
                const accessToken = response.data.accessToken;
                this.$cookies.set('accessToken', accessToken);

                const decodedToken = jwt_decode(accessToken) as { userId: number };
                const userId = decodedToken.userId;
                console.log('ID:',userId)
                  
                axios.post('http://localhost/webs/connection', {
                userId: userId// Replace with the actual user ID
                 })
                  .then(response => {
                    console.log('Connected to WebSocket server');
                  const rsp = axios.post(`http://localhost/webs/ws/commande/post`, {
                    customerId: userId,
                    orderId: 2
                  });
                  rsp
                    .then(AxiosRsp => {
                      console.log(AxiosRsp.data.message)
                    })
                    .catch(error => {
                      return `unexpected catche error`
                    });

                  })
                  .catch(error => {
                    console.error('Failed to connect to WebSocket server:', error);
                  });
                // Handle the response from the server
               
                const refreshToken = response.data.refreshToken;

                // Store the access token in local storage
                localStorage.setItem('accessToken', accessToken);
 
                
                // Store the refresh token in local storage
                localStorage.setItem('refreshToken', refreshToken);
                this.$cookies.set('refreshToken', refreshToken);

                // Redirect to the home page or other page
                this.$router.push('/');

                console.log(accessToken);
              })
              .catch((error) => {
                // Handle any error that occurs during the request
                if (error.response) {
                  // The server responded with an error code
                  this.errorMessage = error.response.data.message;
                } else if (error.request) {
                  // The request did not receive a response
                  this.errorMessage = 'Error connecting to the server';
                } else {
                  // An error occurred during the request
                  this.errorMessage = 'Error during login';
                }
              });
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.log("Geolocation is not supported");
      }
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.image-container {
  position: absolute;
  top: 100px;
  left: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-card {
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-left: 50%;
  width: 400px; /* Ajustez la largeur selon vos besoins */

}

h1.title {
  text-align: center; /* Centre le titre */
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}



input {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  
}

.btnn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
}
.btnc {
  padding: 10px 20px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
}
</style>
