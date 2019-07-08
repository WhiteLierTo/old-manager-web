<template>
<div>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-table :data="getImage">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="picName" label="图片名称"></el-table-column>
          <el-table-column prop="picUrl" label="图片地址"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deletePerson(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
    <div>
        <el-dialog title="修改宣传语" :visible.sync="edit">
       <el-form>
            <el-form-item label-width="80px">
              <img :src="imageUrl" style="width:80%">
            </el-form-item>
      </el-form>
        <el-upload
          class="upload-demo"
          :action="img"
          :on-success="informationSuccess"
          :on-remove="informationRemove"
          list-type="picture"
          :limit="1">
          <el-button style="margin: 10px 0px 0px 80px" size="small" type="primary">图片上传</el-button>
        </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="uploadImage">确 定</el-button>
      </div>
    </el-dialog>

    </div>
  </div>
</template>

<script>
import imageURL from "../../axios/http";
import { getImage ,uploadImage,addImage,deleteImage} from "../../model/picture/index";
import { mapGetters } from "vuex";
export default {
    data(){
        return{
        edit:false,
        imageUrl:'',
        picUrl:'',
        id:'',
        img:'',
        param : {
            type:2
            }
        }
    },
      computed: {
    ...mapGetters(["getImage"])
  },
  mounted(){
    getImage(this.param);
    this.img = imageURL;
  },
  methods:{
      //机构环境移除及上传成功钩子
    informationRemove(file) {
      console.log(file);
    },
    informationSuccess(file) {
      this.picUrl = file.result;
      getImage(this.param);
    },
    //轮播图修改
    editClick: async function(e){
        this.edit = true;
        this.imageUrl = e.picUrl;
        this.id = e.id;
     },
     uploadHandleClick: async function(){
      let param={
        id : this.id,
        picUrl: this.picUrl,
        type: 2
      }
      uploadImage(param)
            .then(res => {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.picUrl = '',
              this.edit = false;
              getImage(this.param);
            })
       .catch(err => {});
    },
    deleteImage: async function(e){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          deleteImage(e.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              getImage(this.param);
            })
        }).catch(() => {         
        });
    },
  }
}
</script>

