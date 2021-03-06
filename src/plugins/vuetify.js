import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
    theme: {
        primary: colors.indigo.accent4,
        secondary: colors.blueGrey.darken3,
        accent: colors.indigo.darken3, 
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107' 
    }
})
