<template>
  <div>
    <el-container>
      <el-header>
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-form label-width="130px" :model="order" ref="order" >
            <el-row class="checkoutAll">
              <el-col :span="5">
                <el-form-item label="订单编号">
                  <el-input v-model="page.id" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="下单用户名">
                  <el-input v-model="page.orderUserId" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="服务人员名称">
                  <el-input v-model="page.serviceName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="服务人员手机号">
                  <el-input v-model="page.servicePhone" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="订单归属">
                  <el-input v-model="page.inputUserId" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="订单状态">
                  <el-select v-model=page.state placeholder="请选择" clearable>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
            </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" class="checkout" @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>

          <el-table size="mini" max-height="550px" border style="width: 100%" :data="orderList">
            <el-table-column prop="id" label="工单编号"></el-table-column>
            <el-table-column prop="serviceType" label="服务类型" min-width="110"></el-table-column>
            <el-table-column prop="orderUserId" label="下单用户名" min-width="150"></el-table-column>
            <el-table-column prop="elderly.idNumber" label="老人身份证号" min-width="150"></el-table-column>
            <el-table-column prop="elderly.name" label="老人姓名" min-width="80"></el-table-column>
            <el-table-column prop="elderly.description" label="老人身体状况" min-width="200">
              <template slot-scope="scope">
                <block v-for="(item,index) in scope.row.elderly.description" :key="index">
                  <span>{{item.describe}}&nbsp;&nbsp;&nbsp;</span>
                </block>
              </template>
            </el-table-column>

            <el-table-column prop="serviceTime" label="服务时间" min-width="150"></el-table-column>
            <el-table-column prop="orderDay" label="购买服务天数" min-width="80">
              <template slot-scope="scope">
                <div style="color:#67c23a;font-weight: 600;text-align: center ">{{scope.row.orderDay}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="serviceDay" label="剩余服务天数" min-width="80">
               <template slot-scope="scope">
                <div style="color:#e6a23c;font-weight: 600;text-align: center ">{{scope.row.orderDay}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="serviceName" label="服务人员" min-width="80"></el-table-column>
            <el-table-column prop="servicePhone" label="服务人员手机号" min-width="118"></el-table-column>
            <el-table-column prop="inputUserId" label="订单归属" min-width="100"></el-table-column>
            <el-table-column prop="totalPrice" label="服务总价" min-width="70">
                <template slot-scope="scope">
                  <div>￥{{scope.row.totalPrice}}</div>
              </template>
            </el-table-column>

            <el-table-column prop="state" label="订单状态" min-width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.state==0" style="color:#f71c1c">
                  <span >订单创建</span>
                </div>
                <div v-if="scope.row.state==1" style="color:#e6a23c">
                  <span>订单已录入</span>
                </div>
                <div v-if="scope.row.state==2" style="color:#c0c4cc">
                  <span>订单取消</span>
                </div>
                <div v-if="scope.row.state==3" style="color:#e6a23c">
                  <span>服务中</span>
                </div>
                <div v-if="scope.row.state==4" style="color:#67c23a">
                  <span>服务完成</span>
                </div>
                <div v-if="scope.row.state==5" style="color:#67c23a">
                  <span>用户已确认</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="createAt" label="创建时间"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="orderEditor(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteOrderClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
    
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="80%">
      <el-form label-width="130px" :model="order" :rules="rules" ref="order" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="工单编号">
              <el-input v-model="order.id" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单用户id">
              <el-input v-model="order.orderUserId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="老人姓名">
              <el-input v-model="order.elderly.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="老人身份证号">
              <el-input v-model="order.elderly.idNumber" disabled></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="服务类型">
              <el-select v-model="order.serviceType" placeholder="请选择">
                <el-option
                v-for="item in getServiceList"
                :key="item.value"
                :label="item.serviceType"
                :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="购买服务天数" prop="orderDay">
              <el-input v-model="order.orderDay" clearable></el-input>
            </el-form-item>
          </el-col> -->
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
          <el-col :span="8" v-if="order.state!=0&&order.state!=2">
            <el-form-item label="服务人员姓名" prop="serviceName">
              <el-input v-model="order.serviceName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="order.state!=0&&order.state!=2">
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
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>确认删除这条信息？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
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
import { getOrderList, updateOrder,deleteOrder } from "../../model/order/order-list";
import {getServiceFnc} from "../../model/service/index";
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
    //表单验证服务的天数
    // var validateOrderDay = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("订单服务天数不能为空"));
    //   }
    //   if (!/^[0-9]+$/.test(value)) {
    //     callback(new Error("请填写数字"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      dialogFormVisible: false,
      dialogVisible: false,
       options: [
           {
          value: 0,
          label: '订单创建'
        },{
          value: 1,
          label: '订单已录入'
        },{
          value: 2,
          label: '已取消'
        },{
          value: 3,
          label: '服务中'
        }, {
          value: 4,
          label: '服务完成'
        },{
          value: 5,
          label: '用户已确认'
        }],
        
      page: {
        current: 1,
        size: 10,
        inputUserId:'',
        orderUserId: '',
        serviceName:'',
        servicePhone:'',
        state:'',
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
        elderly:{}
      },
      //所有服务类型
      serviceType:'',
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
        // orderDay: [
        //   { required: true, validator: validateOrderDay, trigger: "blur" }
        // ]
      }
    };
  },
   computed: {
    ...mapGetters(["getServiceList"])
  },
  methods: {
    /**
     *点击编辑执行的事件
     */
    orderEditor(order) {
      //将选中的表格中的数据转移到一个新对象中
      // 表单验证提醒重置
      if (this.$refs["order"] != undefined) {
        this.$refs["order"].resetFields();
      }
      this.order = JSON.parse(JSON.stringify(order));
      this.dialogFormVisible = true;
    }, /**
     * dailog中的取消事件
     */
    cancelBtnHandle() {
      this.dialogFormVisible = false;
    },
    
  //  deleteOrderClick(id){
  //      this.dialogVisible=true;      
  //       deleteOrder(id).then(res => {
  //         debugger
  //            console.error("删除的订单信息："+JSON.stringify(res))
  //              this.$message.success('删除成功');
  //           })
  //           .catch(err => {
  //             alert("删除失败的信息："+JSON.stringify(err))
  //             this.$message.success('修改失败');
  //           }); 
  //      //刷新列表点击事件
  //      this.flushOrderList()
  //  },
    //删除
    deleteOrderClick(id) {
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteOrder(id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //刷新列表
              this.flushOrderList()
            })
            .catch(err => {
            });
        })
        .catch(() => {});
    },
    /**
     * dailog中的确认事件
     */
    confirmBtnHandle() {   
      
         if(this.order.serviceDay>0&&this.order.state==4){
            this.$message.success('该订单剩余服务天数未完成');
            return;
         }
          updateOrder(this.order)
            .then(res => {
              let _this = this;
              _this.flushOrderList();
              this.dialogFormVisible = false;
               this.$message.success('修改成功');
            })
            .catch(err => {
              this.$message.success('修改失败');
            });     
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
    getServiceFnc();
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
