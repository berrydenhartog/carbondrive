<template>    
  <div class="mynavbar"> 
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link v-on:click.native="toggleisactive" class="navbar-item" :to="{ name: 'Home' }">
          <img src="@/assets/logo.png" alt="Logo">
        </router-link>
        <a role="button" class="navbar-burger" v-on:click="showNav = !showNav" >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-start">
         <div class="navbar-item has-dropdown is-hoverable">
            <router-link v-on:click.native="toggleisactive" class="navbar-link is-uppercase" :to="{ name: 'Fietsen' }">
                Fietsen
            </router-link>
          </div> 
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link v-on:click.native="toggleisactive" class="navbar-link is-uppercase" :to="{ name: 'WorkInProgress' }">
              CarbonDrive
            </router-link>
            <div class="navbar-dropdown">
              <router-link v-on:click.native="toggleisactive" class="navbar-item is-uppercase" :to="{ name: 'WorkInProgress' }">
                Over
              </router-link>
              <router-link v-on:click.native="toggleisactive" class="navbar-item is-uppercase" :to="{ name: 'Contact' }">
                Contact
              </router-link>
              <router-link v-on:click.native="toggleisactive" class="navbar-item is-uppercase" :to="{ name: 'WorkInProgress' }">
                FAQ
              </router-link>
            </div>
          </div> 
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-item is-uppercase" :to="{ name: 'Account' }">
              <span v-if="isAuthenticated">{{email}}</span>
              <span v-if="!isAuthenticated" class="icon">
                <i class = "mdi mdi-24px mdi-account"></i> 
              </span>
            </router-link>
            <div class="navbar-dropdown is-right">
              <router-link v-if="!isAuthenticated" v-on:click.native="toggleisactive" class="navbar-item is-uppercase" :to="{ name: 'Login' }">
                Login
              </router-link>
              <a  v-if="isAuthenticated" @click="signOut" class="navbar-item is-uppercase">
                Logout
              </a>
            </div>
          </div> 
        </div>
      </div>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'Navbar',
  data() {
    return {
      showNav: false,
      islarge: true,
    }
  },
  //created () {
  //  window.addEventListener('scroll', this.handleScroll);
  //},
  //beforeDestroy () {
  //  window.removeEventListener('scroll', this.handleScroll);
  //},
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
    email() {
      let email=""
      if (this.$store.state.user.attributes) {
        email=this.$store.state.user.attributes.email
      }
      return email
    },
  },
  methods: {
    async signOut() {
      try {
        await this.$Amplify.Auth.signOut()
        this.$store.dispatch('setIsAuthenticated', false)
        this.$store.dispatch('setUser', {})
        this.$router.push('/')
      } catch (err) {
        console.log('error signing out.')
      }
    },
    handleScroll () {
      if (window.scrollY > 100) {
        this.islarge=false
      } else {
        this.islarge=true
      }
    },
    toggleisactive(event) {
      event.target.blur()
      this.showNav = false
    },
  }
}
</script>