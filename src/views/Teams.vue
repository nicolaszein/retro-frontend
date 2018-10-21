<template>
  <div>
    <v-layout row wrap>
      <v-flex d-flex xs12 md10>
        <div class="display-1 font-weight-light">
          Times
        </div>
      </v-flex>
      <v-flex d-flex xs12 md2 class="text-xs-right">
        <v-btn outline color="blue" :disabled="showNewTeamDialog" @click="addTeam()">
          <v-icon>
            add
          </v-icon>
          Novo Time
        </v-btn>
      </v-flex>
    </v-layout>


    <v-list>
      <v-list-tile v-for="team in teams" :key="team.name">
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

    <v-dialog v-model="showNewTeamDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Novo Time</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12>
                <v-text-field v-model="newTeam.name" :disabled="isSaving" label="Nome" required @input="onInput()"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat :disabled="isSaving" @click.native="showNewTeamDialog = false">Cancelar</v-btn>
          <v-btn color="green" :disabled="saveIsDisable || isSaving" flat @click="saveTeam()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "../api";

export default {
  methods: {
    addTeam: function() {
      this.showNewTeamDialog = true;
    },

    saveTeam: function() {
      this.isSaving = true;
      const $this = this;
      axios
        .post("/teams", {
          name: $this.newTeam.name
        })
        .then(function(response) {
          $this._handleSuccess(response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    onInput: function() {
      if (this.newTeam.name) {
        this.saveIsDisable = false;
      } else {
        this.saveIsDisable = true;
      }
    },

    _handleSuccess: function(team) {
      this.showNewTeamDialog = false;
      this.teams.push(team);
      this.newTeam.name = null;
      this.saveIsDisable = true;
    }
  },

  data() {
    return {
      teams: [],
      showNewTeamDialog: false,
      newTeam: {},
      saveIsDisable: true,
      isSaving: false
    };
  },

  created() {
    axios
      .get(`/teams`)
      .then(response => {
        this.teams = response.data.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
