<template>
  <div class="select">
    <select>
      <option>
        Tất cả
      </option>
      <option v-for="item in this.msg">
        {{item.key}} ({{item.doc_count}})
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
