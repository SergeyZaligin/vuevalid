<template>
  <div>
    <h1>Car id {{ id }}</h1>
    <button class="btn btn-sm btn-default mb-2" @click="goToBack">Back</button>
    <br>
    <!-- <router-link
      class="btn btn-info mt-2"
      tag="button"
      :to="'/car/' + id + '/full'"
    >
      Full info
    </router-link> -->
    <router-link
      class="btn btn-info mt-2"
      tag="button"
      :to="{ name: 'carFull', params: { id }, query: { name: 'Ford', year: 2018 } }"
    >
      Full info
    </router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data(){
    return{
      id: this.$router.currentRoute.params['id']
    }
  },
  methods: {
    goToBack(){
      this.$router.push('/cars');
    }
  },
  watch: {
    route(toR, FromR){
      this.id = toR.params['id'];
    }
  }
}

</script>

<style>

</style>
