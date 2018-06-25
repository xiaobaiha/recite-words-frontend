import React from 'react';
import { Card, Icon } from 'antd';

class OneWordPanel extends React.Component{
    
    constructor(props){
      super(props);
      this.state = {
        show: true,
        pre_actions: [<span onClick={props.nextWord()}><Icon type="smile" />认识</span>, <span onClick={this.handleNotKnow}>不认识<Icon type="frown" /></span>]
      }
    }
    handleNotKnow = () => {
        this.setState({
            show: false,
            pre_actions: [<span onClick={this.props.nextWord()}>下一个<Icon type="forward" /></span>]
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