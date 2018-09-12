<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-btn
      flat
      slot="activator"
    >
      <v-icon large>info</v-icon>
    </v-btn>

    <v-card light>
      <v-card-title>
        <div class="headline font-weight-medium j-title primary--text">About Me</div>
      </v-card-title>

      <v-card-text>
        <div class="subheading font-weight-bold primary--text">
          Jacob Goodwin
        </div>
        <div class="body-2">
          <v-btn flat large color="primary" href="https://github.com/Maxbrain0" target="_blank"> 
            <font-awesome-icon :icon="['fab','github']" size="3x" />
          </v-btn>      
        </div>
        <div class="body-2">
          <v-btn flat large color="primary" href="https://www.linkedin.com/in/jacobgoodwin1/" target="_blank">
            <font-awesome-icon :icon="['fab','linkedin']" size="3x" />
          </v-btn>    
        </div>
        <div class="body-2">
          <v-btn flat large color="primary" href="https://www.jacobsngoodwin.com/" target="_blank">
            <font-awesome-icon icon="globe" size="3x" />
          </v-btn>  
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  }
}
</script>

<style lang="scss" scoped>
  .j-title {
    margin: auto;
  }
  .body-2 {
    padding: 1em 0;
  }
  .v-card__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 0px;
  }
</style>
