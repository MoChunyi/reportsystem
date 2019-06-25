import React from 'react';
import {Icon} from 'antd';
import $ from 'jquery';
import SqlContext from '../SqlContext';
import ConnectTwoTables from '../ConnectTwoTable';
const boxstyle = {
    marginLeft: '50px',
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
    borderRight: '2px solid',
    zIndex: '1',
    cursor: '-webkit-grab'
}

const wrapstyle = {
    overflow: 'hidden',
    marginLeft: '-2px',
    position: 'relative',
    display: 'inline-block',   
}

const linestyle = {
    display: 'inline-block', 
    position: 'absolute', 
    top: '-1000px', 
    left: '-50px',
    width:'51px', 
    height: '1020px', 
    border: 'solid', 
    borderWidth: '0 0 2px 2px', 
    borderColor: 'black',
    borderBottomLeftRadius: '5px'
}
const optstyle = {
    display: 'inline-block',
    position: 'absolute', 
    zIndex: '1', 
    width: '20px', 
    height: '20px', 
    top: '8px',
    backgroundColor: '#ffff00', 
    left: '-30px', 
    border: '1px solid', 
    borderRadius: '50%', 
    textAlign: 'center'
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

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectsheetname: [],
            sheetname: null,
            preconnectnode: null,
        }
    }

    allowDrag(event) {
        event.preventDefault();
    }
    drop = (event) => {
        event.preventDefault();
        let data=event.dataTransfer.getData("id");
        let el = document.getElementById(data);
        let dropmessage=event.dataTransfer.getData("dropmessage");
        if (dropmessage) {
            if (dropmessage === "move") {
                console.log(event.target.parentNode.getAttribute("id"));
                if (event.target.parentNode.getAttribute("id") != "isbebingDraged") {
                    let box = event.target.parentNode.lastChild;
                    el.setAttribute("preconnectnode", event.target.parentNode.getAttribute("sheetname"));
                    box.appendChild(el);
                }
            } else if (dropmessage === "newadding") {
                let sheetname = el.getAttribute("sheetname");
                let connectsheetname = this.state.connectsheetname;
                connectsheetname.push(sheetname);
                this.setState({
                    connectsheetname: connectsheetname
                })
                console.log(connectsheetname)
            }
        }
    }

    drag = (event) => {
        console.log(event.target);
        let parent = event.target.parentNode;
        let firstChild = event.target.firstChild;
        console.log(firstChild);
        firstChild.style.top = '0';
        firstChild.style.height = '0';
        firstChild.style.width = '0'
        console.log(parent);
        parent.setAttribute("id", "isbebingDraged");
        event.dataTransfer.setData("id",parent.id);
        event.dataTransfer.setData("dropmessage","move");
    }
    dragend = (event) => {
        let parent = event.target.parentNode;
        let firstChild = event.target.firstChild;
        console.log(firstChild);
        firstChild.style.top = '-1000px';
        firstChild.style.height = '1020px';
        firstChild.style.width = '51px'
        parent.removeAttribute("id");
    }

    show = (event) => {
        let node = event.target.parentNode.parentNode
        console.log(this.props.sheetname, this.props.preconnectnode);
        
    }

    render() {
        
        return (
            <div tagclass='box' style={boxstyle} sheetname={this.props.sheetname} preconnectnode={this.props.preconnectnode} >
                <div tagclass="item" style={itemstyle} draggable={"true"} onDragStart={this.drag} onDragEnd={this.dragend} onDragOver={this.allowDrag} onDrop={this.drop}>
                    <div tagclass="line" style={Object.assign({},linestyle,)}></div>
                    <span tagclass="opt" style={optstyle} onClick={this.show}>
                        <ConnectTwoTables selfnodename={this.props.sheetname} preconnectnode={this.props.preconnectnode}></ConnectTwoTables>
                    </span>
                    <div style={{height: '38px', lineHeight: '38px', display: 'inline-block', pointerEvents: 'none'}}>
                        {this.props.sheetname}
                    </div>
                    
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
export default Box;