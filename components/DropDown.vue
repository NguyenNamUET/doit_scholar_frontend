<template>
  <div class="select">
    <select>
      <option v-for="item in this.msg">
        {{item}}
      </option>
    </select>
  </div>
</template>

<script>
    export default {
      name: "DropDown",
      props: ['msg']
    }
</script>

<style scoped>

</style>
