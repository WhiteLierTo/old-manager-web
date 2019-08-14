<template>
  <div>
      <el-main>
        <el-card class="box-card">
          <el-form :model="order" ref="order" >
            <el-row type="flex" justify="space-between" class="checkoutAll">
              <el-col :span="4">
                <el-form-item>
                  <el-input  placeholder="请输入订单编号" v-model="page.id" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-input placeholder="请输入下单用户名" v-model="page.orderUserId" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-input placeholder="服务人员名称" v-model="page.serviceName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-input  placeholder="服务人员手机号" v-model="page.servicePhone" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
            <el-table-column prop="elderly.description" label="老人身体状况" min-width="170">
              <template slot-scope="scope">
                <block v-for="(item,index) in scope.row.elderly.description" :key="index">
                  <span>{{item.describe}}&nbsp;&nbsp;&nbsp;</span>
                </block>
              </template>
            </el-table-column>

            <el-table-column prop="serviceTime" label="服务时间" min-width="120"></el-table-column>

            <el-table-column prop="orderDay" label="购买服务天数" min-width="90">
              <template slot-scope="scope">
                <div style="color:#67c23a;font-weight: 600;text-align: center ">{{scope.row.orderDay}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="serviceDay" label="剩余服务天数" min-width="90">
               <template slot-scope="scope">
                <div style="color:#e6a23c;font-weight: 600;text-align: center ">{{scope.row.orderDay}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="serviceName" label="服务人员" min-width="80"></el-table-column>
            <el-table-column prop="servicePhone" label="服务人员手机号" min-width="90"></el-table-column>
            <el-table-column prop="totalPrice" label="服务总价" min-width="80">
              <template slot-scope="scope">
                  <div>￥{{scope.row.totalPrice}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="inputUserId" label="订单归属" min-width="80" v-if="admin"></el-table-column>
            <el-table-column prop="state" label="订单状态">
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
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="updateState(scope.row)">修改状态</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    
     <el-dialog title="修改状态" :visible.sync="dialogFormVisible" width="80%">
      <el-form label-width="130px" :model="order"  ref="order" class="demo-ruleForm">
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
              <el-input v-model="order.elderly.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="老人身份证号">
              <el-input v-model="order.elderly.idNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买服务天数" prop="orderDay">
              <el-input v-model="order.orderDay" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="剩余服务天数" prop="orderDay">
              <el-input v-model="order.serviceDay" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务时间">
             <el-input v-model="order.serviceTime" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务总价" prop="totalPrice">
              <el-input v-model="order.totalPrice" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单归属" v-if="admin">
              <el-input v-model="order.inputUserId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务人员姓名" prop="serviceName">
              <el-input v-model="order.serviceName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务人员手机号" prop="servicePhone">
              <el-input v-model="order.servicePhone" disabled></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="修改服务状态" prop="servicePhone">
              <el-select v-model=order.state placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
    return {
      admin:'',
      dialogFormVisible: false,
       options: [{
          value: 1,
          label: '订单已录入'
        },{
          value: 3,
          label: '服务中'
        }, {
          value: 4,
          label: '服务完成'
        }],
        
      page: {
        current: 1,
        size: 10,
        inputUserId:'',
        orderUserId: '',
        serviceName:'',
        servicePhone:'',
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
     
    };
  },
  methods: {
    /**
     *点击修改状态执行的事件
     */
    updateState(order) {
      //将选中的表格中的数据转移到一个新对象中
      this.order = order;
      this.dialogFormVisible = true;
    }, /**
     * dailog中的取消事件
     */
    cancelBtnHandle() {
      this.dialogFormVisible = false;
    },
   
    /**
     * dailog中的事件
     */
    confirmBtnHandle() {   
      //当剩余服务天数未完成时，订单状态不能修改为服务完成
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
            //v.createAt = v.createAt.replace(/T/g, " ")
          });
          _this.pageCount = res.data.result.pages;
          _this.pages = res.data.result.total;
        })
        .catch(err => {});
    }
  },
  //初始化表格数据
  mounted() {
    //判断是不是管理员登录
    if(sessionStorage.getItem('username')!='admin'){
          this.page.inputUserId=sessionStorage.getItem('username');
    }else{
      this.admin=sessionStorage.getItem('username')
    } 
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
