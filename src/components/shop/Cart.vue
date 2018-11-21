<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <!-- cart loading -->
        <div class="modal-content" v-if="cartStatus.isLoading">
          <i class="fas fa-asterisk loading"></i>
        </div>
        <!-- loading finish -->
        <div class="modal-content" v-else>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <!-- cart empty -->
          <ul class="col-10 offset-1 col-md-12 offset-md-0 no-gutters text-center"
          v-if="cartStatus.isEmpty">
            <li>
              <h3>Empty</h3>
            </li>
          </ul>
          <!-- step1 -->
          <ul class="col-10 offset-1 col-md-12 offset-md-0 no-gutters"
          v-if="!cartStatus.isEmpty && step === 1">
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
                  <h4 v-if="usedCoupon && !hasNewItem"> Coupon Price: {{ item.final_total }}</h4>
                </div>
                <button type="button" class="btn item_btn back"
                @click.prevent="delItem(item.id)">Delete</button>
              </div>
            </li>
            <li class="cart_item col-12 row">
              <div class="col-12 total_price text-center">
                <h2>Total Price: {{ total.origin_total }}</h2>
                <h2 v-if="usedCoupon">Final Price: {{ total.final_total }}</h2>
              </div>
              <div class="col-12">
                <button type="button" class="btn item_btn"
                @click.prevent="step = 2">Checkout</button>
              </div>
              <div class="coupon_block col-12" v-if="!usedCoupon || hasNewItem">
                <input type="text" placeholder="Text Coupon Code" v-model="coupon.code">
                <button type="button" class="btn item_btn"
                @click.prevent="useCoupon">Use Coupon</button>
              </div>
              <div class="col-12" v-else>
                <h3 class="text-center">( Use Coupon: {{cartList[0].coupon.title}} )</h3>
              </div>
            </li>
          </ul>
          <!-- step2 -->
          <ul class="col-10 offset-1 col-md-12 offset-md-0 no-gutters"
          v-if="!cartStatus.isEmpty && step === 2">
            <li class="create_order">
              <div class="col-12">
                <h3>Name</h3>
                <input type="text" v-model="newOrder.user.name" placeholder="Required">
                <h3>Email</h3>
                <input type="text" v-model="newOrder.user.email">
                <h3>Phone</h3>
                <input type="text" v-model="newOrder.user.tel">
                <h3>Address</h3>
                <input type="text" v-model="newOrder.user.address">
                <h3>Message</h3>
                <input type="text" v-model="newOrder.message" placeholder="Required">
              </div>
              <div class="col-12 btn_set row no-gutters">
                <div class="col-12 col-md-5">
                  <button type="button" class="btn item_btn back"
                  @click.prevent="step = 1">Back</button>
                </div>
                <div class="col-12 col-md-5 offset-md-2">
                  <button type="button" class="btn item_btn"
                  @click.prevent="checkout">Send</button>
                </div>
              </div>
            </li>
          </ul>
          <!-- step3 -->
          <ul class="col-10 offset-1 col-md-12 offset-md-0 no-gutters"
          v-if="!cartStatus.isEmpty && step === 3">
            <li>
              <div class="col-12 row justify-content-center">
                <h2 class="d-flex">Completed</h2>
              </div>
              <div class="col-12 btn_set row">
                <div class="col-12 col-md-8 offset-md-2">
                  <button type="button" class="btn item_btn back"
                  @click.prevent="finishOrder(1)">Buy more</button>
                </div>
                <div class="col-12 col-md-8 offset-md-2">
                  <button type="button" class="btn item_btn"
                  @click.prevent="finishOrder(2)">
                    Pay this order
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      cartList: [],
      cartStatus: {
        isEmpty: false,
        isLoading: false,
      },
      total: {
        origin_total: 0,
        final_total: 0,
      },
      usedCoupon: false,
      hasNewItem: false,
      coupon: {
        code: '',
      },
      step: 1,
      newOrder: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/cart`;

      this.cartStatus.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.cartList = response.data.data.carts;
          this.total.origin_total = response.data.data.total;
          this.cartStatus.isEmpty = this.cartList.length === 0;
          if (!this.cartStatus.isEmpty && this.cartList[0].coupon && !this.hasNewItem) {
            this.usedCoupon = true;
          }
          if (this.usedCoupon) this.total.final_total = response.data.data.final_total;
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
        this.cartStatus.isLoading = false;
      });
    },
    delItem(delId) {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/cart/${delId}`;

      this.cartStatus.isLoading = true;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.getCart();
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
        this.cartStatus.isLoading = false;
      });
    },
    useCoupon() {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/coupon`;

      this.$http.post(api, { data: this.coupon }).then((response) => {
        if (response.data.success) {
          this.usedCoupon = true;
          this.hasNewItem = false;
          this.getCart();
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
      });
    },
    checkout() {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/order`;

      this.cartStatus.isLoading = true;
      this.$http.post(api, { data: this.newOrder }).then((response) => {
        if (response.data.success) {
          this.step = 3;
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
        this.cartStatus.isLoading = false;
      });
    },
    finishOrder(status) {
      if (status === 1) {
        // buy more
        this.$router.push('/products');
      } else {
        // status 2 => pay order
        this.$router.push('/orders');
      }
      this.step = 1;
      $('#cartModal').modal('hide');
      this.newOrder = {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      };
      this.getCart();
    },
  },
  created() {
    this.getCart();
    this.$bus.$on('refreshCart', () => {
      this.step = 1;
      this.usedCoupon = false;
      this.hasNewItem = true;
      this.getCart();
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

.total_price {
  padding-top: 20px;
  h2 {
    @include font_b($font_color: $main_gray, $font_size: 20px);
    &:last-child {
      @include font_b($font_color: $main_red, $font_size: 20px);
    }
  }
}

.coupon_block {
  margin-top: 20px;
  border-top: 4px dashed $main_light_gray;
  input {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .item_btn {
    width: 100%;
    background: $main_red;
  }
}

.create_order {
  h3 {
    margin-top: 20px;
  }
  input {
    width: 100%;
  }
  .btn_set {
    margin-top: 20px;
  }
}

.item_btn.back {
  background: $main_light_gray;
}
</style>
