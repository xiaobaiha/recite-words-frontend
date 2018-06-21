import React from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import {preURL} from '../../axios/config';
import OneWord from '../../components/OneWordPanel'
const TabPane = Tabs.TabPane;

class Recite extends React.Component {
    componentWillMount(){
        axios({
            method: "post",
            url: preURL + "/recite/cet4",
            dataType: "json",
            data: {
              user: 'usr001'
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }).then(response => {
              console.log("recite/cet4 response:", response);
          }).catch(error => console.error("recite/cet4 error:",error));
    }
    callback(key) {
        console.log(key);
    }
    render(){
        return (<div>
            <Tabs onChange={this.callback} type="card">
                <TabPane tab="四级" key="1">
                    <OneWord word='Hello' desc='Hello is a word' />
                    <div className=''></div>
                </TabPane>
                <TabPane tab="六级" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        </div>);
    }
} 

export default Recite;