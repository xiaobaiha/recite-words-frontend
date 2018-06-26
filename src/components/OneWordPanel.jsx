import React from 'react';
import { Card, Icon, Tooltip } from 'antd';

class OneWordPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    }
  }
  componentWillReceiveProps(props){
    if(props.word === this.props.word) return
    this.setState({
      show: true,
      pre_actions: [< span onClick={() =>
        this.props.nextWord()
      } > <Icon type="smile" />认识 </span>, <span onClick={this.handleNotKnow}>不认识<Icon type="frown" /> </span>]
    });
  }
  handleNotKnow = () => {
    if (this.props.descDisabled){
      if(this.props.testSpe) this.props.testSpe();
      this.props.nextWord();
      return;
    }
    this.setState({
      show: false,
      pre_actions: [<span onClick={() =>
        this
          .props
          .nextWord()
      } > 下一个 < Icon type="forward" /></span>]
    })
  }

  render() {
    const props = this.props;
    const { show } = this.state;
    return (<div>
      <Card hoverable={true} actions={this.state.pre_actions}>
        <h2 style={{ "fontSize": "3rem", "fontWeight": "700", "margin": "1rem" }}>
          {props.word}
          {props.collect_disabled?null:<Tooltip title="添加到单词本">
            <span onClick={() => props.favorite()} style={{ "fontSize": "3rem", "color": "yellow", "fontWeight": "1", "margin": "2rem" }}>{
              props.fav_flag?<Icon type="star" />:<Icon type="star-o" />
            }</span>
          </Tooltip>}
        </h2>
        {show ? null :
          <Card bodyStyle={{ "fontSize": "20px", "backgroundColor": "#ebedf0" }}>
            {props.desc}
          </Card >
        } </Card>
    </div >)
  }
}

export default OneWordPanel;