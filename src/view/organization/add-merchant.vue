<template>
  <div>
    <el-card class="table">
      <el-form :model="form" :rules="rules" ref="form" style="margin-left:5%">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商家名称" label-width="80px" prop="merchantName">
              <el-input v-model="form.merchantName" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商家地址" label-width="80px" prop="merchantAddress">
              <el-input v-model="form.merchantAddress" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务区域" label-width="80px" prop="serviceZone">
              <el-input v-model="form.serviceZone" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" label-width="80px" prop="phone">
              <el-input maxlength="11" v-model="form.phone" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型" label-width="80px" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in getMerchantType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="推荐指数" label-width="80px">
              <el-input-number v-model="form.ratings" @change="handleChange" :max="5"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="官网网址" label-width="80px">
              <el-input v-model="form.websiteUrl" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商家描述" label-width="80px" prop="description">
              <el-input
                type="textarea"
                v-model="form.description"
                style="width:215px"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div v-show="this.form.type == 2">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请条件" label-width="80px">
                <el-input
                  placeholder="对监护人"
                  v-model="form.applicationRequirementGuardian"
                  style="width:215px"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请条件" label-width="80px">
                <el-input
                  placeholder="对老人"
                  v-model="form.applicationRequirementOld"
                  style="width:215px"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="空床位数" label-width="80px">
                <el-input v-model="form.emptyBeds" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请难度" label-width="80px">
                <el-input v-model="form.difficulty" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="费用构成" label-width="80px">
                <el-input v-model="form.feeStructure" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构性质" label-width="80px">
                <el-input v-model="form.institutional" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="自费标准" label-width="80px">
                <el-input v-model="form.naturalStandard" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公费标准" label-width="80px">
                <el-input v-model="form.publicStandard" style="width:215px" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入住时间" label-width="80px">
                <el-input
                  placeholder="入住时间要求"
                  v-model="form.checkinTime"
                  style="width:215px"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-upload
          class="upload-demo"
          :action="this.$http.imageURL"
          :on-success="merchantSuccess"
          :on-remove="merchantRemove"
          list-type="picture"
          :limit="1"
        >
          <el-button size="small" type="primary">机构头像</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-upload
          class="upload-demo"
          :action="this.$http.imageURL"
          :on-success="qualificationSuccess"
          :on-remove="qualificationRemove"
          list-type="picture"
          :limit="3"
        >
          <el-button style="margin-top:50px" size="small" type="primary">商家资质</el-button>
          <div slot="tip" class="el-upload__tip">只能上传最多三张的jpg/png文件，且每张不超过500kb</div>
        </el-upload>
        <el-upload
          class="upload-demo"
          :action="this.$http.imageURL"
          :on-success="environmentSuccess"
          :on-remove="environmentRemove"
          list-type="picture"
          :file-list="merchantEnvList"
          :limit="3"
        >
          <el-button style="margin-top:50px" size="small" type="primary">机构环境</el-button>
          <div slot="tip" class="el-upload__tip">只能上传最多三张的jpg/png文件，且每张不超过500kb</div>
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
import { getMerchantType } from "../../model/organization/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      rules: {
        merchantName: [
          { required: true, message: "请输入商家名称", trigger: "blur" }
        ],
        merchantAddress: [
          { required: true, message: "请输入商家地址", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        serviceZone: [
          { required: true, message: "请输入服务区域", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入商家描述", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择机构类型", trigger: "change" }
        ],
        institutional: [
          { required: true, message: "请输入机构性质", trigger: "blur" }
        ]
      },
      form: {
        userId: "",
        merchantName: "",
        merchantAddress: "",
        phone: "",
        serviceZone: "",
        description: "",
        institutional: "",
        ratings: "",
        type: "",
        headImg: "",
        websiteUrl: "",
        applicationRequirementGuardian: "",
        applicationRequirementOld: "",
        difficulty: "",
        emptyBeds: "",
        feeStructure: "",
        naturalStandard: "",
        publicStandard: "",
        checkinTime: ""
      },
      merchantEnvList: [],
      merchantEnvArr: [],
      merchantEnv: [],
      service: [],
      serviceId: [],
      qualification: "", //商家资质
      merchantId: ""
    };
  },
  computed: {
    ...mapGetters(["getMerchantType"])
  },
  methods: {},
  mounted() {
    //获取机构类型
    getMerchantType();
  }
};
</script>

