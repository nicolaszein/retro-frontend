<template>
  <v-navigation-drawer permanent dark absolute floating>
    <v-list dense>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="linkTo(item.link)"
        class="side-bar-item"
        v-bind:class="{ 'side-bar-item--active': isActive(item.link) }"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    items: Array
  },
  methods: {
    linkTo: function(route) {
      this.$router.push(route);
    },

    isActive: function(route) {
      return this.$route.path === route;
    }
  }
};
</script>

<style lang="scss" scoped>
.side-bar-item {
  &--active {
    background: rgba(255, 255, 255, 0.08);
  }
}
</style>
