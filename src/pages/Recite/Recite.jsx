import React from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import {preURL} from '../../axios/config';
import OneWord from '../../components/OneWordPanel'
const TabPane = Tabs.TabPane;

class Recite extends React.Component {
    state = {
        
    }
    componentWillMount(){
        this.setCet4Data();
    }
    callback = (key) => {
        if(key === '1'){
            this.setCet4Data();
        } else if(key === '2'){
            this.setCet6Data();
        }
    }
    setCet4Data = () => {
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
    setCet6Data = () => {
        axios({
            method: "post",
            url: preURL + "/recite/cet6",
            dataType: "json",
            data: {
              user: 'usr001'
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }).then(response => {
              console.log("recite/cet6 response:", response);
          }).catch(error => console.error("recite/cet6 error:",error));
    }
    getNextWord = () => {
        console.log("next word...");
    }
    render(){
        return (<div>
            <Tabs onChange={this.callback} type="card">
                <TabPane tab="四级" key="1">
                    <OneWord word='Hello' desc='Hello is a word' nextWord={() => this.getNextWord()} />
                </TabPane>
                <TabPane tab="六级" key="2">
                    <OneWord word='Hello' desc='Hello is a word' nextWord={() => this.getNextWord()} />
                </TabPane>
            </Tabs>
        </div>);
    }
} 

export default Recite;