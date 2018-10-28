<template>
  <div>
    <v-layout row wrap>
      <v-flex d-flex xs12 md10>
        <div class="display-1 font-weight-light">
          Time - {{ team.name }}
        </div>
      </v-flex>
    </v-layout>

    <div class="box-retrospectives">
      <h2> Retrospectivas </h2>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <div v-if="team.retrospectives && team.retrospectives.length == 0">
            <div class="title font-weight-light red--text">Não há retrospectivas para esse time! :(</div>
          </div>
          <v-flex xs4 v-for="retrospective in team.retrospectives" :key="retrospective.id">
            <v-card>
              <div class="blue-grey lighten-3 box-retro-date">
                <div class="retro-date">
                  {{ retrospective.created_at | formatDate }}
                </div>
              </div>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    {{ retrospective.name }}
                  </h3>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="blue">Ver mais</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .box-retrospectives{
    margin-top: 40px;

    h2 {
      font-weight: normal;
    }

    .box-retro-date {
      height: 100px;
      position: relative;

      .retro-date {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        font-size: 30px;
      }
    }
  }
</style>

<script>
  import axios from "@/api";

  export default {
    name: "teams",
    methods: {
      fetchTeam: function(id) {
        axios.get(`/teams/${id}`).then(response => {
          this.team = response.data.data;
        }).catch(error => {
          console.log(error);
        });
      },
    },

    data() {
      return {
        team: {},
      };
    },

    beforeMount() {
      const teamId = this.$route.params.id;
      this.fetchTeam(teamId);
    }
  }
</script>
