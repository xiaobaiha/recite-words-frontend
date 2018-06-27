import React from 'react';
import { Tabs, Progress, notification, Modal } from 'antd';
import axios from 'axios';
import { preURL } from '../../axios/config';
import OneWord from '../../components/OneWordPanel'
import './Recite.less';
import { withCookies } from "react-cookie";

const TabPane = Tabs.TabPane;
const CET4_COUNT = 5520;
const CET6_COUNT = 1540;

class Recite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cet_flag: true, // true for cet4 and false for cet6
      fav_flag: false,
      user: props.cookies.get('user')
    }
  }
  componentWillMount() {
    const { user } = this.state;
    if (user && user.setting < 2) {
      this.setCet4Data();
    } else if (user && user.setting === 2) {
      this.setCet6Data();
    }
  }
  addToWordsbook = () => {
    if (this.state.fav_flag) {
      axios({
        method: "post",
        url: preURL + "/delete",
        dataType: "json",
        data: {
          user: this.state.user.email,
          word: this.state.today_words.word,
          catalog: this.state.cet_flag ? 0 : 1,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(response => {
        console.log("collect response:", response);
        if (response.data.code === "200") {
          this.setState({
            fav_flag: false,
          });
          notification.success({
            message: '删除成功',
            description: '已从单词本中移除',
          });

        }
      }).catch(error => console.error("collect error:", error));
    } else {
      axios({
        method: "post",
        url: preURL + "/collect",
        dataType: "json",
        data: {
          user: this.state.user.email,
          present_no: this.state.present_no,
          catalog: this.state.cet_flag ? 0 : 1,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(response => {
        console.log("collect response:", response);
        if (response.data.code === "200") {
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
      url: preURL + "/recite4",
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
      url: preURL + "/recite6",
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
      url: preURL + "/api/recite/" + (this.state.cet_flag ? "cet4_next" : "cet6_next"),
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
      });
      if (data.present_no - data.today_no === this.state.count) {
        Modal.success({ title: "恭喜", content: "您已完成今日计划" })
      }
    }).catch(error => console.error("recite/cet6 error:", error));
  }
  render() {
    return (
      <div className="recite_panel">
        <Tabs size="large" onChange={this.callback} type="card">
          {this.state.user.setting < 2 ? <TabPane className="recite_tabpane" tab="CET4" key="1">
            <div className="progress_container">
              <span>Today</span>
              <Progress percent={parseInt((this.state.present_no - this.state.today_no) * 100 / this.state.counter, 10)} status="active" />
            </div>
            <div className="progress_container">
              <span>CET4</span>
              <Progress percent={parseInt(this.state.present_no * 100 / CET4_COUNT, 10)} status="active" />
            </div>
            <div className="oneword">
              <OneWord
                fav_flag={this.state.fav_flag}
                word={this.state.today_words ? this.state.today_words.word : ''}
                desc={this.state.today_words ? this.state.today_words.desc : ''}
                nextWord={() => this.getNextWord()}
                favorite={() => this.addToWordsbook()} />
            </div>
          </TabPane> : null}
          {this.state.user.setting % 2 === 0 ? <TabPane className="recite_tabpane" tab="CET6" key="2">
            <div className="progress_container">
              <span>Today</span>
              <Progress percent={parseInt((this.state.present_no - this.state.today_no) * 100 / this.state.counter, 10)} status="active" />
            </div>
            <div className="progress_container">
              <span>CET6</span>
              <Progress percent={parseInt(this.state.present_no * 100 / CET6_COUNT, 10)} status="active" />
            </div>
            <div className="oneword">
              <OneWord
                fav_flag={this.state.fav_flag}
                word={this.state.today_words ? this.state.today_words.word : ''}
                desc={this.state.today_words ? this.state.today_words.desc : ''}
                nextWord={() => this.getNextWord()}
                favorite={() => this.addToWordsbook()} />
            </div>
          </TabPane> : null}
        </Tabs>
      </div>
    );
  }
}

export default withCookies(Recite);
