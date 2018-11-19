<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" v-if="cartStatus.isLoading">
          <i class="fas fa-asterisk loading"></i>
        </div>
        <div class="modal-content" v-else>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <ul class="col-10 offset-1 col-md-12 offset-md-0 no-gutters text-center" v-if="cartStatus.isEmpty">
            <li>
              <h3>Empty</h3>
            </li>
          </ul>
          <ul class="col-10 offset-1 col-md-12 offset-md-0 no-gutters" v-else>
            <li v-for="item in cartList"
            class="cart_item col-12 row" :key="item.id">
              <div class="col-12 col-md-7">
                <div class="item_img"
                :style="{ 'background-image': 'url(' + item.product.imageUrl + ')' }"></div>
              </div>
              <div class="col-12 col-md-5">
                <h3>{{ item.product.title }} x {{ item.qty }}</h3>
                <div class="item_price">
                  <h4> Price: {{ item.product.price }}</h4>
                  <h4> Total: {{ item.total }}</h4>
                </div>
                <button type="button" class="btn item_btn"
                @click.prevent="delItem(item.id)">Delete</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      cartStatus: {
        isEmpty: false,
        isLoading: false,
      },
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/cart`;

      vm.cartStatus.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.cartList = response.data.data.carts;
          vm.cartList.length == 0 ? vm.cartStatus.isEmpty = true : vm.cartStatus.isEmpty = false;
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
        vm.cartStatus.isLoading = false;
      });
    },
    delItem(delId) {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/cart/${delId}`;

      vm.cartStatus.isLoading = true;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.getCart();
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
        vm.cartStatus.isLoading = false;
      });
    },
  },
  created() {
    const vm = this;
    this.getCart();
    this.$bus.$on('refreshCart', () => {
      vm.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  border-radius: 0.3rem 0 0 0.3rem;
  min-height: 100vh;
}

.modal.fade .modal-dialog {
  transform: translate(100%, 0);
  right: 0;
  position: absolute;
  width: 500px;
  margin: 0;

  @include media-breakpoint-down(sm) {
    width: 300px;
  }
}

.modal.show .modal-dialog {
  transform: translate(0, 0);
}

.empty {
  height: 100vh;
}
</style>
