<template>    
  <div class="myauthenicator">  
    <div v-if="formType === 'signIn'">
      <LoginForm v-if="user == null"  @user="setUser" v-bind="{toggleForm}" />
      <NewPasswordRequired :user="user" v-if="user != null && user.challengeName == 'NEW_PASSWORD_REQUIRED'" />
    </div>
    <div v-if="formType === 'forgotPassword'">
      <forgot-password v-bind="{toggleForm}" />
    </div>
    <div class="container">
      <a v-if="formType == 'signIn'" class='toggleButton' v-on:click="toggleForm('forgotPassword')">Wachtwoord vergeten?</a>
    </div>
  </div>
</template> 

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'
import NewPasswordRequired from '@/components/NewPasswordRequired.vue'
import ForgotPassword from './ForgotPassword.vue'

export default {
  name: 'Authenticator',
  data() {
    return {
      newpassword: false,
      user: null,
      formType: 'signIn',
    }
  },
  components: {
    LoginForm,
    NewPasswordRequired,
    ForgotPassword,
  },
  methods: {
    toggleForm(formType) {
      this.formType = formType
    },
    setUser (user) {
      this.user = user;
    }
  }
}
</script>