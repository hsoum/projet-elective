<template>
  <div>
    
    <table class="menu-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Restaurant ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="menu in menus" :key="menu._id">
          <td>{{ menu.title }}</td>
          <td>{{ menu.description }}</td>
          <td>{{ menu.price }}</td>
          <td>{{ menu.restaurant_id }}</td>
          <td>
            <button @click="editMenu(menu)" class="edit-button">Edit</button>
            <button @click="deleteMenu(menu._id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="add-menu">
      <h3>Add New Menu</h3>
      <button @click="openModal" class="add-button">Add Menu</button>
      <div v-if="modalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <form @submit.prevent="addMenu">
            <div class="form-group">
              <label for="title">Title:</label>
              <input v-model="newItem.title" type="text" id="title" placeholder="Title" required>
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <input v-model="newItem.description" type="text" id="description" placeholder="Description" required>
            </div>
            <div class="form-group">
              <label for="price">Price:</label>
              <input v-model="newItem.price" type="number" id="price" placeholder="Price" required>
            </div>
            <div class="form-group">
              <label for="restaurant">Restaurant:</label>
              <select v-model="newItem.restaurant_id" id="restaurant" required>
                <option value="">Select Restaurant</option>
                <option v-for="restaurant in restaurants" :key="restaurant._id" :value="restaurant._id">
                  {{ restaurant.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="articleIds">Article IDs:</label>
              <select v-model="newItem.articleIds" id="articleIds" multiple required>
                <option value="">Select Articles</option>
                <option v-for="article in articles" :key="article._id" :value="article._id">
                  {{ article.name }}
                </option>
              </select>
            </div>
            <button type="submit" class="add-button">Add Menu</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.menu-table {
  width: 100%;
  border-collapse: collapse;
}

.menu-table th, .menu-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.edit-button, .delete-button, .add-button {
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  margin-left: 5px;
}

.add-menu {
  margin-top: 20px;
}

.add-menu .add-button {
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #008CBA;
  color: white;
  border: none;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Restaurant {
  _id: string;
  name: string;
}

interface Article  {
  _id: string;
  name: string;
}

export default defineComponent({
  data() {
    return {
      newItem: {
        title: '',
        description: '',
        price: 0,
        restaurant_id: '',
        articleIds: '',
      },
      restaurants: [] as Restaurant[],
      articles: [] as Article[],
      menus: [] as any[],
      modalOpen: false,
    };
  },
  created() {
    this.fetchMenus();
    this.fetchArticles(); 
  },
  methods: {
    async fetchMenus() {
      const accessToken = this.$cookies.get('accessToken');
      try {
        const response = await axios.get('http://localhost/resto/api/menus/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.menus = response.data.menus;

        // Récupérer la liste des restaurants
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
    async fetchArticles() {
      const accessToken = this.$cookies.get('accessToken');
      try {
        const response = await axios.get('http://localhost/resto/api/articles/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (Array.isArray(response.data.articles)) {
          this.articles = response.data.articles;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async addMenu() {
      const accessToken = this.$cookies.get('accessToken');
      try {
        const response = await axios.post('http://localhost/resto/api/menus/', this.newItem, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.menus.push(response.data.menu);
        this.newItem = {
          title: '',
          description: '',
          price: 0,
          restaurant_id: '',
          articleIds: '',
        };
        this.closeModal();
      } catch (error) {
        console.error(error);
      }
    },
    editMenu(menu: any) {
      // Mettez en place la logique pour modifier un menu
    },
    deleteMenu(menuId: string) {
      // Mettez en place la logique pour supprimer un menu
    },
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
  },
});
</script>
