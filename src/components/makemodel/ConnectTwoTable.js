import React from 'react';
import {Card, Popover, Button, Icon, Select, Tabs} from 'antd';
import SqlContext from './SqlContext';
import ConnectPanel from "./ConnectPanel";
import ConnectionSelect from "./ConnectionSelect"
const Option = Select.Option;
const TabPane = Tabs.TabPane;
  

class ConnectTwoTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectionForm:'',
            data:props.data,
            ConnectionSelectVisiable: false
        }
    }
    handleFormChange = (value) => {
        console.log( "选择的是" + `${value}` );
        //console.log(this.state.connectionForm)
        //console.log(this.context);
        //console.log("前表" + this.props.preconnectnode);
        //console.log("后表" + this.props.selfnodename);
        this.setState({
            connectionForm: `${value}`,
            ConnectionSelectVisiable: true

        })

    }
   
    componentDidMount() {
        this.context.setSqlContext("123")

    }

    render() {
        function content(props) {
            return (
                <div>
                    <p>{props.preconnectnode}</p>
                    <p>{props.selfnodename}</p>
                </div>
            )  
        }
        return (
            <Popover placement="bottom" title={"表连接相关设置"} content={
                    <div>
                        <Select defaultValue="请选择连接类型" style={{ width: 150 }} onChange={this.handleFormChange}>
                            <Option value="left join">左外连接</Option>
                            <Option value="right join">右外连接</Option>
                            <Option value="full join">全外连接</Option>
                            <Option value="join">内连接</Option>
                        </Select>
                        {/*{content(this.props)}*/}

                        { this.state.ConnectionSelectVisiable && <ConnectionSelect data={this.context.data}  preconnectnode={this.props.preconnectnode} selfnodename={this.props.selfnodename} connectionForm ={this.state.connectionForm} />}
                    </div>

            } trigger="click" overlayStyle={{width: '450px'}}>
                <Icon type="plus" />
            </Popover>
        )
    }   
}
ConnectTwoTables.contextType = SqlContext;
export default ConnectTwoTables;