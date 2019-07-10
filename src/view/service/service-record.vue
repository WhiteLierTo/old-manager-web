<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-input class="query" placeholder="请输入状态查询信息" v-model="searchVal" clearable></el-input>
        <el-button type="primary" @click="searchHandleClick">搜索</el-button>
        <el-table :data="getServiceRecordList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="被服务人">
                  <span>{{ props.row.elderly.name }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span v-if="props.row.elderly.sex==false">女</span>
                  <span v-if="props.row.elderly.sex==true">男</span>
                </el-form-item>
                <el-form-item label="年龄">
                  <span>{{ props.row.elderly.age }}</span>
                </el-form-item>
                <el-form-item label="身份证">
                  <span>{{ props.row.elderly.idNumber }}</span>
                </el-form-item>
                <el-form-item label="地址">
                  <span>{{ props.row.elderly.address }}</span>
                </el-form-item>
                <el-form-item label="关系">
                  <span>{{ props.row.elderly.relationship }}</span>
                </el-form-item>
                <el-form-item label="描述">
                  <strong
                    v-for="(item,index) in props.row.elderly.description"
                    :key="index"
                  >{{ item.describe }}</strong>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="服务订单" width="180"></el-table-column>
          <el-table-column prop="serviceType" label="服务类型" width="180"></el-table-column>
          <el-table-column prop="inputName" label="下单人" width="180"></el-table-column>
          <el-table-column prop="inputPhone" label="下单电话"></el-table-column>
          <el-table-column prop="totalPrice" label="服务价格"></el-table-column>
          <el-table-column prop="servicePhone" label="服务电话"></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.state==0">订单创建</div>
              <div v-else-if="scope.row.state==1">订单录入</div>
              <div v-else-if="scope.row.state==2">订单取消</div>
              <div v-else-if="scope.row.state==3">服务中</div>
              <div v-else-if="scope.row.state==4">服务完成</div>
              <div v-else-if="scope.row.state==5">用户确认完成</div>
            </template>
          </el-table-column>
          <el-table-column prop="orderDay" label="总服务天数"></el-table-column>
          <el-table-column prop="serviceDay" label="剩余天数">
            <template slot-scope="scope">
              <div style="color:#F56C6C;font-weight: 600;">{{scope.row.serviceDay}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="editHandleClick(scope.row)">编辑</el-button>
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
          :total="getServiceRecordTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="服务信息" :visible.sync="editShow">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务订单" label-width="100px">
              <el-input style="width:80%" v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单人" label-width="100px">
              <el-input style="width:80%" v-model="form.inputName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务类型" label-width="100px">
              <el-input style="width:80%" v-model="form.serviceType" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单电话" label-width="100px">
              <el-input style="width:80%" v-model="form.inputPhone" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务价格" label-width="100px">
              <el-input style="width:80%" v-model="form.totalPrice" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务电话" label-width="100px">
              <el-input style="width:80%" v-model="form.servicePhone" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总服务天数" label-width="100px">
              <el-input style="width:80%" v-model="form.orderDay" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" label-width="100px">
              <el-input style="width:80%" v-model="form.stateVal" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-row>
              <el-col style="width:100px">剩余服务天数</el-col>
              <el-col :span="6">
                <el-input-number
                  v-model="form.serviceDay"
                  @change="handleChange"
                  :min="0"
                  :max="form.serviceDay"
                  style="width:80%"
                ></el-input-number>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHandleClick">取 消</el-button>
        <el-button type="primary" @click="editSurehandleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getServiceRecordFnc,
  editServiceRecordFnc
} from "../../model/service/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      editShow: false,
      page: {
        current: 1,
        size: 10,
        state: ""
      },
      searchVal: "",
      form: {}
    };
  },
  watch: {
    searchVal: {
      handler(val) {
        if (!val) {
          this.page.state = "";
          getServiceRecordFnc(this.page);
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["getServiceRecordList", "getServiceRecordTotal"])
  },
  methods: {
    //搜索
    searchHandleClick() {
      if (this.searchVal == "订单创建") {
        this.page.state = 0;
      } else if (this.searchVal == "订单录入") {
        this.page.state = 1;
      } else if (this.searchVal == "订单取消") {
        this.page.state = 2;
      } else if (this.searchVal == "服务中") {
        this.page.state = 3;
      } else if (this.searchVal == "服务完成") {
        this.page.state = 4;
      } else if (this.searchVal == "用户确认完成") {
        this.page.state = 5;
      }
      getServiceRecordFnc(this.page);
    },
    //分页
    handleSizeChange(val) {
      this.page.size = val;
      getServiceRecordFnc(this.page);
    },
    //跳页
    handleCurrentChange(val) {
      this.page.current = val;
      getServiceRecordFnc(this.page);
    },
    //编辑
    editHandleClick(obj) { 
      this.editShow = true;
      if (obj.state == 0) {
        obj.stateVal = "订单创建";
      } else if (obj.state == 1) {
        obj.stateVal = "订单录入";
      } else if (obj.state == 2) {
        obj.stateVal = "订单取消";
      } else if (obj.state == 3) {
        obj.stateVal = "服务中";
      } else if (obj.state == 4) {
        obj.stateVal = "服务完成";
      } else if (obj.state == 5) {
        obj.stateVal = "用户确认完成";
      }
      this.form = obj;
    },
    //确认编辑
    editSurehandleClick() {
      this.form.elderly.description = JSON.stringify(
        this.form.elderly.description
      );
      delete this.form.stateVal;
      editServiceRecordFnc(this.form).then(res => {
        this.$message({
          type: "success",
          message: "更新成功!"
        });
        //获取服务列表
        getServiceRecordFnc(this.page);
        this.editShow = false;
      });
    },
    //取消编辑
    cancelHandleClick() {
      this.editShow = false;
      //获取服务列表
      getServiceRecordFnc(this.page);
    },
    handleChange(val) {
      this.form.serviceDay = val;
    }
  },
  mounted() {
    //获取服务列表
    getServiceRecordFnc(this.page);
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
