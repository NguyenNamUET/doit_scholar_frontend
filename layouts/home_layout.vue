<template>
  <div id="body_container">
    <Nuxt />
  </div>
</template>

<script>
    export default {
        name: "home_layout",
      head() {
        return this.$nuxtI18nSeo();
      }
    }
</script>

<style scoped>
  #body_container {
    margin: 0;
  }
</style>
