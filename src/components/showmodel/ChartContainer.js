import React, {useState} from 'react';
import {connect} from 'react-redux';
import actions from '../../actions/XYdatasActions';
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles(theme => ({
    dragDiv: {
        cursor: 'move',
        width: '100%',
        height: '100%',
        backgroundColor: '#90a4ae',
        display: 'inline-block',
        
    },
    dragDivContainer: {
        position: 'absolute',
        width: '300px',
        height: '300px',
        padding: '8px',
        resize: 'both',
        backgroundColor: '#90a4ae',
        overflow: 'hidden'
    },
    spanline: {
        position: 'absolute',
        display: 'inline-block',
        width: '500px',
        height: '2px',
        left: '-50px',
        top: '0px',
        borderBottom: '3px dotted black'

    }
}))

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeCurrentGraphItem: function() {
        console.log("hhh")
        dispatch(actions.changeCurrentGraphItem(ownProps.id))
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "", true);
        xhr.onloadend = function() {

        }
    }
})

const ChartContainer = (props) => {
    const classes = useStyles();
    const sliderCount = props.slidercount
    var draggedObj_X;
    var draggedObj_Y;
    var mouse_X;
    var mouse_Y;
    // 从子节点node 获取父元素下的所有可以拖动的elements的坐标信息
    const getAllDragElementsXYInfos = (node) => {
        if (node === null) {
            return;
        }
        let pElement = node.parentElement;
        if (pElement === null) {
           return; 
        }

        let childElements = pElement.children;
        let childElementsXYInfo = [];
        for (let i = 0; i < childElements.length; i++) {
            let element = childElements[i];
            childElementsXYInfo.push(getElementXYInfo(element));
            
        }
        return childElementsXYInfo;
    }
    //获取单个元素的坐标信息
    const getElementXYInfo = (element) => {
        let ID = element.id;
        let cWidth = element.clientWidth;
        let cHeight = element.clientHeight;

        let LTX = element.offsetLeft;
        let LTY = element.offsetTop;

        let RTX = LTX + cWidth;
        let RTY = LTY;

        let LBX = LTX;
        let LBY = LTY + cHeight;

        let RBX = RTX;
        let RBY = LBY;

        let CCX = (LTX + RTX) / 2;
        let CCY = (LTY + LBY) / 2;
        return {ID, LTX, LTY, RTX, RTY, LBX, LBY, RBX, RBY, CCX, CCY};
    }

    const detectParallel = (curEle, curMovingEleXYInfo, allElesXYInfos, threshold) => {''
        //移除相同的点
        let otherElesXYInfos;
        if (Object.prototype.toString.call(allElesXYInfos) === "[object Array]") {
            otherElesXYInfos = allElesXYInfos.filter(item => item.ID !== curMovingEleXYInfo.ID)
        }
        // console.log("curMovingEleXYInfo", curMovingEleXYInfo)
        // console.log("otherElesXYInfos", otherElesXYInfos);

        //水平移动检测
        let compateX = [curMovingEleXYInfo.LTX, curMovingEleXYInfo.CCX, curMovingEleXYInfo.RTX];
        for (let i = 0; i < compateX.length; i++) {
            let allParallel = [];
            for (let j = 0; j < otherElesXYInfos.length; j++) {
                let otherEle = otherElesXYInfos[j];
                if (Math.abs(otherEle.LTX - compateX[i]) < threshold) {
                    allParallel.push({X: otherEle.LTX, length: (otherEle.LTY - curMovingEleXYInfo.LTY) < 0 ? (otherEle.LTY - curMovingEleXYInfo.LTY) : (otherEle.LBY - curMovingEleXYInfo.LBY)});console.log("L");
                } else if (Math.abs(otherEle.CCX - compateX[i]) < threshold) {
                    allParallel.push({X: otherEle.CCX, length: (otherEle.LTY - curMovingEleXYInfo.LTY) < 0 ? (otherEle.LTY - curMovingEleXYInfo.LTY) : (otherEle.LBY - curMovingEleXYInfo.LBY)});console.log("C");
                } else if (Math.abs(otherEle.RTX - compateX[i]) < threshold) {
                    allParallel.push({X: otherEle.RTX, length: (otherEle.LTY - curMovingEleXYInfo.LTY) < 0 ? (otherEle.LTY - curMovingEleXYInfo.LTY) : (otherEle.LBY - curMovingEleXYInfo.LBY)});console.log("R");
                }
            }
            let lengths = allParallel.map(item => item.length);
            if (lengths.length > 0) {
                let maxLength = Math.max.apply(null, lengths);
                let minLength = Math.min.apply(null, lengths);
                switch(i) {
                    case 0: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateXSpanline(0, -minLength, 0, curEle.clientWidth, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateXSpanline(0, -minLength, maxLength, curEle.clientWidth, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateXSpanline(0, 0, maxLength, curEle.clientWidth, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='leftspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        // console.log("maxLength", maxLength);
                        // console.log("minLength", minLength);
                        // console.log("X", allParallel[0].X);
                        curEle.style.left = allParallel[0].X + "px";
                        break;
                    }
                    case 1: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateXSpanline(curEle.clientWidth/2, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateXSpanline(curEle.clientWidth/2, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateXSpanline(curEle.clientWidth/2, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='centerXspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        //console.log("maxLength", maxLength);
                        //console.log("minLength", minLength);
                        //console.log("X", allParallel[0].X);
                        curEle.style.left = allParallel[0].X - curEle.clientWidth/2 + "px";
                        break;
                    }
                    case 2: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateXSpanline(curEle.clientWidth, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateXSpanline(curEle.clientWidth, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateXSpanline(curEle.clientWidth, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='rightspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }                       
                        //console.log("maxLength", maxLength);
                        //console.log("minLength", minLength);
                        //console.log("X", allParallel[0].X);
                        curEle.style.left = allParallel[0].X - curEle.clientWidth + "px";
                        break;
                    }
                    default: {
                        break;
                    }
                }    
            } else {
                switch(i) {
                    case 0: {
                        let sl = curEle.querySelector("[spanlinesymbolid='leftspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }                       
                        break;
                    }
                    case 1: {
                        let sl = curEle.querySelector("[spanlinesymbolid='centerXspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }
                        
                        break;
                    }
                    case 2: {
                        let sl = curEle.querySelector("[spanlinesymbolid='rightspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }    
                        break;
                    }
                    default: {
                        break;
                    }
                } 
            }
            
        }
        //垂直移动检测
        let compateY = [curMovingEleXYInfo.LTY, curMovingEleXYInfo.CCY, curMovingEleXYInfo.LBY];
        for (let i = 0; i < compateY.length; i++) {
            let allParallel = [];
            for (let j = 0; j < otherElesXYInfos.length; j++) {
                let otherEle = otherElesXYInfos[j];
                if (Math.abs(otherEle.LTY - compateY[i]) < threshold) {
                    allParallel.push({Y: otherEle.LTY, length: (otherEle.LTX - curMovingEleXYInfo.LTX) < 0 ? (otherEle.LTX - curMovingEleXYInfo.LTX):(otherEle.RTX - curMovingEleXYInfo.RTX)})
                } else if (Math.abs(otherEle.CCY - compateY[i]) < threshold) {
                    //console.log("center", otherEle.CCY, compateY[i]);
                    allParallel.push({Y: otherEle.CCY, length: (otherEle.LTX - curMovingEleXYInfo.LTX) < 0 ? (otherEle.LTX - curMovingEleXYInfo.LTX):(otherEle.RTX - curMovingEleXYInfo.RTX)})
                } else if (Math.abs(otherEle.LBY - compateY[i]) < threshold) {
                    allParallel.push({Y: otherEle.LBY, length: (otherEle.LTX - curMovingEleXYInfo.LTX) < 0 ? (otherEle.LTX - curMovingEleXYInfo.LTX):(otherEle.RTX - curMovingEleXYInfo.RTX)})
                }
            }
            let lengths = allParallel.map(item => item.length);
            //console.log("allParallel", allParallel);
            if (lengths.length > 0) {
                let maxLength = Math.max.apply(null, lengths);
                let minLength = Math.min.apply(null, lengths);
                switch(i) {
                    case 0: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateYSpanline(0, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateYSpanline(0, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateYSpanline(0, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='topspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        //console.log("maxLength", maxLength);
                        //console.log("minLength", minLength);
                        //console.log("0Y", allParallel[0].Y);
                        curEle.style.top = allParallel[0].Y + "px";
                        break;
                    }
                    case 1: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateYSpanline(curEle.clientHeight/2, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateYSpanline(curEle.clientHeight/2, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateYSpanline(curEle.clientHeight/2, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='centerYspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        //console.log("maxLength", maxLength);
                        //console.log("minLength", minLength);
                        //console.log("1Y", allParallel[0].Y);
                        curEle.style.top = allParallel[0].Y - curEle.clientHeight/2 + "px";
                        break;
                    }
                    case 2: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateYSpanline(curEle.clientHeight, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateYSpanline(curEle.clientHeight, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateYSpanline(curEle.clientHeight, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='bottomspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }                       
                        //console.log("maxLength", maxLength);
                        //console.log("minLength", minLength);
                        //console.log("2Y", allParallel[0].Y);
                        curEle.style.top = allParallel[0].Y - curEle.clientHeight + "px";
                        break;
                    }
                    default: {
                        break;
                    }
                }    
            } else {
                switch(i) {
                    case 0: {
                        let sl = curEle.querySelector("[spanlinesymbolid='topspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }                       
                        break;
                    }
                    case 1: {
                        let sl = curEle.querySelector("[spanlinesymbolid='centerYspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }
                        
                        break;
                    }
                    case 2: {
                        let sl = curEle.querySelector("[spanlinesymbolid='bottomspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }    
                        break;
                    }
                    default: {
                        break;
                    }
                } 
            }
        }
    }

    const generateXSpanline = (left, length1, length2, nodeWidth, nodeHeight) => {
        let spanlinesymbolid = "leftspanline";
        if (left === nodeWidth/2) spanlinesymbolid="centerXspanline";
        if (left === nodeWidth) spanlinesymbolid="rightspanline";
        let spanline = document.createElement("span");
        spanline.setAttribute("spanlinesymbolid", spanlinesymbolid)
        let csstext = `position: absolute; top: -${length1 + 10}px; height: ${length1 + length2 + nodeHeight + 20}px;`
        + `left: ${left}px; border-left: 5px dotted black; pointer-events: none`;
       
        spanline.style.cssText = csstext; 
        return spanline;
    }
    const generateYSpanline = (top, length1, length2, nodeWidth, nodeHeight) => {
        let spanlinesymbolid = "topspanline";
        if (top === nodeHeight/2) spanlinesymbolid="centerYspanline";
        if (top === nodeHeight) spanlinesymbolid="bottomspanline";
        let spanline = document.createElement("span");
        spanline.setAttribute("spanlinesymbolid", spanlinesymbolid)
        let csstext = `position: absolute; left: -${length1 + 10}px; width: ${length1 + length2 + nodeWidth + 20}px;`
        + `top: ${top}px; border-top: 5px dotted black; pointer-events: none`;
        
        spanline.style.cssText = csstext; 
        return spanline;
    }

    const mousedown = (event) => {
        draggedObj_X = event.target.parentElement.offsetLeft;
        draggedObj_Y = event.target.parentElement.offsetTop;
        mouse_X = event.clientX;
        mouse_Y = event.clientY;
        event.target.parentElement.isdraggable = "true";
        event.target.parentElement.style.zIndex = "1";
        event.target.parentElement.style.overflow="visible";
        console.log("mousedown")
    }
    const mouseup = (event) => {
        console.log("mouseup", event.target);
        event.target.parentElement.isdraggable = "false";
        event.target.parentElement.style.zIndex = "0";
        event.target.parentElement.style.overflow="hidden";
        let spanlines = event.target.parentElement.querySelectorAll("[spanlinesymbolid]");
        if (spanlines !== null) {
            for (let i = 0; i < spanlines.length; i++) {
                spanlines[i].remove();
            }
        }
        event.target = null;
    }
    const move = (event) => {   
        if (event.target.parentElement.isdraggable === "true") {
            console.log("move", event.target);
            let mx = event.clientX;
            let my = event.clientY;
            let x = (mx - mouse_X) * 1/sliderCount;
            let y = (my - mouse_Y) * 1/sliderCount;
            let curX;
            let curY;
            if (0 < (draggedObj_X + x) && (draggedObj_X + x) < event.target.parentElement.parentNode.clientWidth - event.target.parentElement.clientWidth) {
                curX = draggedObj_X + x;
            } else if ((draggedObj_X + x) > event.target.parentElement.parentNode.clientWidth - event.target.parentElement.clientWidth) {
                curX = event.target.parentElement.parentNode.clientWidth - event.target.parentElement.clientWidth;
                
            } else if ((draggedObj_X + x) < 0) {
                curX = 0;
            }
            if (0 < (draggedObj_Y + y) && (draggedObj_Y + y) < event.target.parentElement.parentNode.clientHeight - event.target.parentElement.clientHeight) {
                curY = draggedObj_Y + y;
            } else if ((draggedObj_Y + y) > event.target.parentElement.parentNode.clientHeight - event.target.parentElement.clientHeight) {
                curY = event.target.parentElement.parentNode.clientHeight - event.target.parentElement.clientHeight;
                
            } else if ((draggedObj_Y + y) < 0) {
                curY = 0;
            }      
            
            event.target.parentElement.style.left = (curX) + 'px';
            event.target.parentElement.style.top = (curY) + 'px';

            let eleXYInfo = getElementXYInfo(event.target.parentElement);
            let elesXYInfos = getAllDragElementsXYInfos(event.target.parentElement);
            detectParallel(event.target.parentElement, eleXYInfo, elesXYInfos, 10)
        }
        
    }

    const mouseout = (event) => {
        event.target.parentElement.isdraggable = "false";
        event.target.parentElement.style.zIndex = "0";
        event.target.parentElement.style.overflow="hidden";
        let spanlines = event.target.parentElement.querySelectorAll("[spanlinesymbolid]");
        if (spanlines !== null) {
            for (let i = 0; i < spanlines.length; i++) {
                spanlines[i].remove();
            }
        }
        console.log("mouseout");
        event.target = null;
    }

    return (
        <div id = {props.id} className={classes.dragDivContainer}>
            <div          
            className={classes.dragDiv} 
            onMouseDown={(event) => mousedown(event)}
            onMouseUp={(event) => mouseup(event)}
            onMouseMove={
                (event) => move(event)   
            }
            onMouseOut={(event) => mouseout(event)}
            onClick={props.changeCurrentGraphItem}
            style={{backgroundColor: '#ce93d8', }}
            >
            </div>
        </div>
        
    )

}

export default  connect(null, mapDispatchToProps)(ChartContainer);