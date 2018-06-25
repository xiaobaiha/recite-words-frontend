import React from 'react';
import { Switch,InputNumber } from 'antd';

class Setting extends React.Component {
  onChange = item =>{
    console.log("switch to ", item);
  }
  render(){
    return (
    <div>
      <p><span>每日背诵计划</span><InputNumber min={1} defaultValue={100} onChange={this.onChange} /></p>
      <p><span>是否开启四级背诵</span><Switch checkedChildren="背诵" unCheckedChildren="不背诵" defaultChecked onChange={this.onChange} /></p>
      <p><span>是否开启六级背诵</span><Switch checkedChildren="背诵" unCheckedChildren="不背诵" defaultChecked onChange={this.onChange} /></p>
    </div>);
  }
}

export default Setting;