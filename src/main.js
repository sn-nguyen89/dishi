import Vue from 'vue'
import App from './App.vue'

//bootstrap vue
import {
  BootstrapVue
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

//Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDY7qKGafiA2kFlmTIOZ2n61Q7ta8VXzGQ',
  },
})

//firebase
import firebase from 'firebase';
//Paste in your firebase config we copied from the last step
var firebaseConfig = {
  apiKey: 'AIzaSyD54WZl1MYLoGtf2u5jgnLsVU_b6EiOPSo',
  authDomain: 'dishi-9fa34.firebaseapp.com',
  projectId: 'dishi-9fa34',
  storageBucket: 'dishi-9fa34.appspot.com',
  messagingSenderId: '775222175201',
  appId: '1:775222175201:web:a2c0637ccbbd63c0f39ea0'
};

firebase.initializeApp(firebaseConfig);
const Firestore = firebase.firestore;
export const db = Firestore();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')