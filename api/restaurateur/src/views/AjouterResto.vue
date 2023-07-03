<template>
  <div class="background-image"></div>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Ajouter un restaurant</h1>
      <form @submit.prevent="addRestaurant">
        <div class="form-row">
          <div class="form-column">
            <div class="form-group">
              <label for="name">Nom du restaurant:</label>
              <input type="text" id="name" v-model="name" required>
            </div>
            <div class="form-group">
              <label for="phoneNumber">Numero de telephone :</label>
              <input type="text" id="phoneNumber" v-model="phoneNumber" required>
            </div>
            <div class="form-group">
              <label for="description">Description du restaurant:</label>
              <textarea id="description" v-model="description" rows="5" cols="30"></textarea>
            </div>
          </div>
          <div class="form-column">
            <div class="form-group">
              <label for="photo">Image:</label>
              <input type="file" id="photo" ref="photoInput" accept="image/*" required>
            </div>
          </div>
        </div>
        <button class="btnn" type="submit">Ajouter</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import TheFooter from '@/components/TheFooter.vue'
import Sidebar from '@/components/Sidebar.vue';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default {
  components: {
    TheFooter,
  },
  data() {
    return {
      description: '',
      name: '',
      longitude: '',
      latitude: '',
      phoneNumber: '',
    };
  },
  methods: {
    addRestaurant(event: Event) {


        const storedCoordinates = localStorage.getItem('coordinates');
        if (storedCoordinates) {
          const { lng, lat } = JSON.parse(storedCoordinates);
          this.longitude = lng;
          this.latitude = lat;
        }
        event.preventDefault();
      const photoInput = this.$refs.photoInput as HTMLInputElement | undefined;
      if (photoInput && photoInput.files && photoInput.files.length > 0) {
        const photo = photoInput.files[0];
        const restaurant = new FormData();
        restaurant.append('photo', photo);
        restaurant.append('name', this.name);
        restaurant.append('description', this.description);
        restaurant.append('longitude', this.longitude);
        restaurant.append('latitude', this.latitude);
        restaurant.append('phoneNumber', this.latitude);

 
        const accessToken = this.$cookies.get('accessToken');
        axios.post('http://localhost/resto/restaurant/', restaurant, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
       
          }
        })
        .then(response => {
          alert('Restaurant ajouté avec succès !');
          console.log('Réponse de l\'API:', response.data);
          // Redirection vers la page d'accueil ou autre
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            alert('Erreur lors de l\'ajout du restaurant: ' + error.response.data.error);
          } else {
            alert('Erreur lors de l\'ajout du restaurant. Veuillez réessayer.');
          }
          console.error('Erreur de l\'API:', error.response ? error.response.data.error : 'Erreur inconnue');
        });
      } else {
        alert('Veuillez sélectionner une photo');
      }
    }
  }
};
</script>

  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background-image: url("https://img.freepik.com/premium-vector/food-delivery_24908-48920.jpg?w=2000");
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
  }
  textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  resize: vertical; /* Optional: Allows vertical resizing of the textarea */
}
  .login-card {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 60%; /* ou une autre valeur en pourcentage ou en pixels selon vos besoins */
  margin: 0 auto; /* Ajout de cette propriété */
}

  h1.title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .form {
    display: grid;
    grid-gap: 20px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 2fr));
    grid-gap: 20px;
  }
  
  .form-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
  }
  
  input[type="date"] {
    appearance: none;
  }
  
  .small-text {
    font-size: 12px;
  }
  
  .btnn {
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  @media screen and (max-width: 600px) {
    .login-card {
      padding: 20px;
    }
  }
  </style>
  