<template>
  <div>
    <el-card class="table">
      <el-form :model="form"  ref="form" style="margin-left:5%">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称" label-width="110px" prop="title">
              <el-input v-model="form.name" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产地" label-width="110px" prop="contact">
              <el-input v-model="form.origin" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="访问量" label-width="110px" prop="phone">
              <el-input type="number"  v-model="form.visit" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="8">
            <el-form-item label="商品类型" label-width="110px" prop="serviceId">
              <el-select v-model="form.type"  placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="标题" label-width="110px" prop="phone">
              <el-input  v-model="form.title" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="功能" label-width="110px" prop="phone">
              <el-input  v-model="form.work" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
             <el-form-item label="推荐指数" label-width="110px" prop="phone">
              <el-input type="number"  v-model="form.ratings" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="价格" label-width="110px" prop="phone">
              <el-input  v-model="form.price" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="链接" label-width="110px" prop="phone">
              <el-input  v-model="form.url" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
           <h4>商品介绍</h4>
          <div style="width:100%;height:10%;margin-bottom:20px">
        <div>
        <!-- 图片上传组件辅助-->
        <el-upload
                id="quill-upload-goods"
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
                v-model="form.introduce"
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
          :on-success="headImgSuccess"
          :on-remove="headImgRemove"
          list-type="picture"
          :limit="1"
        >
          <el-button style="margin-top:50px" size="small" type="primary">首页图片上传</el-button>
        </el-upload>
           <el-upload
          class="upload-demo"
          :action="img"
          :on-success="oldmanSuccess"
          :on-remove="oldmanRemove"
          list-type="picture"
          :limit="4"
        >
          <el-button style="margin-top:50px" size="small" type="primary">介绍图片上传</el-button>
        </el-upload>
      </el-form>
      <div style="margin-top:50px">
        <el-button style="margin-left:50%" @click="publich" type="primary">发布</el-button>
        <el-button @click="returnHome">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addGoods } from "../../model/goods/index";
import imageURL from "../../axios/http";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import moment from "moment";
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
  mounted() {
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
                                      document.querySelector('#quill-upload-goods input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
      form:{
        name:'',
        origin:'',
        title:'',
        type:'',
        price:'',
        work:'',
        visit:'',
        ratings:'',
        headImg:'',
        introduce:'',
        url:'',
        goodsPic:[]
      },
      options: [{
          value: '1',
          label: '行走'
        }, {
          value: '2',
          label: '床卧'
        }, {
          value: '3',
          label: '生活'
        }, {
          value: '4',
          label: '家具'
        }, {
          value: '5',
          label: '智能障碍'
        }, {
          value: '6',
          label: '其他'
        }],
    }
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
    //首页头像移除及上传成功钩子
    headImgRemove(file) {
     this.form.headImg = '';
    },
    headImgSuccess(file) {
      this.form.headImg = file.result;
    },
     //老人图片移除及上传成功钩子
    oldmanRemove(file) {
      this.form.goodsPic = [];
    },
    oldmanSuccess(response, file, fileList) {
      let picUrl = {"picUrl":response.result};
      this.form.goodsPic.push(picUrl);
    },

    //返回
    returnHome() {
      this.$router.push({ path: "/goods" });
    },
    //发布
    publich: async function() {
       if (this.form.name == '' || this.form.title=='' || this.form.headImg == ''|| this.form.url=='') {
        this.$message({
          message: "请完善商品信息!"
        });
        return;
      }
      let param = {
        work: this.form.work,
        name: this.form.name,
        origin:this.form.origin,
        title: this.form.title,
        type:this.form.type,
        price:this.form.price,
        headImg: this.form.headImg,
        url:this.form.url,
        goodsPic:JSON.stringify(this.form.goodsPic),
        introduce:this.form.introduce,
        visit:this.form.visit,
        ratings:this.form.ratings
      };
      addGoods(param)
            .then(res => {
              this.$message({
                type: "success",
                message: "新增成功!"
              });
             this.$router.push({ path: "/goods" });
            })
       .catch(err => {
          this.$message({
          type: "error",
          message: "新增失败!"
        });
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
</style>
