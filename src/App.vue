<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link
            tag="li"
            class="nav-item"
            active-class="active"
            :to="'/'"
            exact
          >
            <a class="nav-link">Home</a>
          </router-link>
          <router-link
            tag="li"
            class="nav-item"
            active-class="active"
            :to="'/cars'"
            exact
          >
            <a class="nav-link">Cars</a>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <h2>Form input:</h2>
    <form action="" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">email</label>
        <input
        type="email"
        id="email"
        class="form-control"
        :class="{'is-invalid': $v.email.$error}"
        v-model="email"
        @blur="$v.email.$touch()"
        >
        <div class="invalid-feedback" v-if="!$v.email.required">Email field is required</div>
        <div class="invalid-feedback" v-if="!$v.email.email">Email are not valid</div>
        <div class="invalid-feedback" v-if="!$v.email.uniqueEmail">Email must be unique</div>
      </div>

       <div class="form-group">
        <label for="email">password</label>
        <input
        type="password"
        id="password"
        class="form-control"
        :class="{'is-invalid': $v.password.$error}"
        v-model="password"
        @blur="$v.password.$touch()"
        >
        <div class="invalid-feedback" v-if="!$v.password.minLength">password must contains min 6 chars</div>
      </div>

      <div class="form-group">
        <label for="email">confirm password</label>
        <input
        type="confirmPassword"
        id="confirmPassword"
        class="form-control"
        :class="{'is-invalid': $v.confirmPassword.$error}"
        v-model="confirmPassword"
        @blur="$v.confirmPassword.$touch()"
        >
        <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs">passwords not match</div>
      </div>
      <button
      class="btn btn-primary"
      type="submit"
      :disabled="$v.$invalid"
      >Send</button>
    </form>
    <app-counter></app-counter>
    <app-car></app-car>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  data(){
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit(){
      console.log('Email: ', this.email);
      console.log('Password: ', this.password);
    }
  },
  validations:{
    email:{
      required,
      email,
      uniqueEmail: function(newEmail){
        return newEmail !== 'mail@mail.ru';
      }
    },
    password: {
      minLength: minLength(6),
      required
    },
    confirmPassword:{
      sameAs: sameAs('password')
    }
  }
}
</script>
