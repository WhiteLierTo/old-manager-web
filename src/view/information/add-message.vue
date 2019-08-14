<template>
  <div>
    <el-card class="table">
      <div>
        <el-form :model="form" :rules="rules" ref="form" style="margin-left:5%">
          <el-row>
            <el-col :span="24">
              <el-form-item label="资讯标题" label-width="80px" prop="messageTitle">
                <el-input v-model="form.messageTitle" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h4>资讯详情</h4>
          <div style="width:100%;height:10%;margin-bottom:20px">
         <!--    <quill-editor
              ref="text"
              v-model="form.content"
              class="myQuillEditor"
              :options="editorOption"
            /> -->
            <div>
        <!-- 图片上传组件辅助-->
        <el-upload
                id="quill-upload"
                class="avatar-uploader"
                :action="img"
                 :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
       <el-row v-loading="quillUpdateImg">
        <quill-editor
                v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption"
        >
        </quill-editor>
       </el-row>
    </div>
          </div>
          <el-upload
            class="upload-demo"
            :action="img"
            :on-success="messageSuccess"
            :on-remove="messageRemove"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary" style="margin-bottom:40px">资讯图片</el-button>
          </el-upload>
        </el-form>
        <span slot="footer" style="margin: 0px 0px 0px 50%">
          <el-button @click="returnPage">取 消</el-button>
          <el-button type="primary" @click="addMessage">确 定</el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  addMessage
} from "../../model/information/index";
import imageURL from "../../axios/http";
import moment from "moment";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
    // 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
export default {
  components: {
    quillEditor
  },
  name: "message-manage",
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.headImg = sessionStorage.getItem("headImg");
    this.img = imageURL;
  },
  data() {
    return {
      img:'',
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
      username: "",
      headImg:'',
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
    };
  },
  methods: {
     // 富文本图片上传前
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true
            },
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.errorCode == 0) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.result)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
       
            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },

    //资讯图片移除及上传成功钩子
    messageRemove(file) {
      console.log(file);
    },
    messageSuccess(file) {
      this.form.titleImg = file.result;
    },
    returnPage(){
        this.$router.push({ path: "/message-list" });
    },
    addMessage: async function() {
      let param = {
        title: this.form.messageTitle,
        content: this.form.content,
        titleImg: this.form.titleImg,
        author: this.username ? this.username : 'Sean',
        headImg:this.headImg ? this.headImg : 'http://cytimg.525bama.com/senior-service/2019/4/message/EkBRz/condos-elderly2.jpg',
        origin:'老人网',
        reading: 1
      };
      if (this.form.messageTitle == "") {
        this.$message({
          type: "warning",
          message: "标题不能为空!"
        });
        return
      }
       if (this.form.content == "") {
        this.$message({
          type: "warning",
          message: "内容不能为空!"
        });
        return
      }
      if (this.form.titleImg == "") {
        this.$message({
          type: "warning",
          message: "资讯图片不能为空!"
        });
        return
      }
      addMessage(param).then(res => {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
         this.$router.push({ path: "/message-list" });
      });
    },
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
