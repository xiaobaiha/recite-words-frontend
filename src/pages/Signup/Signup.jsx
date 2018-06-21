import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Row,
  Col,
  Button,
  Divider,
  Layout,
  Modal,
  DatePicker
} from "antd";
// import BreadcrumbCustom from "../../components/BreadcrumbCustom";
// import "./Signup.less";
import axios from "axios";
import {preURL} from "../../axios/config";
import {hashHistory} from "react-router";
// import {instanceOf} from "prop-types";
// import {withCookies, Cookies} from "react-cookie";
// import PhoneInput from "../../components/PhoneInput/PhoneInput";
// import FormArea from "../../components/FormArea/FormArea";
// import ControlledRangePicker from "../../components/ControlledRangePicker/ControlledRangePicker";
// import * as Util from "../../components/Utils";

const FormItem = Form.Item;
const Option = Select.Option;
const {Header, Footer, Sider, Content} = Layout;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

// const AutoCompleteOption = AutoComplete.Option;

class Signup extends React.Component {
//   static propTypes = {
//     cookies: instanceOf(Cookies).isRequired
//   };
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    userType: "student",
    phone_number: "",
    teacher_binding_status: 0,
    school_binding_status: 0,
    mail_valid: 1,
    userMail: '',
    teacherMail: '',
    schoolMail: '',
    isHighSchool: false,
    juniorStartEnd: [],
    seniorStartEnd: []
  };
//   constructor(props) {
//     super(props);
//   }

//   initData = () => {
//     // console.log("user type:", this.props.location);
//     this.setState({userType: this.props.location.query.usertype});
//   };

//   componentWillMount() {
//     const {cookies} = this.props;

