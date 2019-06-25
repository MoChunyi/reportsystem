import { Layout, Menu, Breadcrumb, Icon ,Button, Table} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import logo from '../logo.svg';

import './Navi.css'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Formation from "../components/Formation";
import Home from "../components/Home";
import About from "../components/About";
import Data from "../components/collectdata/Data"
import Datamodel from "../components/makemodel/DataModel";
import ReportPanel from '../components/showmodel/ReportPanel';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
const { SubMenu } = Menu;



const { Header, Content, Footer, Sider } = Layout;



class SiderDemo extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Router>

                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
                        <div className="intro" >
                            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em' }}>报表系统最初版</span>

                        </div>

                        <Menu theme="dark"  mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">
                                <Link to ="/" >主页 </Link>
                            </span>

                            </Menu.Item>

                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                               <Icon type="form" />
                                    常见报表格式
                                </span>
                                }>
                                <Menu.Item key="2">
                                    <Link to ="/table1" > 列表式报表 </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    分段式报表
                                </Menu.Item>
                                <Menu.Item key="4">
                                    分组报表
                                </Menu.Item>
                                <Menu.Item key="5">
                                    交叉报表
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                               <Icon type="form" />
                                    数据导入和处理
                                </span>
                                }>
                                <Menu.Item key="sub21">
                                    <Link to ="/data" > 数据采集 </Link>
                                </Menu.Item>

                                <Menu.Item key="sub22">
                                    <Link to ="/datamodel" > 数据模型 </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
                               <Icon type="bar-chart" />
                                    数据可视化分析
                                </span>
                                }>
                                <Menu.Item key="reportPanel">
                                    <Link to="/reportpanel">报表板</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    饼状图
                                </Menu.Item>
                                <Menu.Item key="7">
                                    柱状图
                                </Menu.Item>
                                <Menu.Item key="8">
                                    折线图
                                </Menu.Item>
                                <Menu.Item key="9">
                                    热力图
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="sub3">
                                <Icon type="upload" />
                                <span className="nav-text">
                                <Link to="/about"> 关于我们</Link>
                            </span>
                            </Menu.Item>

                        </Menu>
                        <div className="logo" >
                            <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                            <img id="logo" src={logo}  className="App-logo" alt="logo"  />
                            </span>

                        </div>

                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User，欢迎使用</Breadcrumb.Item>
                            {/*<Breadcrumb.Item>欢迎使用</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>

                            <Route exact path ="/" component={Home}/>
                            <Route path ="/formation" component={Formation}/>
                            <Route path ="/about" component={About}/>
                            <Route path ="/data" component={Data}/>
                            {/* <Route path ="/table1" component={Table1}/>*/}
                            <Route path ="/datamodel" component={Datamodel}/>
                            <Route path ="/reportpanel" component={ReportPanel}/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        三剑客小组
                    </Footer>
                </Layout>

            </Router>
        );
    }
}

export default DragDropContext(HTML5Backend)(SiderDemo);