<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-button plain class="addBtn" type="primary" @click="add=true">新增服务</el-button>
        <el-input class="query" placeholder="请输入查询的服务" v-model="careType" clearable></el-input>
        <el-button type="primary" @click="searchHandleClick">搜索</el-button>
        <el-table :data="getServiceList" border>
          <el-table-column prop="careType" label="服务类型"></el-table-column>
          <el-table-column prop="price" label="服务价格"></el-table-column>
          <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
          <el-table-column prop="apply" label="适用人群"></el-table-column>
          <el-table-column prop="headImg" label="服务图片">
            <template slot-scope="scope">
              <img v-if="!scope.row.headImg" :src="scope.row.headImg" width="70" height="70" />
              <div v-else>暂无数据</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deletePerson(scope.row)" type="text" size="small">删除</el-button>
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
          :total="getServiceTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="修改用户" :visible.sync="edit">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" label-width="80px">
              <el-input style="width:215px" v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型" label-width="80px">
              <el-select v-model="form.type" placeholder="请选择用户类型">
                <el-option label="管理员" value="1"></el-option>
                <el-option label="商家" value="2"></el-option>
                <el-option label="个人" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="EditSurehandleClick">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增 -->
    <el-dialog title="新增用户" :visible.sync="add">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" label-width="80px">
              <el-input style="width:215px" v-model="param.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" label-width="80px">
              <el-input style="width:215px" v-model="param.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型" label-width="80px">
              <el-select v-model="param.type" placeholder="请选择用户类型">
                <el-option label="个人" value="0"></el-option>
                <el-option label="管理员" value="1"></el-option>
                <el-option label="商家" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-upload
        class="upload-demo"
        :action="this.$http.imageURL"
        :on-success="addSuccess"
        :on-remove="addRemove"
        list-type="picture"
        :limit="1"
      >
        <el-button style="margin-top:50px" size="small" type="primary">头像</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="addSureHandleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getServiceFnc } from "../../model/service/index";
import { mapGetters } from "vuex";
export default {
  name: "user-manage",
  data() {
    return {
      edit: false,
      add: false,
      page: {
        current: 1,
        size: 10,
        type: ""
      },
      careType: "",
      tableData: [],
      param: {
        username: "",
        password: "",
        headImg:
          "http://cytimg.525bama.com/senior-service/2019/4/mine/Qjbey/avtor.png",
        type: ""
      },
      form: {
        //编辑
        id: "",
        type: "",
        userId: "",
        username: ""
      }
    };
  },
  watch: {
    careType: {
      handler(val) {
        if (!val) {
          this.page.type = "";
          console.log("重新执行");
          getServiceFnc(this.page);
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["getServiceList", "getServiceTotal"])
  },
  methods: {
    //搜索
    searchHandleClick() {
      if (this.careType == "服务一") {
        this.page.type = 1;
      } else if (this.careType == "服务二") {
        this.page.type = 2;
      }
      getServiceFnc(this.page);
    },
    //分页
    handleSizeChange(val) {
      this.page.size = val;
      getServiceFnc(this.page);
    },
    //跳页
    handleCurrentChange(val) {
      this.page.current = val;
      getServiceFnc(this.page);
    },
    //确定编辑
    EditSurehandleClick() {},
    //确定添加
    addSureHandleClick() {},
    //图片移除及上传成功钩子
    addSuccess(file) {
      //   this.param.headImg = file.result;
    },
    addRemove(file) {}
  },
  mounted() {
    //服务详情列表获取
    getServiceFnc(this.page);
  }
};
</script>

<style scoped>
.query {
  width: 15%;
  margin: 0px 0px 15px 60%;
}
.table {
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 3% 0px 0px 5%;
}
.addBtn {
  margin-left: 54px;
}
</style>