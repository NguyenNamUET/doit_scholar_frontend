<template>
  <div class="tile py-2">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination"
           :class="{'is-small': isSmall}">
        <a v-if="!(firstPageSelected() && hidePrevNext)" class="pagination-previous"
           @click="prevPage()" @keyup.enter="prevPage()">Trước</a>
        <a v-if="!(lastPageSelected() && hidePrevNext)" class="pagination-next"
           @click="nextPage()" @keyup.enter="nextPage()">Sau</a>

        <ul class="pagination-list">
          <li v-for="page in pages">
            <span v-if="page.breakView" class="pagination-ellipsis">&hellip;</span>
            <a v-else-if="page.disabled" class="pagination-link is-text" :aria-label="'Goto page '+page.content">{{ page.content }}</a>
            <a v-else class="pagination-link is-text" :aria-label="'Goto page '+page.content"
               :class="[page.selected ? 'is-current' : '']"
               @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)">
                  {{page.content}}
            </a>
         </li>
        </ul>
      </nav>
  </div>

</template>

<script>
export default {
  name: "Pagination",
  props: {
    isSmall:{
      type: Boolean
    },
    value: {
      type: Number
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => { }
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  computed: {
    selected: {
      get: function() {
        return this.value || this.innerValue
      },
      set: function(newValue) {
        this.innerValue = newValue
      }
    },
    pages: function () {
      let items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)
        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
        let setBreakView = index => {
          let breakView = {
            disabled: true,
            breakView: true
          }
          items[index] = breakView
        }
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }
      return items
    }
  },
  data() {
    return {
      innerValue: 1,
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return
      this.innerValue = selected
      this.$emit('input', selected)
      this.clickHandler(selected)
    },
    prevPage() {
      if (this.selected <= 1) return
      this.handlePageSelected(this.selected - 1)
    },
    nextPage() {
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.selected + 1)
    },
    firstPageSelected() {
      return this.selected === 1
    },
    lastPageSelected() {
      return (this.selected === this.pageCount) || (this.pageCount === 0)
    },
    selectFirstPage() {
      if (this.selected <= 1) return
      this.handlePageSelected(1)
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.pageCount)
    }
  }
}
</script>

<style lang="css" scoped>
a:hover {
 text-decoration: none;
}

</style>
