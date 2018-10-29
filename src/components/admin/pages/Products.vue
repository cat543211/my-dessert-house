<template>
  <div>
    <div class="mt-5">
      <h2>Products</h2>
      <button class="btn btn-primary btn-small"
        data-toggle="modal"
        data-target="#productModal"
        @click="openModal(true)">
        Add product
      </button>
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
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">已上架</span>
              <span v-else>未上架</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-small"
              data-toggle="modal"
              data-target="#productModal"
              @click="openModal(false, item)">
                編輯
              </button>
              <button class="btn btn-outline-primary btn-small"
              @click="openModal(false, item)"
              data-toggle="modal"
              data-target="#delModal">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- add product -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                      v-model="product.imageUrl"
                      placeholder="請輸入圖片連結" />
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                      <i v-show="status.loading" class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                      ref="files" @change="uploadImg">
                  </div>
                  <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" alt=""
                    :src="product.imageUrl">
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                      placeholder="請輸入標題"
                      v-model="product.title">
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category"
                        placeholder="請輸入分類"
                        v-model="product.category">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit"
                        placeholder="請輸入單位"
                        v-model="product.unit">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價"
                        v-model="product.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價"
                        v-model="product.price">
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control"
                      id="description"
                      placeholder="請輸入產品描述"
                      v-model="product.description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容"
                      v-model="product.content"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox"
                        id="is_enabled"
                        v-model="product.is_enabled"
                        :true-value="1" :false-value="0">
                      <label class="form-check-label" for="is_enabled">
                        是否上架
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary"
              data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
          </div>
        </div>
      </div>

      <!-- remove -->
      <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除 <strong class="text-danger">{{ product.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
              @click="removeProduct(false)">取消</button>
              <button type="button" class="btn btn-danger"
              @click="removeProduct(true)"
                >確認刪除</button>
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
  data() {
    return {
      products: [],
      product: {},
      isNew: false,
      status: {
        loading: false,
      },
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/products/all`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products;
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
      });
    },
    openModal(isNew, item) {
      this.isNew = isNew;

      if (isNew) {
        this.product = {};
      } else {
        this.product = { ...item };
      }
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/product`;
      let apiMethod = 'post';

      if (!vm.isNew) {
        api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/product/${vm.product.id}`;
        apiMethod = 'put';
      }

      this.$http[apiMethod](api, { data: vm.product }).then((response) => {
        $('#productModal').modal('hide');
        vm.product = {};
        vm.getProducts();
        !response.data.message && vm.$bus.$emit('showError', response.data.message);
      });
    },
    uploadImg() {
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/upload`;
      const newImg = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();

      vm.status.loading = true;

      formData.append('file-to-upload', newImg);
      this.$http.post(api, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.success) {
          vm.$set(vm.product, 'imageUrl', response.data.imageUrl);
        } else {
          vm.$bus.$emit('showError', response.data.message);
        }
        vm.status.loading = false;
      });
    },
    removeProduct(isDelete) {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.API_USER}/admin/product/${vm.product.id}`
      if (isDelete) {
        this.$http.delete(api).then((response) => {
          if(response.data.success) {
            vm.getProducts();
            $('#delModal').modal('hide');
          } else {
            vm.$bus.$emit('showError', response.data.message);
          }
        });
      } else {
        vm.product = {};
      }
    }
  },
  created() {
    this.getProducts();
  },
};
</script>
