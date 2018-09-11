<template>
  <div id="app">
    <v-app>
      <v-toolbar class="toolbar" dark color="primary">
        <v-toolbar-title>Line Impedance Calculator</v-toolbar-title>
        <v-toolbar-items>
          <v-btn flat>
            <v-icon dark large>info</v-icon>
          </v-btn>
        </v-toolbar-items>
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
import CPW from './components/CPW.vue';
import GCPW from './components/GCPW.vue';

export default {
  
  data() {
    return {
      tlItems: [
        {name: 'Coax', component: 'Coax'},
        {name: 'Microstrip', component: 'Microstrip'},
        {name: 'Symmetric Stripline', component: 'SymmStripline'},
        {name: 'Coplanar Waveguide', component: 'CPW'},
        {name: 'Grounded Coplanar Waveguide', component: 'GCPW'},
      ],
      tlType: 'Coax'
    };
  },
  components: {
    Coax,
    Microstrip,
    SymmStripline,
    CPW,
    GCPW
  }
}
</script>


<style lang="scss" scoped>
</style>
