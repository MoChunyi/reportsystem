import React from 'react';

const containerStyle = {
    height: '400px',
    width: '800px',
    backgroundColor: 'white',
    border: '1px solid black'
}

const boxstyle = {
    marginLeft: '50px',
   
    
}

const itemstyle = {
    width: '218px',
    height: '38px',
    position: 'relative',
    display: 'inline-block',
    border: '1px solid #0fdedd',
    borderRadius: '2px',
    backgroundColor: 'red',
    verticalAlign: 'top',
    textAlign: 'center',
}

const wrapstyle = {
    overflow: 'hidden',
    marginLeft: '-4px',
    position: 'relative',
    display: 'inline-block',
    border: '1px dotted black'    
}

const linestyle = {
    display: 'inline-block', 
    position: 'absolute', 
    top: '19px', 
    left: '-50px',
    width:'50px', 
    height: '2px', 
    border: 'solid', 
    borderWidth: '0 0 1px 1px', 
}

const linestyle2 = {
    display: 'inline-block', 
    position: 'absolute', 
    top: '-20px', 
    left: '-40px',
    width:'40px', 
    height: '40px', 
    border: 'solid', 
    borderWidth: '0 0 1px 1px', 
}
const optstyle = {
    display: 'inline-block',
    position: 'absolute', 
    zIndex: '1', 
    width: '20px', 
    height: '20px', 
    top: '10px',
    backgroundColor: '#ffff00', 
    left: '-30px', 
    border: '1px solid', 
    borderRadius: '50%', 
    textAlign: 'center'
}

const Box = function() {
    return (
        <div  style={boxstyle}>
            <Item></Item>
            <Wrap></Wrap>
        </div>
    )
}

const Item = function() {
    return (
        <div  style={itemstyle}>
            <div  style={linestyle}></div> 
            <span  style={optstyle}>+</span> 
            2
        </div>
    )
}

function Wrap() {
    return (
        <div style={wrapstyle}>
            <Box>
                <Item>

                </Item>
            </Box>
        </div>
    )
}

export default Wrap;