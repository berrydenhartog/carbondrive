<template>
  <div class="myaccount">
    <section>
      <div class="container mainpadding">
        <div class="content">
          <h3>Website Management</h3>
        </div>
        <div class="tabs">
          <ul>
            <li v-bind:class="{'is-active': activeTab===1}">
              <a @click="activeTab=1">
                <span class="icon is-small"><i class="mdi mdi-earth" aria-hidden="true"></i></span>
                <span>Kosten</span>
              </a>
            </li>
            <li v-bind:class="{'is-active': activeTab===3}">
              <a @click="activeTab=3">
                <span class="icon is-receipt"><i class="mdi mdi-film" aria-hidden="true"></i></span>
                <span>Factures</span>
              </a>
            </li>
            <li v-if="isAdmin" v-bind:class="{'is-active': activeTab===2}">
              <a @click="activeTab=2">
                <span class="icon is-small"><i class="mdi mdi-account-box-outline" aria-hidden="true"></i></span>
                <span>Klanten</span>
              </a>
            </li>
            <li v-if="isAdmin" v-bind:class="{'is-active': activeTab===4}">
              <a @click="activeTab=4">
                <span class="icon is-small"><i class="mdi mdi-book" aria-hidden="true"></i></span>
                <span>Producten</span>
              </a>
            </li>
          </ul>
        </div>
        <section v-if="activeTab==1" class="tab-content">
        </section>
        <section v-if="activeTab==3" class="tab-content">
          Factures content
        </section>
        <section v-if="isAdmin && activeTab==2" class="tab-content">
          Klanten content
        </section>
        <section v-if="isAdmin && activeTab==4" class="tab-content">
          <button @click="test">Test button </button>
        </section>

        <div v-if="errors.length" class="notification is-danger">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Account',
  data() {
    return {
      activeTab: 1,
      errors: [],
      cost: {},
    }
  },
  mounted: function () {
  },
  components: {
  },
  computed: {
    email() {
      let email=""
      if (this.$store.state.user.attributes) {
        email=this.$store.state.user.attributes.email
      }
      return email
    },
    groups() {
      let groups=[]
      if (this.$store.state.user.signInUserSession) {
        groups = this.$store.state.user.signInUserSession.accessToken.payload["cognito:groups"]
      }
      return groups
    },
    isAdmin() {
      if (this.groups == null) {
        return false
      }
      return this.groups.includes("admin")
    }
  },
  methods: {
  },
}
</script>
