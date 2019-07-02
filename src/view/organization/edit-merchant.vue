<template>
  <div>
    <!-- 列表展示 -->
    <el-card class="table">
      <div style="margin:1% 0px 0px 0px">
        <el-form style="margin-left:15%" label-position="left" :model="tableData" inline>
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构名称" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.merchantName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构地址" label-width="100px">
                <el-input
                  style="width:215px"
                  autocomplete="off"
                  v-model="tableData.merchantAddress"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务区域" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.serviceZone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="对监护人要求" label-width="100px">
                <el-input
                  style="width:215px"
                  autocomplete="off"
                  v-model="tableData.applicationRequirementGuardian"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对老人要求" label-width="100px">
                <el-input
                  style="width:215px"
                  autocomplete="off"
                  v-model="tableData.applicationRequirementOld"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入住时间要求" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.checkinTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构性质" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.institutional"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="费用构成" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.feeStructure"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公费标准" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.publicStandard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请难度" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.difficulty"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="空床位数" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.emptyBeds"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="官方网址" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.websiteUrl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="推荐指数" label-width="100px">
                <el-input style="width:215px" autocomplete="off" v-model="tableData.ratings"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构描述" label-width="100px">
                <el-input
                  type="textarea"
                  style="width:215px"
                  autocomplete="off"
                  v-model="tableData.description"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="自费标准" label-width="100px">
                <el-input
                  type="textarea"
                  style="width:215px"
                  autocomplete="off"
                  v-model="tableData.naturalStandard"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="margin-top:50px">
        <el-button style="margin-left:45%" type="primary" @click="releaseHandleClick">发布</el-button>
        <el-button @click="returnHandleClick">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { editMerchantList } from "../../model/organization/merchant-list";
export default {
  data() {
    return {
      merchantId: "",
      tableData: {}
    };
  },
  methods: {
    //发布
    releaseHandleClick() {
      this.$confirm("修改当前商家列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("tableData:" + JSON.stringify(this.tableData));
          //编辑商家列表
          editMerchantList(this.tableData)
            .then(res => {
              console.error("res:" + JSON.stringify(res));
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    //返回
    returnHandleClick() {}
  },
  mounted() {
    this.tableData = this.$route.query.obj;
  }
};
</script>

