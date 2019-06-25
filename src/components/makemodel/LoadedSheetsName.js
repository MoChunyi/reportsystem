import React from 'react';
import DraggableItem from '../publiccomponents/DraggableItem'
import DropContainer from '../publiccomponents/DropContainer'

const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    float: 'left',
    width: '100%',
    height: '100%',
}

const listyle = {
    cursor: 'move',
}



class LoadedSheetsName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            sheetsName: [],
        }
    }

    componentWillMount() {
        let sheetsName = [];
        this.state.data.sheetsData.forEach(element => {
            sheetsName.push(element.sheetName);
        });

        this.setState({
            sheetsName: sheetsName
        })
    }

    deleteSeletedSheetName = (obj) => {
        this.props.deleteSelectedSheets(obj.index)
    }

    allowD

    render() {
        function allowDrag(event) {
            event.preventDefault();
        }
        function drop(event) {
            event.preventDefault();
            var data=event.dataTransfer.getData("id");
            var el = document.getElementById(data)
            el.parentNode.removeChild(el);
        }

        function drag(event) {
            event.target.setAttribute("id", "isbebingDraged");
            event.dataTransfer.setData("id",event.target.id);
            event.dataTransfer.setData("dropmessage","newadding");
        }
        function dragend(event) {
            event.target.removeAttribute("id");
        }

        return (
            <div style={style} onDragOver={allowDrag} onDrop={drop}>
                <ul >
                    {
                        this.state.sheetsName.map((item, index) => <li onDragStart={drag} onDragEnd={dragend} sheetname={item} draggable={"true"} style={listyle} key={index}>{item}</li>)
                    }
                </ul>
            </div>
        )
    }   
}

export default LoadedSheetsName;