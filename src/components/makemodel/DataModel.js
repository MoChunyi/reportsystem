import React from 'react';
import { Upload, message, Button, Icon, Row, Col, Tabs} from 'antd';
import $ from 'jquery';
import DataModelHeader from './DataModelHeader';
import DataModelTable from './DataModelTable';
import ConnectionSelect from './ConnectionSelect';
import { Select } from 'antd';
import LoadedSheetsName from './LoadedSheetsName';
import ConnectPanel from './ConnectPanel';
import SqlContext from './SqlContext';
import emitter from './events'
const Option = Select.Option;
const TabPane = Tabs.TabPane;



export default class DataModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [
            ],
            jsondata: {},
            dataModleHeaderVisiable: false,
            dataModleTableVisiable: false,
            ConnectionSelectVisiable: false,
            LoadedSheetsNameVisiable: false,
            connectionForm:'',
            selectedSheets: [],
            tableA:'',
            tableB:'',
            connectSql: [],
        }
    }
    componentDidMount() {
        this.eventEmitter = emitter.on("sendConnectSql", (connectSql) => {
            console.log("dataModel收到connectSql,将传给datatable", connectSql);
            this.setState({
                connectSql:connectSql
            })
        })
    }

    handleFormChange = (value) => {
        console.log( "选择的是" + `${value}` );
        //console.log(this.state.connectionForm)
        this.setState({
            connectionForm: `${value}`,
            ConnectionSelectVisiable: true

        })

    }

    handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
        if (file.response) {
        file.url = file.response.url;
        }
        return file;
    });

        this.setState({ fileList }, () => {
            this.handleData();
        });
    }

    handleData = () => {
        var dataobj;
        var reader = new FileReader();
        var file = this.state.fileList[0];
        if (!file) {
            message.info("请上传文件");
            return;
        }
        reader.readAsText(file.originFileObj);
        reader.onloadend = () => {
            dataobj = $.parseJSON(reader.result);
            this.setState({
                jsondata: dataobj,
            },() => {
                this.setState({
                    LoadedSheetsNameVisiable: true,
                    dataModleHeaderVisiable: true,
                    dataModleTableVisiable: true,
                })
            });
        }        
    }

    addSelectedSheets = (selectedSheet) => {
        var selectedSheets = this.state.selectedSheets;
        selectedSheet.mount = selectedSheets.length;
        selectedSheets.push(selectedSheet);
        this.setState({
            selectedSheets: selectedSheets
        }, () => {
            console.log(this.state.selectedSheets)
        })
    }

    deleteSelectedSheets = (index) => {
        var selectedSheets = this.state.selectedSheets;
        selectedSheets.splice(index, 1);
        this.setState({
            selectedSheets: selectedSheets
        })
    }

    setSqlContext = (sql) => {
        console.log(sql);
        console.log(this.state.jsondata);
    }
    
    render() {
    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        multiple: true,
    };
    return (
        <div>
            <Row gutter={8}>
                <Col id="col" span={4}>
                    <div style={{display: 'inline-block'}}>
                        <Upload multiple={true} {...props} fileList={this.state.fileList}>
                            <Button>
                            <Icon type="upload" /> 上传
                            </Button>
                        </Upload>
                    </div>
                    
                    { this.state.LoadedSheetsNameVisiable && <LoadedSheetsName data={this.state.jsondata} deleteSelectedSheets={this.deleteSelectedSheets}/>}
                </Col>
                <Col span={20} style={{}}>
                    <div style={{width:'100%', height:'48px'}}>
                        <h2 style={{display: 'flex', alignItems: 'center'}}>数据模型名称</h2>
                    </div>
                    <hr/>
                    <div style={{height:'200px', backgroundColor:'white', overflow:'auto'}}>
                        <SqlContext.Provider value={{data: this.state.jsondata, setSqlContext: this.setSqlContext}}>
                            <ConnectPanel
                            addSelectedSheets={this.addSelectedSheets} 
                            selectedSheets={this.state.selectedSheets}
                            data = {this.state.jsondata}
                            >
                                {/* <div>
                                    <Select defaultValue="请选择连接类型" style={{ width: 150 }} onChange={this.handleFormChange}>
                                        <Option value="left join">左外连接</Option>
                                        <Option value="right join">右外连接</Option>
                                        <Option value="full join">全外连接</Option>
                                        <Option value="join">内连接</Option>
                                    </Select>
                                </div>
                                { this.state.ConnectionSelectVisiable && <ConnectionSelect data={this.state.jsondata} connectionFrom ={this.state.connectionForm} /> } */}
                            </ConnectPanel>
                        </SqlContext.Provider>
                        
                    </div>
                    <hr/>
                    <div>
                        <Tabs>
                            <TabPane tab="表头" key="1">
                                { this.state.dataModleHeaderVisiable && <DataModelHeader data={this.state.jsondata}/> }
                            </TabPane>
                            <TabPane tab="宽表" key="2" style={{right: '150px'}}>
                                {this.state.dataModleTableVisiable && <DataModelTable data={this.state.jsondata} sheet={["sheet1Name", "sheet2Name"]}/>}
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>

        </div>
    )
    }
}