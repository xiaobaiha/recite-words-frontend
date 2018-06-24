import React from "react";
import {
  Form,
  Input,
  // Tooltip,
  Icon,
  // Select,
  Row,
  Col,
  Button,
  Divider,
  Modal
} from "antd";
// import BreadcrumbCustom from "../../components/BreadcrumbCustom";
import "./Signup.less";
import axios from "axios";
import {preURL} from "../../axios/config";
import {hashHistory} from "react-router";
import {instanceOf} from "prop-types";
import {withCookies, Cookies} from "react-cookie";
// import PhoneInput from "../../components/PhoneInput/PhoneInput";
// import FormArea from "../../components/FormArea/FormArea";
// import ControlledRangePicker from "../../components/ControlledRangePicker/ControlledRangePicker";
// import * as Util from "../../components/Utils";

const FormItem = Form.Item;

// const AutoCompleteOption = AutoComplete.Option;

class Signup extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
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

componentWillMount() {
  const { cookies } = this.props;

  if (cookies.get("user")) {
      let userObj = cookies.get("user");
      if (userObj.roleId === 1 ) {
          this.setState({
              user: cookies.get("front_user_temp"),
              userType: 1
          });
          hashHistory.push("/app/recite");
      }
  }
}

  handleSubmit = e => {
    e.preventDefault();
    this
      .props
      .form
      .validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
            axios({
              method: "post",
              url: preURL + "/user/student_register",
              dataType: "json",
              data: {
                email: values.email,
                password: values.password,
                roleName: "student",
                username: "jack",
                realname: values.realname
              },
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }).then(response => {
              console.log("register response:", response);
              if (response.data.code === "200") {
                const {router} = this.props;
                Modal.success({title: "注册成功", content: <div><p>请前往邮箱进行激活！</p></div>});
                router.push("/login");
              } else if (response.data.code === "6008") {
                Modal.error({title: "注册失败", content: "注册邮箱账号已存在/已经被占用！"});
              } else if (response.data.code === "6002") {
                Modal.error({title: "注册失败", content: "邮箱注册但未激活！"});
              } else {
                Modal.error({title: "登录失败", content: "未知错误..."});
              }
            }).catch(error => {
              console.log("register error:", error);
            });
        }
      });
  }

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

    return (
      
          <div className="signup_container">
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

export default withCookies(WrappedRegistrationForm);
// export default WrappedRegistrationForm;