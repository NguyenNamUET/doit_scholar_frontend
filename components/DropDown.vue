<template>
  <div class="dropdown" :class="'dropdown-'+dd_data.type">
    <div class="dropdown-trigger">
      <button class="button"
              aria-haspopup="true" aria-controls="dropdown-menu3"
              @click="activeDropdown()"
              >
        <span>{{dd_data.msg}}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content" v-for="item in dd_data.fields">
        <label v-if="dd_data.type === 0" class="checkbox dropdown-item">
          <input type="checkbox"
                 :value="item.key"
                 v-model="checkedCategories"
                 @change="check($event)">
            {{item.key}} ({{item.doc_count}})
        </label>
        <label v-else class="checkbox dropdown-item">
          <input type="checkbox"
                 :value="item.name.buckets[0].key"
                 v-model="checkedCategories"
                 @change="check($event)">
            {{item.name.buckets[0].key}} ({{item.doc_count}})
        </label>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "DropDown",
      props: ['dd_data'],
      data(){
        return{
          checkedCategories: []
        }
      },
      methods: {
        activeDropdown(){
          //To allow one dropdown active at a time
          let isnotActive = '.dropdown-'+this.dd_data.type
          let isActive= '.dropdown-'+(1-this.dd_data.type)
          document.querySelector(isnotActive).classList.toggle('is-active')
          document.querySelector(isActive).classList.remove('is-active')
        },
        check(e) {
          console.log(this.checkedCategories)
          if (this.dd_data.type === 0){
            this.$emit("update-fos-checked", this.checkedCategories)
          }
          else{
            this.$emit("update-authors-checked", this.checkedCategories)
          }
        }
      }
    }

</script>

<style scoped>

</style>
