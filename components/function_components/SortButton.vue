<template>
    <b-dropdown v-model="sort_field" aria-role="list">
        <button class="button is-primary" type="button" slot="trigger">
            <template v-if="sort_field==='score'">
                <span>{{ $t('general_attribute.sort.by_score') }}</span>
            </template>
            <template v-if="sort_field==='year'">
                <span>{{ $t('general_attribute.sort.by_year') }}</span>
            </template>
            <template v-if="sort_field==='citations_count'">
                <span>{{ $t('general_attribute.sort.by_cit_count') }}</span>
            </template>
            <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item :value="'score'" aria-role="listitem">
            <div class="media">
                <div class="media-content">
                    <h3>{{ $t('general_attribute.sort.by_score') }}</h3>
                </div>
            </div>
        </b-dropdown-item>
        <b-dropdown-item :value="'year'" aria-role="listitem">
            <div class="media">
                <div class="media-content">
                    <h3>{{ $t('general_attribute.sort.by_year') }}</h3>
                </div>
            </div>
        </b-dropdown-item>

        <b-dropdown-item :value="'citations_count'" aria-role="listitem">
            <div class="media">
                <div class="media-content">
                    <h3>{{ $t('general_attribute.sort.by_cit_count') }}</h3>
                </div>
            </div>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
export default {
  name: "SortButton",
  props: ["whichpage"],
  data() {
    return {
      sort_field: "score"
    }
  },
  beforeUpdate() {
    this.$router.push({path: this.whichpage, query: {sort: this.sort_field}})
  }
}
</script>

<style scoped>

</style>
