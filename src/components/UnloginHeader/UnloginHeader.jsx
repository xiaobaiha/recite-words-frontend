import React, {Component} from 'react';
import {Menu, Layout, Modal} from 'antd';
// import './HeaderCustom.less';
// import {preURL} from "../../axios/config";
// import axios from "axios/index";
import {Link} from 'react-router';
// import {instanceOf} from 'prop-types';
// import {hashHistory} from 'react-router';
// import {withCookies, Cookies} from 'react-cookie';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
var navhead = '';

class UnloginHeader extends Component {
  constructor(props) {
    super(props);
    // const {cookies} = this.props;
    // if (cookies.get('front_user_temp')) {
    //   let userObj = cookies.get('front_user_temp');
    //   if (userObj.roleId === 1 || userObj.roleId === 2 || userObj.roleId === 3 || userObj.roleId === 4) {
    //     this.state = {
    //       user: cookies.get('front_user_temp'),
    //       visible: false,
    //       notlogin: false
    //     };
    //     axios({
    //       method: 'get',
    //       url: preURL + '/user/verifyPermissions',
    //       dataType: 'json',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }).then((response) => {
    //       console.log("header verifyPermissions response:", response);
    //       // console.log(userObj.roleId !== response.data.data.roleId, userObj.userName !== response.data.data.userName);
    //       if (response.data.code === "200") {
    //         if (userObj.roleId !== response.data.data.roleId || userObj.userName !== response.data.data.userName) {
    //           Modal.error({title: '权限错误', content: '权限检查出现错误，请重新登录！'});
    //           cookies.remove("front_user_temp");
    //           hashHistory.push('/login');
    //         }
    //       } else {
    //         Modal.error({title: '用户信息错误', content: '无法获取用户信息，请重新登录！'});
    //         cookies.remove("front_user_temp");
    //         hashHistory.push('/login');
    //       }
    //     }).catch((error) => {
    //       console.log("getUserInfo error:", error);
    //       Modal.error({title: '网络错误', content: '无法获取用户信息，请重新登录！'});
    //       cookies.remove("front_user_temp");
    //       hashHistory.push('/login');
    //     });
    //   } else {
    //     Modal.error({title: '用户信息错误', content: '无法获取用户信息，请重新登录！'});
    //     cookies.remove("front_user_temp");
    //     hashHistory.push('/login');
    //   }
    // } else {
      this.state = {
        user: {},
        visible: false,
        notlogin: false
      };
    //   Modal.error({title: '用户信息错误', content: '无法获取用户信息，请重新登录！'});
    //   cookies.remove("front_user_temp");
    //   hashHistory.push('/login');
    // }
  }

  menuClick = e => {
    // console.log(e);
    e.key === 'logout' && this.logout();
  };

  logout = () => {
    // const {cookies} = this.props;

    // axios({
    //   method: 'get',
    //   url: preURL + '/logout',
    //   dataType: 'json',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then((response) => {
    //   console.log("logout response:", response);
    //   if (response.data.code === "200") {
    //     this.setState({user: ''});
    //     cookies.remove("front_user_temp");
    //     hashHistory.push('/login');
    //   } else {
    //     Modal.error({title: '注销失败', content: '注销失败！'});
    //   }
    // }).catch((error) => {
    //   console.log("logout error:", error);
    //   cookies.remove("front_user_temp");
    //   hashHistory.push('/login');
    // });
  };

  render() {
    navhead = "你好！ " + this.state.user.userName;
    return (
        <Header
          style={{
          color: "white",
          fontSize: "36px"
        }}>
          晴朗/哲男 单词
        </Header>
    )
  }
}

// export default withCookies(HeaderCustom);
export default UnloginHeader;
