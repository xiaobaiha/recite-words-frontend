import React, { Component } from 'react';
// import logo from './logo.svg';
// import {Input} from 'antd';
import {Layout} from 'antd';
import HeaderCustom from './components/UnloginHeader/UnloginHeader';
import FooterCustom from './components/FooterCustom/FooterCustom';
import { CookiesProvider } from 'react-cookie';
import './App.css';
const {Content} = Layout;
class App extends Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {user: this.props.user}));
    return (
      <CookiesProvider>
      <Layout>
        <HeaderCustom/>
        <Layout style={{flexDirection: 'row'}}>
          <Layout style={{padding: '0 24px 24px'}}>
            <Content style={{margin: '0 16px', overflow: 'initial'}}>
              {childrenWithProps}
            </Content>
          </Layout>
        </Layout>
        <Layout>
          <FooterCustom/>
        </Layout>
      </Layout>
      </CookiesProvider>
    );
  }
}

export default App;
