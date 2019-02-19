<template>
  <div id="app">
    <v-app>
      <v-toolbar class="toolbar" dark color="primary">
        <v-spacer></v-spacer>
        <v-toolbar-title v-if="!isMobile">Line Impedance Calculator</v-toolbar-title>
        <v-toolbar-title v-else>TL Calc</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon>
            <info-dialog></info-dialog>
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
import Coax from "./components/Coax.vue";
import Microstrip from "./components/Microstrip.vue";
import SymmStripline from "./components/SymmStripline.vue";
import CPW from "./components/CPW.vue";
import GCPW from "./components/GCPW.vue";
import InfoDialog from "./components/InfoDialog.vue";

export default {
  name: "App",
  data() {
    return {
      tlItems: [
        { name: "Coax", component: "Coax" },
        { name: "Microstrip", component: "Microstrip" },
        { name: "Symmetric Stripline", component: "SymmStripline" },
        { name: "CPW", component: "CPW" },
        { name: "Grounded CPW", component: "GCPW" }
      ],
      tlType: "Coax",
      dialog: false,
      isMobile: true
    };
  },
  components: {
    Coax,
    Microstrip,
    SymmStripline,
    CPW,
    GCPW,
    InfoDialog
  },
  methods: {
    resize() {
      this.isMobile = window.innerWidth < 350;
    }
  },
  created: function() {
    this.isMobile = window.innerWidth < 350;
    window.addEventListener("resize", this.resize);
  },
  destroyed: function() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>


<style lang="scss" scoped>
</style>
