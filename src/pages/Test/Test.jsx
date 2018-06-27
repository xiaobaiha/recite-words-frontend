import React from 'react';
import { Tabs, Table, Progress, Card, Modal } from 'antd';
import axios from 'axios';
import { preURL } from '../../axios/config';
import OneWord from '../../components/OneWordPanel'
import '../Recite/Recite.less';
import { withCookies } from "react-cookie";

const TabPane = Tabs.TabPane;
let grade = 0;
class Test extends React.Component {
  constructor(props) {
    super(props);
    const user = props.cookies.get('user');
    this.state = {
      user: user,
      cet_flag: user.setting === 2 ? false : true,
      result_show: false,
    }
  }
  componentWillMount() {
    this.setCet4Data();
  }
  callback = (key) => {
    if (key === '1') {
      this.setCet4Data();
      grade = 0;
      this.setState({
        cet_flag: true,
      });
    } else if (key === '2') {
      this.setCet6Data();
      grade = 0;
      this.setState({
        cet_flag: false,
      });
    }
  }
  setCet4Data = () => {
    axios({
      method: "post",
      url: preURL + "/api/test/cet4_test",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("test/cet4_test response:", response);
      const count = response.data.data.words_list.length;
      this.setState({
        words_list: response.data.data.words_list,
        pre_no: 0,
        test_count: count,
        dirty: Array(count).fill(true),
      });
    }).catch(error => console.error("test/cet4_test error:", error));
  }
  setCet6Data = () => {
    axios({
      method: "post",
      url: preURL + "/api/test/cet6_test",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("test/cet6_test response:", response);
      const count = response.data.data.words_list.length;
      this.setState({
        words_list: response.data.data.words_list,
        pre_no: 0,
        test_count: count,
        dirty: Array(count).fill(true),
      });
    }).catch(error => console.error("test/cet6_test error:", error));
  }
  getNextWord = () => {
    let pre_no = this.state.pre_no + 1;
    let columns = [
      {
        title: '单词',
        dataIndex: 'word'
      }, {
        title: '解释',
        dataIndex: 'desc'
      }
    ];
    if (pre_no === this.state.test_count) {
      console.log("state dirty:", this.state.dirty);
      let { words_list, dirty, cet_flag } = this.state;
      let { setCet4Data, setCet6Data } = this;
      let dataSource = words_list.map( (item,index) => {
        if (!dirty[index]){
          return {
            word: item.word,
            desc: item.desc
          }
        }
      });
      Modal.success({
        title: '测试完成',
        content: <div>
          <p>您的测试得分是{grade + 1}分！</p>
          <p>您需要巩固的单词如下：</p>
          <div>
            <Table
              bordered
              dataSource={dataSource}
              columns={columns}/>
          </div>
        </div>,
        onOk() {
          if (cet_flag) setCet4Data();
          else setCet6Data();
        }
      });
    } else {
      grade++;
      this.setState({ pre_no: pre_no });
    }
  }
  handleTestSpe = () => {
    grade--;
    let { pre_no, dirty } = this.state;
    dirty = dirty.splice(pre_no, 1, false);
  }
  render() {
    return (
      <div className="recite_panel">
        <Tabs size="large" onChange={this.callback} type="card">
          {this.state.user.setting < 2 ? <TabPane className="recite_tabpane" tab="四级" key="1">
            <div className="oneword" style={{ "margin": "5rem 2rem" }}>
              <OneWord
                fav_flag={this.state.fav_flag}
                word={this.state.words_list ? this.state.words_list[this.state.pre_no].word : ''}
                desc={this.state.words_list ? this.state.words_list[this.state.pre_no].desc : ''}
                nextWord={() => this.getNextWord()}
                testSpe={() => this.handleTestSpe()}
                collect_disabled={true}
                descDisabled={true} />
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>测试进度</span>
                  <Progress type="circle" percent={parseInt((this.state.pre_no + 1) * 100 / this.state.test_count, 10)} status="active" />
                </div>
              </Card>
            </div>
          </TabPane> : null}
          {this.state.user.setting % 2 === 0 ? <TabPane className="recite_tabpane" tab="六级" key="2">
            <div className="oneword" style={{ "margin": "5rem 2rem" }}>
              <OneWord
                fav_flag={this.state.fav_flag}
                word={this.state.words_list ? this.state.words_list[this.state.pre_no].word : ''}
                desc={this.state.words_list ? this.state.words_list[this.state.pre_no].desc : ''}
                nextWord={() => this.getNextWord()}
                testSpe={() => this.handleTestSpe()}
                collect_disabled={true}
                descDisabled={true} />
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>测试进度</span>
                  <Progress type="circle" percent={parseInt((this.state.pre_no + 1) * 100 / this.state.test_count, 10)} status="active" />
                </div>
              </Card>
            </div>
          </TabPane> : null}
        </Tabs>
      </div>
    );
  }
}

export default withCookies(Test);
