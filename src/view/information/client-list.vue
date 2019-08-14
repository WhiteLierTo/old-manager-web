<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-table :data="getClientList" border>
          <el-table-column prop="nickname" label="用户名"></el-table-column>
          <el-table-column prop="clientId" label="客户端ID"></el-table-column>
          <el-table-column prop="appId" label="appID"></el-table-column>
             <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="deleteHandleClick(scope.row)" type="text" size="small">删除</el-button>
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
          :total="clienTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getClientList,
  deleteClientFnc,
  clienTotal
} from "../../model/information/index";
import { mapGetters } from "vuex";
export default {
  name: "client-list",
  data() {
    return {
      page: {
        current: 1,
        size: 10
      },
    };
  },
  computed: {
    ...mapGetters(["getClientList", "clienTotal"])
  },
  methods: {
    //搜索
    searchHandleClick() {
      getClientList(this.page);
    },
    //分页
    handleSizeChange(val) {
      this.page.size = val;
      getClientList(this.page);
    },
    //跳页
    handleCurrentChange(val) {
      this.page.current = val;
      getClientList(this.page);
    },
    //删除e
    deleteHandleClick(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteClientFnc(e.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //列表获取
              getClientList(this.page);
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
  },
  mounted() {
    //服务详情列表获取
    getClientList(this.page);
  }
};
</script>

<style scoped>
.table {
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 3% 0px 0px 5%;
}
</style>