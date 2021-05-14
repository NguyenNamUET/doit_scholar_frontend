<template>
  <b-dropdown
    :scrollable="true"
    :max-height="200"
    v-model="selected"
    aria-role="list"
  >
    <template #trigger>
      <b-button
        :label="selected.name"
        type="is-primary"
        icon-right="menu-down"
      />
    </template>


    <b-dropdown-item
      v-for="(item, index) in renderData"
      :key="index"
      :value="item"
      aria-role="listitem"
    >
      <div class="media">
        <div class="media-content">
          <h3>{{item.name}} ({{item.value}})</h3>
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
      renderData: null,
    }
  },
  mounted() {
    this.type = this.data.name
    this.selected = this.type
    this.renderData = this.data.value
  }
}
</script>

<style scoped>

</style>
