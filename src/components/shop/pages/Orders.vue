<template>
  <div class="row no-gutters">
    <!-- sidebar -->
    <div class="col-md-5 sidebar"></div>
    <!-- content -->
    <div class="col-md-7">
      <ul class="row col-12 col-md-10 offset-md-1 no-gutters">
        <li v-if="status.ordersLoading">
          <i class="fas fa-asterisk loading"></i>
        </li>
        <li class="order_item col-md-6 col-12 col-xl-4" v-for="(item, key) in orders"
        :key="key" v-else>
          <div class="order_content">
            <h2>{{ getDate(item.create_at) }}</h2>
            <h3>Price: {{Math.floor(item.total)}}</h3>
            <button class="btn item_btn"
            @click.prevent="getOrder(item.id)"
            data-target="#orderModal" data-toggle="modal">Detail</button>
            <button class="btn item_btn"
            @click.prevent="payNow(item.id)" v-if="!item.is_paid">Pay</button>
            <div class="btn item_btn disable" v-else>
              Paid
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" v-if="status.itemLoading">
          <i class="fas fa-asterisk loading"></i>
        </div>
        <div class="modal-content" v-else>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="col-10 offset-1 row no-gutters">
            <div class="col-12">
              <h2>Creat at: {{ getDate(order.create_at) }}</h2>
              <button class="btn item_btn"
              @click.prevent="payNow(order.id)" v-if="!order.is_paid">Pay</button>
              <h3 v-else>Paid date: {{ getDate(order.paid_date) }}</h3>
            </div>
            <ul class="col-12 products_content no-gutters">
              <li class="product_item col-12 row"
              v-for="item in order.products" :key="item.id">
                <div class="col-12 col-md-6">
                  <div class="item_img"
                  :style="{ 'background-image': 'url(' + item.product.imageUrl + ')' }"></div>
                </div>
                <div class="col-12 col-md-6">
                  <h3>{{ item.product.title }} x {{ item.qty }}</h3>
                  <div class="item_price">
                    <h4> Price: {{ item.product.price }}</h4>
                    <h4> Total: {{ item.total }}</h4>
                    <h4 v-if="item.coupon"> Coupon Price: {{ Math.floor(item.final_total) }}</h4>
                  </div>
                </div>
              </li>
              <h2 class="text-center">Total price: {{ Math.floor(order.total) }}</h2>
            </ul>
            <div class="col-12 user_content">
              <div class="col-12">
                <h2>User info</h2>
                <p>Name: {{order.user.name}}</p>
                <p>Phone: {{order.user.tel}}</p>
                <p>Email: {{order.user.email}}</p>
                <p>Address: {{order.user.address}}</p>
                <p>Message: {{ order.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      order: {
        user: {

        },
      },
      status: {
        ordersLoading: false,
        itemLoading: false,
      },
      usedCoupon: false,
    };
  },
  methods: {
    getOrders() {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/orders`;

      this.status.ordersLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.orders = response.data.orders;
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
        this.status.ordersLoading = false;
      });
    },
    payNow(orderId) {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/pay/${orderId}`;

      this.status.ordersLoading = true;
      this.status.itemLoading = true;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.getOrders();
          this.getOrder(orderId);
        }
        this.status.ordersLoading = false;
        this.status.itemLoading = false;
      });
    },
    getOrder(orderId) {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/order/${orderId}`;

      this.status.itemLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.order = response.data.order;
        }
        this.status.itemLoading = false;
      });
    },
    getDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();
      const hh = date.getHours();
      const mm = date.getMinutes();

      // eslint-disable-next-line
      return `${y} / ${m} / ${d} ${hh < 10 ? '0'+ hh : hh}:${mm < 10 ? '0'+ mm : mm}`;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-image: url('~static/img/order.jpg');
  height: 80vh;
  background-size: auto 40vw;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
  @include media-breakpoint-down(sm) {
    height: 200px;
    margin-bottom: 50px;
    background-size: 100%;
    background-position: center;
  }
}

.order_content {
  border: 4px dashed $main_light_gray;
  padding: 20px;
  margin: 10px;

  .disable {
    background: $main_light_gray;
    cursor: default;
  }
}

.user_content {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 4px dashed $main_light_gray;
}

.products_content {
  margin-top: 20px;
}
</style>
