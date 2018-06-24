import React from 'react';
import {Tabs, Progress,Card} from 'antd';
import axios from 'axios';
import {preURL} from '../../axios/config';
import OneWord from '../../components/OneWordPanel'
import '../Recite/Recite.less';

const TabPane = Tabs.TabPane;

class Test extends React.Component {
  state = {}
  componentWillMount() {
    this.setCet4Data();
  }
  callback = (key) => {
    if (key === '1') {
      this.setCet4Data();
    } else if (key === '2') {
      this.setCet6Data();
    }
  }
  setCet4Data = () => {
    axios({
      method: "post",
      url: preURL + "/api/recite/cet4",
      dataType: "json",
      data: {
        user: 'usr001'
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("recite/cet4 response:", response);
    }).catch(error => console.error("recite/cet4 error:", error));
  }
  setCet6Data = () => {
    axios({
      method: "post",
      url: preURL + "/api/recite/cet6",
      dataType: "json",
      data: {
        user: 'usr001'
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("recite/cet6 response:", response);
    }).catch(error => console.error("recite/cet6 error:", error));
  }
  getNextWord = () => {
    console.log("next word...");
  }
  render() {
    return (
      <div className="recite_panel">
        <Tabs size="large" onChange={this.callback} type="card">
          <TabPane className="recite_tabpane" tab="四级" key="1">
            <div className="oneword" style={{"margin":"5rem 2rem"}}>
              <OneWord
                word='Hello'
                desc='你好'
                nextWord={() => this.getNextWord()}/>
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>复习进度</span>
                  <Progress type="circle" percent={50} status="active"/>
                </div>
              </Card>
            </div>
          </TabPane>
          <TabPane className="recite_tabpane" tab="六级" key="2">
            <div className="oneword" style={{"margin":"5rem 2rem"}}>
              <OneWord
                word='Hello'
                desc='你好'
                nextWord={() => this.getNextWord()}/>
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>复习进度</span>
                  <Progress type="circle" percent={50} status="active"/>
                </div>
              </Card>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Test;
