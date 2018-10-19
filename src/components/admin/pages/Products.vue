<template>
  <div>
    <div class="mt-5">
      <h2>Products</h2>
      <button class="btn btn-primary btn-small">Add product</button>
      <table class="mt-4 table">
        <thead>
          <tr>
            <th>分類</th>
            <th>名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">已上架</span>
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
  </div>
</template>

<script>
export default {
  data(){
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/products/all`;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
