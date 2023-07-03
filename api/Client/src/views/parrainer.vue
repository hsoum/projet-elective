<template>
    <div class="sidebar-layout">

      <div class="card">
                  
        <button class="add-button" @click="showModal = true">
          <i class="fa fa-plus"></i> Ajouter un code de parrainage
        </button>
        <h1 class="title">Vos parrainages</h1>
  
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
                <th>Prenoms</th>
                <th>Date</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.note }}</td>
                <td>
                  <button @click="editItem(item)" class="action-button edit-button">
                    <i class="fa fa-edit"></i> Editer
                  </button>
                  <button @click="deleteItem(item)" class="action-button delete-button">
                    <i class="fa fa-trash"></i> Supprimer
                  </button>
                </td>
              </tr>
              
            </tbody>
          </table>
  
          <div class="pagination">
            <button class="prev-button" @click="prevPage" :disabled="currentPage === 1">
              Précédent
            </button>
            <span>{{ currentPage }}</span>
            <button class="next-button" @click="nextPage" :disabled="currentPage === totalPages">
              Suivant
            </button>
          </div>
        </div>
  
        <div class="modal" :class="{ active: showModal }">
          <div class="modal-content">
            <h2>{{ editMode ? 'Editer' : 'Ajouter' }} Article</h2>
            <label>Code parainnage:</label>
            <input type="text" v-model="formData.name">
  
            <div class="button-container">
              <button @click="saveItem" class="save-button">
                {{ editMode ? 'Mettre à jour' : 'Ajouter' }}
              </button>
              <button @click="cancelEdit" class="cancel-button">Annuler</button>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';

  interface Item {
    id: number;
    name: string;
    type: string;
    price: number;
    note: string;
  }
  
  export default defineComponent({

    data() {
      return {
        items: [] as Item[], // Données du tableau
        filter: '', // Valeur du filtre
        currentPage: 1, // Page courante
        pageSize: 5, // Nombre d'éléments par page
        showModal: false, // Affichage du formulaire
        editMode: false, // Mode édition
        formData: {
          id: 0,
          name: '',
          type: '',
          price: 0,
          note: ''
        } as Item
      };
    },
    computed: {
      filteredItems(): Item[] {
        // Filtrer les éléments par nom
        return this.items.filter(item =>
          item.name.toLowerCase().includes(this.filter.toLowerCase())
        );
      },
      totalPages(): number {
        // Calculer le nombre total de pages
        return Math.ceil(this.filteredItems.length / this.pageSize);
      }
    },
    methods: {
      editItem(item: Item): void {
        // Mettre à jour les données du formulaire en mode édition
        this.editMode = true;
        this.formData = { ...item };
        this.showModal = true;
      },
      deleteItem(item: Item): void {
        // Supprimer un élément du tableau
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
      },
      saveItem(): void {
        if (this.editMode) {
          // Mettre à jour un élément existant
          const existingItem = this.items.find(item => item.id === this.formData.id);
          if (existingItem) {
            existingItem.name = this.formData.name;
            existingItem.type = this.formData.type;
            existingItem.price = this.formData.price;
            existingItem.note = this.formData.note;
          }
        } else {
          // Ajouter un nouvel élément
          const newItem: Item = {
            id: Date.now(),
            name: this.formData.name,
            type: this.formData.type,
            price: this.formData.price,
            note: this.formData.note
          };
          this.items.push(newItem);
        }
  
        this.cancelEdit();
      },
      cancelEdit(): void {
        // Réinitialiser le formulaire et fermer la fenêtre modale
        this.editMode = false;
        this.formData = { id: 0, name: '', type: '', price: 0, note: '' };
        this.showModal = false;
      },
      prevPage(): void {
        // Aller à la page précédente
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage(): void {
        // Aller à la page suivante
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    }
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
  