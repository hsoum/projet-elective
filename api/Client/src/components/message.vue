<template>
    <div>
      <h1>Broadcast Messages</h1>
      <ul>
        <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        messages: [] as { id: number; text: string }[]
      };
    },
    created() {
        axios.get('http://localhost/webs/ws/url') // Replace with the actual URL to fetch the WebSocket URL
  .then(response => {
    const wsUrl = response.data.url; // Assuming the response contains the WebSocket URL
    const connection = new WebSocket(wsUrl);

    connection.onopen = function() {
      console.log('Connected to WebSocket server');
      // Handle the WebSocket connection
    };


    connection.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.messages.push(message);
        console.log('Received message:', message);
      };

  })
  .catch(error => {
    console.error('Failed to fetch WebSocket URL:', error);
  });
  

    }
  });
  </script>