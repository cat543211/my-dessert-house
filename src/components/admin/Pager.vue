<template>
  <div>
    <!-- pager -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pager.has_pre}">
          <a class="page-link" href="#" @click.prevent="changePage(pager.current_page - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="(page, key) in pager.total_pages" :key="key"
        :class="{'active' : pager.current_page === page}">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pager.has_next}">
          <a class="page-link" href="#" @click.prevent="changePage(pager.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pager'],
  methods: {
    changePage(newPage) {
      this.$emit('getPage', newPage);
    },
  },
};
</script>