//     if (cookies.get("front_user_temp")) {
//       let userObj = cookies.get("front_user_temp");
//       // console.log("header user:", userObj);
//       if (userObj.roleId === 1 || userObj.roleId === 2 || userObj.roleId === 3 || userObj.roleId === 4) {
//         if (userObj.roleId == 4) {
//           hashHistory.push("/app/test/welcome");
//         } else if (userObj.roleId == 1) {
//           hashHistory.push("/app/allocation/super_user");
//         } else if (userObj.roleId == 2) {
//           hashHistory.push("/app/allocation/school_level");
//         } else if (userObj.roleId == 3) {
//           hashHistory.push("/app/allocation/school_level");
//         }
//       }
//     }
//     this.initData();
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.mail_valid != 2) {
//       Modal.warning({title: "您有未完成步骤", content: "注册邮箱未检测通过！"});
//       return;
//     } else if (this.state.userType === "student" && this.state.teacher_binding_status === 1) {
//       Modal.warning({title: "您有未完成步骤", content: "绑定教师账号未检测通过！"});
//       return;
//     } else if (this.state.userType === "teacher" && this.state.school_binding_status != 2) {
//       Modal.warning({title: "您有未完成步骤", content: "绑定学校账号未检测通过！"});
//       return;
//     }
//     this
//       .props
//       .form
//       .validateFieldsAndScroll((err, values) => {
//         if (!err) {
//           console.log("Received values of form: ", values);
//           const userType = this.state.userType;
//           if (userType === "student") {
//             // const highValue = values.high_start_end ? true : false;
//             axios({
//               method: "post",
//               url: preURL + "/user/student_register",
//               dataType: "json",
//               data: {
//                 email: values.email,
//                 password: values.password,
//                 roleName: "student",
//                 username: "jack",
//                 realname: values.realname,
//                 sex: values.gender === "male"
//                   ? "男"
//                   : values.gender === "female"
//                     ? "女"
//                     : "",
//                 phone: values.phone,
//                 birth: values
//                   .birth
//                   .toDate(),
//                 province: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[0])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[0])[1]
//                 },
//                 city: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[1])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[1])[1]
//                 },
//                 district: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[2])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[2])[1]
//                 },
//                 school: values.school,
//                 juniorOrSenior: values.junior_or_high === "junior"
//                   ? "初中"
//                   : values.junior_or_high === "high"
//                     ? "高中"
//                     : "",
//                 juniorStarttime: this.state.juniorStartEnd[0]
//                   ? this
//                     .state
//                     .juniorStartEnd[0]
//                     .toDate()
//                   : '无',
//                 juniorEndtime: this.state.juniorStartEnd[1]
//                   ? this
//                     .state
//                     .juniorStartEnd[1]
//                     .toDate()
//                   : '无',
//                 seniorStarttime: this.state.seniorStartEnd[0]
//                   ? this
//                     .state
//                     .seniorStartEnd[0]
//                     .toDate()
//                   : '无',
//                 seniorEndtime: this.state.seniorStartEnd[1]
//                   ? this
//                     .state
//                     .seniorStartEnd[1]
//                     .toDate()
//                   : '无',
//                 belong_teacher_email: values.teacher || ""
//               },
//               headers: {
//                 "Content-Type": "application/json;charset=UTF-8"
//               }
//             }).then(response => {
//               console.log("register response:", response);
//               if (response.data.code === "200") {
//                 const {router} = this.props;
//                 Modal.success({title: "注册成功", content: <div><p>请前往邮箱进行激活！</p></div>});
//                 router.push("/login");
//               } else if (response.data.code === "6008") {
//                 Modal.error({title: "注册失败", content: "注册邮箱账号已存在/已经被占用！"});
//               } else if (response.data.code === "6002") {
//                 Modal.error({title: "注册失败", content: "邮箱注册但未激活！"});
//               } else {
//                 Modal.error({title: "登录失败", content: "未知错误..."});
//               }
//             }).catch(error => {
//               console.log("register error:", error);
//             });
//           } else if (userType === "teacher") {
//             axios({
//               method: "post",
//               url: preURL + "/user/teacher_register",
//               dataType: "json",
//               data: {
//                 email: values.email,
//                 password: values.password,
//                 roleName: "teacher",
//                 username: "jack",
//                 realname: values.realname,
//                 sex: values.gender === "male"
//                   ? "男"
//                   : values.gender === "female"
//                     ? "女"
//                     : "",
//                 phone: values.phone,
//                 birth: values
//                   .birth
//                   .toDate(),
//                 province: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[0])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[0])[1]
//                 },
//                 city: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[1])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[1])[1]
//                 },
//                 district: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[2])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[2])[1]
//                 },
//                 school: values.school,
//                 juniorOrSenior: values.junior_or_high === "junior"
//                   ? "初中"
//                   : values.junior_or_high === "high"
//                     ? "高中"
//                     : "",
//                 subject: values.subject,
//                 bind_school_email: values.school_account || ""
//               },
//               headers: {
//                 "Content-Type": "application/json;charset=UTF-8"
//               }
//             }).then(response => {
//               console.log("register response:", response);
//               if (response.data.code === "200") {
//                 const {router} = this.props;
//                 Modal.success({title: "注册成功", content: <div><p>请前往邮箱进行激活！</p></div>});
//                 router.push("/login");
//               } else if (response.data.code === "6008") {
//                 Modal.error({title: "注册失败", content: "注册邮箱账号已存在/已经被占用！"});
//               } else if (response.data.code === "6002") {
//                 Modal.error({title: "注册失败", content: "邮箱注册但未激活！"});
//               } else {
//                 Modal.error({title: "登录失败", content: "未知错误..."});
//               }
//             }).catch(error => {
//               console.log("register error:", error);
//             });
//           } else if (userType === "school") {
//             axios({
//               method: "post",
//               url: preURL + "/user/school_register",
//               dataType: "json",
//               data: {
//                 email: values.email,
//                 password: values.password,
//                 roleName: "teacher",
//                 username: "jack",
//                 phone: values.phone,
//                 province: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[0])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[0])[1]
//                 },
//                 city: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[1])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[1])[1]
//                 },
//                 district: {
//                   code: Util.getJsonFisrtKeyAndValue(values.location.value[2])[0],
//                   value: Util.getJsonFisrtKeyAndValue(values.location.value[2])[1]
//                 },
//                 school: values.school,
//                 juniorOrSenior: values.junior_or_high === "junior"
//                   ? "初中"
//                   : values.junior_or_high === "high"
//                     ? "高中"
//                     : ""
//               },
//               headers: {
//                 "Content-Type": "application/json;charset=UTF-8"
//               }
//             }).then(response => {
//               console.log("register response:", response);
//               if (response.data.code === "200") {
//                 const {router} = this.props;
//                 Modal.success({title: "注册成功", content: <div><p>请前往邮箱进行激活！</p></div>});
//                 router.push("/login");
//               } else if (response.data.code === "6008") {
//                 Modal.error({title: "注册失败", content: "注册邮箱账号已存在/已经被占用！"});
//               } else if (response.data.code === "6002") {
//                 Modal.error({title: "注册失败", content: "邮箱注册但未激活！"});
//               } else {
//                 Modal.error({title: "登录失败", content: "未知错误..."});
//               }
//             }).catch(error => {
//               console.log("register error:", error);
//             });
//           }

//         }
//       });
//   }

//   handleConfirmBlur = e => {
//     const value = e.target.value;
//     this.setState({
//       confirmDirty: this.state.confirmDirty || !!value
//     });
//   }

//   checkPassword = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && value !== form.getFieldValue("password")) {
//       callback("Two passwords that you enter is inconsistent!");
//     } else {
//       callback();
//     }
//   }

//   checkConfirm = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && this.state.confirmDirty) {
//       form.validateFields(["confirm"], {force: true});
//     }
//     callback();
//   }

//   handleWebsiteChange = value => {
//     let autoCompleteResult;
//     if (!value) {
//       autoCompleteResult = [];
//     } else {
//       autoCompleteResult = [".com", ".org", ".net"].map(domain => `${value}${domain}`);
//     }
//     this.setState({autoCompleteResult});
//   }

//   selectedAreaChange = e => {
//     // console.log("area change:", e);
//   }

//   phoneChange = e => {
//     let value = e.target.value;
//     // console.log("value:", value, /^[0-9]*-?[0-9]*$/.test(value)); if
//     // (/^[0-9]*-?[0-9]*$/.test(value)) { this.setState({phone_number: value});
//     this
//       .props
//       .form
//       .setFieldsValue({phone: value});
//     console.log("this props form phone:", this.props.form.getFieldValue("phone"));
//     // }
//   }

//   confirmUserMail = () => {
//     axios({
//       method: "post",
//       url: preURL + "/user/verifyEmailState",
//       dataType: "json",
//       data: {
//         roleName: this.state.userType,
//         email: this.state.userMail
//       },
//       headers: {
//         "Content-Type": "application/json;charset=UTF-8"
//       }
//     }).then(response => {
//       console.log("verifyEmailState response:", response);
//       if (response.data.code === "200") {
//         Modal.success({title: "成功", content: "邮箱可用"});
//         this.setState({mail_valid: 2});
//       } else if(response.data.code === "6008"){
//         Modal.error({title: "失败", content: "邮箱已被占用"});
//       } else if(response.data.code === "6002"){
//         Modal.error({title: "失败", content: "已注册但未激活"});
//       } else if(response.data.code === "6015"){
//         Modal.error({title: "失败", content: "邮箱格式不正确"});
//       } else{
//         Modal.error({title: "失败", content: "系统错误！"});
//       }
//     }).catch(error => {
//       console.error("verifyEmailState error:", error);
//     });
//   }

//   detectTeacher = () => {
//     const that = this;
//     axios({
//       method: "post",
//       url: preURL + "/user/verifyEmailExist",
//       dataType: "json",
//       data: {
//         roleName: "teacher",
//         email: this.state.teacherMail
//       },
//       headers: {
//         "Content-Type": "application/json;charset=UTF-8"
//       }
//     }).then(response => {
//       console.log("verifyEmailExist/teacher response:", response);
//       if (response.data.code === "200") {
//         const data = response.data.data;
//         Modal.confirm({
//           title: "教师信息确认",
//           content: (
//             <table>
//               <tbody>
//                 <tr>
//                   <td>
//                     <strong>教师邮箱账号</strong>
//                   </td>
//                   <td>{data.email}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>教师姓名</strong>
//                   </td>
//                   <td>{data.description1}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>教师学校</strong>
//                   </td>
//                   <td>{data.description2}</td>
//                 </tr>
//               </tbody>
//             </table>
//           ),
//           onOk() {
//             that.setState({teacher_binding_status: 2});
//           }
//         });
//       } else {
//         Modal.error({title: "失败", content: "教师邮箱无效！"});
//       }
//     }).catch(error => {
//       console.error("verifyEmailExist/teacher error:", error);
//     });
//   }

//   detectSchool = () => {
//     const that = this;
//     axios({
//       method: "post",
//       url: preURL + "/user/verifyEmailExist",
//       dataType: "json",
//       data: {
//         roleName: "school",
//         email: this.state.schoolMail
//       },
//       headers: {
//         "Content-Type": "application/json;charset=UTF-8"
//       }
//     }).then(response => {
//       console.log("verifyEmailExist/school response:", response);
//       if (response.data.code === "200") {
//         const data = response.data.data;
//         Modal.confirm({
//           title: "学校信息确认",
//           content: (
//             <table>
//               <tbody>
//                 <tr>
//                   <td>
//                     <strong>学校邮箱账号</strong>
//                   </td>
//                   <td>{data.email}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>学校名称</strong>
//                   </td>
//                   <td>{data.description1}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>学习省市区</strong>
//                   </td>
//                   <td>{data.description2}</td>
//                 </tr>
//               </tbody>
//             </table>
//           ),
//           onOk() {
//             that.setState({school_binding_status: 2});
//           }
//         });
//       } else {
//         Modal.error({title: "失败", content: "学校邮箱无效！"});
//       }
//     }).catch(error => {
//       console.error("verifyEmailExist/school error:", error);
//     });
//   }
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 4
        },
        sm: {
          span: 4
        }
      },
      wrapperCol: {
        xs: {
          span: 20
        },
        sm: {
          span: 20
        }
      }
    };
    const inlineFormItemLayout = {
      labelCol: {
        xs: {
          span: 12
        },
        sm: {
          span: 4
        }
      },
      wrapperCol: {
        xs: {
          span: 12
        },
        sm: {
          span: 8
        }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {initialValue: "86"})(
      <Select style={{
        width: 70
      }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      
          <div className="signup_all_container">
            <h1>
              <strong>
                用户信息注册
              </strong>
            </h1>
            <Button
              onClick={() => {
              hashHistory.push('/userservice/login')
            }}
              className='goback_login'><Icon type="arrow-left"/>返回登录</Button>
            <Divider/>
            <div className="signup_container">
              <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={< span > 邮箱 </span>}>
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            type: "email",
                            message: "请输入有效邮箱地址"
                          }, {
                            required: true,
                            message: "请输入您的邮箱!",
                            whitespace: true
                          }
                        ]
                      })(<Input
                        onChange={e => {
                        this.setState({userMail: e.target.value})
                      }}/>)}
                    </Col>
                  </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="密码">
                  <Row gutter={8}>
                    <Col span={8}>
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "请输入密码!"
                          }, {
                            validator: this.checkConfirm
                          }
                        ]
                      })(<Input type="password" placeholder="请填写6到12位密码"/>)}
                    </Col>
                  </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码">
                  <Row gutter={8}>
                    <Col span={8}>
                      {getFieldDecorator("confirm", {
                        rules: [
                          {
                            required: true,
                            message: "请再次输入输入您的密码!"
                          }, {
                            validator: this.checkPassword,
                            message: "两次输入的密码不相符"
                          }
                        ]
                      })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                    </Col>
                  </Row>
                </FormItem>
                <FormItem {...formItemLayout} label={< span > 设置昵称 </span>}>
                  <Row gutter={8}>
                    <Col span={8}>
                      {getFieldDecorator("nickname", {
                        rules: [
                          {
                            required: true,
                            message: "想让我们如何称呼您？",
                            whitespace: true
                          }
                        ]
                      })(<Input/>)}
                    </Col>
                  </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Signup);

// export default withCookies(WrappedRegistrationForm);
export default WrappedRegistrationForm;