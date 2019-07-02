<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-button class="merchantBtn" type="primary" @click="addMerchant">新增商家</el-button>
        <el-input class="query" placeholder="请输入查询的商家名称" v-model="page.merchantName" clearable></el-input>
        <el-button type="primary" @click="searchHandleClick">搜索</el-button>
        <el-table :data="getMerchantList">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item
                  v-show="props.row.institutional!=null && props.row.institutional!=''"
                  label="机构性质"
                >
                  <span>{{ props.row.institutional }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.websiteUrl!=null && props.row.websiteUrl!=''"
                  label="官网网址"
                >
                  <span>{{ props.row.websiteUrl }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.emptyBeds!=null && props.row.emptyBeds!=''"
                  label="空床位数"
                >
                  <span>{{ props.row.emptyBeds }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.difficulty!=null && props.row.difficulty!=''"
                  label="申请难度"
                >
                  <span>{{ props.row.difficulty }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.feeStructure!=null && props.row.feeStructure!=''"
                  label="费用构成"
                >
                  <span>{{ props.row.feeStructure }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.naturalStandard!=null && props.row.naturalStandard!=''"
                  label="自费标准"
                >
                  <span>{{ props.row.naturalStandard }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.publicStandard!=null && props.row.publicStandard!=''"
                  label="工费标准"
                >
                  <span>{{ props.row.publicStandard }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.checkinTime!=null && props.row.checkinTime!=''"
                  label="入住时间"
                >
                  <span>{{ props.row.checkinTime }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.applicationRequirementGuardian!=null && props.row.applicationRequirementGuardian!=''"
                  label="申请条件(对监护人)"
                >
                  <span>{{ props.row.applicationRequirementGuardian }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.applicationRequirementOld!=null && props.row.applicationRequirementOld!=''"
                  label="申请条件(对老人)"
                >
                  <span>{{ props.row.applicationRequirementOld }}</span>
                </el-form-item>
                <el-form-item
                  v-show="props.row.description!=null && props.row.description!=''"
                  label="机构描述"
                >
                  <span>{{ props.row.description }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="merchantName" label="商家名称"></el-table-column>
          <el-table-column prop="merchantAddress" label="商家地址"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="serviceZone" label="服务范围"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="service(scope.row)" type="text" size="small">服务</el-button>
              <el-button @click="editMerchant(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteHandleClick(scope.row.id)" type="text" size="small">删除</el-button>
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
          :total="getTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getMerchantList,
  deleteMerchantList
} from "../../model/organization/merchant-list";
import { mapGetters } from "vuex";

export default {
  name: "merchant-manage",
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        merchantName: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getMerchantList", "getTotal"])
  },
  watch: {
    "page.merchantName": {
      handler(val) {
        if (!val) {
          getMerchantList(this.page);
        }
      },
      deep: true
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      getMerchantList(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      getMerchantList(this.page);
    },
    // 商家新增跳转
    addMerchant() {
      this.$router.push({ path: "/add-merchant" });
    },
    service(e) {
      this.$router.push({
        path: "service",
        query: {
          merchantId: e.id
        }
      });
    },
    //搜索
    searchHandleClick() {
      getMerchantList(this.page);
    },
    //编辑
    editMerchant(row) {
      this.$router.push({
        path: "edit-merchant",
        query: {
          id: row.id
        }
      });
    },
    //删除
    deleteHandleClick(id) {
      let param = {
        id: id
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMerchantList(param);
          //列表获取
          setTimeout(() => {
            getMerchantList(this.page);
          }, 1000);
        })
        .catch(() => {});
    }
  },
  mounted() {
    //列表获取
    getMerchantList(this.page);
  },
  beforeUpdate() {
    //列表获取
    // getMerchantList(this.page);
    console.log("最新列表：" + JSON.stringify(getMerchantList));
    console.log("数据更新了");
  }
};
</script>

<style scoped>
.query {
  width: 15%;
  margin: 0px 0px 15px 68%;
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
