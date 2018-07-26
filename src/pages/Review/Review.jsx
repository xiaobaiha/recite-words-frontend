import React from 'react';
import {Tabs, Progress,Card,Modal} from 'antd';
import axios from 'axios';
import {preURL} from '../../axios/config';
import OneWord from '../../components/OneWordPanel'
import '../Recite/Recite.less';
import {hashHistory} from 'react-router';
import { withCookies } from "react-cookie";

const TabPane = Tabs.TabPane;
class Review extends React.Component {
  constructor(props){
    super(props);
    const user = props.cookies.get('user');
    if(props.cookies.get('user')){
      this.state = {
        user: user,
        cet_flag: user.setting === 2? false: true,
        test_count:100,
      }
      
    }
    else{
      hashHistory.push('/userservice/login');
    }
    
  }
  componentWillMount() {
    if(this.state&&this.state.user)
    this.setCet4Data();
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
      url: preURL + "/api/review/cet4_review",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("review/cet4_review response:", response);
      this.setState({words_list: response.data.data.words_list, pre_no: 0,test_count: response.data.data.words_list.length});
    }).catch(error => console.error("review/cet4_review error:", error));
  }
  setCet6Data = () => {
    axios({
      method: "post",
      url: preURL + "/api/review/cet6_review",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("review/cet6_review response:", response);
      this.setState({words_list: response.data.data.words_list, pre_no: 0,test_count: response.data.data.words_list.length});
    }).catch(error => console.error("review/cet6_review error:", error));
  }

  getNextWord = () => {
    let pre_no = this.state.pre_no + 1;
    let {cet_flag} = this.state;
    let {setCet4Data, setCet6Data} = this;
    if(pre_no === this.state.test_count){
      Modal.success({
        title:'恭喜',
        content:'您已完成复习！',
        onOk(){
          if(cet_flag) setCet4Data();
          else  setCet6Data();
        }
      });
    } else {
      this.setState({pre_no: pre_no});
    }
  }
  render() {
    if(this.state&&this.state.user){
    return (
      <div className="recite_panel">
        <Tabs size="large" onChange={this.callback} type="card">
          {this.state.user.setting < 2?<TabPane className="recite_tabpane" tab="四级" key="1">
            <div className="oneword" style={{"margin":"5rem 2rem"}}>
              <OneWord
                fav_flag={this.state.fav_flag}
                word={this.state.words_list?this.state.words_list[this.state.pre_no].word:''}
                desc={this.state.words_list?this.state.words_list[this.state.pre_no].desc:''}
                nextWord={() => this.getNextWord()}
                collect_disabled={true}/>
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>复习进度</span>
                  <Progress type="circle" percent={parseInt((this.state.pre_no + 1)*100/this.state.test_count,10)} status="active"/>
                </div>
              </Card>
            </div>
          </TabPane>:null}
          {this.state.user.setting % 2 === 0?<TabPane className="recite_tabpane" tab="六级" key="2">
            <div className="oneword" style={{"margin":"5rem 2rem"}}>
              <OneWord
                fav_flag={this.state.fav_flag}
                word={this.state.words_list?this.state.words_list[this.state.pre_no].word:''}
                desc={this.state.words_list?this.state.words_list[this.state.pre_no].desc:''}
                nextWord={() => this.getNextWord()}
                collect_disabled={true}/>
            </div>
            <div>
              <Card>
                <div className="progress_container">
                  <span>复习进度</span>
                  <Progress type="circle" percent={parseInt((this.state.pre_no + 1)*100/this.state.test_count,10)} status="active"/>
                </div>
              </Card>
            </div>
          </TabPane>:null}
        </Tabs>
      </div>
    );
  }else return <span />
  }
}

export default withCookies(Review);
