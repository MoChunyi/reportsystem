import React from 'react';
import { connect } from 'react-redux';
import DropContainer from '../publiccomponents/DropContainer';
import actions from '../../actions/XYdatasActions';
import {message} from 'antd'

const getXHeaders = (state) => {
    if (state.XYdatasReducer.graphitems.length > 0) {
        let index = state.XYdatasReducer.graphitems.findIndex(function(item, index, array) {
            if (item.id === state.XYdatasReducer.currentgraphitem) return true;
        })
        console.log(state.XYdatasReducer.graphitems)
        return state.XYdatasReducer.graphitems[index].xheaders;
    }
    return [];
    
}
const getYHeaders = (state) => {
    if (state.XYdatasReducer.graphitems.length > 0) {
        let index = state.XYdatasReducer.graphitems.findIndex(function(item, index, array) {
            if (item.id === state.XYdatasReducer.currentgraphitem) return true;
        })
        return state.XYdatasReducer.graphitems[index].yheaders;
    }
    return [];
    
}

const mapStateToProps = (state) => ({
    currentGraphItemID: state.XYdatasReducer.currentgraphitem,
    xHeaders: getXHeaders(state),
    yHeaders: getYHeaders(state)
})

const mapDispatchToProps = (dispatch) => ({
    addGraphItemXHeader: (header) => {
        dispatch(actions.addGraphItemXHeader(header));
    },
    addGraphItemYHeader: (header) => {
        dispatch(actions.addGraphItemYHeader(header));
    }
})

const CoordinateXY = (props) => {
    const xDropHandle = (item) => {
        if (props.currentGraphItemID === null) {
            message.info("请先添加图表");
            return;
        }
        props.addGraphItemXHeader(item.selectedHeader);
    }
    const yDropHandle = (item) => {
        if (props.currentGraphItemID === null) {
            message.info("请先添加图表");
            return;
        }
        props.addGraphItemYHeader(item.selectedHeader);
    }
    return (
        <React.Fragment>
            <DropContainer onDrop={xDropHandle} showItems={props.xHeaders} types={['toXY']} xORy={"x"} containerStyle={{width: "100%", height: "200px", overflowY: "auto"}}>X</DropContainer>
                <hr/>
            <DropContainer onDrop={yDropHandle} showItems={props.yHeaders} types={['toXY']} xORy={"y"} containerStyle={{width: "100%", height: "200px", overflowY: "auto"}}>Y</DropContainer>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CoordinateXY);