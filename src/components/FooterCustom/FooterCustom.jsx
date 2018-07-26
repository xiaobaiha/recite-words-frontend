import React, {Component} from 'react';
import {Layout} from 'antd';
import {BackTop} from 'antd';
import './FooterCustom.less';

const {Footer} = Layout;

class HeaderCustom extends Component {
  render() {
    return (
      <Footer className='footer'>
        <BackTop/>
        Copyright ©2018 iWord All Rights Reserved.
      </Footer>
    )
  }
}


export default HeaderCustom;
