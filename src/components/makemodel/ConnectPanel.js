import React from 'react';
import DropContainer from '../publiccomponents/DropContainer';
import DraggableItem from '../publiccomponents/DraggableItem';
import Wrap from './dnditmes/Wrap';
import Box from './dnditmes/Box';
import Root from './dnditmes/RootBox';
import Item from './dnditmes/Items';
import RootBox from './dnditmes/RootBox';
import SqlContext from './SqlContext';
const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    width: '10000px',
    height: '100%',
    overflow: 'auto',
    padding: '10px 0 0 10px',
}


class ConnectPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sheetname: null,
            sqlContext: {},
            data: props.data
        }
    }

    addSeletedSheetName = (obj) => {
        var selectedSheet = {};
        selectedSheet.name = obj.selectedSheetName;
        this.props.addSelectedSheets(selectedSheet);
        
    }

    allowDrag(event) {
        event.preventDefault();
    }
    drop = (event) => {
        event.preventDefault();
        let data=event.dataTransfer.getData("id");
        let el = document.getElementById(data);
        let sheetname = el.getAttribute("sheetname");
        if (this.state.sheetname === null) {
            this.setState({
                sheetname: sheetname,
            })
        }     
    }

    

    render() {
        return(
            <div style={style} onDragOver={this.allowDrag} onDrop={this.drop}>

                { this.state.sheetname && <RootBox sheetname={this.state.sheetname}></RootBox>}
            </div>          
        )
    }
    
}

export default ConnectPanel