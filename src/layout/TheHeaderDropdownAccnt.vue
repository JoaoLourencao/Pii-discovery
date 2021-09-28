<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="../../src/assets/img/user.png"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    
    <CDropdownDivider/>
    <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem>
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked"/> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth';
import store from '../store';

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods: {
    async logout() {      
      firebase.auth().signOut().then(() => {
        this.navigate("/autenticacao/login");
      }).catch((error) => {
        store.commit("addToaster", {
          text: error.message,
          type: "Error"
        });
      });        
    },
    navigate(url) {
      this.$router.push(url);
    },
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>