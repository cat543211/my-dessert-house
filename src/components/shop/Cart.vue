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
          <ul class="col-10 offset-1 col-md-12 offset-md-0 no-gutters">
            <li v-for="item in cartList"
            class="cart_item col-12 row" :key="item.id">
              <div class="col-12 col-md-7">
                <div class="item_img"
                :style="{ 'background-image': 'url(' + item.product.imageUrl + ')' }"></div>
              </div>
              <div class="col-12 col-md-5">
                <h3>{{ item.product.title }} x {{ item.qty }}</h3>
                <div class="item_price">
                  <h4> Price: {{ item.product.price }}</h4>
                  <h4> Total: {{ item.total }}</h4>
                </div>
                <button type="button" class="btn item_btn"
                @click.prevent="delItem">Delete</button>
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

      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.cartList = response.data.data.carts;
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  border-radius: 0.3rem 0 0 0.3rem;
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
</style>
