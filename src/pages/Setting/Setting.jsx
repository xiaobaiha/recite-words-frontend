import React from 'react';
import { Switch,InputNumber,Modal } from 'antd';
import axios from "axios";
import { preURL } from "../../axios/config";
import {hashHistory} from 'react-router';
import { withCookies } from "react-cookie";
import "./Setting.less";

class Setting extends React.Component {
  state = {
    setting: 0,
  }
  constructor(props){
    super(props);
    const user = props.cookies.get('user');
    if(props.cookies.get('user')){
      this.state = {
        user: user,
        cet_flag: user.setting === 2? false: true,
        test_count:100,
      }
    } else {
      hashHistory.push('/userservice/login');
    }
    
  }
  componentWillMount(){
    if(this.state&&this.state.user){
      const user = this.props.cookies.get('user');
      this.setState({
        email: user.email,
        name: user.name,
        setting: user.setting,
        check4: user.setting < 2,
        check6: user.setting % 2 === 0,
      });
      axios({
        method: "post",
        url: preURL + "/api/recite/cet4",
        dataType: "json",
        data: {
          user: user.email
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }).then(response => {
        console.log("api/recite/cet4 response:", response);
        const data = response.data.data;
        this.setState({
          counter: data.counter, //背诵计划设置的量
        });
      }).catch(error => {
        console.log("api/recite/cet4 error:", error);
      });
    }
    
  }
  onChange4 = item =>{
    if (!this.state.check6 && !item) {
      Modal.error({title: '操作错误', content: '请至少选择一个单词集！'});
      return;
    }
    this.setState({
      check4: item
    });
    let _set = 0;
    if (this.state.check6 && item){
      _set = 0;
    } else if (this.state.check6 && !item){
      _set = 2;
    } else if (!this.state.check6 && item){
      _set = 1;
    }
    axios({
      method: "post",
      url: preURL + "/api/setting/plan",
      dataType: "json",
      data: {
        user: this.state.email,
        counter: this.state.counter,
        setting: _set,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("setting/plan response:", response);
      if (response.data.code === "200"){
        this.setState({
          check4: item
        });
        this.props.cookies.set("user", {
          name: this.state.name,
          email: this.state.email,
          setting: _set
        });
      }
    }).catch(error => console.error("setting/plan error:", error));
  }
  onChange6 = item =>{
    if (!this.state.check4 && !item) {
      Modal.error({title: '操作错误', content: '请至少选择一个单词集！'});
      return;
    }
    let _set = 0;
    if (this.state.check4 && item){
      _set = 0;
    } else if (this.state.check4 && !item){
      _set = 1;
    } else if (!this.state.check4 && item){
      _set = 2;
    }
    axios({
      method: "post",
      url: preURL + "/api/setting/plan",
      dataType: "json",
      data: {
        user: this.state.email,
        counter: this.state.counter,
        setting: _set,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("setting/plan response:", response);
      if (response.data.code === "200"){
        this.setState({
          check6: item
        });
        this.props.cookies.set("user", {
          name: this.state.name,
          email: this.state.email,
          setting: _set
        });
      }
    }).catch(error => console.error("setting/plan error:", error));
  }
  onChange = item => {
    let _set = 0;
    if (this.state.check4 && this.state.check6){
      _set = 0;
    } else if (this.state.check4 && !this.state.check6){
      _set = 1;
    } else if (!this.state.check4 && this.state.check6){
      _set = 2;
    }
    axios({
      method: "post",
      url: preURL + "/api/setting/plan",
      dataType: "json",
      data: {
        user: this.state.email,
        counter: item,
        setting: _set,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("setting/plan response:", response);
    }).catch(error => console.error("setting/plan error:", error));
  }
  render(){
    if(this.state&&this.state.user){
    const { check4,check6 } = this.state;
    return (
    <div className='setting'>
      <div className='plan'><span>每日背诵计划</span>{this.state.counter?<InputNumber size="large" min={1} defaultValue={this.state.counter} onChange={this.onChange} />:null}</div>
      <div className='cet4'><span>是否开启四级背诵</span><Switch checkedChildren="背诵" unCheckedChildren="不背诵" checked={check4} onChange={this.onChange4} /></div>
      <div className='cet6'><span>是否开启六级背诵</span><Switch checkedChildren="背诵" unCheckedChildren="不背诵" checked={check6} onChange={this.onChange6} /></div>
    </div>);
    } else return null;
  }
}

export default withCookies(Setting);