import React from 'react';
import { Row, Col, Icon, Button, Upload, Drawer, Menu, Dropdown, Card, message, Slider, Divider, Popover } from 'antd';
import Table from './Table';
import MyUtils from '../../assets/js/Utils'
import $ from 'jquery';
import SelectXY from './SelectXY';
import DropContainer from '../publiccomponents/DropContainer';
import BigScreenPanel from './BigScreenPanel';
import AllGraphs from './AllGraphs';
import CoordinateXY from './CoordinateXY';
export default class ReportPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: null,
            isShow: false,
            visible: true,
            selectXYVisiable:false,
            dataModel: null,
            xHeader: [],
            yHeader: [],
            slidercount: .5,
        }
    }
    handleChange = info => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-2);
        var originFileObjs = MyUtils.getOriginFileObjs(fileList);
        if (originFileObjs.length > 0) {
            var dataobj = {};
            var reader = new FileReader();
            reader.readAsText(originFileObjs[0]);
            reader.onloadend = () => {
                dataobj = $.parseJSON(reader.result);
                this.setState({dataModel: dataobj}, () => {
                    console.log("激活回调")
                    console.log(this.state.fileList, this.state.dataModel);
                    this.showSelectedModel();
                })
            } 
        }
        this.setState({ fileList: fileList,}, () => {
            
        });
    };

    showDrawPanel = () => {
        this.setState({
            isShow: true,
        })
        console.log("show");
    }

    showSelectedModel = () => {
        console.log("文件上传成功");
        this.setState({
            selectXYVisiable: true
        })
    }

    allowDrop = ev => {
        ev.preventDefault();
    }

    xDropHandle = (item) => {
        var xHeader = this.state.xHeader;
        xHeader.push(item.selectedHeader);
        this.setState({
            xHeader: xHeader
        })
        console.log(this.state.xHeader);
    }
    yDropHandle = (item) => {
        var yHeader = this.state.yHeader;
        yHeader.push(item.selectedHeader);
        this.setState({
            yHeader: yHeader
        })
        console.log(this.state.yHeader);
    }

    deleteXHeader = (index) => {
        console.log(index);
        var xHeader = this.state.xHeader;
        xHeader.splice(index,1);
        console.log(xHeader);
        this.setState({
            xHeader: xHeader
        })
    }
    deleteYHeader = (index) => {
        console.log(index);
        var yHeader = this.state.yHeader;
        yHeader.splice(index,1);
        console.log(yHeader);
        this.setState({
            yHeader: yHeader
        })
    }

    setSliderCount = (value) => {
        this.setState({
            slidercount: value
        })
    }
    render() {
        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: true,
        };
        return ( 
            <div>
                <Row gutter={4}>
                    <Col span={18} justify={'center'}>
                        <div style={{position: "absolute", zIndex:"1000"}}>
                            <Popover placement="right" content={AllGraphs()} trigger="click">
                                <Button type="primary" shape="circle" icon="plus"></Button>
                            </Popover>
                        </div>
                        {/* {
                            this.state.isShow && <Table xheader={this.state.xHeader} yheader={this.state.yHeader} />
                        } */}
                        <BigScreenPanel slidercount={this.state.slidercount}></BigScreenPanel>
                        <Slider
                            min={0.2}
                            max={2}
                            defaultValue={.5}
                            step={0.1}
                            onChange={this.setSliderCount}
                        />
                    </Col>
                    <Col span={3} style={{border: '1px solid black'}}>
                        <Button onClick={this.showDrawPanel}>展示</Button>
                        <hr/>
                        {/* <DropContainer onDrop={this.xDropHandle} showItems={this.state.xHeader} types={['toXY']} xORy={"x"} containerStyle={{width: "100%", height: "200px", overflowY: "auto"}}>X</DropContainer>
                        <hr/>
                        <DropContainer onDrop={this.yDropHandle} showItems={this.state.yHeader} types={['toXY']} xORy={"y"} containerStyle={{width: "100%", height: "200px", overflowY: "auto"}}>Y</DropContainer> */}
                        <CoordinateXY/>
                    </Col>
                    <Col span={3} style={{border: '1px solid black'}}>
                        <h3 style={{display:'flex', justifyContent:'center', flexShrink:"0.5", color:'red'}}>数据模型</h3>
                        <hr/>
                        <Upload {...props} fileList={this.state.fileList} showUploadList={true} style={{display: 'flex', width:'100%', justifyContent:'center'}}>
                            <Button icon="plus" style={{display: 'flex', width:'80%', justifyContent:'center'}} ></Button>
                        </Upload>
                        <hr/>
                        {
                            this.state.selectXYVisiable && <SelectXY modelInfos={this.state.dataModel} deleteXHeader={this.deleteXHeader} deleteYHeader={this.deleteYHeader} />
                        }                        
                    </Col>   
                </Row>
            </div>
        )
    }
}