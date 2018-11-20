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
          <li v-if="loadingStatus.loadingList">
            <i class="fas fa-asterisk loading"></i>
          </li>
          <li v-else v-for="item in filterProducts"
          :key="item.id"
          class="product_item col-12 col-sm-6"
          data-target="#itemModal" data-toggle="modal"
          @click.prevent="getProductDetail(item)">
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

    <!-- Modal -->
    <div class="modal fade" id="itemModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" v-if="loadingStatus.loadingItem">
          <i class="fas fa-asterisk loading"></i>
        </div>
        <div class="modal-content" v-else>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="col-10 offset-1 row">
            <div class="col-12 col-sm-7">
              <div class="item_img"
              :style="{ 'background-image': 'url(' + product.imageUrl + ')' }"></div>
            </div>
            <div class="col-12 col-sm-5">
              <h2>{{ product.title }}</h2>
              <p>{{ product.description }}</p>
              <div class="item_price" v-if="product.origin_price">
                <h4> Origin price: {{ product.origin_price }}</h4>
                <h4> New price: {{ product.price }}</h4>
              </div>
              <div class="item_price" v-else>
                <h4> Price: {{ product.price }}</h4>
              </div>
              <span>Buy </span>
              <select v-model.number="addItem.qty" class="item_qty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="button" class="btn item_btn"
              @click.prevent="addToCart(product.id)">Add to Cart</button>
            </div>
            <div class="col-12">
              <p>{{ product.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  props: ['status'],
  data() {
    return {
      page_status: 'all',
      pager: 1,
      products: [],
      product: {},
      addItem: {
        qty: 1,
        product_id: '',
      },
      loadingStatus: {
        loadingItem: false,
        loadingList: false,
      },
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
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/products?page=${this.pager}`;

      this.loadingStatus.loadingList = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          const enabledProducts = response.data.products.filter(item => item.is_enabled);
          this.products = enabledProducts;
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
        this.loadingStatus.loadingList = false;
      });
    },
    getProductDetail(item) {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/product/${item.id}`;

      this.loadingStatus.loadingItem = true;
      this.product = {};
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.product = response.data.product;
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
        this.loadingStatus.loadingItem = false;
      });
    },
    addToCart(addId) {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/cart`;

      this.loadingStatus.loadingItem = true;
      this.addItem.product_id = addId;
      this.$http.post(api, { data: this.addItem }).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('refreshCart');
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
        $('#itemModal').modal('hide');
        this.loadingStatus.loadingItem = false;
        this.addItem = {
          qty: 1,
          product_id: '',
        };
      });
    },
  },
  computed: {
    filterProducts() {
      if (this.page_status === 'all') {
        return this.products;
      }
      return this.products.filter(item => item.category === this.page_status);
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
    max-height: calc(100vh - 140px);
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
