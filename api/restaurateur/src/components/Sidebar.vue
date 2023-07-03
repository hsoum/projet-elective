<template>

      <div class="sidebar">
        <div class="logo-container">
          <img src="" alt="Logo">
        </div>
        <ul class="sidebar-menu">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fas fa-utensils"></i>
              Gérer les articles
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fas fa-bars"></i>
              Gérer les menus
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fas fa-clipboard-list"></i>
              Visualiser les commandes
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fas fa-history"></i>
              Historique des commandes
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fas fa-chart-bar"></i>
              Demander des statistiques
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fas fa-users"></i>
              Parrainer un restaurateur
            </a>
          </li>
        </ul>

  
   
    </div>
  </template>
  
  <style scoped>
  
  
 
.sidebar {
    width: 200px;
    margin-top: 20px;
    margin-left: 30px;
 
  background-color: #fff;
  padding: 20px;
  left: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
  .logo-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sidebar-menu {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar-item {
    margin-bottom: 10px;
  }
  
  .sidebar-link {
    display: flex;
    align-items: center;
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .sidebar-link i {
    margin-right: 10px;
  }
  
  .sidebar-link:hover {
    color: #007bff;
  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  
  @media screen and (max-width: 600px) {
    .page-container {
      flex-direction: column;
    }
  
    .sidebar {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
    }
  }
  </style>
  