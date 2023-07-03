<template>
  <div class="sidebar-layout">
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="card">
                
      <button class="add-button" @click="showModal = true; editMode = false; clearFormData()">Ajouter un article</button>

     
      <h1 class="title">Vos articles</h1>

      <div class="search-container">
        <input type="text" v-model="filter" placeholder="Filtrer par nom" class="search-input">
        <button class="search-button">
          <i class="fa fa-search"></i>
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Prix</th>
              <th>Photo</th>
              <th>Restaurant </th>
              <th>editer</th>
              <th>Suprimmer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.photo }}</td>
              <td>{{ item.restaurant_id }}</td>
              <td>
                <button @click="editItem(item)" class="action-button edit-button">
  <i class="fa fa-edit"></i> Editer
</button>
                </td>
              <td>
                <button class="action-button delete-button">
                  <i class="fa fa-trash"></i> Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal" :class="{ active: showModal }">
        <div class="modal-content">
          <h2>{{ editMode ? 'Editer' : 'Ajouter' }} Article</h2>

          <label>Nom:</label>
          <input type="text" v-model="name">
          <label>Description:</label>
          <input type="text" v-model="description">
          <label>Type:</label>
          <select v-model="type" class="type-dropdown">
            <option value="boisson">Boisson</option>
            <option value="sandwich">Sandwich</option>
            <option value="plat">Plat</option>
          </select>
          <label  for="photo">Images</label>
          <input ref="photoInput" type="file"  accept="image/*" required id="photo">
          <label>Prix:</label>
          <input type="text" v-model="price">
          <select v-model="restaurant_id" id="restaurant" required>
                <option value="">Select Restaurant</option>
                <option v-for="restaurant in restaurants" :key="restaurant._id" :value="restaurant._id">
                  {{ restaurant.name }}
                </option>
              </select>
              
          <div class="button-container">
            <button @click="addItem" class="save-button">{{ editMode ? 'Editer' : 'Ajouter' }}</button>
           
            <button @click="cancelEdit" class="cancel-button">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import TheFooter from '@/components/TheFooter.vue'
import axios from 'axios';


interface Restaurant {
  _id: string;
  name: string;
}
interface Item {
  _id: string;
  name: string;
  type: string;
  price: number;
  photo: string;
  restaurant_id: string;
  

}
interface Article {
  _id: string;
  name: string;
  type: string;
  price: number;
  photo: string;
  restaurant_id: string;
}







export default defineComponent({
  components: {
    Sidebar,
  },
  data() {
    return {
      items: [] as Item[], // Données du tableau
      filter: '', // Valeur du filtre
      currentPage: 1, // Page courante
      pageSize: 5, // Nombre d'éléments par page
      showModal: false, // Affichage du formulaire
      editMode: false, // Mode édition
      name:'',
      type:'',
      restaurant_id:'',
      price:'',
      description:'',

      formData: {
        _id: '',
        name: '',
        type: '',
        price: 0,
        photo: '',
        restaurant_id: '',
      } as Item,
      restaurants: [] as Restaurant[],
    };
  },

  mounted() {
    this.fetchItems();
    this.fetchArticles();
  },
  

  methods: {

    editItem(item:Article) {
  this.formData = { ...item };
  this.showModal = true;
  this.editMode = true;
},



    addItem(event: Event) {


      event.preventDefault();
      const photoInput = this.$refs.photoInput as HTMLInputElement | undefined;
      if (photoInput && photoInput.files && photoInput.files.length > 0) {
        const photo = photoInput.files[0];
const article = new FormData();
article.append('photo', photo);
article.append('name', this.name);
article.append('restaurant_id', this.restaurant_id);
article.append('type', this.type);
article.append('price', this.price);
article.append('description', this.description);

const accessToken = this.$cookies.get('accessToken');
axios.post('http://localhost/resto/api/articles/', article, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data',
  },
})
  .then(response => {
    // Handle the response if needed
  })
  .catch(error => {
    // Handle the error if needed
  });
      }

  // Réinitialisez les données du formulaire et fermez le modal
  this.formData = {
    _id: '',
    name: '',
    type: '',
    price: 0,
    photo: '',
    restaurant_id: '',
  };
  this.showModal = false;
},

    clearFormData() {
  this.formData = {
    _id: '',
    name: '',
    type: '',
    price: 0,
    photo: '',
    restaurant_id: '',
  };
},
    fetchItems() {
      const accessToken = this.$cookies.get('accessToken');
      axios
        .get('http://localhost/resto/api/articles', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data); // Vérifiez la structure des données de réponse
          this.items = response.data.articles;
        })
        .catch((error) => {
          console.error(error);
        });
    },


    async fetchArticles() {
      const accessToken = this.$cookies.get('accessToken');
      try {
        const responseRestaurants = await axios.get('http://localhost/resto/restaurant/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (Array.isArray(responseRestaurants.data.restaurants)) {
            this.restaurants = responseRestaurants.data.restaurants;
          }
      } catch (error) {
        console.error(error);
      }
    },
    

    
    saveItem() {
      if (this.editMode) {
        // Logique pour l'édition d'un article
        // Utilisez this.formData pour accéder aux données de l'article à éditer
        // Faites une requête API appropriée pour mettre à jour l'article
      } else {
        // Logique pour l'ajout d'un nouvel article
        // Utilisez this.formData pour accéder aux données du nouvel article
        // Faites une requête API appropriée pour ajouter le nouvel article
      }

      // Réinitialiser les données du formulaire et fermer le modal
      this.formData = {
        _id: '',
        name: '',
        type: '',
        price: 0,
        photo: '',
        restaurant_id: '',
      };
      this.showModal = false;
    },

    cancelEdit() {
  this.clearFormData(); // Réinitialise les données du formulaire
  this.showModal = false; // Ferme le modal
},


    prevPage(): void {
      // Aller à la page précédente
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
});
</script>
<style scoped>
.sidebar-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
}

.card {
  width: 80%;
  max-width: 800px;
  padding: 20px;
  overflow: auto;

  margin-left: 200px;
  max-height: 500px; /* Ajustez cette valeur selon vos besoins */
  overflow-y: auto; /* Permet le défilement vertical si nécessaire */
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
}
.add-button {
  padding: 12px 24px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #3377b3;
}
.title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  padding: 8px;
  background-color: #4caf50;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
}

.search-button i {
  color: white;
}

.table-container {

  /* Modifier cette valeur selon vos besoins */
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}

.action-button {
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
  margin-right: 5px;
}
.type-dropdown {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
}
.edit-button {
  background-color: #4a90e2;
}

.delete-button {
  background-color: #e24a4a;
}

.action-button i {
  margin-right: 5px;
}

.pagination {
  margin-top: 10px;
  text-align: center;
}

.prev-button,
.next-button {
  padding: 8px 16px;
  background-color: #4caf50;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
}

.prev-button:hover,
.next-button:hover {
  background-color: #45a049;
}

.prev-button:disabled,
.next-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
}

.active {
  display: block;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.save-button,
.cancel-button {
  padding: 8px 16px;
  background-color: #4caf50;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.save-button:hover,
.cancel-button:hover {
  background-color: #45a049;
}
</style>
