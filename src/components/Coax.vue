<template>
    <v-layout row wrap justify-center> 
      <v-flex xs12 class="diagram">
        <h2 class="text-xs-center">Diagram</h2>
        <img src="../assets/coaxcable.svg" alt="">
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
            readonly
            type="number"
          ></v-text-field>
        </v-form>
      </v-flex>      
    </v-layout>
</template>

<script>
//import debounce from 'lodash.debounce';
export default {
  data() {
    return {
      r1: 1,
      r2: 3.35,
      eps_r: 2.1,
      //lineImpedance: 50

    }
  },
  //cannot use arrow functions in watch or debounce as this will note be defined
  // watch: {
  //   r1: function() {
  //     this.getLineImpedance();
  //   },
  //   r2: function() {
  //     this.getLineImpedance();
  //   },
  //   eps_r: function() {
  //     this.getLineImpedance();
  //   }
  // },
  // methods: {
  //   getLineImpedance: debounce(function() {
  //     this.lineImpedance = ((138/Math.sqrt(this.eps_r))*Math.log10(this.r2/this.r1)).toFixed(2);
  //   },1000)
  // }
  computed: {
    lineImpedance() {
      return ((138/Math.sqrt(this.eps_r))*Math.log10(this.r2/this.r1)).toFixed(2);
    } 
  }  
}
</script>
