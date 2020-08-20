<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-8 is-vertical">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous pagi-button" @click="handlePreviousandNext(true)">Trang trước</a>
        <a class="pagination-next pagi-button" @click="handlePreviousandNext(false)">Trang sau</a>

<!--         for example 1 2 3 ... 13-->
        <ul class="pagination-list" v-if="isPaginationReStyle === 0">
          <li v-for="page in page_array.slice(0,3)"
            @click="handlePageChange(page+1)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
              {{page + 1}}
            </a>
          </li>
          <li v-if="page_num-5 > 0">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li @click="handlePageChange(page_num)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page_num+1)">
              {{page_num + 1}}
            </a>
          </li>
        </ul>

        <!-- for example 1 ... 4 5 6 ... 13-->
        <ul class="pagination-list" v-if="isPaginationReStyle === 1">
          <li @click="handlePageChange(1)">
            <a class="pagination-link pagi-button" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>

          <li @click="handlePreviousandNext(true)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (current_page - 1)">
              {{current_page - 1}}
            </a>
          </li>
          <li>
            <a class="pagination-link pagi-button is-current" :aria-label="'Goto page ' + (current_page)">
              {{current_page}}
            </a>
          </li>
           <li @click="handlePreviousandNext(false)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (current_page + 1)">
              {{current_page + 1}}
            </a>
          </li>

          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li @click="handlePageChange(page_num)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page_num+1)">
              {{page_num + 1}}
            </a>
          </li>
        </ul>

        <!-- for example 1 ... 11 12 13-->
        <ul class="pagination-list" v-if="isPaginationReStyle === 2">
          <li @click="handlePageChange(1)">
            <a class="pagination-link pagi-button" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>

          <li v-for="page in page_array.slice(current_page-1,current_page+3)"
            @click="handlePageChange(page)">
            <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
              {{page + 1}}
            </a>
          </li>
        </ul>

      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total_count", "current_page"],
  data() {
    return {
      per_page: 1,
      isPaginationReStyle: 0
    }
  },
  computed:{
    page_num: function () {
      return Math.ceil(this.total_count/this.per_page)
    },
    page_array: function() {
      return Array.from(Array(this.page_num).keys())
    }
  },
  mounted(){
    if ((this.total_count/this.per_page) > 5) {
        if (this.current_page >= 3 && this.current_page <= (this.total_count / this.per_page) - 5) {
          this.isPaginationReStyle = 1
        } else if (this.current_page === (this.total_count / this.per_page) - 3) {
          this.isPaginationReStyle = 2
        } else {
          this.isPaginationReStyle = 0
        }
      }
      else{
        this.isPaginationReStyle = 0
      }
  },
  methods:{
    async handlePageChange(current_page) {
      if ((this.total_count/this.per_page) > 5) {
        if (current_page >= 3 && current_page <= (this.total_count / this.per_page) - 5) {
          this.isPaginationReStyle = 1
          this.current_page = current_page
        } else if (current_page === (this.total_count / this.per_page) - 3) {
          this.isPaginationReStyle = 2
          this.current_page = current_page
        } else {
          this.isPaginationReStyle = 0
          this.current_page = current_page
        }
      }
      else{
        this.isPaginationReStyle = 0
      }

      let start = (current_page - 1) * this.per_page;
      let size = this.per_page;
      let page = this.current_page;
      this.$emit("update_page", start, size, page)
    },

    handlePreviousandNext(isPrevious) {
      if (isPrevious) {
        this.current_page = Math.max(1, this.current_page - 1)
        this.handlePageChange(this.current_page)
      } else {
        this.current_page = Math.min(this.current_page + 1, this.page_num)
        this.handlePageChange(this.current_page)
      }
    }
  }
}
</script>

<style scoped>

</style>
