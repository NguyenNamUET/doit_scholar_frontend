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
           v-for="(item,index) in dd_data.fields" :key="index">
        <!--This dropdown uses checkbos (multiple checked) -->
        <label v-if="dd_data.isMulti" class="checkbox dropdown-item">
          <input type="checkbox"
                 :value="item.key|isAnonymous"
                 :name="item.key"
                 v-model="item.checked"
                 @change="check($event)">
            {{item.key | isAnonymous}} ({{item.doc_count}})
        </label>
        <!--This dropdown uses radio button (single checked)-->
        <label v-else class="radio dropdown-item">
          <input type="radio"
                 :value="item.key|isAnonymous"
                 name="venue"
                 v-model="item.checked"
                 @change="check($event)">
          {{item.key | isAnonymous}} ({{item.doc_count}})
        </label>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name: "DropDown",
      props: ['dd_data'],
      computed: {
        checkedCategories() {
          return this.dd_data.fields.filter(item => item.checked).map(item => item.key)
        }
      },
      filters:{
        isAnonymous: function (field_name){
          if(field_name === ""){
            return "Anonymous"
          }
          return field_name
        }
      },
      data(){
        return{
          isActive: false
        }
      },
      methods: {
        check(e) {
          console.log(this.checkedCategories)
          if (this.dd_data.msg === 'Lĩnh vực'){
            this.$emit("update-fos-checked", this.checkedCategories)
            console.log("Lĩnh vực checkedCategories: ", this.checkedCategories)
            console.log("Lĩnh vực dd_data: ", this.dd_data)
          }
          else if (this.dd_data.msg === 'Tác giả'){
            this.$emit("update-authors-checked", this.checkedCategories)
            console.log("Tác giả: ", this.checkedCategories)
            console.log("Tác giả dd_data: ", this.dd_data)
          }
          else{
            this.$emit("update-venues-checked", this.checkedCategories)
            console.log("Hội nghị: ", this.checkedCategories)
            console.log("Hội nghị dd_data: ", this.dd_data)
          }

        }
      }
    }

</script>

<style scoped>

</style>
