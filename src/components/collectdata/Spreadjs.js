import React, {Component} from 'react';
import GC from '@grapecity/spread-sheets';
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import * as spreadExcel from '@grapecity/spread-excelio';
import { Button,message} from 'antd';
import saveAs from 'file-saver';

class Spreadjs extends Component {
    constructor(props) {
        super(props);
        this.spreadBackColor = 'aliceblue';
        this.sheetName = 'Goods List';
        this.hostStyle = {
            width: '1000px',
            height: '600px'
        };
        this.state = {
            dataSource: props.dataSource,
            state: null
        }

    }
    componentDidMount() {
        this.props.onRef(this);
        var spread = new GC.Spread.Sheets.Workbook(document.getElementById("workbook"), {sheetCount: 1});

        this.setState({
            spread: spread,
        });
    }
    binaryDecode = function (data) {
        var ret = '';
        if (data) {
            var byteArray = new Uint8Array(data);
            for (var i = 0; i < data.byteLength; i++) {
                ret = ret + String.fromCharCode(byteArray[i]);
            }
        }
        return ret;
    };
    handleData = ()=> {

        if(this.props.dataSource.length < 1) {
            message.info("请上传文件");
        } else {
            var excelFile = this.props.dataSource[0].originFileObj;
            console.log(Object.prototype.toString.call(excelFile));
            console.log(excelFile);
            let excelIO = new spreadExcel.IO();
            excelIO.open(excelFile, (json) => {
                this.state.spread.fromJSON(json);
                this.props.changeSaveBtnVisiable();
            }, (e) => {
                console.log(e);
            });
        }
    }

    showCount = () => {
        // alert(this.state.spread.getSheetCount());
        // console.log(this.state.spread);
        // alert(this.state.spread.getSheet(1).getValue(0,0))
    }

    autoFix = () => {
        var sheetNum = this.state.spread.getSheetCount();
        for (var i = 0; i < sheetNum; i++) {
            var sheet = this.state.spread.getSheet(i);
            sheet.autoFitColumn();
            sheet.autoFitRow();
        }
    }


    render() {
        return (
            <div id="dadaTable">
                <div id="workbook" style={{width:'1200px', height:'600px',}}/>

                <div>
                    <Button type="primary" onClick={this.showCount}>Counts</Button>
                    <Button onClick={this.autoFix}>自适应</Button>
                </div>
            </div>
        )
    }
}

export default Spreadjs
