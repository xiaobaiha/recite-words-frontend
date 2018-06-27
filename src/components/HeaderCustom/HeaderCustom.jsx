import React, { Component } from 'react';
import { Menu, Layout, Modal, Icon } from 'antd';
import './HeaderCustom.less';
import { preURL } from "../../axios/config";
import axios from "axios/index";
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { withCookies } from 'react-cookie';

const { Sider } = Layout;
var navhead = '';

class HeaderCustom extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    if (cookies.get('user')) {

      this.state = {
        user: cookies.get('user'),
        visible: false,
        notlogin: false,
        collapsed: false,
      };
    } else {
      this.state = {
        user: {},
        visible: false,
        notlogin: false,
        collapsed: false,
      };
      Modal.error({ title: '用户信息错误', content: '无法获取用户信息，请重新登录！' });
      cookies.remove("user");
      hashHistory.push('/userservice/login');
    }
  }

  menuClick = e => {
    e.key === 'logout' && this.logout();
  };

  logout = () => {
    const { cookies } = this.props;
    const user = cookies.get('user');
    console.log("user:", user)

    axios({
      method: 'post',
      url: preURL + '/api/logout',
      dataType: 'json',
      data: {
        email: user.email
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then((response) => {
      console.log("logout response:", response);
      if (response.data.code === "200") {
        this.setState({ user: '' });
        cookies.remove("user");
        hashHistory.push('/userservice/login');
      } else {
        Modal.error({ title: '注销失败', content: '注销失败！' });
      }
    }).catch((error) => {
      console.log("logout error:", error);
      cookies.remove("user");
      hashHistory.push('/userservice/login');
    });
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    navhead = "" + (this.state.user.name
      ? this.state.user.name
      : '');
    return (
      <Sider
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{
            lineHeight: '64px'
          }}>
          <Menu.Item key="3">
            <Icon type="user" />
            <span>{navhead}</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={'/app/recite'}>Recite</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={'/app/wordsbook'}>Words Book</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={'/app/test'}>Test</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to={'/app/review'}>Review</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to={'/app/setting'}>Setting</Link>
          </Menu.Item>
          <Menu.Item key="12" onClick={() => {
            this.setState({ visible: true });
          }}>
            <span>Logout</span>
          </Menu.Item>
        </Menu>
        <Modal
          className='logout_modal'
          title="注销"
          visible={this.state.visible}
          onOk={this.logout}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          okText="确认"
          cancelText="取消">
          您确定注销用户登录吗？
        </Modal>
      </Sider>
    )
  }
}

export default withCookies(HeaderCustom);