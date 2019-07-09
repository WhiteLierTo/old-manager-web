<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <el-input class="query2" placeholder="请输入商品名" v-model="page.goodsName" clearable></el-input>
      <el-input class="query3" placeholder="请输入用户" v-model="page.nickName" clearable></el-input>
      <el-button type="primary" @click="Collect">搜索</el-button>
      <div style="margin:1% 0px 0px 0px">
        <el-table :data="getCollect">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="nickname" label="用户名"></el-table-column>
           <el-table-column prop="name" label="商品名名"></el-table-column>
                <el-table-column prop="name" label="产地"></el-table-column>
                 <el-table-column prop="origin" label="产地"></el-table-column>
                <el-table-column prop="work" label="功能"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                    <el-button @click="editCollect(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteCollect(scope.row)" type="text" size="small">删除</el-button>
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
          :total="getCollectTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
    <div>
      <el-dialog title="收藏修改" :visible.sync="collectEdit" width="60%">
        <el-form :model="collectEditData" style="margin-left:5%">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品ID" label-width="80px">
                <el-input disabled v-model="collectEditData.id" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="12">
              <el-form-item label="商品名称" label-width="80px">
                <el-input disabled v-model="collectEditData.name" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="收藏状态" label-width="80px">
                  <el-radio v-model="collectEditData.collect" :label="true">是</el-radio>
                  <el-radio v-model="collectEditData.collect" :label="false">否</el-radio>
<!--                 <el-input v-model="collectEditData.collect" style="width:215px" autocomplete="off"></el-input>
 -->              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="collectEdit = false">取 消</el-button>
          <el-button type="primary" @click="collectEditClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getCollect,editCollect,deleteCollect} from "../../model/goods/index";
import { mapGetters } from "vuex";
export default {
  name: "collect-manage",
  mounted() {
    getCollect(this.page);
  },
  data() {
    return {
      tableData: [],
      collect: false,
      collectEdit: false,
      collectEditData: {},
      username: "",
      headImg:'',
      editorOption: {},
      page: {
        current: 1,
        size: 10,
        goodsName: "",
        nickName:''
      }
    };
  },
    computed: {
    ...mapGetters(["getCollect","getCollectTotal"])
  },
  methods: {
    //查询按钮
    Collect(){
        getCollect(this.page);
    },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      getCollect(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      getCollect(this.page);
    },
    editCollect(row) {
      this.collectEdit = true;
      this.collectEditData = row;
    },
    // 收藏修改
    collectEditClick: async function() {
      let params = {
        id: this.collectEditData.id,
        collect: this.collectEditData.collect,
      };
    editCollect(params)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        getCollect(this.page);
        this.collectEdit = false;
        })
        .catch(err => {});
    },
    deleteCollect: async function(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
       .then(async() => {
          deleteCollect(e.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              getCollect(this.page);
            })
        }).catch(() => {         
        });
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
  margin: 0px 0px 15px 50%;
}
.query3 {
  width: 15%;
  margin: 0px  15px;
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
