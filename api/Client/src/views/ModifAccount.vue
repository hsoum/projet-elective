<template>
    <div class="login-container">
      <div class="image-container">
        <img src="https://img.freepik.com/premium-vector/food-delivery_24908-48920.jpg?w=2000" alt="Image de connexion">
      </div>
      <div class="login-card">
        <div class="form-container">
          <h1 class="title">Modifier le compte</h1>
          <form @submit.prevent="EDIT">
  
            <div class="form-group">
              <label for="firstName">Prénom:</label>
              <input type="text" id="firstName" v-model="FirstName" required>
            </div>
            <div class="form-group">
              <label for="lastName">Nom:</label>
              <input type="text" id="lastName" v-model="LastName" required>
            </div>
            <div class="form-group">
              <label for="address">Numero de telephone:</label>
              <input type="tel" id="phoneNumber" placeholder="0561-35-85-63"  pattern="[0-9]{10}" v-model="phoneNumber" required>
              <small>Format: 0561358563</small><br><br>
            </div>
            <div class="form-group">
              <label for="username">Nom d'utilisateur:</label>
              <input type="text" id="username" v-model="username" required>
            </div>
            <div class="form-group">
              <label for="username">Date de naissance:</label>
              <input type="date" id="birthDate" v-model="birthDate" required>
            </div>
            <div class="form-group">
              <label for="email">Adresse e-mail:</label>
              <input type="email" id="email" v-model="email" required>
            </div>
  
            <div class="form-group">
              <label for="password">Mot de passe:</label>
              <input type="password" id="password" v-model="password" required>
            </div>
            <button class="btnn" type="submit">Modiffier votre compte</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import TheFooter from '@/components/TheFooter.vue'
  
  import jwt_decode from 'jwt-decode';

  
  import axios from 'axios';
  
  
  export default {
    components: {
      TheFooter,
    },
    data() {
      return {
        email: '',
        password: '',
        phoneNumber: '',
        FirstName: '',
        LastName: '',
        username: '',
        birthDate : '',
   
      };
    },
  
    methods: {
  EDIT() {
    const accessToken = this.$cookies.get('accessToken');
   
  // Décoder le JWT pour obtenir les informations
  const decodedToken = jwt_decode(accessToken) as { userId: number };


// Obtient l'identi fiant de l'utilisateur à partir du JWT
  const userId = decodedToken.userId;
// Obtient l'identifiant de l'utilisateur

console.log(userId)


axios.put('http://localhost/app/users/' + userId, this.$data,{ // Pass the 'data' property as the second argument
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
    })
    .then(response => {
    alert('Compte Modifié avec succès !');
    console.log('Réponse de l\'API:', response.data);
    // Redirection vers la page d'accueil ou autre
  })
  .catch(error => {
    if (error.response && error.response.data && error.response.data.error) {
      alert('Erreur lors de la modification du compte: ' + error.response.data.error);
    } else {
      alert('Erreur lors de la modification du compte. Veuillez réessayer.');
    }
    console.error('Erreur de l\'API:', error.response ? error.response.data.error : 'Erreur inconnue');
  });
  }
}
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
  </style>
  
  