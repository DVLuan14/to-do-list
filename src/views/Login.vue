<template>
  <div class="login">
    <div class="screen">
      <div class="tittle"><h1>SIGN IN</h1></div>
      <div class="navsi">
        <div class="email">
            <span class="email" >Email</span>
            <input v-model="email" type="text"/>
        </div>
        <div class="password">
            <span class="password">Password</span>
            <input v-model="password" type="password"/>
        </div>
        <hr>
        <button class="button" @click="signin"><p>Sign In</p></button>
        <router-link to="/sign-up" class="btn btn-link"><p>Sign Up Now</p></router-link>
        <div class="footersi"><p>Coppyright @2019</p></div>
      </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
import userServices from '@/lib/userServices.js';

export default {
  name: 'Login',
  data() {
    return {
      email: 'admin@example.com',
      password: 'password',
    };
  },
  methods: {
    signin() {
      // this.$router.push('/main');
      // alert("Đăng nhập thành công!");
      this.checkMail();
    },
    checkMail(){
      axios.post(`https://mockup-api.herokuapp.com/auth/signin?email=${this.email}&password=${this.password}`, {
        Headers:{
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response.data);
        userServices.updateUserData(response.data);
        this.$router.push('/');
      })
      .catch(e => {
        this.errors.push(e);
        console.log(e.response);
      });
    }
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/stylesheets/components/login.scss';
</style>
