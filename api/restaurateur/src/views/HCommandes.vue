<template>
  <div class="sidebar-layout">
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="card">
      <h1 class="title">Historique des commandes</h1>

      <div class="search-container">
        <button class="search-button">
          <i class="fa fa-search"></i>
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom du client</th>
              <th>Articles</th>
              <th>Menu</th>
              <th>Prix total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td>{{ order.customerId }}</td>
              <td>
                <ul>
                  <li v-for="article in order.articles" :key="article">{{ article }}</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for="menu in order.menus" :key="menu">{{ menu }}</li>
                </ul>
              </td>
              <td>{{ order.totalPrice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    Sidebar,
  },
  data() {
    return {
      newItem: {
        customerId: '',
        articleIds: '',
        menus: '',
        totalPrice: '',
      },
      orders: [] as any[],
      modalOpen: false,
    };
  },
  created() {
    this.fetchMenus();
  },
  methods: {
    async fetchMenus() {
      const accessToken = this.$cookies.get('accessToken');
      try {
        const response = await axios.get('http://localhost/resto/restaurant/order', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.orders = response.data.orders;
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
        this.orders.push(response.data.menu);
        this.newItem = {
          customerId: '',
          articleIds: '',
          menus: '',
          totalPrice: '',
        };
        this.closeModal();
      } catch (error) {
        console.error(error);
      }
    },
    editMenu(menu: any) {
      // Met en place la logique pour modifier un menu
    },
    deleteMenu(menuId: string) {
      // Met en place la logique pour supprimer un menu
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
</style>