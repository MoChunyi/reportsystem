// 传入接收的类型和初始样式

import React from 'react';
import { DropTarget } from 'react-dnd';
import DraggableItem from './DraggableItem'

const spec = {
    drop(props, monitor) {
        props.onDrop(monitor.getItem())
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    item: monitor.getDropResult(),
})

class DropContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Headers: [],
           
        }
    }
    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div style={this.props.containerStyle}>
                {this.props.children}
                {this.props.showItems.length > 0 && this.props.showItems.map((item,index) => <DraggableItem type={"back"} itemStyle={{cursor: 'move'}} feebackObj={{index: index, xORy: this.props.xORy}} key={index}>{item}</DraggableItem>)}               
            </div>
        )
    }
    
}

export default DropTarget(
    props => props.types, 
    spec, 
    collect
)(DropContainer);