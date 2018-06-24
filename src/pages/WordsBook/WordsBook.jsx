import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import './Wordsbook.less';

class WordsBook extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'name',
        width: '30%'
      }, {
        title: '单词',
        dataIndex: 'age'
      }, {
        title: '解释',
        dataIndex: 'address'
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
              <a href="javascript:;">删除</a>
            </Popconfirm>
          );
        }
      }
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0'
        }, {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1'
        }
      ],
      count: 2
    };
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
  render() {
    const {dataSource} = this.state;
    const columns = this.columns;
    return (
      <div className="wordsbook">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          title={() => <strong>单词本</strong>}/>
      </div>
    )
  }
}

export default WordsBook;