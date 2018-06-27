import React, {Component} from 'react';
import {Layout} from 'antd';
// import './HeaderCustom.less';
// import {preURL} from "../../axios/config";
// import axios from "axios/index";
// import {instanceOf} from 'prop-types';
import {hashHistory} from 'react-router';
import {withCookies} from 'react-cookie';

const {Header} = Layout;

class UnloginHeader extends Component {
  constructor(props) {
    super(props);
    const {cookies} = this.props;

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
    return (
        <Header
          style={{
          color: "white",
          fontSize: "36px"
        }}>
          哲男单词
        </Header>
    )
  }
}

export default withCookies(UnloginHeader);
// export default UnloginHeader;
