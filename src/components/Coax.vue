<template>
    <v-layout row wrap justify-center> 
      <v-flex xs12 class="diagram">
        <h2 class="text-xs-center">Diagram</h2>
        <img src="../assets/diagrams/coax.png" alt="Coax Diagram">
      </v-flex>
      <v-flex xs12>
        <h2 class="text-xs-center">Parameters</h2>
        <v-form>
          <v-text-field
            v-model.number=r1
            label="R1"
            type="number"
            required
            class="tl-params"
            hint="Inner Coaxial Radius"
          ></v-text-field>
          <v-text-field
            v-model.number="r2"
            label="R2"
            type="number"
            required
            class="tl-params"
            hint="Outer Coaxial Radius"
          ></v-text-field>
          <v-text-field
            v-model.number="eps_r"
            label="ε_r"
            type="number"
            required
            class="tl-params"
            hint="Dielectric Constant of Insulator"
          ></v-text-field>
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
import { coax } from '../js/impedanceCalcs';
export default {
  data() {
    return {
      r1: 1,
      r2: 3.35,
      eps_r: 2.1,
      lineImpedance: 50,
      rules: {
        ratio1: () => (this.r2 > this.r1) || 'R1 must be less than R2',
        ratio2: () => (this.r2 > this.r1) || 'R2 must be greater than R1',
        dielectric: () => (this.eps_r >= 1) || 'The dielectric constant must be greater than or equal to 1'
      }
    }
  },
  //cannot use arrow functions in watch or debounce as *this* will not be defined
  watch: {
    r1: function() {
      this.debouncedLineImpedance();
    },
    r2: function() {
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
      this.lineImpedance = coax(this.r1, this.r2, this.eps_r).toFixed(2);
    },
    debouncedLineImpedance: debounce(function() {
      this.getImpedance();
    },350) 
  }
}
</script>
