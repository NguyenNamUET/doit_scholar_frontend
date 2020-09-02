<template>
  <div class="dropdown" :class="dd_data.msg|toClass">
    <div class="dropdown-trigger">
      <button class="button"
              aria-haspopup="true" aria-controls="dropdown-menu3"
              @click="activeDropdown(dd_data.msg)">
        <span>{{dd_data.msg}}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content"
           v-for="item in dd_data.fields" :key="item.key">
        <!--This dropdown uses checkbos (multiple checked) -->
        <label class="checkbox dropdown-item">
          <input type="checkbox"
                 :value="item.key|isAnonymous"
                 :name="item.key"
                 v-model="item.checked"
                 @change="check()">
          {{item.key|isAnonymous}}
          <span v-if="item.doc_count > 0">({{item.doc_count}})</span>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
    import {fields_dict} from "assets/utils";

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
        },
        toClass: function (msg){
          let words = _.words(msg)
          return _.head(words)[0]+_.last(words)[0]
        }
      },
      data(){
        return{
          isActive: false
        }
      },
      methods: {
        check() {
          if (this.dd_data.msg === 'Lĩnh vực'){
            let converted_checked = []
            this.checkedCategories.forEach(item => {
              converted_checked.push(fields_dict[item])
            })
            this.$emit("update-fos-checked", converted_checked)
            // console.log("Lĩnh vực checkedCategories: ", converted_checked)
            // console.log("Lĩnh vực dd_data: ", this.dd_data)
          }
          else if (this.dd_data.msg === 'Tác giả'){
            this.$emit("update-authors-checked", this.checkedCategories)
            // console.log("Tác giả: ", this.checkedCategories)
            // console.log("Tác giả dd_data: ", this.dd_data)
          }
          else{
            this.$emit("update-venues-checked", this.checkedCategories)
            // console.log("Hội nghị: ", this.checkedCategories)
            // console.log("Hội nghị dd_data: ", this.dd_data)
          }
        },
        activeDropdown(current_dropdown){
          //To allow one dropdown active at a time
          if(current_dropdown==="Lĩnh vực"){
            document.querySelector(".Lv").classList.toggle('is-active')
            document.querySelector(".Tg").classList.remove('is-active')
            document.querySelector(".Hn").classList.remove('is-active')
          }
          else if(current_dropdown==="Tác giả"){
            document.querySelector(".Tg").classList.toggle('is-active')
            document.querySelector(".Lv").classList.remove('is-active')
            document.querySelector(".Hn").classList.remove('is-active')
          }
          else if(current_dropdown==="Hội nghị"){
            document.querySelector(".Hn").classList.toggle('is-active')
            document.querySelector(".Lv").classList.remove('is-active')
            document.querySelector(".Tg").classList.remove('is-active')
          }
        },
      }
    }

</script>

<style scoped>

</style>
