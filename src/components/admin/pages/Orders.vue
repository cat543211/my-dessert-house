<template>
  <div>
    <div class="mt-5">
      <h2>Orders</h2>
      <table class="mt-4 table" v-if="orders">
        <thead>
          <tr>
            <th>訂單時間</th>
            <th>是否付款 (付款日期)</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ getDate(order.create_at) }}</td>
            <td v-if="order.is_paid">
              已付款 ( {{ getDate(order.paid_date) }} )
            </td>
            <td v-else>
              未付款
            </td>
            <td>
              <button class="btn btn-outline-primary btn-small"
              data-toggle="modal"
              data-target="#orderModal"
              @click.prevent="openModal(order, false)">
                檢視
              </button>
              <button class="btn btn-outline-primary btn-small"
              data-toggle="modal"
              data-target="#orderModal"
              @click.prevent="openModal(order, true)">
                編輯
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="!edit_order">檢視訂單</span>
              <span v-else>編輯訂單</span>
            </h5>
            <button type="button" class="close"
              data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- 編輯 -->
          <div class="modal-body" v-if="edit_order">
            <div class="row">
              <div class="col-12">
                <h4>訂單狀態</h4>
              </div>
              <div class="col-12">
                <input id="paid" type="checkbox" v-model="order.is_paid">
                <label for="paid">已付款</label>
              </div>
              <div class="col-12">
                <h4>使用者資料</h4>
              </div>
              <div class="col-12">
                <p>姓名</p>
                <input type="text" v-model="order.user.name">
              </div>
              <div class="col-12">
                <p>電話</p>
                <input type="text" v-model="order.user.tel">
              </div>
              <div class="col-12">
                <p>Mail</p>
                <input type="text" v-model="order.user.email">
              </div>
              <div class="col-12">
                <p>地址</p>
                <input type="text" v-model="order.user.address">
              </div>
            </div>
          </div>
          <div class="modal-footer" v-if="edit_order">
            <button type="button" class="btn btn-outline-secondary"
            data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
            @click.prevent="updateOrder">確認</button>
          </div>
          <!-- 檢視 -->
          <div class="modal-body" v-if="!edit_order">
            <div class="row">
              <div class="col-12">
                <h4>訂單狀態</h4>
                <h5 v-if="order.is_paid">已付款</h5>
                <h5 v-else>未付款</h5>
                <p>留言: {{ order.message }}</p>
              </div>

              <div class="col-12">
                <h4>使用者資料</h4>
                <p>姓名: {{ order.user.name }}</p>
                <p>電話: {{ order.user.tel }}</p>
                <p>Mail: {{ order.user.email }}</p>
                <p>地址: {{ order.user.address }}</p>
              </div>

              <div class="col-12">
                <h4>產品明細</h4>
                <h5>總金額: {{ Math.floor(order.total) }}</h5>
                <table class="mt-4 table">
                  <thead>
                    <tr>
                      <th>品名</th>
                      <th>數量</th>
                      <th>價格</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, key) in order.products" :key="key">
                      <td>{{ item.product.title }}</td>
                      <td>{{ item.qty }}</td>
                      <td>{{ Math.floor(item.final_total) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer" v-if="!edit_order">
            <button type="button" class="btn btn-outline-secondary"
            data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary"
            @click.prevent="openModal(order, true)">編輯</button>
          </div>
        </div>
      </div>
    </div>
    <Pager :pager="pager" @getPage="getOrders" />
  </div>
</template>

<script>
import Pager from '@/components/admin/Pager';

export default {
  data() {
    return {
      orders: [],
      pager: {},
      edit_order: false,
      order: {
        user: {},
      },
      status: {
        isLoading: false,
      },
    };
  },
  components: {
    Pager,
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/orders?page=${page}`;

      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.orders = response.data.orders;
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
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
    openModal(order, isEdit) {
      this.edit_order = isEdit;
      if (!isEdit) {
        this.order = order;
      } else {
        this.order = { ...order };
      }
    },
    updateOrder() {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/order/${this.order.id}`;

      this.$http.put(api, { data: this.order }).then((response) => {
        if (response.data.success) {
          this.getOrders();
          this.openModal(this.order, false);
        } else {
          this.$bus.$emit('showError', response.data.message);
        }
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
