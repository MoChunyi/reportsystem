import React from 'react';
import { Table} from 'antd'
import emitter from './events';
import Button from "antd/es/button";

export default class DataModelTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            tableDataSource: [],
            tableColumn: [],
        }
    }

    componentWillMount() {
        console.log("datatable");
        console.log(this.state.data);
        let sheet2Data = this.state.data.sheetsData[1].data;
        let sheet2Header = this.state.data.sheetsData[1].sheetHeader;
        let tableColumn = [];
        sheet2Header.forEach(element => {
            let col = {
                title: element,
                dataIndex: element,
                key: element,
            }
            tableColumn.push(col);
        });
        this.setState({
            tableDataSource: sheet2Data,
            tableColumn: tableColumn
        })


    }
    componentDidMount() {

    }

    
    render() {
        return(
            <div>
                <Table bordered scroll={{ x: 1300 }} dataSource={this.state.tableDataSource} columns={this.state.tableColumn} />
            </div>
        )
    }
}