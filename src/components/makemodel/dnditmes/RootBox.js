import React from 'react';
import Box from './Box';
const boxstyle = { 
    marginTop: '2px'
}

const itemstyle = {
    width: '200px',
    height: '38px',
    position: 'relative',
    display: 'inline-block',
    borderRadius: '2px',
    backgroundColor: '#adc6ff',
    verticalAlign: 'top',
    textAlign: 'center',
    cursod: 'move',
    borderRight: '2px solid'
}

const wrapstyle = {
    overflow: 'hidden',
    marginLeft: '-2px',
    position: 'relative',
    display: 'inline-block',
}
const wraplinestyletop = {
    position: 'absolute',
    display:'inline-block',
    top: '20px',
    height: '100%',
    borderLeft: '2px solid black',
    backgroundColor: 'black'
}
const wraplinestylebottom = {
    position: 'absolute',
    display:'inline-block',
    height: '19px',
    borderLeft: '2px solid white',
    bottom: '0'
}



class RootBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectsheetname: [],
        }
    }
    allowDrag(event) {
        event.preventDefault();
    }
    drop = (event) => {
        event.preventDefault();
        let data=event.dataTransfer.getData("id");
        let dropmessage=event.dataTransfer.getData("dropmessage");
        let el = document.getElementById(data);
        if (dropmessage) {
            if (dropmessage === "newadding") {
                let sheetname = el.getAttribute("sheetname");
                let connectsheetname = this.state.connectsheetname;
                connectsheetname.push(sheetname);
                this.setState({
                    connectsheetname: connectsheetname
                })
            } else if (dropmessage === "move") {
                console.log(event.target.parentNode.getAttribute("id"));
                if (event.target.parentNode.getAttribute("id") != "isbebingDraged") {
                    let box = event.target.parentNode.lastChild;
                    el.setAttribute("preconnectnode", event.target.parentNode.getAttribute("sheetname"));
                    box.appendChild(el);
                }
                
            }
        }
    }

    drag = (event) => {
        console.log(event.target);
        let parent = event.target.parentNode;
        console.log(parent);
        parent.setAttribute("id", "isbebingDraged");
        event.dataTransfer.setData("id",parent.id);
        event.dataTransfer.setData("dropmessage","move");
    }
    dragend = (event) => {
        let parent = event.target.parentNode;
        parent.removeAttribute("id");
    }
    render() {
            return (
            <div tagclass='box' style={boxstyle} sheetname={this.props.sheetname}>
                <div tagclass="item" style={itemstyle} onDragOver={this.allowDrag} onDrop={this.drop} onDragStart={this.drag} onDragEnd={this.dragend} onDragOver={this.allowDrag} draggable={"true"}>
                    <p style={{marginTop: '7px'}}>{this.props.sheetname} </p>
                </div>
                <div tagclass="wrap" style={wrapstyle}>
                    {/* <div tagclass="wrapline" style={wraplinestyletop}></div>
                    <div tagclass="wrapline" style={wraplinestylebottom}></div> */}
                    {
                        this.state.connectsheetname.map((item, index) => 
                            <Box sheetname={item} preconnectnode={this.props.sheetname} order={index} key={index}></Box>
                        )
                    }
                </div>
            </div>
        )
            
    }
}

export default RootBox;