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
        COPYRIGHT ©2018 iWord ALL RIGHTS RESERVEDs
      </Footer>
    )
  }
}


export default HeaderCustom;
