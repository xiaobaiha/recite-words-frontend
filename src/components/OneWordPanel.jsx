import React from 'react';
import { Button, Card, Icon } from 'antd';

class OneWordPanel extends React.Component{
    
    constructor(props){
      super(props);
      this.state = {
        show: true,
        pre_actions: [<a onClick={props.nextWord()}>认识</a>, <a onClick={this.handleNotKnow}>不认识</a>]
      }
    }
    handleNotKnow = () => {
        this.setState({
            show: false,
            pre_actions: [<a onClick={this.props.nextWord()}>下一个</a>]
        })
    }

    render(){
        const props = this.props;
        const { show } = this.state;
        return (<div>
          <Card hoverable={true} actions={this.state.pre_actions}>
            <h2 style={{"fontSize": "3rem","fontWeight": "700","margin":"1rem"}}>{props.word}</h2>
            {show ?null:
            <Card bodyStyle={{"fontSize":"20px", "backgroundColor":"#ebedf0"}}>
              {props.desc}
            </Card>}
          </Card>
        </div>)
    }
}

export default OneWordPanel;