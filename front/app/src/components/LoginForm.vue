<template>    
  <div class="myloginform">       
    <div class="columns">
      <div class="column content">
        <form v-on:submit.prevent="">
        <h3 class="title">Login</h3>
        <div class="field">
          <div class="control has-icons-left ">
            <input v-bind:class="{'is-danger': checkmail}" v-model="email" class="input is-primary" type="email" placeholder="Email">
            <span class="icon is-small is-left">
                <i class="mdi mdi-email"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-bind:class="{'is-danger': checkpassword}" v-model="password" class="input is-primary" type="password" placeholder="Password">
            <span class="icon is-small is-left">
              <i class="mdi mdi-lock"></i>
            </span>
          </p>
        </div>
        <div v-if="errors.length" class="notification is-danger">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <div class="field">
          <div class="control">
            <button v-bind:class="{'is-loading': isLoading}" v-on:click="submitForm" class="button is-link">Inloggen</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth';

export default {
  name: 'ContactForm',
  data() {
    return {
      numkarakters: 6,
      isLoading: false,
      email: null,
      password: null,
      showError: false,
      errors: [],
    }
  },
  computed: {
    checkmail(){
      // eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return false 
      }
      return true
    },
    checkpassword(){
      if (!this.password || this.password.length < this.numkarakters ) {
        return true
      }
      return false
    },
  },
  methods: {
    async submitForm() {
      this.errors = [];

      // eslint-disable-next-line
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.errors.push('Vul een correct emailadres in.')
      }

      if (this.password < this.numkarakters) {
        this.errors.push("Het wachtwoord moet minimaal "+this.numkarakters+" karakters lang zijn.");
      }


      if (this.errors.length == 0) {
        this.isLoading = true;
        try {
          const user = await Auth.signIn(this.email, this.password );
          console.log(user)
          this.$store.dispatch('setUser', user)
          this.$store.dispatch('setIsAuthenticated', true)

          if(user.challengeName ==null) {
            this.$router.push({ name: 'Account'})
          }
          this.$emit('user', user)
          this.isLoading = false;

        } catch (error) {
          this.errors.push(error.message);
          this.isLoading = false;
        }
      }
    },
  },
}
</script>
