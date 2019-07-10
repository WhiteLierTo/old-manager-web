<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-button plain class="addBtn" type="primary" @click="addHandleClick">新增服务</el-button>
        <el-input class="query" placeholder="请输入查询的服务" v-model="careType" clearable></el-input>
        <el-button type="primary" @click="searchHandleClick">搜索</el-button>
        <el-table :data="serviceList" border>
          <el-table-column prop="careType" label="服务类型">
            <template slot-scope="scope">
              <div v-if="scope.row.careType==1">生活服务</div>
              <div v-else-if="scope.row.careType==2">康护服务</div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="服务价格"></el-table-column>
          <el-table-column prop="serviceType" label="服务名称"></el-table-column>
          <el-table-column prop="serviceTime" label="服务时间"></el-table-column>
          <el-table-column prop="apply" label="适用人群">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.apply.applyPeople" :key="index">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="headImg" label="服务图片">
            <template slot-scope="scope">
              <img v-if="scope.row.headImg" :src="scope.row.headImg" width="70" height="70" />
              <div v-else>暂无数据</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="editHandleClick(scope.row)" type="text" size="small">编辑</el-button>
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
          :total="total"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="修改用户" :visible.sync="editShow">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务时间" label-width="80px">
              <el-input style="width:80%" v-model="form.serviceTime" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务价格" label-width="80px">
              <el-input style="width:80%" v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="服务类型" label-width="80px">
              <el-select
                v-model="form.careType"
                placeholder="请选择服务类型"
                @change="change"
                style="width:80%"
              >
                <el-option label="生活服务" value="1"></el-option>
                <el-option label="康护服务" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务名称" label-width="80px">
              <el-input style="width:80%" v-model="form.serviceType" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="margin-left:10px;">
            <p>适用人群</p>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange('edit')">
              <el-checkbox v-for="(item,index) in applyCommon" :label="item" :key="index">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="12">
            <p style="margin-left:10px;margin-top:20px">用户头像</p>
            <el-upload
              class="avatar-uploader"
              :action="img"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.headImg" :src="form.headImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="editSurehandleClick">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增 -->
    <el-dialog title="新增用户" :visible.sync="addShow">
      <el-form :model="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务时间" label-width="80px">
              <el-input style="width:80%" v-model="addForm.serviceTime" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务价格" label-width="80px">
              <el-input style="width:80%" v-model="addForm.price" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="服务类型" label-width="80px">
              <el-select
                v-model="addForm.careType"
                placeholder="请选择服务类型"
                @change="change"
                style="width:80%"
              >
                <el-option label="生活服务" value="1"></el-option>
                <el-option label="康护服务" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务名称" label-width="80px">
              <el-input style="width:80%" v-model="addForm.serviceType" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="margin-left:10px;">
            <p>适用人群</p>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange('add')">
              <el-checkbox v-for="(item,index) in applyCommon" :label="item" :key="index">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="12">
            <p style="margin-left:10px;margin-top:20px">用户头像</p>
            <el-upload
              class="avatar-uploader"
              :action="img"
              :show-file-list="false"
              :on-success="addHandleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="headImg" :src="headImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="addSureHandleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getServiceFnc,
  deleteServiceFnc,
  editServiceFnc,
  addServiceFnc
} from "../../model/service/index";
import { mapGetters } from "vuex";
import imageURL from "../../axios/http";
//careType=1默认适用人群
const apply1 = [
  "适用于生活基本自理的高龄老人",
  "半自理或慢病需要协同照护的患者",
  "术后康复需要定期或长期辅助锻炼的人群"
];
//careType=2默认适用人群
const apply2 = ["适用于高龄", "失能", "失智人群"];
export default {
  name: "user-manage",
  data() {
    return {
      editShow: false,
      addShow: false,
      page: {
        current: 1,
        size: 10,
        type: ""
      },
      careType: "",
      form: {
        //编辑
        id: "",
        careType: "",
        serviceTime: "",
        price: "",
        apply: {},
        headImg: "",
        serviceType: ""
      },
      //新增
      addForm: {
        id: "",
        careType: "",
        serviceTime: "",
        price: "",
        apply: {},
        serviceType: ""
      },
      headImg: "",
      checkedCities: [],
      applyCommon: apply1,
      img: "",
      serviceList: [],
      total: 0
    };
  },
  watch: {
    careType: {
      handler(val) {
        if (!val) {
          this.page.type = "";
          getServiceFnc(this.page);
        }
      },
      deep: true
    }
  },
  methods: {
    //搜索
    searchHandleClick() {
      if (this.careType == "生活服务") {
        this.page.type = 1;
      } else if (this.careType == "康护服务") {
        this.page.type = 2;
      }
      //列表获取
      this.getServiceListFnc();
    },
    //分页
    handleSizeChange(val) {
      this.page.size = val;
      //列表获取
      this.getServiceListFnc();
    },
    //跳页
    handleCurrentChange(val) {
      this.page.current = val;
      //列表获取
      this.getServiceListFnc();
    },
    //删除
    deleteHandleClick(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteServiceFnc(id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //判断是否当前页最后一条数据，如果是，删除后，返回上一页
              const totalPage = Math.ceil((this.total - 1) / this.page.size); // 总页数
              this.page.current =
                this.page.current > totalPage ? totalPage : this.page.current;
              this.page.current = this.page.current < 1 ? 1 : this.page.current;
              //列表获取
              this.getServiceListFnc();
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    //添加
    addHandleClick() {
      this.addShow = true;
    },
    //编辑
    editHandleClick(obj) {
      this.checkedCities = [];
      this.editShow = true;
      this.form.price = obj.price;
      this.form.serviceTime = obj.serviceTime;
      this.form.careType = obj.careType;
      this.form.serviceType = obj.serviceType;
      this.form.apply = obj.apply;
      //初始化适用人群
      this.checkedCities = [
        ...this.checkedCities,
        ...this.form.apply.applyPeople
      ];
      this.form.headImg = obj.headImg;
      this.form.id = obj.id;
      if (this.form.careType == 1) {
        this.applyCommon = apply1;
        this.form.careType = "生活服务";
      } else if (this.form.careType == 2) {
        this.applyCommon = apply2;
        this.form.careType = "康护服务";
      }
    },
    //确定编辑
    editSurehandleClick() {
      if (this.checkedCities.length == 0) {
        this.$message.error("请选择适用人群!");
        return;
      }
      if (this.form.careType == "生活服务") {
        this.form.careType = 1;
      } else if (this.form.careType == "康护服务") {
        this.form.careType = 2;
      }
      let applyObj1 = {};
      applyObj1.applyPeople = JSON.stringify(this.checkedCities);
      this.form.apply = applyObj1;

      let form1 = {
        apply: JSON.stringify(this.form.apply),
        careType: this.form.careType,
        headImg: this.form.headImg,
        id: this.form.id,
        price: this.form.price,
        serviceTime: this.form.serviceTime,
        serviceType: this.form.serviceType
      };
      console.log("form:" + JSON.stringify(form1));
      editServiceFnc(form1).then(res => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.editShow = false;
        //服务详情列表获取
        this.getServiceListFnc();

        //清空
        this.checkedCities = [];
      });
    },
    //确定添加
    addSureHandleClick() {
      if (this.checkedCities.length == 0) {
        this.$message.error("请选择适用人群!");
        return;
      }
      if (this.addForm.careType == "生活服务") {
        this.addForm.careType = 1;
      } else if (this.addForm.careType == "康护服务") {
        this.addForm.careType = 2;
      }
      this.addForm.headImg = this.headImg;
      addServiceFnc(this.addForm).then(res => {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.addShow = false;
        //服务详情列表获取
        this.getServiceListFnc();
        //清空
        this.checkedCities = [];
        this.addForm = {};
        this.headImg = "";
      });
    },
    //选择适用人群
    handleCheckedCitiesChange(status) {
      let applyObj = {};
      if (status == "add") {
        applyObj.applyPeople = JSON.stringify(this.checkedCities);
        this.addForm.apply = JSON.stringify(applyObj);
      }
    },
    //改变服务类型对应改变适用人群
    change(val) {
      if (val == 1) {
        this.checkedCities = [];
        this.applyCommon = apply1;
      } else if (val == 2) {
        this.checkedCities = [];
        this.applyCommon = apply2;
      }
    },
    //增加图片
    addHandleAvatarSuccess(res, file) {
      this.headImg = file.response.result;
    },
    //修改图片
    handleAvatarSuccess(res, file) {
      this.form.headImg = file.response.result;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    getServiceListFnc() {
      getServiceFnc(this.page).then(res => {
        console.error(JSON.stringify(res.data.result.list));
        res.data.result.list.forEach(v => {
          v.apply = JSON.parse(v.apply);
          v.apply.applyPeople = JSON.parse(v.apply.applyPeople);
        });
        this.serviceList = res.data.result.list;
        this.total = res.data.result.total;
      });
    }
  },
  mounted() {
    //服务详情列表获取
    this.getServiceListFnc();
    this.img = imageURL;
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>