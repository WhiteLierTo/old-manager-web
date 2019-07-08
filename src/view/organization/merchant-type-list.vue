<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-button plain class="merchantBtn" type="primary" @click="add=true">新增类型</el-button>

        <el-table :data="getTypeList" border>
          <el-table-column prop="name" label="类型名称"></el-table-column>
          <el-table-column prop="url" label="跳转地址"></el-table-column>
          <el-table-column prop="number" label="排列顺序"></el-table-column>
          <el-table-column prop="enable" label="是否启用">
            <template slot-scope="scope">
              <div v-if="scope.row.enable==false" style="color:#F56C6C">禁用</div>
              <div v-if="scope.row.enable==true" style="color:#67C23A">启用</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
          :total="getTypetotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑 -->
    <!-- <el-dialog title="修改类型" :visible.sync="edit">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型名称" label-width="80px">
              <el-input style="width:215px" v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型图片" label-width="80px">
              <img :src="form.headImg" class="image" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="跳转地址" label-width="80px">
              <el-input type="textarea" style="width:215px" v-model="form.url" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排列顺序" label-width="80px">
              <el-input style="width:215px" v-model="form.number" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否启用" label-width="80px">
              <el-select v-model="form.enable" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-upload
          class="upload-demo"
          :action="this.$http.imageURL"
          :on-success="messageSuccess"
          :on-remove="messageRemove"
          list-type="picture"
          :limit="1"
        >
          <el-button size="small" type="primary">类型图片</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="editPerson">确 定</el-button>
      </div>
    </el-dialog>-->

    <!-- 新增 -->
    <!-- <el-dialog title="新增用户" :visible.sync="add">
      <el-form :model="param">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型名称" label-width="80px">
              <el-input style="width:215px" v-model="param.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型图片" label-width="80px">
              <img :src="param.headImg" class="image" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="跳转地址" label-width="80px">
              <el-input style="width:215px" v-model="param.url" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排列顺序" label-width="80px">
              <el-input style="width:215px" v-model="param.number" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否启用" label-width="80px">
              <el-select v-model="param.enable" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-upload
          class="upload-demo"
          :action="this.$http.imageURL"
          :on-success="typeSuccess"
          :on-remove="typeRemove"
          list-type="picture"
          :limit="1"
          style="margin-top:20px"
        >
          <el-button size="small" type="primary">类型图片</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add = false">取 消</el-button>
        <el-button type="primary" @click="addPerson">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import {
  getTypeListFnc,
  deleteTypeListFnc
} from "../../model/organization/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: true,
          label: "启用"
        },
        {
          value: false,
          label: "禁用"
        }
      ],
      options1: [
        {
          value: true,
          label: "启用"
        },
        {
          value: false,
          label: "禁用"
        }
      ],
      edit: false,
      add: false,
      page: {
        current: 1,
        size: 10,
        total: 10,
        username: ""
      },
      tableData: [],
      param: {
        name: "",
        headImg: "",
        url: "",
        number: "",
        enable: true
      },
      form: {
        //编辑
        id: "",
        name: "",
        headImg: "",
        url: "",
        number: "",
        enable: true
      }
    };
  },
  computed: {
    ...mapGetters(["getTypeList","getTypetotal"])
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      this.getTypeListFnc(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getTypeListFnc(this.page);
    },
    //删除
    deleteHandleClick(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTypeListFnc(id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //列表获取
              getTypeListFnc(this.page);
            })
            .catch(err => {});
        })
        .catch(() => {});
    }
  },
  mounted() {
    //类型列表
    getTypeListFnc(this.page);
  }
};
</script>
<style scoped>
.query5 {
  width: 15%;
  margin: 0px 0px 15px 75%;
}
.table {
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 3% 0px 0px 5%;
}
.addBtn {
  margin-left: 54px;
}
.image {
  height: 120px;
  width: 120px;
}
.merchantBtn {
  margin: 10px 0px 20px 0px;
}
</style>

