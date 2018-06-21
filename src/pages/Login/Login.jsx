import React from "react";
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Divider,
    Layout,
    Modal,
    Tabs
} from "antd";
import { Link } from "react-router";
// import "./Login.less";
import LoginImg from "./Login.png";
import axios from "axios";
// import LoginForm from '../../components/LoginForm/LoginForm';
import { preURL } from "../../axios/config";
import { hashHistory } from "react-router";
// import { instanceOf } from "prop-types";
// import { withCookies, Cookies } from "react-cookie";
// import verification from "verification-code";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Header, Footer, Sider, Content } = Layout;

class Login extends React.Component {
    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };
    state = {
        user: "",
        userType: 1,
        vcodeSrc: "",
        vcodeText: "",
        vcodeVerificationText: ""
    };

    //   componentWillMount() {
    //     const {cookies} = this.props;
    //     const preTime = new Date().getTime();
    //     this.setState({
    //       vcodeSrc: preURL + "/getVerificationPicture?date="+preTime
    //     });
    //     if (cookies.get("front_user_temp")) {
    //       let userObj = cookies.get("front_user_temp");
    //       // console.log("header user:", userObj);
    //       if (userObj.roleId === 1 || userObj.roleId === 2 || userObj.roleId === 3 || userObj.roleId === 4) {
    //         this.setState({
    //           user: cookies.get("front_user_temp"),
    //           userType: 1
    //         });
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
    //   }


    //   handleSubmit = e => {
    //     e.preventDefault();
    //     this
    //       .props
    //       .form
    //       .validateFields((err, values) => {
    //         if (!err) {
    //           console.log("Received values of form: ", values);
    //           const roleName = this.state.userType === 1
    //             ? "student"
    //             : this.state.userType === 2
    //               ? "teacher"
    //               : this.state.userType === 3
    //                 ? "school"
    //                 : "";
    //           const email = this.state.userType === 1
    //             ? values.mail
    //             : this.state.userType === 2
    //               ? values.mail2
    //               : this.state.userType === 3
    //                 ? values.mail3
    //                 : "";
    //           const password = this.state.userType === 1
    //             ? values.password
    //             : this.state.userType === 2
    //               ? values.password2
    //               : this.state.userType === 3
    //                 ? values.password3
    //                 : "";
    //           const verifyCode = this.state.userType === 1
    //             ? values.vcode
    //             : this.state.userType === 2
    //               ? values.vcode2
    //               : this.state.userType === 3
    //                 ? values.vcode3
    //                 : "";

    //           axios({
    //             method: "post",
    //             url: preURL + "/user/login",
    //             dataType: "json",
    //             data: {
    //               roleName: roleName,
    //               email: email,
    //               password: password,
    //               verifyCode: verifyCode
    //             },
    //             headers: {
    //               "Content-Type": "application/json;charset=UTF-8"
    //             }
    //           }).then(response => {
    //             console.log("login response:", response);
    //             if (response.data.code == "200") {
    //               // console.log("enter login true");
    //               const {router} = this.props;
    //               let {data} = response;
    //               const {cookies} = this.props;

    //               cookies.set("front_user_temp", {
    //                 userName: response.data.data.userName,
    //                 roleId: response.data.data.roleId
    //               }, {
    //                 path: "/",
    //                 maxAge: 24 * 3600
    //               });
    //               if (response.data.data.roleId === 1) 
    //                 hashHistory.push("/app/allocation/super_user");
    //               if (response.data.data.roleId === 2) 
    //                 hashHistory.push("/app/allocation/school_level");
    //               if (response.data.data.roleId === 3) 
    //                 hashHistory.push("/app/allocation/teacher_level");
    //               if (response.data.data.roleId === 4) 
    //                 hashHistory.push("/app/test/welcome");
    //             } else if (response.data.code == "6014") {
    //               Modal.error({title: "登录失败", content: "图片验证码过期！"});
    //             } else if (response.data.code == "6007") {
    //               Modal.error({title: "登录失败", content: "图片验证码错误！"});
    //             } else if (response.data.code == "1011") {
    //               Modal.error({title: "登录失败", content: "没有对应账号！"});
    //             } else if (response.data.code == "1013") {
    //               Modal.error({title: "登录失败", content: "账户或密码错误，请重新填写！"});
    //             } else if (response.data.code == "6002") {
    //               Modal.error({title: "登录失败", content: "邮箱账号未激活！"});
    //             } else {
    //               Modal.error({title: "登录失败", content: "系统错误"});
    //             }
    //           }).catch(error => {
    //             console.log("login error:", error);
    //           });
    //         }
    //       });
    //   };

    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log("state:",this.state);
        return (
            <Content>
                <div className="login_all_container">
                    <div className="login_img_container" />
                    <Form key="student_form" onSubmit={this.handleSubmit} className="login-form">
                        <FormItem className="login_form_title">
                            <h2>登录</h2>
                            <Divider />
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("user", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入用户名!"
                                    }
                                ]
                            })(
                                <Input
                                    size="large"
                                    prefix={< Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入密码!"
                                    }
                                ]
                            })(
                                <Input
                                    size="large"
                                    prefix={< Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    type="password"
                                    placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <div className="suff_container">
                                <div className="suff_item">
                                    {getFieldDecorator("remember", {
                                        valuePropName: "checked",
                                        initialValue: true
                                    })(
                                        <Checkbox>记住我</Checkbox>
                                    )}
                                </div>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                          </Button>
                                <Link
                                    onClick={() => {
                                        hashHistory.push("/userservice/signup");
                                    }}>
                                    注册
                          </Link>
                            </div>
                        </FormItem>
                    </Form>

                </div>
            </Content>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

// export default withCookies(WrappedNormalLoginForm);
export default WrappedNormalLoginForm;