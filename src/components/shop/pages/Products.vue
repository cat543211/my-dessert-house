<template>
  <div>
    <div class="row no-gutters">
      <!-- sidebar -->
      <div class="col-md-5 menu" :class="['bg-'+ page_status]">
        <div class="col-12">
          <ul class="products_menu col-10 offset-md-4 offset-lg-6 offset-xl-9">
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
      <!-- content -->
      <div class="col-md-7">
        <ul class="products col-11 offset-1 row">
          <li v-for="item in filterProducts" :key="item.id" class="product_item col-12 col-sm-6">
            <div class="item_img"
            :style="{ 'background-image': 'url(' + item.imageUrl + ')' }"></div>
            <h3 class="item_title">
              {{ item.title }}
            </h3>
            <div class="item_description">
              {{ item.description }}
            </div>
          </li>
        </ul>
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
      pager: 1,
      products: [],
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
    getProducts() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/products?page=${this.pager}`;

      this.$http.get(api).then((response) => {
        if (response.data.success) {
          const enabledProducts = response.data.products.filter(item => item.is_enabled);
          vm.products = enabledProducts;
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
      });
    },
  },
  computed: {
    filterProducts() {
      const vm = this;
      if (this.page_status === 'all') {
        return this.products;
      }
      return this.products.filter(item => item.category === vm.page_status);
    },
  },
  watch: {
    status() {
      this.pageType();
    },
  },
  created() {
    this.pageType();
    this.getProducts();
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
  @include media-breakpoint-down(sm) {
    height: 200px;
    margin-bottom: 50px;
    background-size: 100%;
    background-position: center top;
  }
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
  @include media-breakpoint-down(sm) {
    margin-top: 10px;
  }
}

.menu_list {
  opacity: 0.6;
  &:hover,
  &.active {
    opacity: 1;
  }
}

.products {
  @include media-breakpoint-up(sm) {
    height: 80vh;
    overflow: scroll;
  }
}

.product_item {
  cursor: pointer;
  margin-bottom: 40px;

  &:hover .item_img::before {
    background: transparent;
    left: 0px;
    top: 0px;
    opacity: 1;
    border: 5px solid $main_red;
  }
}

.item_img {
  width: 80%;
  height: 0px;
  padding-bottom: 80%;
  position: relative;
  background-position: center;
  background-size: cover;
  margin: 0 20px 20px 0;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: $main_red;
    left: 10px;
    top: 10px;
    position: absolute;
    opacity: 0.2;
    transition: all 0.5s;
    @include media-breakpoint-down(sm) {
      display: none;
    }
  }
}
</style>
