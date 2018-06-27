import React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Divider,
  Modal,
  Carousel 
} from "antd";
import { Link } from "react-router";
import "./Login.less";
// import LoginImg from "./Login.png";
import axios from "axios";
import { preURL } from "../../axios/config";
import { hashHistory } from "react-router";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
const FormItem = Form.Item;

class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  state = {
    user: "",
    userType: 1,
    vcodeSrc: "",
    vcodeText: "",
    vcodeVerificationText: ""
  };

  componentWillMount() {
    const { cookies } = this.props;

    if (cookies.get("user")) {
      let userObj = cookies.get("user");
      if (userObj.roleId === 1) {
        this.setState({
          user: cookies.get("user"),
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
      .validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          axios({
            method: "post",
            url: preURL + "/api/login",
            dataType: "json",
            data: {
              email: values.email,
              password: values.password
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          }).then(response => {
            console.log("login response:", response);
            if (response.data.code === "200") {
              const { cookies } = this.props;

              cookies.set("user", {
                name: response.data.data.name,
                email: values.email,
                setting: response.data.data.setting
              }, {
                  path: "/",
                  maxAge: 24 * 3600
                });
              hashHistory.push("/app/recite");
            } else if (response.data.code === "1036") {
              Modal.error({ title: "登录失败", content: "用户不存在!" });
            } else if (response.data.code === "1035") {
              Modal.error({ title: "登录失败", content: "密码错误！" });
            } else if (response.data.code === "1034") {
              Modal.error({ title: "登录失败", content: "账户被禁用！" });
            } else {
              Modal.error({ title: "登录失败", content: "系统错误" });
            }
          }).catch(error => {
            console.log("login error:", error);
          });
        }
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login_outer_all_container">
        <div className='carousel'>
        <Carousel autoplay>
          <div><img alt="" style={{"height":"20rem"}} src="https://static.baydn.com/web/images/intro-client-checkin.png"/><p>单词背诵</p><p>在线学习四六级词汇</p></div>
          <div><img alt="" style={{"height":"20rem"}} src="https://static.baydn.com/web/images/intro-client-community.png"/><p>自定义收藏</p><p>实时收藏学习过程中的单词</p></div>
          <div><img alt="" style={{"height":"20rem"}} src="https://static.baydn.com/web/images/intro-client-insurance.png"/><p>学习回顾</p><p>复习自己所学过的单词</p></div>
          <div><img alt="" style={{"height":"20rem"}} src="https://static.baydn.com/web/images/intro-client-academy.png"/><p>在线考核</p><p>检测自己的学习成果</p></div>
        </Carousel>
      </div>
      <div className="login_all_container">
        <Form key="student_form" onSubmit={this.handleSubmit} className="login-form">
          <FormItem className="login_form_title">
            <h2>登录</h2>
            <Divider />
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "请输入邮箱!"
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
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default withCookies(WrappedNormalLoginForm);