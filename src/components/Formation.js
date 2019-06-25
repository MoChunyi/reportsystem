import { Layout, Menu, Breadcrumb, Icon ,Button} from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

class Data extends React.Component{
    render(){
        return(
            <div>
                <div>请选择报表格式</div>
                <div style={{ marginTop: "16px" }}>
                    <Button type="primary">自定义</Button>
                </div>
            </div>

        );
    }
}
export default Data;
