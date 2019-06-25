import React from 'react';
import { Button, Tree } from 'antd';

const { TreeNode } = Tree;

export default class SheetHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sheetInfo: props.sheetInfo
        }
    }

    printSheetInfo = () => {
        console.log(this.state.sheetInfo);
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    

    render() {
        return(
            <div>
                {
                    <Tree>{
                        this.state.sheetInfo.sheetsData.map((item, index) => 
                            <TreeNode title={item.sheetName} key={index}>
                                {
                                    item.sheetHeader.map((el, ind) => 
                                        <TreeNode title={el} key={ind}></TreeNode>
                                    )
                                }
                            </TreeNode>
                        )
                    }</Tree>                    
                }
            </div>
        )
    }
}