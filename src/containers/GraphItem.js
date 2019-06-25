import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions/XYdatasActions';
import { Button } from 'antd';


const GraphItem = (props) => {
    return (
        <Button type="primary" onClick={() => {props.addGraphItem()}}>GRAPH{props.state.XYdatasReducer.graphitems.length}</Button>
    )
}

const mapStateToProps = (state) => {
    console.log("state",state);
    return ({
        state: state
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addGraphItem: () => {
        console.log(ownProps);
        dispatch(actions.addGraphItem(ownProps.graphitemtype))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(GraphItem)