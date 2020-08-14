<template>
  <div class="dropdown">
    <div class="dropdown-trigger">
      <button class="button"
              aria-haspopup="true" aria-controls="dropdown-menu3"
              onclick="javascript:document.querySelector('.dropdown').classList.toggle('is-active')"
              >
        <span>Lĩnh vực</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content" v-for="item in this.msg">
        <label class="checkbox dropdown-item">
          <input type="checkbox"
                 :value="item.key"
                 v-model="checkedCategories"
                 @change="check($event)">
            {{item.key}} ({{item.doc_count}})
          </label>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "DropDown",
      props: ['msg'],
      data(){
        return{
          checkedCategories: []
        }
      },
      methods: {
        check(e) {
          console.log(this.checkedCategories)
          this.$emit("update-fos-checked", this.checkedCategories)
          //do searching here
        }
      }
    }

</script>

<style scoped>

</style>
