<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <el-button plain class="merchantBtn" type="primary" @click="addMessagePage">新增资讯</el-button>
      <el-input class="query2" placeholder="请输入资讯标题" v-model="page.title" clearable></el-input>
      <el-button type="primary" @click="MessageHandleClick">搜索</el-button>
      <div style="margin:1% 0px 0px 0px">
        <el-table :data="getMessage">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="资讯详情">
                  <span>{{ props.row.content }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="author" label="发布人"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="reading" label="阅读量"></el-table-column>
          <!-- <el-table-column prop="createAt" label="发布时间"></el-table-column> -->
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="editMessage(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteMessage(scope.row)" type="text" size="small">删除</el-button>
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
          :total="messageTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
    <div>
      <el-dialog title="资讯修改" :visible.sync="messageEdit" width="60%">
        <el-form :model="messageEditData" style="margin-left:5%">
          <el-row>
            <el-col :span="12">
              <el-form-item label="资讯标题" label-width="80px">
                <el-input v-model="messageEditData.title" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="12">
              <el-form-item label="阅读量" label-width="80px">
                <el-input disabled v-model="messageEditData.reading" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
         
              <el-form-item label="资讯详情" label-width="80px">
                <el-input
                  :rows="4"
                  type="textarea"
                  v-model="messageEditData.content"
                  style="width:100%"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
          <el-form-item label="资讯图片" label-width="80px">
            <img :src="messageEditData.titleImg" class="image">
          </el-form-item>
          <el-upload
            class="upload-demo"
            :action="img"
            :on-success="messageSuccess"
            :on-remove="messageRemove"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary">资讯图片</el-button>
          </el-upload>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="messageEdit = false">取 消</el-button>
          <el-button type="primary" @click="messageEditClick">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="资讯新增" :visible.sync="message" width="60%">
        <el-form :model="form" :rules="rules" ref="form" style="margin-left:5%">
          <el-row>
            <el-col :span="24">
              <el-form-item label="资讯标题" label-width="80px" prop="messageTitle">
                <el-input v-model="form.messageTitle" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
  <!--           <el-col :span="12">
              <el-form-item label="资讯详情" label-width="80px" prop="content">
                <el-input
                  :rows="4"
                  type="textarea"
                  v-model="form.content"
                  style="width:215px"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
          <h4>资讯详情</h4>
          <div style="width:100%;height:10%;margin-bottom:20px">
            <quill-editor
              ref="text"
              v-model="form.content"
              class="myQuillEditor"
              :options="editorOption"
            />
          </div>
          <el-upload
            class="upload-demo"
            :action="img"
            :on-success="messageSuccess"
            :on-remove="messageRemove"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary">资讯图片</el-button>
          </el-upload>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="message = false">取 消</el-button>
          <el-button type="primary" @click="addMessagePage">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getMessage,
  updatetMessage,
  messageDeleteFnc
} from "../../model/information/index";
import { mapGetters } from "vuex";
import imageURL from "../../axios/http";
import moment from "moment";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor
  },
  name: "message-manage",
  mounted() {
    getMessage(this.page);
    this.img = imageURL;
    this.username = sessionStorage.getItem("username");
    this.headImg = sessionStorage.getItem("headImg");
  },
  data() {
    return {
      data:["bh","name"],
      img:'',
      tableData: [],
      message: false,
      messageEdit: false,
      messageEditData: {},
      username: "",
      headImg:'',
      editorOption: {},
      rules: {
        messageTitle: [
          { required: true, message: "请输入资讯标题", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入资讯详情", trigger: "blur" }
        ]
      },
      form: {
        messageTitle: "",
        content: "",
        titleImg: ""
      },
      page: {
        current: 1,
        size: 10,
        title: ""
      }
    };
  },
    computed: {
    ...mapGetters(["getMessage", "messageTotal"])
  },
  methods: {
    MessageHandleClick(){
        getMessage(this.page);
      },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      getMessage(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      getMessage(this.page);
    },
    //资讯图片移除及上传成功钩子
    messageRemove(file) {
      console.log(file);
    },
    messageSuccess(file) {
      this.form.titleImg = file.result;
      this.messageEditData.titleImg = file.result;
    },
    editMessage(row) {
      this.messageEdit = true;
      this.messageEditData = row;
    },
    // 资讯修改
    messageEditClick: async function() {
      let param = {
        id: this.messageEditData.id,
        title: this.messageEditData.title,
        content: this.messageEditData.content,
        titleImg: this.messageEditData.titleImg
      };
      updatetMessage(param)
      .then(res => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.messageEdit = false;
        //服务详情列表获取
        getMessage();
      });
    },
    addMessagePage(){
      this.$router.push({ path: "/add-message" });
    },
    returnMessagePage(){
      this.$router.push({ path: "/message-list" });
    },
    deleteMessage(row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          messageDeleteFnc(id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //判断是否当前页最后一条数据，如果是，删除后，返回上一页
              // 总页数
              const totalPage = Math.ceil((this.messageTotal - 1) / this.page.size); 
              this.page.current =
                this.page.current > totalPage ? totalPage : this.page.current;
              this.page.current = this.page.current < 1 ? 1 : this.page.current; 
              //列表获取
              getMessage(this.page);
            })
            .catch(err => {});
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.table {
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 3% 0px 0px 5%;
}
.query2 {
  width: 15%;
  margin: 0px 0px 15px 60%;
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
.image {
  height: 120px;
  width: 120px;
}
</style>
