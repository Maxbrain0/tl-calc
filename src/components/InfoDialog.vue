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
        <div class="headline font-weight-medium j-title">About Me</div>
      </v-card-title>

      <v-card-text>
        <div class="subheading font-weight-bold">
          Jacob Goodwin
        </div>
        <div class="body-2">
          GitHub
        </div>
        <div class="body-2">
          LinkedIn
        </div>
        <div class="body-2">
          Personal Blog
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
  .v-card__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 0px;
  }
</style>
