<template>
  <div>
    <div class="mt-5">
      <h2>Coupons</h2>
      <button class="btn btn-primary btn-small">
        Add coupons
      </button>
      <table class="mt-4 table">
        <thead>
          <tr>
            <th>優惠名稱</th>
            <th>折扣%</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.percent }}</td>
            <td>
              <span v-if="coupon.is_enabled" class="text-success">已上架</span>
              <span v-else>未上架</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-small">
                編輯
              </button>
              <button class="btn btn-outline-primary btn-small">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
  },
  created() {
    this.getCoupons();
  },
};
</script>
