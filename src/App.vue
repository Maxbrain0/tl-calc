<template>
  <div id="app">
    <v-app>
      <v-toolbar dark color="primary">
        <h1 class="toolbar-title title">Transmission Line Calculator</h1>
      </v-toolbar>
      <v-container>
        <v-layout justify-center>
          <v-flex xs10 sm8 lg6>
           <v-select
            :items="tlItems"
            v-model="tlType"
            label="Transmission Line Type"
            single-line
          ></v-select>
        </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 sm10 lg6>
            {{ tlType }}
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tlItems: ['Coax', 'Microstrip', 'Stripline', 'Coplanar Waveguide', 'Grounded Coplanar Waveguide'],
      tlType: ''
    };
  }
}
</script>


<style lang="scss" scoped>
</style>
