<template>
  <div>
    <div class="row no-gutters">
      <div class="col-md-5 menu" :class="['bg-'+ page_status]">
        <div class="col-12">
          <ul class="products_menu col-10 offset-9 ">
            <li>
              <router-link class="menu_list"
              :to="{name: 'Products', params: { status: 'cake' }}"
              :class="{'active': page_status == 'cake'}">Cup Cakes</router-link>
            </li>
            <li>
              <router-link class="menu_list"
              :to="{name: 'Products', params: { status: 'donut' }}"
              :class="{'active': page_status == 'donut'}">Donuts</router-link>
            </li>
            <li>
              <router-link class="menu_list"
              :to="{name: 'Products', params: { status: 'sweet' }}"
              :class="{'active': page_status == 'sweet'}">Sweet</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-7">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['status'],
  data() {
    return {
      page_status: 'all',
    };
  },
  methods: {
    pageType() {
      if (this.status) {
        this.page_status = this.status;
      } else {
        this.page_status = 'all';
      }
    },
  },
  watch: {
    status() {
      this.pageType();
    },
  },
  created() {
    this.pageType();
  },
};
</script>

<style lang="scss" scoped>
.menu {
  height: 80vh;
  background-size: auto 40vw;
  background-repeat: no-repeat;
  background-position: left top;
  position: relative;
}
.bg-all {
  background-image: url('~static/img/all.jpg');
}

.bg-cake {
  background-image: url('~static/img/cake.jpg');
}

.bg-donut {
  background-image: url('~static/img/donut.jpg');
}

.bg-sweet {
  background-image: url('~static/img/sweet.jpg');
}

.products_menu {
  position: relative;
  margin-top: 25vw;
}

.menu_list {
  opacity: 0.6;
  &:hover,
  &.active {
    opacity: 1;
  }
}
</style>
