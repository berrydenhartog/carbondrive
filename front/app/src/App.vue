<template>
  <div id="mymain">
    <Navbar :showNav="showNav" />

    <div id="myview">
      <router-view/>
    </div>

    <Footer/>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Appmain',
  async beforeCreate() {
    try {
      const user = await this.$Amplify.Auth.currentAuthenticatedUser()
      this.$store.dispatch('setUser', user)
      this.$store.dispatch('setIsAuthenticated', true)
    } catch (e) {
      /* continue regardless of error */
    }
  },
  data: () => ({
    showNav: false
  }),
  components: {
    Navbar,
    Footer,
  },
}
</script>

