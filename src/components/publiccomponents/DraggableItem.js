import React from 'react';
import { DragSource } from 'react-dnd';
const spec = {
    beginDrag(props) {
        return(props.feebackObj);
    }
}
  
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        isDidDrop: monitor.didDrop(),
    }
}

class DraggableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentData: props.contentData
        }
    }

    render() {
        const { connectDragSource } = this.props
        return connectDragSource(
            <div style={this.props.itemStyle}>
              {this.props.children}
            </div>
        )
    }
}
export default DragSource(
    props => props.type,
    spec, 
    collect
)(DraggableItem);