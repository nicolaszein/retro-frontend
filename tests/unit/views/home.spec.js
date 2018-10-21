import Home from "@/views/Home.vue";
import Vue from "vue";

describe("Home", () => {
  it("should match the snapshot", () => {
    const Constructor = Vue.extend(Home);
    const wrapper = new Constructor().$mount();

    expect(wrapper.$el).toMatchSnapshot();
  });
});
