import Vue from "vue";
import moment from "moment";

export default Vue.filter("formatDate", function(value) {
  if (value) {
    return moment.utc(String(value)).format("DD/MM/YYYY");
  }
});
