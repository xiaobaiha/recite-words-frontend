import React from 'react';
import {Button} from 'antd';

class OneWordPanel extends React.Component{

    render(){
        const props = this.props;
        return (<div>
            <div className='word_title'>{props.word}</div>
            <div className='know_or_not'><Button>认识</Button><Button>不认识</Button></div>
            <div className='word_desc'>{props.desc}</div>
        </div>)
    }
}

export default OneWordPanel;