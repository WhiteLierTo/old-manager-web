<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-button class="merchantBtn" type="primary" @click="addGoods">新增商品</el-button>
        <el-input class="query" placeholder="商品名称" v-model="page.name" clearable></el-input>
        <el-input class="query" placeholder="商品标题" v-model="page.title" clearable></el-input>
        <el-input class="query" placeholder="产地" v-model="page.origin" clearable></el-input>
        <el-input class="query" placeholder="功能" v-model="page.work" clearable></el-input>
        <el-select clearable class="query" v-model="page.type" placeholder="请选择类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input class="query" placeholder="最低价格" v-model="page.minPrice" clearable></el-input>
        <el-input class="query" placeholder="最高价格" v-model="page.maxPrice" clearable></el-input>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-table :data="getGoods">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="origin" label="产地"></el-table-column>
          <el-table-column prop="work" label="功能"></el-table-column>
          <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
              <div v-if="scope.row.type==1">行走</div>
              <div v-else-if="scope.row.type==2">床卧</div>
              <div v-else-if="scope.row.type==3">生活</div>
              <div v-else-if="scope.row.type==4">家居</div>
              <div v-else-if="scope.row.type==5">智能障碍</div>
              <div v-else-if="scope.row.type==6">其他</div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="ratings" label="推荐指数"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="editGoods(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="mallDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="getGoodsTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getGoods,
  uploadGoods,
  addGoods,
  deleteGoods
} from "../../model/goods/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "行走"
        },
        {
          value: "2",
          label: "床卧"
        },
        {
          value: "3",
          label: "生活"
        },
        {
          value: "4",
          label: "家具"
        },
        {
          value: "5",
          label: "智能障碍"
        },
        {
          value: "6",
          label: "其他"
        }
      ],
      tableData: [],
      page: {
        current: 1,
        size: 10,
        sort: "ratings",
        name: "",
        type: "",
        title: "",
        origin: "",
        work: "",
        minPrice: "",
        maxPrice: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getGoods", "getGoodsTotal"])
  },
  methods: {
    getList() {
      getGoods(this.page);
    },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      getGoods(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      getGoods(this.page);
    },
    // 商家新增跳转
    addGoods() {
      this.$router.push({ path: "/add-goods" });
    },
    service(e) {
      this.$router.push({
        path: "service",
        query: {
          merchantId: e.id
        }
      });
    },

    editGoods(row) {
      this.$router.push({
        path: "edit-goods",
        query: {
          id: row.id
        }
      });
    },
    mallDelete: async function(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
       .then(async() => {
          deleteGoods(e.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              getGoods(this.page);
            })
        }).catch(() => {         
        });
    }
  },
  mounted() {
    //列表获取
    getGoods(this.page);
  }
};
</script>

<style scoped>
.query {
  width: 10%;
  margin: 0px 0px 15px 0.5%;
}
.table {
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 3% 0px 0px 5%;
}
.merchantBtn {
  margin-left: 54px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
