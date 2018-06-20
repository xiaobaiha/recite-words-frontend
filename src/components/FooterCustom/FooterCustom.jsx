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
        COPYRIGHT ©2018 FEIZHIJUN ALL RIGHTS RESERVED
        {/* <div className="bottom">
          <div className="link_container">
            <div className="link_bottom">
              <h3>友情链接</h3>
              <ul className="link_left">
                <li>
                  <ul>
                    <li>
                      <a href="http://www.moe.gov.cn/">中华人民共和国教育部</a>
                    </li>
                    <li>
                      <a href="http://www.fe-noc.com">未来教育集团官网</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li>
                      <a href="http://www.eduyun.cn/">国家教育资源公共服务平台</a>
                    </li>
                    <li>
                      <a href="http://www.chinaitedu.cn">中国信息技术教育杂志官网</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li>
                      <a href="http://www.chsi.com.cn/">学信网</a>
                    </li>
                    <li>
                      <a href="http://www.noc.net.cn">NOC竞赛官网</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </Footer>
    )
  }
}


export default HeaderCustom;
