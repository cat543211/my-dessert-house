<template>
  <div>
    <div class="mt-5">
      <h2>Coupons</h2>
      <button class="btn btn-primary btn-small"
      data-toggle="modal"
      data-target="#couponModal"
      @click.prevent="openModal(true)">
        Add coupons
      </button>
      <table class="mt-4 table" v-if="coupons">
        <thead>
          <tr>
            <th>優惠名稱</th>
            <th>優惠碼</th>
            <th>折扣%</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.percent }}</td>
            <td>{{ showDueDate(coupon.due_date) }}</td>
            <td>
              <span v-if="coupon.is_enabled" class="text-success">已上架</span>
              <span v-else>未上架</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-small"
              data-toggle="modal"
              data-target="#couponModal"
              @click.prevent="openModal(false, coupon)">
                編輯
              </button>
              <button class="btn btn-outline-primary btn-small"
              @click="openModal(false, coupon)"
              data-toggle="modal"
              data-target="#delModal">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增 Coupon</span>
              <span v-else>編輯 Coupon</span>
            </h5>
            <button type="button" class="close"
              data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">優惠名稱</label>
                  <input type="text" class="form-control" id="title"
                    v-model="coupon.title"/>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="code">優惠碼</label>
                    <input type="text" class="form-control" id="code"
                      placeholder="請輸入優惠碼（數字）"
                      v-model="coupon.code">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="percent">優惠%</label>
                    <input type="number" class="form-control" id="percent"
                      placeholder="請輸入%（數字）"
                      v-model.number="coupon.percent">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="date">到期日</label>
                    <input type="date" class="form-control" id="date"
                      v-model="due_time">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled"
                      v-model="coupon.is_enabled"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
            data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
            @click.prevent="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除Coupon</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ coupon.title }}</strong> Coupon(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
            @click="removeCoupon(false)">取消</button>
            <button type="button" class="btn btn-danger"
            @click="removeCoupon(true)"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <Pager :pager="pager" @getPage="getCoupons"/>
  </div>
</template>

<script>
import $ from 'jquery';
import Pager from '@/components/admin/Pager';

export default {
  data() {
    return {
      coupons: [],
      pager: {},
      coupon: {
        percent: 100,
      },
      due_time: '',
      isNew: true,
    };
  },
  components: {
    Pager,
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/coupons?page=${page}`;

      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.coupons = response.data.coupons;
          vm.pager = response.data.pagination;
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
      });
    },
    showDueDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      return `${y}-${m >= 10 ? '' : 0}${m}-${d >= 10 ? '' : 0}${d}`;
    },
    openModal(isNew, coupon) {
      this.isNew = isNew;
      if (isNew) {
        this.coupon = {};
        this.coupon.percent = 100;
        const timestamp = +new Date() / 1000;
        this.due_time = this.showDueDate(timestamp);
      } else {
        this.coupon = { ...coupon };
        this.due_time = this.showDueDate(coupon.due_date);
      }
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/coupon`;
      let apiMethod = 'post';
      const timestamp = +new Date(vm.due_time) / 1000;

      vm.coupon.due_date = timestamp;

      if (!vm.isNew) {
        api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/coupon/${vm.coupon.id}`;
        apiMethod = 'put';
      }

      this.$http[apiMethod](api, { data: vm.coupon }).then((response) => {
        if (response.data.success) {
          vm.getCoupons();
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
        $('#couponModal').modal('hide');
      });
    },
    removeCoupon(isDel) {
      const vm = this;

      if (isDel) {
        const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/coupon/${vm.coupon.id}`;
        this.$http.delete(api).then((response) => {
          if (response.data.success) {
            vm.getCoupons();
          } else {
            vm.$bus.$emit('showError', response.data.message);
          }
          $('#delModal').modal('hide');
        });
      }
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
