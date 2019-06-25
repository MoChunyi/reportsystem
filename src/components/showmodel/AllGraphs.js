import React from 'react';
import {Button} from 'antd';
import { deflate } from 'zlib';
import GraphItem from '../../containers/GraphItem';

const AllCavas = () => {
    return (
        <div>
            <GraphItem graphitemtype="bar"></GraphItem>
            <GraphItem graphitemtype="pie"></GraphItem>
            <GraphItem graphitemtype="linechart"></GraphItem>
        </div>
    )
}

export default AllCavas;