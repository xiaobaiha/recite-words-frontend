import React, {Component} from 'react';
import {Layout} from 'antd';
import {BackTop} from 'antd';
// import screenfull from 'screenfull';
// import { gitOauthToken, gitOauthInfo } from '../axios';
// import { queryString } from '../utils';
// import avater from '../style/imgs/b1.jpg';
// import SiderCustom from './SiderCustom';
// import { connect } from 'react-redux';
import './FooterCustom.less';
// import {preURL} from "../axios/config";
// import axios from "axios/index";

const {Footer} = Layout;

class HeaderCustom extends Component {
  render() {
    return (
      <Footer className='footer'>
        <BackTop/>
        COPYRIGHT ©2018 FEIZHIJUN ALL RIGHTS RESERVEDs
      </Footer>
    )
  }
}


export default HeaderCustom;
