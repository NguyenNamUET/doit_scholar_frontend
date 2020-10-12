<template>
  <div class="tile">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination"
           :class="{'is-small': isSmall}">
<!--        <nuxt-link v-if="this.currentPage !== 1 && !hidePrevNext"-->
<!--                   class="pagination-previous"-->
<!--                   :to="{ path: whichpage,-->
<!--                          query: { page: this.currentPage-1, start: this.currentPage*perPage, size: perPage}}"-->
<!--                   @click.native="setPageNumbers"-->
<!--                   >-->
<!--          {{ $t('general_attribute.previous') }}-->
<!--        </nuxt-link>-->
<!--        <nuxt-link  v-if="this.currentPage !== pageCount && !hidePrevNext"-->
<!--                    class="pagination-next"-->
<!--                    :to="{ path: whichpage,-->
<!--                           query: { page: this.currentPage+1, start: this.currentPage*perPage, size: perPage}}"-->
<!--                    @click.native="setPageNumbers"-->
<!--                    >-->
<!--          {{ $t('general_attribute.next') }}-->
<!--        </nuxt-link>-->
        <ul class="pagination-list">
          <li v-for="page in pages" >
            <span v-if="page.breakView" class="pagination-ellipsis">&hellip;</span>

            <nuxt-link v-else class="pagination-link is-text"
                       :class="[page.selected ? 'is-current' : '']"
                       :aria-label="'Goto page '+(page.index+1)"
                       @click.native="setPageNumbers"
                       :to="{ path: whichpage,
                               query: { page: page.index+1, start: page.index*perPage, size: perPage}}">
              {{page.content}}
            </nuxt-link>

         </li>
        </ul>
      </nav>
  </div>

</template>

<script>
export default {
  name: "PaginationV2",
  props: {
    isSmall:{
      type: Boolean
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    },
    pageCount: {
      type: Number,
      required: true
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    whichpage: {
      type: String
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  computed:{
    pages: function ()  {
      let items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.currentPage - 1)
          }
          items[index] = page
        }
      }
      else {
        const halfPageRange = Math.floor(this.pageRange / 2)
        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.currentPage - 1)
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
        if (this.currentPage - halfPageRange > 0) {
          selectedRangeLow = this.currentPage - 1 - halfPageRange;
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
  data () {
    return {
      currentPage: null
    }
  },
  beforeUpdate() {
    this.setPageNumbers()
  },
  methods: {
    setPageNumbers () {
      let currentPage_pattern = /(?<=page=)\d+/g
      let _currentPage = currentPage_pattern.exec(this.whichpage)
      if (_currentPage){
        this.currentPage = _currentPage[0]
      }
      else{
        this.currentPage = 1
      }
    }
  }
}
</script>

<style lang="css" scoped>
a:hover {
 text-decoration: none;
}

.tile {
  padding-top: 0.2rem; padding-bottom: 0.2rem;
}

</style>
