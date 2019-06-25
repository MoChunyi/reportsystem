import { Layout, Menu, Breadcrumb, Icon ,Button,TreeSelect,Upload, Row, Col,message} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import OhSheet from '../../assets/js/OhSheet';
import Spreadjs from './Spreadjs';




const treeData = [
    {
        title: '从数据库中选择',
        value: '.MYD',
        key: '0-0',
    },
    {
        title: '从Excel文件中选择',
        value: '.xlsx,.xls',
        key: '0-1',
    },
    {
        title: '从Json文件中选择',
        value: '.json',
        key: '0-2',
    },
];

class Data extends React.Component{

    state = {
        value: ".xlsx,.xls",
        fileList: [],
        saveBtnVisiable: false 
    };


    onRef = (ref) => {
        this.child = ref;
    }

    startHandleData = (e) => {
        this.child.handleData();
    }


    handleChange = info => {
        let fileList = [...info.fileList];
        console.log(Object.prototype.toString.call(fileList[0]));

        // fileList = fileList.slice(-2);

        // fileList = fileList.map(file => {
        //     if (file.response) {
        //         file.url = file.response.url;
        //     }
        //     return file;
        // });

        this.setState({
            fileList: fileList
        });
    };
    selectDataSourceType = value => {
        this.setState({ value });
    };

    saveAsJson = () => {
        OhSheet.saveAsJson(this.child.state.spread);
    }

    saveAsJsonByRow = () => {
        OhSheet.saveAsJsonByRow(this.child.state.spread);
    }

    changeSaveBtnVisiable = () => {
        this.setState({
            saveBtnVisiable: true
        })
    }

    render(){
        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: true,
        };

        return(
            <div>
                <h1>数据采集</h1>
                <div>数据源格式
                   &nbsp;
                    &nbsp;
                    &nbsp;
                    <TreeSelect
                        style={{ width: 180 }}
                        value={this.state.value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={this.selectDataSourceType}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Upload {...props} fileList={this.state.fileList} accept={this.state.value}>
                        <Button>
                            <Icon type="upload" /> 上传
                        </Button>
                    </Upload>
                    <h1 style={{marginTop: '20px'}}>数据展示
                        <Button type="primary" onClick={this.startHandleData} style={{marginLeft: '1000px'}}>导入</Button>
                        {this.state.saveBtnVisiable &&
                        <Button onClick={this.saveAsJson}>列存储</Button>

                        }
                        {this.state.saveBtnVisiable &&

                        <Button onClick={this.saveAsJsonByRow}>行存储</Button>
                        }
                    </h1>
                </div>
                <div>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={18}>
                            <div>
                                <Spreadjs dataSource={this.state.fileList} onRef={this.onRef} changeSaveBtnVisiable={this.changeSaveBtnVisiable} />
                            </div>
                        </Col>
                    </Row>                        
                </div>              
            </div>           
        );

    }
}
export default Data;

