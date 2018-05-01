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
    <div class="form-group">
        <label for="name">Car name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          v-model.trim="name"
        >
    </div>
    <div class="form-group">
        <label for="year">Car year</label>
        <input
          type="text"
          name="year"
          id="year"
          class="form-control"
          v-model.number="year"
        >
    </div>
    <button
      class="btn btn-primary"
      type="submit"
      @click="createCar"
      >Send</button>
      <button
      class="btn btn-primary"
      type="submit"
      @click="loadCars"
      >Load cars</button>
      <br>
      <ul class="list-group">
        <li class="list-group-item" v-for="car of cars" :key="car.id">
          {{ car.name }} - {{ car.year }}
        </li>
      </ul>
    <br>
    <hr>
    <br>
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
      confirmPassword: '',
      name: '',
      year: 2018,
      cars: [],
      resource: null
    }
  },
  methods: {
    createCar(){
      // this.$http.post('http://localhost:3000/cars', {
      //   name: this.name,
      //   year: this.year
      // }).then(response => {
      //   return response.json();
      // }).then(newCar => {
      //   console.log(newCar);
      // });
      const car = {
        name: this.name,
        year: this.year
      };
      this.resource.save({}, car);
    },
    loadCars(){
      // this.$http.get('http://localhost:3000/cars')
      // .then(response => {
      //   return response.json();
      // }).then(cars => {
      //   this.cars = {
      //     ...cars
      //   }
      // });
      this.resource.get().then(response => {
        return response.json();
      }).then(cars => {
        this.cars = {
          ...cars
        }
      });
    },
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
  },
  created(){
    this.resource = this.$resource('cars');
  }
}
</script>
