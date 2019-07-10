<template>
  <div>
    <!-- <el-container>
      <el-header>
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单录入</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header> -->
      <el-main>
        <el-card class="box-card">
          <el-form label-width="100px" :model="order" ref="order">
            <el-row class="checkoutAll">
              <el-col :span="6">
                <el-form-item label="订单编号">
                  <el-input v-model="page.id" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="下单用户名">
                  <el-input v-model="page.orderUserId" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" class="checkout" @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>

          <el-table size="mini" max-height="550px" border style="width: 100%" :data="orderList">
            <el-table-column prop="id" label="工单编号"></el-table-column>
            <el-table-column prop="serviceType" label="服务类型" min-width="110"></el-table-column>
            <el-table-column prop="orderUserId" label="下单用户名" min-width="150"></el-table-column>
            <el-table-column prop="elderly.idNumber" label="老人身份证号" min-width="150"></el-table-column>
            <el-table-column prop="elderly.name" label="老人姓名" min-width="150"></el-table-column>
            <el-table-column prop="elderly.description" label="老人身体状况" min-width="200">
              <template slot-scope="scope">
                <block v-for="(item,index) in scope.row.elderly.description" :key="index">
                  <span>{{item.describe}}&nbsp;&nbsp;&nbsp;</span>
                </block>
              </template>
            </el-table-column>

            <el-table-column prop="serviceTime" label="服务时间" min-width="150"></el-table-column>

            <el-table-column prop="orderDay" label="购买服务天数" min-width="150" >
              <template slot-scope="scope">
                <div style="color:#67c23a;font-weight: 600;">{{scope.row.orderDay}}</div>
              </template>
            </el-table-column>

            <el-table-column prop="totalPrice" label="服务总价" min-width="150"></el-table-column>

            <el-table-column prop="state" label="订单状态">
              <template slot-scope="scope">
                <block v-if="scope.row.state==0">
                  <span>订单创建</span>
                </block>
                <block v-if="scope.row.state==1">
                  <span>订单已录入</span>
                </block>
                <block v-if="scope.row.state==2">
                  <span>订单取消</span>
                </block>
                <block v-if="scope.row.state==3">
                  <span>服务中</span>
                </block>
                <block v-if="scope.row.state==4">
                  <span>服务完成</span>
                </block>
                <block v-if="scope.row.state==5">
                  <span>用户确认</span>
                </block>
              </template>
            </el-table-column>

            <el-table-column prop="createAt" label="创建时间"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="orderEntry(scope.row)">录入</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    <!-- </el-container> -->

    <el-dialog title="订单录入" :visible.sync="dialogFormVisible" width="80%">
      <el-form label-width="130px" :model="order" :rules="rules" ref="order" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="工单编号">
              <el-input v-model="order.id" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务类型">
              <el-input v-model="order.serviceType" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单用户id">
              <el-input v-model="order.orderUserId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="老人姓名">
              <el-input v-model="order.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="老人身份证号">
              <el-input v-model="order.idNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买服务天数" prop="orderDay">
              <el-input v-model="order.orderDay" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务时间">
              <div class="block">
                <el-date-picker v-model="order.serviceTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务总价" prop="totalPrice">
              <el-input v-model="order.totalPrice" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务人员姓名" prop="serviceName">
              <el-input v-model="order.serviceName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务人员手机号" prop="servicePhone">
              <el-input v-model="order.servicePhone" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtnHandle">取 消</el-button>
        <el-button type="primary" @click="confirmBtnHandle('order')">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages"
      style="float: right;margin:20px 0px 20px 0px"
    ></el-pagination>
  </div>
</template>

