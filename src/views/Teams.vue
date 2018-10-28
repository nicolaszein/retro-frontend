<template>
  <div>
    <v-layout row wrap>
      <v-flex d-flex xs12 md10>
        <div class="display-1 font-weight-light">
          Times
        </div>
      </v-flex>
      <v-flex d-flex xs12 md2 class="text-xs-right">
        <v-btn outline color="blue" :disabled="showModal" @click="openModal()">
          <v-icon>
            add
          </v-icon>
          Novo Time
        </v-btn>
      </v-flex>
    </v-layout>


    <v-list>
      <v-list-tile v-for="team in teams" :key="team.name" @click="teamDetails(team.id)">
        <v-list-tile-action>
          <v-icon>group_work</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title v-text="team.name"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">
              add
            </v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <CreateTeam @canceled="closeModal()" @onSuccess="appendTeam" :showModal="showModal" />
  </div>
</template>

<script>
  import axios from "@/api";
  import CreateTeam from "@/components/modals/CreateTeam.vue"

  export default {
    name: "teams",
    components: {
      CreateTeam
    },
    methods: {
      openModal: function() {
        this.showModal = true;
      },

      closeModal: function() {
        this.showModal = false;
      },

      appendTeam: function(team) {
        this.teams.push(team);
        this.closeModal();
      },

      teamDetails: function(id) {
        this.$router.push(`/times/${id}`);
      },

      fetchTeams: function() {
        axios.get(`/teams`).then(response => {
          this.teams = response.data.data;
        }).catch(error => {
          console.log(error);
        });
      },
    },

    data() {
      return {
        teams: [],
        showModal: false,
      };
    },

    created() {
      this.fetchTeams();
    }
  };
</script>
