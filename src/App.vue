<template>
  <div id="app">
    <v-app>
      <v-toolbar dark color="primary">
        <h1 class="toolbar-title title">Line Impedance Calculator</h1>
      </v-toolbar>
      <v-container>
        <v-layout justify-center>
          <v-flex xs10 sm8 lg6>
           <v-select
            :items="tlItems"
            item-text="name"
            item-value="component"
            v-model="tlType"
            label="Transmission Line Type"
            single-line
            color="secondary"
          ></v-select>
        </v-flex>
        </v-layout>
        <keep-alive>
          <component :is="tlType"></component> 
        </keep-alive>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Coax from './components/Coax.vue';
import Microstrip from './components/Microstrip.vue';
import SymmStripline from './components/SymmStripline.vue';

export default {
  
  data() {
    return {
      tlItems: [
        {name: 'Coax', component: 'Coax'},
        {name: 'Microstrip', component: 'Microstrip'},
        {name: 'Symmetric Stripline', component: 'SymmStripline'}
      ],
      tlType: 'Coax'
    };
  },
  components: {
    Coax,
    Microstrip,
    SymmStripline
  }
}
</script>


<style lang="scss" scoped>
</style>
