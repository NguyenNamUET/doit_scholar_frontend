<template>
  <b-dropdown aria-role="list">
    <button class="button is-light" type="button" slot="trigger">
      <template v-if="type === 'fos'">
        <span>{{ $t('general_attribute.fos') }}</span>
      </template>
      <template v-if="type === 'venue'">
        <span>{{ $t('general_attribute.venue') }}</span>
      </template>
      <template v-if="type === 'year'">
        <span>{{ $t('general_attribute.year') }}</span>
      </template>
      <b-icon icon="menu-down"></b-icon>
    </button>
    <!------------------------------------- FOS DROPDOWN ------------------------------------------>
    <b-dropdown-item
      v-if="type === 'fos'"
      :focusable="false"
      custom
    >
      <div>
        <b-field>
          <b-input placeholder="Search..."
                   type="search"
                   icon-pack="fas"
                   icon="search">
          </b-input>
        </b-field>
      </div>
      <div class="option_container">
        <b-table
          :data="data"
          :columns="fos_column"
          :selected.sync="selected"
          checkable
        >
        </b-table>
      </div>
      <nav class="level">
        <div class="level-left">
          <button class="level-item button is-danger">{{ $t('general_attribute.clear') }}</button>
        </div>
        <div class="level-right">
          <button class="level-item button is-success">{{ $t('general_attribute.apply') }}</button>
        </div>
      </nav>
    </b-dropdown-item>
    <!------------------------------------- FOS DROPDOWN ------------------------------------------>

    <!------------------------------------- VENUE DROPDOWN ------------------------------------------>
    <b-dropdown-item
      v-if="type === 'venue'"
      :focusable="false"
      custom
    >
      <div>
        <b-field>
          <b-input placeholder="Search..."
                   type="search"
                   icon-pack="fas"
                   icon="search">
          </b-input>
        </b-field>
      </div>
      <div class="option_container">
        <b-table
          :data="data"
          :columns="venue_column"
          :selected.sync="selected"
          checkable
        >
        </b-table>
      </div>
      <nav class="level">
        <div class="level-left">
          <button class="level-item button is-danger">{{ $t('general_attribute.clear') }}</button>
        </div>
        <div class="level-right">
          <button class="level-item button is-success">{{ $t('general_attribute.apply') }}</button>
        </div>
      </nav>
    </b-dropdown-item>
    <!------------------------------------- VENUE DROPDOWN ------------------------------------------>

    <!------------------------------------- YEAR DROPDOWN ------------------------------------------>
    <b-dropdown-item
      v-if="type === 'year'"
      :focusable="false"
      custom
    >
      <div class="time_option_container">
        <p class="button is-light">{{ $t('recent_year')}}</p>
        <p class="button is-light">{{ $t('3_year')}}</p>
        <p class="button is-light">{{ $t('5_year')}}</p>
        <br>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <b-field :label="$t('from')" :label-position="'on-border'">
                <b-input size="is-small" style="width: 100px"></b-input>
              </b-field>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-field :label="$t('to')" :label-position="'on-border'">
                <b-input size="is-small" style="width: 100px"></b-input>
              </b-field>
            </div>
          </div>
        </nav>
        <CitationBar
          :dataset="data.data"
          :labels="data.label"
          :title="$t('general_attribute.publication')"
        >
        </CitationBar>
        <nav class="level">
          <div class="level-left">
            <button class="level-item button is-danger">{{ $t('general_attribute.clear') }}</button>
          </div>
          <div class="level-right">
            <button class="level-item button is-success">{{ $t('general_attribute.apply') }}</button>
          </div>
        </nav>
      </div>
    </b-dropdown-item>
        <!------------------------------------- YEAR DROPDOWN ------------------------------------------>

  </b-dropdown>
</template>

<script>
import CitationBar from "@/components/search_page/CitationBar";
export default {
  name: "FilterBox",
  components: {CitationBar},
  props: ['type','data'],
  data() {
    return {
      selected: [],
      fos_column: [
        {
          field: 'fos', //change this to fos when has real data
          label: this.$t('general_attribute.fos')
        },
        {
          field: 'count',
          label: this.$t('general_attribute.count'),
          numeric: true
        }
      ],
      venue_column: [
        {
          field: 'venue',
          label: this.$t('general_attribute.venue')
        },
        {
          field: 'count',
          label: this.$t('general_attribute.count'),
          numeric: true
        }
      ]
    }
  },
  i18n: {
    messages: {
      en: {
        "recent_year": "This Year",
        "3_year": "Recent 3 Years",
        "5_year": "Recent 5 Years",
        "from": "From year",
        "to": 'To year'
      },
      vi: {
        "recent_year": "Năm nay",
        "3_year": "3 năm gần đây",
        "5_year": "5 năm gần đây",
        "from": "Từ năm",
        "to": 'Đến năm'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.option_container {
  overflow-y: auto;
  min-width: 500px;
  max-height: 300px;
  margin: 10px 0 10px 0;
}
.time_option_container {
  margin: 10px 0 10px 0;
  min-width: 250px;
  .button {
    display: block;
    margin: 5px;
  }
}
</style>
