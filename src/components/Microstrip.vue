<template>
    <v-layout row wrap justify-center> 
      <v-flex xs12 class="diagram">
        <h2 class="text-xs-center">Diagram</h2>
        <img src="../assets/diagrams/microstrip.png" alt="Microstrip Diagram">
      </v-flex>
      <v-flex xs12>
        <h2 class="text-xs-center">Parameters</h2>
        <v-form>
          <v-text-field
            v-model.number="width"
            label="Trace Width, W"
            type="number"
            required
            class="tl-params"
            hint="Microstrip Trace Width"
          ></v-text-field>
          <v-text-field
            v-model.number="thickness"
            label="Trace Thickness, T"
            type="number"
            required
            class="tl-params"
            hint="Microstrip Trace Thickness"
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
import { microstrip } from '../js/impedanceCalcs';
export default {
  data() {
    return {
      width: 3,
      height: 1.524,
      thickness: 0.1,
      eps_r: 4.1,
      lineImpedance: 50,
      eps_eff: 2.1
    }
  },
  //cannot use arrow functions in watch or debounce as *this* will not be defined
  watch: {
    width: function() {
      this.debouncedLineImpedance();
    },
    height: function() {
      this.debouncedLineImpedance();
    },
     thickness: function() {
      this.debouncedLineImpedance();
    },
    eps_r: function() {
      this.debouncedLineImpedance();
    }
  },
  created() {
    this.getImpedance();
  },
  methods: {
    getImpedance() {
      microstrip(this.width, this.height, this.thickness, this.eps_r);
    },
    debouncedLineImpedance: debounce(function() {
      this.getImpedance();
    },350)
  }
  
}
</script>
