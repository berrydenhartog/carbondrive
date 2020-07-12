<template>
  <div>
    <div class='form-container content'>
      <h3 class="title">Wachtwoord vergeten</h3>
      <div class='form' v-if="formState === 'resetPassword'">
        <div class="field">
          <div class="control has-icons-left ">
            <input v-bind:class="{'is-danger': checkmail}" v-model="email" class="input is-primary" type="email" placeholder="Email">
            <span class="icon is-small is-left">
              <i class="mdi mdi-email"></i>
            </span>
          </div>
        </div>
        <div v-if="errors.length" class="notification is-danger">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <div class="field">
          <div class="control">
            <button v-bind:class="{'is-loading': isLoading}" v-on:click="forgotPassword" class="button is-link">Stuur verificatie code</button>
          </div>
        </div>
      </div>
      <div class='form' v-if="formState === 'resetPasswordConfirm'">
        <div class="field">
          <div class="control">
            <input v-bind:class="{'is-danger': checkauthcode}" v-model="authCode" class="input is-primary" type="text" placeholder="authCode">
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
            <button v-bind:class="{'is-loading': isLoading}" v-on:click="forgotPasswordSubmit" class="button is-link">Zet nieuw wachtwoord</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'forgot-password',
  props: ['toggleForm'],
  computed: {
    checkmail(){
      // eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return false 
      }
      return true
    },
    checkauthcode(){
      if (!this.authCode || this.authCode.length < 6 ) {
        return true
      }
      return false
    },
    checkpassword(){
      if (!this.password || this.password.length < 6 ) {
        return true
      }
      return false
    },
  },
  methods: {
    async forgotPassword() {
      this.errors = [];

      if (this.checkmail) {
        this.errors.push('Vul een correct emailadres in.')
      }

      if (this.errors.length == 0) {
        this.isLoading = true;

        try {
          await this.$Amplify.Auth.forgotPassword(this.email)
          this.formState = 'resetPasswordConfirm'
        } catch (error) {
          this.errors.push(error.message);
        }
        this.isLoading = false;
      }
    },
    async forgotPasswordSubmit() {
      this.errors = [];

      if (this.checkauthcode) {
        this.errors.push('Authcode is te kort.')
      }

      if (this.checkpassword) {
        this.errors.push("Het wachtwoord moet minimaal 6 karakters lang zijn.");
      }

      if (this.errors.length == 0) {
        this.isLoading = true;
        try {
          await this.$Amplify.Auth.forgotPasswordSubmit(this.email, this.authCode, this.password)
          this.isLoading = false;
          this.toggleForm('signIn')
        } catch (error) {
          this.errors.push(error.message);
        }
        this.isLoading = false;
      }
    }
  },
  data() {
  return {
    errors: [],
    formState: 'resetPassword',
    email: '',
    authCode: '',
    password: '',
    isLoading: false,
  }
}
}
</script>