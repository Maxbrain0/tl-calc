<template>
    <v-layout row wrap justify-center> 
      <v-flex xs12 class="diagram">
        <h2 class="text-xs-center">Diagram</h2>
        <img src="../assets/diagrams/CPW.png" alt="Coax Diagram">
      </v-flex>
      <v-flex xs12>
        <h2 class="text-xs-center">Parameters</h2>
        <v-form>
          <v-text-field
            v-model.number="center"
            label="Center Trace Width, S"
            type="number"
            required
            class="tl-params"
            hint="Microstrip Trace Width"
          ></v-text-field>
          <v-text-field
            v-model.number="gap"
            label="Gap, W"
            type="number"
            required
            class="tl-params"
            hint="Gap between trace and ground"
          ></v-text-field>
          <v-text-field
            v-model.number="height"
            label="Substrate Height, H"
            type="number"
            required
            class="tl-params"
            hint="Substrate Height"
          ></v-text-field>
          <v-text-field
            v-model.number="eps_r"
            label="ε_r"
            type="number"
            required
            class="tl-params"
            hint="Dielectric Constant of Substrate"
          ></v-text-field>
          <v-text-field 
            :value="eps_eff"
            label="Calculated Effective Dielectric Constant"
            class="tl-params"
            style="font-weight:bold"
            readonly></v-text-field>
          <v-text-field 
            :value="lineImpedance"
            label="Calculated Line Impedance"
            class="tl-params"
            style="font-weight:bold"
            readonly></v-text-field>
        </v-form>
      </v-flex>      
    </v-layout>
</template>

<script>
import debounce from 'lodash.debounce';
import { cpw } from '../js/impedanceCalcs';
export default {
  data() {
    return {
      center: 1.5,
      gap: 0.55,
      height: 1.5,
      eps_r: 10,
      lineImpedance: 50,
      eps_eff: 2.1
    }
  },
  created() {
    this.getImpedace();
  },
  watch: {
    center: function() {
      this.debouncedLineImpedance();
    },
    gap: function() {
      this.debouncedLineImpedance();
    },
    height: function() {
      this.debouncedLineImpedance();
    },
    eps_r: function() {
      this.debouncedLineImpedance();
    }
  },
  methods: {
    getImpedace() {
      const values = cpw(this.center, this.gap, this.height, this.eps_r);
      this.lineImpedance = values.z0.toFixed(2);
      this.eps_eff = values.eps_eff.toFixed(2);
    },
    debouncedLineImpedance: debounce(function() {
      this.getImpedace();
    },350)
  }
}
</script>
