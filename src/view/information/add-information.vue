<template>
  <div>
    <el-card class="table">
      <el-form :model="form" :rules="rules" ref="form" style="margin-left:5%">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" label-width="110px" prop="title">
              <el-input v-model="form.title" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" label-width="110px" prop="contact">
              <el-input v-model="form.contact" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" label-width="110px" prop="phone">
              <el-input maxlength="11" v-model="form.phone" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务类型" label-width="110px" prop="serviceId">
              <el-select v-model="form.serviceId" @change="serviceType" placeholder="请选择">
                <el-option
                  v-for="item in service"
                  :key="item.id"
                  :label="item.serviceName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供求类型" label-width="110px" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in gType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市选择" label-width="110px" prop="city">
              <el-cascader :options="city" v-model="selectedCity" @change="cityChange"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" label-width="110px" prop="beginDate">
              <el-time-select
                v-model="form.beginDate"
                :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '23:59'
                    }"
                placeholder="开始时间"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" label-width="110px" prop="endDate">
              <el-time-select
                v-model="form.endDate"
                :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '23:59'
                    }"
                placeholder="结束时间"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务价格" label-width="110px" prop="price">
              <el-input v-model="form.price" style="width:215px" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格是否可商量" label-width="110px" prop="reconsider">
              <el-select v-model="form.reconsider" placeholder="请选择">
                <el-option
                  v-for="item in discuss"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="this.form.type == true">
          <h5 style="color:#409EFF">| 护工特殊要求</h5>
          <el-row>
            <el-col :span="12">
              <el-form-item label="护工性别" label-width="110px">
                <el-select v-model="form.sex" placeholder="请选择">
                  <el-option
                    v-for="item in selectSex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="护工资质" label-width="110px">
                <el-select v-model="form.qualification" placeholder="请选择">
                  <el-option
                    v-for="item in nurseAptitudeArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否有人协助" label-width="110px">
                <el-select v-model="form.assist" placeholder="请选择">
                  <el-option
                    v-for="item in assistArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="护工年龄" label-width="110px">
                <el-select v-model="form.age" placeholder="请选择">
                  <el-option
                    v-for="item in ageArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="特殊要求" label-width="110px">
                <el-input
                  type="textarea"
                  v-model="form.specialRequire"
                  style="width:215px"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h5 style="color:#409EFF">| 老人特殊情况</h5>
          <el-row>
            <el-col :span="12">
              <el-form-item label="当前病况" label-width="110px">
                <el-select v-model="form.illness" placeholder="请选择">
                  <el-option
                    v-for="item in illnessList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="既往病史" label-width="110px">
                <el-select v-model="form.medicalHistory" placeholder="请选择">
                  <el-option
                    v-for="item in medicalHistoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="功能障碍" label-width="110px">
                <el-select v-model="form.obstacle" placeholder="请选择">
                  <el-option
                    v-for="item in obstacleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行为能力" label-width="110px">
                <el-select v-model="form.capacity" placeholder="请选择">
                  <el-option
                    v-for="item in capacityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注意事项" label-width="110px">
                <el-input
                  type="textarea"
                  v-model="form.attentionMatters"
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
          :on-success="informationSuccess"
          :on-remove="informationRemove"
          list-type="picture"
          :limit="1"
        >
          <el-button style="margin-top:50px" size="small" type="primary">图片上传</el-button>
        </el-upload>
        <el-upload
          class="upload-demo"
          :action="this.$http.imageURL"
          :on-success="oldmanSuccess"
          :on-remove="oldmanRemove"
          list-type="picture"
          :limit="1"
        >
          <el-button style="margin-top:50px" size="small" type="primary">老人图片上传</el-button>
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
import moment from "moment";
export default {
  mounted() {
    this.getService();
    this.getMerchant();
    this.type = sessionStorage.getItem("type");
  },
  data() {
    return {
      type: "",
      gType: [
        {
          value: false,
          label: "供"
        },
        {
          value: true,
          label: "求"
        }
      ],
      discuss: [{ value: "是", label: "是" }, { value: "否", label: "否" }],
      city: [
        {
          value: "江苏省",
          label: "江苏省",
          children: [
            {
              value: "苏州市",
              label: "苏州市",
              children: [
                {
                  value: "吴中区",
                  label: "吴中区"
                },
                {
                  value: "虎丘区",
                  label: "虎丘区"
                },
                {
                  value: "姑苏区",
                  label: "姑苏区"
                },
                {
                  value: "相城区",
                  label: "相城区"
                },
                {
                  value: "吴江区",
                  label: "吴江区"
                },
                {
                  value: "工业园区",
                  label: "工业园区"
                }
              ]
            }
          ]
        }
      ],
      rules: {
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        serviceId: [
          { required: true, message: "请选择服务类型", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        type: [
          { required: true, message: "请选择机构类型", trigger: "change" }
        ],
        institutional: [
          { required: true, message: "请输入机构性质", trigger: "blur" }
        ]
      },
      form: {
        title: "",
        contact: "",
        phone: "",
        serviceId: "",
        serviceName: "",
        province: "",
        city: "",
        district: "",
        street: "",
        price: "",
        type: "",
        beginDate: "",
        endDate: "",
        headImg: "",
        illness: "",
        medicalHistory: "",
        capacity: "",
        obstacle: "",
        attentionMatters: "",
        imagePath: "",
        sex: "",
        age: "",
        assist: "",
        qualification: "",
        specialRequest: ""
      },
      service: [],
      serviceId: [],
      selectedCity: [],
      merchantAll: {},
      userId: "",
      selectSex: [{ value: "女", label: "女" }, { value: "男", label: "男" }],
      ageArray: [
        { value: "不限", label: "不限" },
        { value: "18-22岁", label: "18-22岁" },
        { value: "22-26岁", label: "22-26岁" },
        { value: "26-30岁", label: "26-30岁" },
        { value: "30-35岁", label: "30-35岁" },
        { value: "40-45岁", label: "40-45岁" },
        { value: "50岁以上", label: "'50岁以上" }
      ],
      nurseAptitudeArray: [
        { value: "有", label: "有" },
        { value: "无", label: "无" }
      ],
      assistArray: [{ value: "是", label: "是" }, { value: "否", label: "否" }],
      illnessList: [
        { value: "无", label: "无" },
        { value: "心血管疾病", label: "心血管疾病" },
        { value: "泌尿疾病", label: "泌尿疾病" },
        { value: "肠胃疾病", label: "肠胃疾病" },
        { value: "骨质疾病", label: "骨质疾病" },
        { value: "神经性疾病", label: "神经性疾病" },
        { value: "支气管疾病", label: "支气管疾病" }
      ],
      medicalHistoryList: [
        { value: "无", label: "无" },
        { value: "心血管疾病", label: "心血管疾病" },
        { value: "泌尿疾病", label: "泌尿疾病" },
        { value: "肠胃疾病", label: "肠胃疾病" },
        { value: "骨质疾病", label: "骨质疾病" },
        { value: "神经性疾病", label: "神经性疾病" },
        { value: "支气管疾病", label: "支气管疾病" }
      ],
      capacityList: [
        { value: "生活可以自理", label: "生活可以自理" },
        { value: "生活自理困难", label: "生活自理困难" },
        { value: "生活勉强自理", label: "生活勉强自理" },
        { value: "生活无法自理", label: "生活无法自理" }
      ],
      obstacleList: [
        { value: "无", label: "无" },
        { value: "视力障碍", label: "视力障碍" },
        { value: "记忆障碍", label: "记忆障碍" },
        { value: "肢体残疾", label: "肢体残疾" }
      ]
    };
  },
  methods: {
    //获取商家信息
    getMerchant: async function() {
      this.userId = sessionStorage.getItem("userId");
      let param = {
        userId: this.userId
      };
      const res = await this.$http.get(this.$api.merchant.merchantAll, param);
      this.merchantAll = res.data.result[0];
    },
    //获取服务
    getService: async function() {
      const res = await this.$http.get(this.$api.merchant.serviceMerchant);
      for (let i = 0; i < res.data.result.list.length; i++) {
        if (res.data.result.list[i].serviceName != "护理院") {
          this.service.push(res.data.result.list[i]);
        }
      }
    },
    //获取单个
    serviceType: async function() {
      let param = {
        id: this.form.serviceId
      };
      const res = await this.$http.get(
        this.$api.merchant.merchantServiceOne,
        param
      );
      if (res.data.errorCode == 0) {
        this.form.serviceName = res.data.result.serviceName;
      }
    },
    //商家头像移除及上传成功钩子
    merchantRemove(file) {
      console.log(file);
    },
    merchantSuccess(file) {
      this.form.headImg = file.result;
    },
    //商家资质移除及上传成功钩子
    qualificationRemove(file) {
      console.log(file);
    },
    qualificationSuccess(file) {
      this.form.headImg = file.result;
    },
    //机构环境移除及上传成功钩子
    informationRemove(file) {
      console.log(file);
    },
    informationSuccess(file) {
      this.form.headImg = file.result;
    },
    //老人图片移除及上传成功钩子
    oldmanRemove(file) {
      console.log(file);
    },
    oldmanSuccess(file) {
      this.form.oldPic = file.result;
    },
    // 推荐指数
    handleChange(value) {
      this.form.ratings = value;
    },
    // 城市选择
    cityChange(value) {
      this.form.province = value[0];
      this.form.city = value[1];
      this.form.district = value[2];
    },
    //返回
    returnHome() {
      this.$router.push({ path: "/information-list" });
    },
    //发布
    publich: async function() {
      let publishDate = moment(new Date()).format("YYYY-MM-DDThh:mm:ss");
      if (this.form.type == false && this.type != true) {
        this.$message({
          type: "warning",
          message: "您还不是商家，不可以发布供服务!"
        });
        return;
      }
      if (this.form.headImg == "") {
        this.$message({
          message: "图片不能为空!"
        });
        return;
      }
      if (this.form.city == "") {
        this.$message({
          message: "请选择城市!"
        });
        return;
      }
      if (this.form.beginDate == "" || this.form.endDate == "") {
        this.$message({
          message: "开始或结束时间不能为空!"
        });
        return;
      }
      let param = {
        userId: this.userId,
        merchantId: this.merchantAll.id,
        title: this.form.title,
        contact: this.form.contact,
        phone: this.form.phone,
        serviceId: this.form.serviceId,
        serviceName: this.form.serviceName,
        province: this.form.province,
        city: this.form.city,
        district: this.form.district,
        street: this.form.street,
        type: this.form.type,
        price: this.form.price == "" ? "面议" : this.form.price,
        timeZone: this.form.beginDate + "-" + this.form.endDate,
        publishDate,
        headImg: this.form.headImg
      };
      const res = await this.$http.postJSON(
        this.$api.information.addInformation,
        param
      );
      if (res.data.errorCode == 0) {
        this.pushAdditionalInformation(res.data.result.id);
        this.$message({
          type: "success",
          message: "新增成功!"
        });
        this.$router.push({ path: "/information-manage" });
      } else {
        this.$message({
          type: "error",
          message: "新增失败!"
        });
      }
    },
    pushAdditionalInformation: async function(InformationId) {
      //如果是求则添加附加信息
      if (this.form.type == true) {
        //添加附加信息内容
        let content = [
          {
            needOld: [
              {
                title: "当前病况 ",
                content: this.form.illness
              },
              {
                title: "既往病史 ",
                content: this.form.medicalHistory
              },
              {
                title: "行为能力 ",
                content: this.form.capacity
              },
              {
                title: "功能障碍 ",
                content: this.form.obstacle
              }
            ]
          },
          {
            help: this.form.assist
          },
          {
            other:
              this.form.attentionMatters == ""
                ? (this.form.attentionMatters = "暂无注意事项")
                : this.form.attentionMatters
          },
          {
            oldPic: this.form.imagePath
          },
          {
            nurse: [
              {
                sex: this.form.sex,
                age: this.form.age,
                qualification: this.form.qualification
              }
            ]
          },
          {
            specialRequest:
              this.form.specialRequire == ""
                ? (this.form.specialRequire = "暂无特殊要求")
                : this.form.specialRequire
          }
        ];

        //添加附加信息对象
        let params = {
          informationId: InformationId,
          informationSign: "老人情况",
          content: JSON.stringify(content)
        };
        const res = await this.$http.postJSON(
          this.$api.information.additionalInformation,
          params
        );
        if (res.data.errorCode == 0) {
          this.$message({
            type: "success",
            message: "新增成功!"
          });
          this.$router.push({ path: "/information-manage" });
        } else {
          this.$message({
            type: "error",
            message: "新增失败!"
          });
        }
      }
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
</style>

