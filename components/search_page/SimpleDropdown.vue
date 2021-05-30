<template>
  <b-dropdown
    :scrollable="true"
    :max-height="200"
    v-model="selected"
    aria-role="list"
  >
    <template #trigger>
      <b-button
        :label="selected.name.length > 20 ? selected.name.slice(0,20) + '...' : selected.name"
        icon-right="menu-down"
      />
    </template>


    <b-dropdown-item
      v-for="(item, index) in renderData"
      :key="index"
      :value="item"
      @click="handleSelect"
      aria-role="listitem"
    >
      <div class="media">
        <div class="media-content">
          <h3>{{item.name}} <span v-if="item.value != null">({{item.value}})</span></h3>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: "SimpleDropdown",
  props: ['data'],
  data() {
    return {
      selected: {
        name: 'venue',
        value: 0
      },
      type: null,
      types: [
        {
          name: 'venue',
          value: 'Journal'
        },
        {
          name: 'year',
          value: 'Published year'
        },
        {
          name: 'mag_field_of_study',
          value: 'Fields of study'
        },
        {
          name: "sort",
          value: "Sort by"
        }
      ],
      renderData: null,
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    beautify: function (value) {
      if (value.includes("[")) {
        value = value.replace("[", "")
        value = value.replace("]", "")
      }
      return value
    }
  },
  methods: {
    handleSelect() {
      let data = {}
      data['name'] = this.type
      data['value'] = this.selected.name
      this.$emit("handleSelect", data)
    }
  },
  created() {
    let item;
    console.log(this.data)
    this.type = this.data.name
    for (item of this.types) {
      if (item.name === this.data.name) {
        this.selected.name = item.value
      }
    }
    this.renderData = this.data.value
  }
}
</script>

<style scoped>

</style>
