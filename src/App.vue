<template>
  <div id="app">
    <router-view />
    <CToaster
      v-for="(toaster, toasterKey) in toasters"
      :position="toasterKey"
      :key="'toaster' + toasterKey"
    >
      <template v-for="(toast, key) in toaster">
        <CToast
          :key="'toast' + key"
          :show="true"
          v-bind="toast"
          :style="{ backgroundColor: toast.type }"
        >
          {{ toast.body }}
        </CToast>
      </template>
    </CToaster>
  </div>
</template>

<script>
import "vuejs-noty/dist/vuejs-noty.css";
import Vue from 'vue'
import money from 'v-money'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(money, {precision: 4})

export default {
  data() {
    return {
      toasts: this.$store.state.toasts,
    };
  },
  computed: {
    toasters() {
      return this.toasts.reduce((toasters, toast) => {
        toasters[toast.position] = toasters[toast.position] || [];
        toasters[toast.position].push(toast);
        return toasters;
      }, {});
    },
  },
  async mounted(){
    let users = []
    const querySnapshot = await firebase
                                .firestore()
                                .collection('users')
                                .orderBy('nome', 'desc')
                                .get();
    querySnapshot.forEach(function (doc) {
      users.push({
        id: doc.id,
        ... doc.data(),
      })
    })
    console.log(users)

  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
</style>
<style>
    body{
        background-color: #F6F6F6 !important;
    }
    input{
        height: 40px !important;
    }
    .foto-lista{
        height: 100%;
        max-height: 110px !important;
    }
    .backgroud-load{
        opacity: 0.3;
    }
    .loader-page-all{
        opacity: 0.6 !important;
        position: absolute;
        left: 51%;
        top: 30%;
        z-index: 99999;
    }
    .modal-info .modal-content {
      border-color: #00B240;
    }
    .modal-info .modal-header{
        background-color: #2e2e2e !important;
    }
    .c-app{
        color: #2e2e2e !important;
    }
    .form-control{
        color: #2e2e2e !important;
    }
    .dropdown-item:hover, .dropdown-item:focus{
        background-color: #00B240;
        color: #fff;
    }
    .c-sidebar{
        background: #2e2e2e;
    }
    .c-sidebar-brand{
        background: #fff !important;
    }
    .form-control:focus,
    .custom-file-input:focus ~ .custom-file-label {
        color: #2e2e2e;
        background-color: #fff;
        border-color: rgba(224, 159, 18,0.7) !important;
        box-shadow: 0 0 0 0.1rem rgba(224, 159, 18,0.8) !important;
    }
    .vs__open-indicator{
        fill:rgba(224, 159, 18,0.8) !important;
    }
    .vs__dropdown-toggle{
        padding-bottom: 5px !important;
        padding-top: 3px !important;
    }
    .toast {
        color: #fff;
    }
    .card-option-table{
        margin-bottom: 15px;
        margin-top: 15px;
    }
    .select-page-div label{ 
        margin-right: 5px;
    }
    .table th, .table td{
        font-size: 15px;
        color: #2e2e2e;
    }
    .table-hover tbody tr:hover{
        color: #2e2e2e;
        background-color: #00b2402e;
    }
    
    thead tr {
        background-color: white !important;
    }
    
    .btn-outline-primary{
        color: #2e2e2e;
        border-color: #2e2e2e;
        border: 1.5px solid;
        font-weight: 600;
        text-transform: uppercase;
    }
    .btn-outline-primary:hover{
      color: #ffffff;
      border-color: #00dd4f;
      background-color: #00dd4f;
    }
    .spinner-grow.spinner-grow-lg.text-primary{
      color: #f9b115 !important;
    }
    .btn-outline-info {
        color: #2e2e2e;
        border-color: #2e2e2e;
    }
    .btn-outline-info:hover {
        color: #fff;
        background-color: #00dc4e;
        border-color: #00dd4e;
    }
    .btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active {
        color: #fff;
        background-color: rgb(0 221 79);
        border-color: #00dd4f;
    }
    .btn-outline-info:focus, .btn-outline-info.focus {
        box-shadow: 0 0 0 0.2rem rgb(0 178 64 / 50%);
    }
</style>
