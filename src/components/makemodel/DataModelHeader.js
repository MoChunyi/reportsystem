import React from 'react';
import { Row, Col, Tree } from 'antd';

const { TreeNode } = Tree;

export default class DataModelHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            modelInfos: {},
            checkedKeys: [],
            selectedKeys: [],           
        }
    }

    componentWillMount() {
        console.log("state", this.state.data)
        var modelInfos = {
            modelName: "",
            dimensionality: {
                sheerNum: '',
                sheetInfos: [
                    {
                        sheetName: '',
                        sheetInfo: []
                    }
                ]
            },
            metric: {
                sheerNum: '',
                sheetInfos: [
                    {
                        sheetName: '',
                        sheetInfo: []
                    }
                ]
            }
            
        }
        this.state.data.sheetsData.map((sheet) => {           
            if (sheet.sheetHeaderType != undefined) {
                var dimensionality_sheetHeader = [];
                var metric_sheetHeader = [];
                sheet.sheetHeaderType.map((type, index) => {
                    if(type == "string") {
                        dimensionality_sheetHeader.push(sheet.sheetHeader[index])
                    } else if(type == "number") {
                        metric_sheetHeader.push(sheet.sheetHeader[index])
                    }
                })
                if (dimensionality_sheetHeader.length > 0) {
                    modelInfos.dimensionality.sheetInfos.push({
                        sheetName: sheet.sheetName,
                        sheetInfo: dimensionality_sheetHeader
                    })
                }
                if (metric_sheetHeader.length > 0) {
                    modelInfos.metric.sheetInfos.push({
                        sheetName: sheet.sheetName,
                        sheetInfo: metric_sheetHeader
                    })
                }
            }           
        })

        this.setState({
            modelInfos: modelInfos
        })
    }

    onCheck = (checkedKeys, info) => {
        console.log("onCheck", checkedKeys);
        console.log("onCheck_info", info);
    }

    onSelect = (selectedKeys, info) => {
        console.log("onSelectInfo", info);
        console.log("onSelect_selectedKeys", selectedKeys);
    }

    render() {
        return (
            <Row>
                <Col span={12}>
                    <h3>维度</h3>
                    {
                        <Tree
                        checkable
                        onCheck={this.onCheck}
                        onSelect={this.onSelect}
                        >
                            {
                                this.state.modelInfos.dimensionality.sheetInfos.map((item, index) => 
                                    <TreeNode title={item.sheetName} key={item+index}>
                                        {
                                            item.sheetInfo.map((it,ind) =>
                                                <TreeNode title={it} key={it+ind} belongToSheet={item.sheetName} measureType="dimensionality"></TreeNode>
                                            )
                                        }
                                    </TreeNode>
                                )
                            }
                        </Tree>
                    }
                </Col>
                <Col span={12}>
                    <h3>度量</h3>
                    <Tree
                    checkable
                    onCheck={this.onCheck}
                    onSelect={this.onSelect}
                    >
                        {
                            this.state.modelInfos.metric.sheetInfos.map((item, index) => 
                                <TreeNode title={item.sheetName} key={item+index}>
                                    {
                                        item.sheetInfo.map((it,ind) =>
                                            <TreeNode draggable={true}  title={it} key={it+ind} belongToSheet={item.sheetName} measureType="metric"></TreeNode>
                                        )
                                    }
                                </TreeNode>
                            )
                        }
                    </Tree>
                </Col>
            </Row>
        )
    }
}