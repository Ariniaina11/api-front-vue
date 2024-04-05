<template>
  <HeaderComponent />
  <MainComponent />
  <FooterComponent author="Mamitiana"/>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import MainComponent from './components/MainComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent
  },
  data(){
    return{
      title: this.$store.state.title
    }
  }
}
</script>

<style>

</style>
