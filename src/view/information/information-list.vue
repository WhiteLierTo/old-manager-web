<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-button class="merchantBtn" type="primary" @click="addInformation">新增消息</el-button>
       <el-input class="query2" placeholder="请输入商家名称" v-model="page.merchantName" clearable></el-input>
       <el-input class="query1" placeholder="请输入标题" v-model="page.title" clearable></el-input>
       <el-input class="query1" placeholder="请输入服务名称" v-model="page.serviceName" clearable></el-input>
        <el-select clearable class="query1" v-model="page.type" placeholder="请选择服务类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable class="query1" v-model="page.verifyStatus" placeholder="请选择状态">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="getMerchant">搜索</el-button>
        <el-table :data="informationList" @expand-change="detail">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="消息图片：">
                   <img :src="props.row.headImg" class="imageSize">
                </el-form-item>
                <el-form-item label="联系人：">
                  <span>{{ props.row.contact }}</span>
                </el-form-item>
                <el-form-item label="联系电话：">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item v-show="props.row.wechat!=''" label="微信：">
                  <span>{{ props.row.wechat }}</span>
                </el-form-item>
                <el-form-item v-show="props.row.qq!=''" label="QQ：">
                  <span>{{ props.row.qq }}</span>
                </el-form-item>
                <el-form-item label="服务地址：">
                  <span>{{ props.row.province }}{{ props.row.city }}{{ props.row.district }}</span>
                </el-form-item>
                <div v-show="informationType == 1">
                <el-form-item v-show="oldCondition!=''" label="当前病况：" label-width="120px">
                  <span>{{ oldCondition}}</span>
                </el-form-item>
                 <el-form-item v-show="oldConditionHistory!=''" label="既往病史：" label-width="120px">
                  <span>{{ oldConditionHistory}}</span>
                </el-form-item>
                 <el-form-item v-show="oldCapacity!=''" label="行为能力：" label-width="120px">
                  <span>{{ oldCapacity}}</span>
                </el-form-item>
                 <el-form-item v-show="oldMaim!=''" label="功能障碍：" label-width="120px">
                  <span>{{ oldMaim}}</span>
                </el-form-item>
                 <el-form-item v-show="assist!=''" label="是否协助：" label-width="120px">
                  <span>{{ assist}}</span>
                </el-form-item>
                   <el-form-item v-show="attention!=''" label="注意事项：" label-width="120px">
                  <span>{{ attention}}</span>
                 </el-form-item>
                 <el-form-item v-show="gender!=''" label="护工性别要求："  label-width="120px">
                  <span>{{ gender}}</span>
                </el-form-item>
                <el-form-item v-show="age!=''" label="护工年龄要求：" label-width="120px">
                  <span>{{ age}}</span>
                </el-form-item>
                  <el-form-item v-show="qualification!=''" label="护工资质要求：" label-width="120px">
                  <span>{{ qualification }}</span>
                </el-form-item>
                <el-form-item v-show="specialRequest!=''" label="特殊要求：" label-width="120px">
                  <span>{{ specialRequest }}</span>
                </el-form-item>
                <el-form-item  v-show="oldImg!=''"  label="老人图片：">
                   <img :src="oldImg" class="imageSize">
                </el-form-item>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="merchantName" label="商家名称"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="serviceName" label="服务名称"></el-table-column>
          <el-table-column prop="type" label="服务类型">
          <template slot-scope="scope">
            <div v-if="scope.row.type==false" style="color:#409EFF">供</div>
            <div v-if="scope.row.type==true" style="color:#E6A23C"> 求</div>
          </template>
          </el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="timeZone" label="起始时间"></el-table-column>
          <el-table-column prop="verifyStatus" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.verifyStatus==0" style="color:#67C23A">审核中</div>
            <div v-if="scope.row.verifyStatus==1" style="color:#3c763d"> 通过</div>
            <div v-if="scope.row.verifyStatus==2" style="color:#F56C6C">拒绝</div>
          </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button v-show="scope.row.verifyStatus==0" @click="agree(scope.row)" type="text" size="small">通过</el-button>
              <el-button v-show="scope.row.verifyStatus==0" @click="disAgree(scope.row)" type="text" size="small">拒绝</el-button>
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
  informationList,
  updateInformation,
  getTotal
} from "../../model/information/index";
import { mapGetters } from "vuex";
export default {
  name: "information-manage",
  data() {
    return {
       options: [{
          value: 'false',
          label: '供'
        }, {
          value: 'true',
          label: '求'
        }],
      options1: [{
          value: '0',
          label: '审核中'
        }, {
          value: '1',
          label: '通过'
        }, {
          value: '2',
          label: '拒绝'
        }],
      tableData: [],
      InformationDetail:{},
      oldCondition:'',
      oldConditionHistory:'',
      oldCapacity:'',
      oldMaim:'',
      assist:'',
      attention:'',
      oldImg:'',
      gender:'',
      age:'',
      qualification:'',
      specialRequest:'',
      informationType:'',
      page: {
        current: 1,
        size: 10,
        merchantName: "",
        title:'',
        serviceName:'',
        type:'',
        verifyStatus:''
      }
    };
  },
    computed: {
    ...mapGetters(["informationList", "getTotal"])
  },
  methods: {
      getMerchant(){
        informationList(this.page);
      },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      informationList(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
     informationList(this.page);
    },
    // 消息新增跳转
    addInformation() {
      this.$router.push({ path: "/add-information" });
    },
      //列表获取
    detail: async function(row, expandedRows) {
      let informationId = row.id;
      this.informationType = row.type;
      let param={
        informationId
      }
      const res = await this.$http.get(
        this.$api.GET_ONE_INFORMATION,
        param
      );
      if (res.data.errorCode == 0) {
       let old = JSON.parse(res.data.result.content)[0].needOld
					//老人的一些情况
					this.oldCondition = old[0].content
					this.oldConditionHistory = old[1].content
					this.oldCapacity = old[2].content
					this.oldMaim = old[3].content
					let oldMessage = JSON.parse(res.data.result.content);
					//是否有人协助
					this.assist = oldMessage[1].help;
					//其他注意事项
					this.attention = oldMessage[2].other
					//老人生活照片
					this.oldImg = oldMessage[3].oldPic
					//护工性别要求
					this.gender = oldMessage[4].nurse[0].sex
					//护工年龄要求
					this.age = oldMessage[4].nurse[0].age
					//护工资质
					this.qualification = oldMessage[4].nurse[0].qualification
					//特别要求
					this.specialRequest = oldMessage[5].specialRequest
      }
    },
    agree: async function(e){
       let param = {
         id:e.id,
         verifyStatus:1
       }
       this.$confirm("此操作将通过该消息的审核, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
    .then(async() => {
          updateInformation(param)
            .then(res => {
              this.$message({
                type: "success",
                message: "文件已通过审核!"
              });
              informationList();
            })
        }).catch(() => {         
        });
    },
    disAgree: async function(e) {
      let param = {
        id: e.id,
        verifyStatus:2
      };
      this.$confirm("此操作将拒绝该消息的审核, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
       .then(async() => {
          updateInformation(param)
            .then(res => {
              this.$message({
                type: "success",
                message: "文件已拒绝!"
              });
        informationList();
            })
        }).catch(() => {         
        });
    }
  },
  mounted() {
    informationList();
  }
};
</script>

<style scoped>
.query1 {
  width: 15%;
  margin: 0px 0px 15px 0px;
}
.queryType {
  width: 15%;
  margin: 0px 0px 15px 10%;
}
.table {
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 3% 0px 0px 5%;
}
.merchantBtn {
  margin-bottom: 15px;
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
.imageSize {
  height: 50px;
  width: 50px;
}
.query1 {
  width: 15%;
  margin: 0px 0px 15px 0px;
}
.query2 {
  width: 15%;
  margin: 0px 0px 15px 100px;
}
</style>
