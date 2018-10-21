<template>
  <div id="app">
    <v-container class="main-container" fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 md2>
          <SideBar :items=items />
        </v-flex>
        <v-flex class="router-container" d-flex xs12 md10>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import "./assets/css/main.scss";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar
  },
  data() {
    return {
      items: [
        { title: "Home", icon: "dashboard", link: "/" },
        { title: "Times", icon: "group", link: "/times" }
      ]
    };
  }
};
</script>
