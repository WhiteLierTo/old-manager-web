<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
         <el-button plain class="addBtn" type="primary" @click="add=true">新增用户</el-button>
        <el-input class="query" placeholder="请输入查询的用户名" v-model="page.username" clearable></el-input>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-table :data="getUser" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="用户编号"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="type" label="用户类型">
            <template slot-scope="scope">
              <div v-if="scope.row.type==1">管理员</div>
              <div v-else-if="scope.row.type==2">商家</div>
              <div v-else-if="scope.row.type==3">个人</div>
              <div v-else-if="scope.row.type==''">暂无数据</div>
            </template>       
          </el-table-column>
          <el-table-column prop="headImg" label="用户头像">
                 <template   slot-scope="scope">            
                    <img v-if="scope.row.headImg!=''" :src="scope.row.headImg"  width="70" height="70"/>
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
          :total="getUserTotal"
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
        <el-button type="primary" @click="editPerson">确 定</el-button>
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
          :action="img"
          :on-success="addSuccess"
          :on-remove="addRemove"
          list-type="picture"
          :limit="1"
        >
          <el-button style="margin-top:50px" size="small" type="primary">头像</el-button>
        </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="addPerson">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUser,
  updatetUser,
  deleteUser,
  addUser
} from "../../model/information/index";
import { mapGetters } from "vuex";
import imageURL from "../../axios/http";
export default {
  name: "user-manage",
  data() {
    return {
      img:'',
      edit: false,
      add:false,
      page: {
        current: 1,
        size: 10,
        username:''
      },
      tableData: [],
      param:{
        username:'',
        password:'',
        headImg:'http://cytimg.525bama.com/senior-service/2019/4/mine/Qjbey/avtor.png',
        type:''
      },
      form: {
        //编辑
        id:'',
        type:'',
        userId:'',
        username: '',
      }
    };
  },
   computed: {
    ...mapGetters(["getUser", "getUserTotal"])
  },
  methods: {
    getList(){
      getUser(this.page);
    },
    //编辑传值
    handleClick(row) {
      this.edit = true;
      this.form.userId = row.userId;
      this.form.id = row.id;
      this.form.username = row.username;
      this.form.type = row.type;
    },
    //新增用户
    addPerson: async function() {
       if (this.param.type == "管理员") {
        this.param.type = 1;
      }
      if (this.param.type == "商家") {
        this.param.type = 2;
      }
      if (this.param.type == "个人") {
        this.param.type = 0;
      }
      addUser(this.param).then(res => {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.add = false;
        this.param.username = '',
        this.param.password='',
        this.param.headImg='http://cytimg.525bama.com/senior-service/2019/4/mine/Qjbey/avtor.png',
        this.param.type=''
        getUser();
      });
    },
    //编辑用户
    editPerson: async function() {
      if (this.form.type == "管理员") {
        this.form.type = 1;
      }
      if (this.form.type == "商家") {
        this.form.type = 2;
      }
      if (this.form.type == "个人") {
        this.form.type = 0;
      }
      updatetUser(this.form)
      .then(res => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.edit = false;
        //服务详情列表获取
        getUser();
      });
    },
    //删除
      deletePerson(row){
        let id = row.id;   
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })  .then(async () => {
          deleteUser(id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              getUser();
            })
            .catch(err => {});
        })
        .catch(() => {});
      },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
     getUser(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      getUser(this.page);
    },
    //头像移除及上传成功钩子
    addRemove(file) {
      console.log(file);
    },
    addSuccess(file) {
      this.param.headImg = file.result;
    },
  },
  mounted() {
    this.img = imageURL;
    getUser();
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

