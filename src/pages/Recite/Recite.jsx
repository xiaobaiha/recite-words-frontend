import React from 'react';
import {Tabs, Progress,Card, notification} from 'antd';
import axios from 'axios';
import {preURL} from '../../axios/config';
import OneWord from '../../components/OneWordPanel'
import './Recite.less';
import { withCookies } from "react-cookie";

const TabPane = Tabs.TabPane;
const CET4_COUNT = 5520;
const CET6_COUNT = 1540;

class Recite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cet_flag: true, // true for cet4 and false for cet6
      fav_flag: false,
      user: props.cookies.get('user')
    }
  }
  componentWillMount() {
    this.setCet4Data();
  }
  addToWordsbook = () => {
    if (this.state.fav_flag) {
      notification.error({
        message: '添加失败',
        description: '已添加此单词，请不要重复添加',
      });
      return;
    }
    axios({
      method: "post",
      url: preURL + "/api/recite/collect",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("collect response:", response);
      if(response.data.code === "200"){
        this.setState({
          fav_flag: true
        });
        notification.success({
          message: '添加成功',
          description: '已添加到单词本',
        });
      }
    }).catch(error => console.error("collect error:", error));
    
  }
  callback = (key) => {
    if (key === '1') {
      this.setCet4Data();
      this.setState({
        cet_flag: true,
      });
    } else if (key === '2') {
      this.setCet6Data();
      this.setState({
        cet_flag: false,
      });
    }
  }
  setCet4Data = () => {
    axios({
      method: "post",
      url: preURL + "/api/recite/cet4",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("recite/cet4 response:", response);
      const data = response.data.data;
      this.setState({
        counter: data.counter, //背诵计划设置的量
        present_no: data.present_no,    // 应该背诵的第一个单词的序号
        today_no: data.today_no,  //今天应该背诵的第一个单词的序号
        today_words: data.today_words,
        fav_flag: data.today_words.collected
      });
    }).catch(error => console.error("recite/cet4 error:", error));
  }
  setCet6Data = () => {
    axios({
      method: "post",
      url: preURL + "/api/recite/cet6",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("recite/cet6 response:", response);
      const data = response.data.data;
      this.setState({
        counter: data.counter, //背诵计划设置的量
        present_no: data.present_no,    // 应该背诵的第一个单词的序号
        today_no: data.today_no,  //今天应该背诵的第一个单词的序号
        today_words: data.today_words,
        fav_flag: data.today_words.collected
      })
    }).catch(error => console.error("recite/cet6 error:", error));
  }
  getNextWord = () => {
    console.log("next word");
    axios({
      method: "post",
      url: preURL + "/api/recite/"+(this.state.cet_flag?"cet4_next":"cet6_next"),
      dataType: "json",
      data: {
        user: this.state.user.email,
        present_no: this.state.present_no
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("recite/cet6 response:", response);
      const data = response.data.data;
      this.setState({
        present_no: data.present_no,    // 应该背诵的第一个单词的序号
        today_words: data.today_words,
        fav_flag: data.today_words.collected
      })
    }).catch(error => console.error("recite/cet6 error:", error));
  }
  render() {
    return (
      <div className="recite_panel">
        <Tabs size="large" onChange={this.callback} type="card">
          <TabPane className="recite_tabpane" tab="四级" key="1">
            <div className="oneword">
              <OneWord
                fav_flag={this.state.fav_flag}
                word={this.state.today_words?this.state.today_words.word:''}
                desc={this.state.today_words?this.state.today_words.desc:''}
                nextWord={() => this.getNextWord()}
                favorite={() => this.addToWordsbook()}/>
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>今天背诵进度</span>
                  <Progress type="circle" percent={parseInt((this.state.present_no-this.state.today_no)*100/this.state.counter)} status="active"/>
                </div>
              </Card>
              <Card>
                <div className="progress_container">
                  <span>CET4总进度</span>
                  <Progress type="circle" percent={parseInt(this.state.present_no * 100 / CET4_COUNT)} status="active"/>
                </div>
              </Card>
            </div>
          </TabPane>
          <TabPane className="recite_tabpane" tab="六级" key="2">
            <div className="oneword">
              <OneWord
                word={this.state.today_words?this.state.today_words.word:''}
                desc={this.state.today_words?this.state.today_words.desc:''}
                nextWord={() => this.getNextWord()}
                favorite={() => this.addToWordsbook()}/>
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>今天背诵进度</span>
                  <Progress type="circle" percent={parseInt((this.state.present_no-this.state.today_no)*100/this.state.counter)} status="active"/>
                </div>
              </Card>
              <Card>
                <div className="progress_container">
                  <span>CET4总进度</span>
                  <Progress type="circle" percent={parseInt(this.state.present_no * 100 / CET6_COUNT)} status="active"/>
                </div>
              </Card>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withCookies(Recite);
