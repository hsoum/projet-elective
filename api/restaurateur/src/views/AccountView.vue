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
            <input type="email" id="email" v-model="email"  required>
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


export default {
  components: {
    TheFooter,
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    login() {
      // Envoyer les données de connexion au back-end
      const loginData = {
        email: this.email,
        password: this.password,
      };



      axios.post('http://localhost/resto/auth/login', loginData)
        .then(response => {
          // Traiter la réponse du back-end
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          
          

          // Stocker le jeton d'accès dans le stockage local (localStorage)
          localStorage.setItem('accessToken', accessToken);
        
         this.$cookies.set('accessToken', accessToken);
         
           
         localStorage.setItem('refreshToken', refreshToken);
        
        this.$cookies.set('refreshToken', refreshToken);

          // Rediriger vers la page d'accueil ou autre
          this.$router.push('/');
          
          console.log(accessToken);
        })
        .catch(error => {
    if (error.response && error.response.data && error.response.data.message) {
      // Afficher le message d'erreur renvoyé par l'API
      alert('Erreur lors de la connexion ' + error.response.data.message);
    } else {
      alert('Erreur lors de la connexion du compte. Veuillez réessayer.');
    }
    console.error('Erreur de l\'API:', error.response ? error.response.data.message : 'Erreur inconnue');
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
