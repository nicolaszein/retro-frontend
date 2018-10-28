import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

const requireFilters = require.context(
  // The relative path of the filters folder
  "@/filters",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base filter filenames
  /.(js)$/
);

/* require filters */
requireFilters.keys().forEach(fileName => {
  fileName = fileName.replace("./", "/");
  require("@/filters" + fileName);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
