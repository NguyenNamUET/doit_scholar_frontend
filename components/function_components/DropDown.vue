<template>
  <div class="dropdown" :class="{'is-active': isActive}">
    <div class="dropdown-trigger">
      <button class="button"
              aria-haspopup="true" aria-controls="dropdown-menu3"
              @click="isActive = !isActive"
              >
        <span>{{dd_data.msg}}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content" :class="{control: !dd_data.isMulti }"
           v-for="item in dd_data.fields">
        <!--This dropdown uses checkbos (multiple checked) -->
        <label v-if="dd_data.isMulti" class="checkbox dropdown-item">
          <input @focus="isActive=false" type="checkbox"
                 :value="item.key"
                 v-model="checkedCategories"
                 @change="check($event)">
            {{item.key}} ({{item.doc_count}})
        </label>
        <!--This dropdown uses radio button (single checked)-->
        <label v-else class="radio dropdown-item">
          <input type="radio"
                 :value="item.key"
                 name="venue"
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
      props: ['dd_data'],
      data(){
        return{
          checkedCategories: [],
          isActive: false
        }
      },
      methods: {
        check(e) {
          console.log(this.checkedCategories)
          if (this.dd_data.msg === 'Lĩnh vực'){
            this.$emit("update-fos-checked", this.checkedCategories)
          }
          else if (this.dd_data.msg === 'Tác giả'){
            this.$emit("update-authors-checked", this.checkedCategories)
          }
          else{
            this.$emit("update-venues-checked", this.checkedCategories)
            console.log(this.checkedCategories)
          }
        }
      }
    }

</script>

<style scoped>

</style>
