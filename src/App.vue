<template>
  <div id="app">
    <v-app>
      <v-toolbar class="toolbar" dark color="primary">
        <v-toolbar-title>Line Impedance Calculator</v-toolbar-title>
        <v-toolbar-items>
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-btn
              flat
              slot="activator"
            >
              <v-icon large>info</v-icon>
            </v-btn>

            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                Privacy Policy
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="dialog = false"
                >
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      tlType: 'Coax',
      dialog: false
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
