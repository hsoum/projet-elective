<template>
  <div id="app">
    <div id="options">
      <!-- drop down menu of options  -->
      <select v-model="selectedOption" @change="chooseOption(selectedOption)">
        <option v-for="option in options" :key="option.name" :value="option">
          {{ option.name }}
        </option>
      </select>
      <!-- when selected open in editor -->
      <button @click="chooseOption(selectedOption)">Open</button>
    </div>
    <div id="editor" style="height: 1000px;">
      <!-- upload after editing -->
      <button @click="updateComponentData()">Upload</button>
      <button @click="createComponent()">Create new component</button>

    </div>
    <!-- create new component -->
  </div>
</template>
<script>
import loader from "@monaco-editor/loader";
//get file from backend and set it to editor from localhost:2000/component.vue
import axios from "axios";
export default {

  name: "App",
  data() {
    return {
      componentData: null,
      apiBaseUrl: 'http://localhost/devapi/components/',
      options: [],
      editor: null,
      selectedOption: null,
    };
  },

  async mounted() {
    this.fetchOptions();
    loader.init().then((monaco) => {
      const editorOptions = {
        language: "javascript",
        minimap: { enabled: false },
      };

      this.editor = monaco.editor.create(document.getElementById("editor"), editorOptions);

    });

  },
  methods: {
    fetchOptions() {
      axios.get(this.apiBaseUrl)
        .then(response => {
          this.options = response.data;
        })
        .catch(error => {
          console.error(error);
        });

    },
    chooseOption(option) {
      const endpoint = option.name; // Construct the endpoint based on the chosen option
      console.log(endpoint);
      this.fetchComponentData(endpoint);
    },
    fetchComponentData(endpoint) {
      axios.get(this.apiBaseUrl + endpoint)
        .then(response => {
          this.componentData = response.data;
          console.log(this.componentData);
          // Get the editor instance
          this.editor.setValue(this.componentData); // Set the editor content to the component data
        })
        .catch(error => {
          console.error(error);
        });
    },
    //update component data and send it to backend
    updateComponentData() {
      this.componentData = this.editor.getValue(); // Provide an empty string as the default value if this.componentData is undefined or null
      //send just the component data to backend
      const componentContents = {
        componentData: this.componentData
      };
      axios.put(this.apiBaseUrl + "edit/" + this.selectedOption.name, componentContents)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    //create new component
    createComponent() {

      const componentName = prompt("Enter the name of the new component");
      if (componentName) {
        axios.post(this.apiBaseUrl + "create/", { componentName: componentName })
          .then(response => {
            console.log(response);
            this.fetchOptions();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
  },

};
</script>