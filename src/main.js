import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import Multiselect from 'vue-multiselect'
import VueMask from 'v-mask'
import Vuelidate from 'vuelidate'
import VueNoty from 'vuejs-noty'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueNoty)
Vue.use(CoreuiVue)
Vue.use(VueMask);
Vue.component('multiselect', Multiselect)
Vue.use(Vuelidate)

const firebaseConfig = {
  apiKey: "AIzaSyB4ebgMchLj5N78yohivlbumnx2ptRVoHg",
  authDomain: "pii-discovery.firebaseapp.com",
  projectId: "pii-discovery",
  storageBucket: "pii-discovery.appspot.com",
  messagingSenderId: "88622051673",
  appId: "1:88622051673:web:0491077a9a8bd0fb889c48",
  measurementId: "G-J64GQE00B8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.performance = true
Vue.config.productionTip = false
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
