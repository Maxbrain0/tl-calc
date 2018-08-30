<template>
    <v-layout row wrap justify-center> 
      <v-flex xs12 class="diagram">
        <h2 class="text-xs-center">Diagram</h2>
        <img src="../assets/diagrams/stripline.png" alt="Coax Diagram">
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
            v-model.number="subHeight"
            label="Substrate Height, H"
            type="number"
            required
            class="tl-params"
            hint="Substrate Height"
          ></v-text-field>
          <v-text-field
            v-model.number="thickness"
            label="Trace Thickness, T"
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
            :value="lineImpedance"
            label="Calculated Line Impedance"
            class="tl-params"
            style="font-weight:bold"
            readonly
            type="number"
          ></v-text-field>
        </v-form>
      </v-flex>      
    </v-layout>
</template>

<script>
import debounce from 'lodash.debounce';
export default {
  data() {
    return {
      width: 3,
      height: 1.524,
      subHeight: 1.524,
      thickness: 0.1,
      eps_r: 4.1,
      lineImpedance: 50,
    }
  },
  //cannot use arrow functions in watch or debounce as *this* will not be defined
  watch: {
    width: function() {
      this.debouncedLineImpedance();
    },
    subHeight: function() {
      this.height = this.subHeight/2-this.thickness/2;
      this.debouncedLineImpedance();
    },
    thickness: function() {
      this.height = this.subHeight/2-this.thickness/2;
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
      this.lineImpedance = 60/Math.sqrt(this.eps_r) * 
      Math.log((1.9*(2*this.height+this.thickness))/(0.8*this.width+this.thickness));
      this.lineImpedance = this.lineImpedance.toFixed(2);
    },
    debouncedLineImpedance: debounce(function() {
      this.getImpedance();
    },350)
  }
  
}
</script>
