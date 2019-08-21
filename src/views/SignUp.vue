<template>
  <div class="sign-up">
    <div class="screen">
      <div class="tittle"><h1>SIGN UP</h1></div>
      <div class="nav">
        <div class="email">
            <span class="email">Email</span>
            <input v-model="email" type="text"/>
        </div>
        <div class="password">
            <span class="password">Password</span>
            <input v-model="password" type="password" />
        </div>
        <div class="password">
            <span class="password">Re-Password</span>
            <input v-model="rePassword" type="password"/>
        </div>
        <hr>
        <button class="buttonsu" @click="signup"><p>Sign Up</p></button>
        <router-link class="signin" to="/login"><p>Sign In</p></router-link>
        <div class="footer"><p>Coppyright @2019</p></div>
      </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
    }
  },
  methods: {
    signup(){
      axios.post(`https://mockup-api.herokuapp.com/auth/signup?email=${this.email}&password=${this.password}&password_confirmation=${this.rePassword}`, {
        Headers:{
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        console.log(response.data);
        this.$router.push('/login');
      })
      .catch(e => {
        console.log(e.response);
      })
    }
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/stylesheets/components/sign-up.scss';
</style>
