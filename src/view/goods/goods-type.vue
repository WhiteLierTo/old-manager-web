<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
         <el-button plain class="addBtn" type="primary" @click="add=true">新增商品类型</el-button>
        <el-table :data="getGoodsType" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="name" label="类型名称"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
          :total="getTypeTotal"
          style="float: right;margin:20px 0px 20px 0px"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="修改商品类型" :visible.sync="edit">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型" label-width="80px">
              <el-input style="width:215px" v-model="form.name" autocomplete="off"></el-input>
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
    <el-dialog title="新增类型" :visible.sync="add">
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品类型" label-width="80px">
              <el-input style="width:215px" v-model="param.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add = false">取 消</el-button>
        <el-button type="primary" @click="addPerson">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsType,editGoodsType,addGoodsType} from "../../model/goods/index";
import { mapGetters } from "vuex";
export default {
  name: "goods-type",
  data() {
    return {
      edit: false,
      add:false,
      page: {
        current: 1,
        size: 10,
        name:''
      },
      tableData: [],
      param:{
        name:''
      },
      form: {
       id:'',
       name: '',
      }
    };
  },
    computed: {
    ...mapGetters(["getGoodsType","getTypeTotal"])
  },
  methods: {
    //编辑传值
    handleClick(row) {
      this.edit = true;
      this.form.id = row.id;
      this.form.name = row.name;
    },
    //新增商品类型
    addPerson: async function() {
       addGoodsType(this.param)
        .then(res => {
          this.$message({
            type: "success",
            message: "新增成功!"
          });
        this.add = false;
        this.param.name = '',
         getGoodsType();
          })
         .catch(err => {});
    },
    //编辑商品类型
    editPerson: async function() {
       editGoodsType(this.form)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        getGoodsType();
       this.edit = false;
        })
        .catch(err => {});
    },
    // 分页
    handleSizeChange(val) {
      this.page.size = val;
      getGoodsType(this.page);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      getGoodsType(this.page);
    },
  },
  mounted() {
    getGoodsType();
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
  margin-bottom: 15px;
}
</style>

