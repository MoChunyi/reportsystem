import React from 'react';
import { Collapse, Icon } from 'antd';
import { connect } from 'react-redux'
import actions from '../../actions/XYdatasActions';
import DraggableItem from '../publiccomponents/DraggableItem';
import DropContainer from '../publiccomponents/DropContainer';
const Panel = Collapse.Panel;

const mapDispatchToProps = (dispatch) => ({
    deleteGraphItemXHeader: (index) => {
        console.log(index);
        dispatch(actions.deleteGraphItemXHeader(index));
    },
    deleteGraphItemYHeader: (index) => {
        console.log(index);
        dispatch(actions.deleteGraphItemYHeader(index));
    }
})

class SelectXY extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelInfos: props.modelInfos,
            dimensionalityActivityKeys: [],
            metricActivityKeys: [],
        }
    }

    componentWillMount() {
        this.state.modelInfos.dimensionality.sheetInfos.map((item, index) => this.state.dimensionalityActivityKeys.push(index.toString()));
        this.state.modelInfos.metric.sheetInfos.map((item, index) => this.state.metricActivityKeys.push(index.toString()));
    }
    deleteHeader = (obj) => {
        console.log(obj);
        if (obj.xORy === "x") {
            this.props.deleteGraphItemXHeader(obj.index);
        } else if (obj.xORy == "y") {
            this.props.deleteGraphItemYHeader(obj.index);
        }
        
    }


    
    render() {        
        return (
            <div>
                <DropContainer onDrop={this.deleteHeader} showItems={[]} types={['back']} containerStyle={{cursor: 'move'}}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1', '2']}
                >
                        <Panel header={"维度"} key='1'>
                            <Collapse
                                bordered={false}
                                defaultActiveKey={this.state.dimensionalityActivityKeys}
                            >
                                {
                                    this.state.modelInfos.dimensionality.sheetInfos.map((item, index) => 
                                        {
                                            
                                            return (
                                                <Panel header={item.sheetName} key={index}>
                                                {
                                                    item.sheetInfo.map((it, ind) =>  {
                                                            return <DraggableItem type="toXY" key={ind} itemStyle={{cursor: 'move'}} feebackObj={{selectedHeader: it}}>{it}</DraggableItem>
                                                        }                       
                                                    )
                                                }
                                                </Panel>
                                            )
                                        }
                                    
                                    )
                                }
                            </Collapse>
                        </Panel>    
                </Collapse> 
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1', '2']}
                >
                    <Panel header={"度量"} key='2'>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={this.state.metricActivityKeys}
                        >
                            {
                                this.state.modelInfos.metric.sheetInfos.map((item, index) => 
                                    <Panel header={item.sheetName} key={index}>
                                        {
                                            item.sheetInfo.map((it, ind) => {
                                                    return <DraggableItem type="toXY" key={ind} itemStyle={{cursor: 'move'}} feebackObj={{selectedHeader: it}} >{it}</DraggableItem>
                                                }                                            
                                            )
                                        }
                                        
                                    </Panel>
                                )
                            }
                        </Collapse>
                    </Panel>  
                </Collapse>
            </DropContainer>    
            </div>    
        )
    }
}

export default connect(null, mapDispatchToProps)(SelectXY);