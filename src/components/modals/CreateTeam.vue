<template>
  <v-dialog v-model="showModal" persistent max-width="500px">
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
        <v-btn color="red" flat :disabled="isSaving" @click.native="cancel()">Cancelar</v-btn>
        <v-btn color="green" :disabled="isDisable || isSaving" flat @click="save()">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from "@/api";

  export default {
    name: "createteam",
    props: {
      showModal: Boolean
    },
    methods: {
      save: function (){
        this.isSaving = true;

        axios.post("/teams", {
          name: this.newTeam.name
        }).then((response) => {
          const team = response.data.data;
          this.success();
          this.$emit('onSuccess', team);
        }).catch((error) => {
          console.log(error);
        });
      },

      cancel: function (){
        this.$emit('canceled');
      },

      success: function(team){
        this.newTeam.name = null;
        this.isDisable = true;
        this.isSaving = false;
      },

      onInput: function() {
        if (this.newTeam.name) {
          this.isDisable = false;
        } else {
          this.isDisable = true;
        }
      },
    },

    data() {
      return {
        isSaving: false,
        isDisable: true,
        newTeam: {},
      }
    }
  }
</script>
