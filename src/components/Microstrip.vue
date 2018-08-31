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
export default {
  data() {
    return {
      width: 3,
      height: 1.524,
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
    eps_r: function() {
      this.debouncedLineImpedance();
    }
  },
  created() {
    this.setEff();
    this.getImpedance();
  },
  methods: {
    setEff() {
      // compute and set the effective dielectric constant
      if(this.width <= this.height) {
      this.eps_eff = ((this.eps_r+1)/2+(this.eps_r-1)/2 *
        ((1/Math.sqrt(1+12*this.height/this.width)) 
        + 0.04 * Math.pow((1-this.width/this.height),2)));
      } else {
        this.eps_eff = ((this.eps_r+1)/2+(this.eps_r-1)/2 *
          ((1/Math.sqrt(1+12*this.height/this.width))));
      }
    },
    getImpedance() {
      if(this.width <= this.height) {
        this.lineImpedance = (60/Math.sqrt(this.eps_eff) 
        * Math.log(8*this.height/this.width+0.25*this.width/this.height));
      } else {
        this.lineImpedance = (120*Math.PI / 
        (Math.sqrt(this.eps_eff) * 
        (this.width/this.height + 1.393 + 2.0/3.0 * Math.log(this.width/this.height+1.4444))));
      }
      this.eps_eff = this.eps_eff.toFixed(2);
      this.lineImpedance = this.lineImpedance.toFixed(2);
    },
    debouncedLineImpedance: debounce(function() {
      this.setEff();
      this.getImpedance();
    },350)
  }
  
}
</script>