<script>
import { getOrderList, updateOrder } from "../../model/order/order-list";
import { mapGetters } from "vuex";
export default {
  data() {
    //表单中验证服务人员名字
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("服务人员姓名不能为空"));
      }
    };
    //表单中验证手机号码的格式
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      if (!/^[0-9]+$/.test(value)) {
        callback(new Error("请填写11位数字号码"));
      } else {
        callback();
      }
    };
    //表单验证总价的格式
    var validateTotalPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("总价不能为空"));
      }
      if (!/^[0-9]+$/.test(value)) {
        callback(new Error("请填写数字"));
      } else {
        callback();
      }
    };
    //表达验证服务的天数
    var validateServiceDay = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("服务天数不能为空"));
      }
      if (!/^[0-9]+$/.test(value)) {
        callback(new Error("请填写数字"));
      } else {
        callback();
      }
    };

    return {
      description: [],
      dialogFormVisible: false,
      page: {
        current: 1,
        size: 10,
        state: 0,
        orderUserId: "",
        id: ""
      },
      //总页数
      pageCount: 0,
      //总数
      pages: 0,
      //后台获取的订单列表数据
      orderList: "",
      //订单对象
      order: {
        id: "",
        serviceId: "",
        serviceType: "",
        orderUserId: "",
        inputUserId: "",
        elderlyId: "",
        idNumber: "",
        name: "",
        description: "",
        state: "",
        serviceName: "",
        servicePhone: "",
        createAt: "",
        modifyAt: "",
        enabled: "",
        serviceTime: "",
        serviceDay: "",
        orderDay:"",
        totalPrice: ""
      },
      //表单验证
      rules: {
        serviceName: [
          { required: true, validator: validateName, trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30个字符", trigger: "blur" }
        ],
        servicePhone: [
          { required: true, validator: validatePhone, trigger: "blur" },
          { min: 7, max: 13, message: "长度 7-13位数字", trigger: "blur" }
        ],
        totalPrice: [
          { required: true, validator: validateTotalPrice, trigger: "blur" }
        ],
        serviceDay: [
          { required: true, validator: validateServiceDay, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    /**
     *点击录入执行的事件
     */
    orderEntry(order) {
      console.log("打印录入对象：" + JSON.stringify(order));
      // 表单验证提醒重置
      if (this.$refs["order"] != undefined) {
        this.$refs["order"].resetFields();
      }
      //将选中的表格中的数据转移到一个新对象中
      this.order.id = order.id;
      this.order.serviceId = order.serviceId;
      this.order.serviceType = order.serviceType;
      this.order.orderUserId = order.orderUserId;
      this.order.inputUserId = order.inputUserId;
      this.order.elderlyId = order.elderlyId;
      this.order.state = order.state;
      this.order.createAt = order.createAt;
      this.order.modifyAt = order.modifyAt;
      this.order.enabled = order.enabled;
      this.order.serviceTime = order.serviceTime;
      this.order.serviceDay = order.serviceDay;
      this.order.orderDay=order.orderDay;
      this.order.totalPrice = order.totalPrice;
      this.order.idNumber = order.elderly.idNumber;
      this.order.name = order.elderly.name;
      this.order.description = order.elderly.description;
      this.order.serviceName = "";
      this.order.servicePhone = "";
      this.dialogFormVisible = true;
    },
    /**
     * dailog中的取消事件
     */
    cancelBtnHandle() {
      this.dialogFormVisible = false;
    },
    /**
     * dailog中的取消事件
     */
    confirmBtnHandle() {
      //提交的表单验证
      let status = true;
      this.$refs["order"].validate(valid => {
        if (!valid) {
          status = valid;
        }
      });
      //若果表单验证通过则调后台接口修改订单
      if (status) {
        if (status) {
          this.order.state = 1;
          this.order.inputUserId=sessionStorage.getItem('username')
          updateOrder(this.order)
            .then(res => {
              let _this = this;
              console.error("跟新数据返回的结果：" + JSON.stringify(res));
              _this.flushOrderList();
              this.dialogFormVisible = false;
               this.$message.success('录入成功');
            })
            .catch(err => {
              this.$message.success('录入失败');
            });
        }
      } else {
        return;
      }
    },
   /**
    * 搜索点击事件
    */
    search() {
      this.page.current = 1;
      this.page.size = 10;
      this.flushOrderList();
    },
    //分页条数点击事件
    handleSizeChange(val) {
      this.page.size = val;
      this.flushOrderList();
    },
    //分页跳转点击事件
    handleCurrentChange(val) {
      this.page.current = val;
      this.flushOrderList();
    },
    //刷新列表点击事件
    flushOrderList() {
      getOrderList(this.page)
        .then(res => {
          let _this = this;
          _this.orderList = res.data.result.list;
          _this.orderList.forEach(v => {
            v.elderly.description = JSON.parse(v.elderly.description);
            _this.description = v.elderly.description;
          });
          _this.pageCount = res.data.result.pages;
          _this.pages = res.data.result.total;
        })
        .catch(err => {});
    }
  },
  //初始化表格数据
  mounted() {
    this.flushOrderList();
  }
};
</script>

<style scoped>
.box-card {
  width: 95%;
}

.checkout {
  margin-left: 20px;
}

.checkoutAll {
  margin-left: 3%;
}

.a1 {
  margin-left: 15px;
}

.storage {
  margin: 2% 0 2% 38%;
}

.title-list {
  margin-bottom: 15px;
}
</style>
