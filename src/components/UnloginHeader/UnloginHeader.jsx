import React, { Component } from 'react';
import { Layout } from 'antd';
import { hashHistory } from 'react-router';
import { withCookies } from 'react-cookie';

const { Header } = Layout;

class UnloginHeader extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    if (cookies.get("user")) {
      hashHistory.push("/app/recite");
    }
  }

  menuClick = e => {
    e.key === 'logout' && this.logout();
  };

  render() {
    return (
      <Header
        style={{
          color: "white",
          fontSize: "36px"
        }}>
        iWord
        </Header>
    )
  }
}

export default withCookies(UnloginHeader);
