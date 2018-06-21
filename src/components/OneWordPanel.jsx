import React from 'react';
import {Button} from 'antd';

class OneWordPanel extends React.Component{
    state = {
        show: true,
    }
    handleNotKnow = () => {
        this.setState({
            show: false,
        })
    }
    handleKnow = () => {
        this.setState({
            show: false,
        })
    }
    render(){
        const props = this.props;
        const { show } = this.state;
        return (<div>
            <div className='word_title'>{props.word}</div>
            {show ? <div className='know_or_not'><Button onClick={() => props.nextWord()}>认识</Button><Button onClick={this.handleNotKnow}>不认识</Button></div> :
            <div className='word_desc'><span>{props.desc}</span><Button onClick={() => props.nextWord()}>下一个</Button></div>}
        </div>)
    }
}

export default OneWordPanel;