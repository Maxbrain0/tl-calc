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

    <v-card>
      <v-card-title
        class="headline"
        color="primary"
        primary-title
      >
        About Author
      </v-card-title>

      <v-card-text>
        Jacob is the boss, and you better believe it!
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
