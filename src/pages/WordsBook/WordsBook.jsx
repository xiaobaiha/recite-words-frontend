import React from 'react';
import {Table, Popconfirm,Tabs} from 'antd';
import './Wordsbook.less';
import { withCookies } from "react-cookie";
import axios from 'axios';
import {preURL} from '../../axios/config';

const TabPane = Tabs.TabPane;
class WordsBook extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: '10%'
      }, {
        title: '单词',
        dataIndex: 'word'
      }, {
        title: '解释',
        dataIndex: 'desc'
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Popconfirm
              title="确认删除?"
              cancelText="取消"
              okText="确认"
              onConfirm={() => this.onDelete(record.key)}>
              <a href="">删除</a>
            </Popconfirm>
          );
        }
      }
    ];
    const user = props.cookies.get('user');
    this.state = {
      dataSource: [],
      user: user
    };
  }
  componentWillMount(){
    this.getCet4List();
  }
  getCet4List = () => {
    axios({
      method: "post",
      url: preURL + "/api/wordsbook/cet4_list",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("wordsbook/cet4_list response:", response);
      const data = response.data.data;
      if(response.data.code === "200"){
        const words_list = data.words_list;
        const data_temp = words_list.map((item,index) => {
          return {
            key: index+1,
            index: index+1,
            word: item.word,
            desc: item.desc
          }
        });
        this.setState({
          dataSource: data_temp,
        });
      }
    }).catch(error => console.error("wordsbook/cet4_list error:", error));
  }
  getCet6List = () => {
    axios({
      method: "post",
      url: preURL + "/api/wordsbook/cet6_list",
      dataType: "json",
      data: {
        user: this.state.user.email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(response => {
      console.log("wordsbook/cet6_list response:", response);
      const data = response.data.data;
      if(response.data.code === "200"){
        const words_list = data.words_list;
        const data_temp = words_list.map((item,index) => {
          return {
            key: index+1,
            index: index+1,
            word: item.word,
            desc: item.desc
          }
        });
        this.setState({
          dataSource: data_temp,
        });
      }
    }).catch(error => console.error("wordsbook/cet6_list error:", error));
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({dataSource});
      }
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key)
    });
  }
  handleAdd = () => {
    const {count, dataSource} = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`
    };
    this.setState({
      dataSource: [
        ...dataSource,
        newData
      ],
      count: count + 1
    });
  }
  callback = (key) => {
    this.setState({
      dataSource: []
    });
    if (key === '1') {
      this.getCet4List();
    } else if (key === '2') {
      this.getCet6List();
    }
  }
  render() {
    const {dataSource} = this.state;
    const columns = this.columns;
    return (
      <div className="wordsbook">
        <Tabs size="large" onChange={this.callback} type="card">
          {this.state.user.setting < 2?
          <TabPane className="recite_tabpane" tab="四级" key="1">
            <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            title={() => <strong>单词本</strong>}/>
          </TabPane>
            :null}
          {this.state.user.setting % 2 === 0?
          <TabPane className="recite_tabpane" tab="六级" key="2">
            <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            title={() => <strong>单词本</strong>}/>
          </TabPane>
            :null}
        </Tabs>
      </div>
    )
  }
}

export default withCookies(WordsBook);