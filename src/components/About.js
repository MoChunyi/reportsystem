import React from 'react';
import { Layout, Menu, Breadcrumb, Button} from 'antd';



class About extends React.Component{
    constructor(props){ //组件初始化函数，一调用组件就自动执行
        super(props);
        this.state={ //定义state来存放数据
            list:[

            ],
            reactid:0,//此参数主要是解决key的报错问题而定义
            inputValue:''
        }
    }
    handleInputValue(e){
        this.setState({
            inputValue:e.target.value
        })
    }

    handleBtnClick(){
        this.setState({
            list:[...this.state.list,this.state.inputValue],
            inputValue:''
        });
    }
    getValue=()=>{
        alert(this.state.inputValue);
}




    render(){
        let listResult = this.state.list.map(function (value,key){
            return <li key={key}>{value}</li>
        });

        return(
            <div>
                <div>This is About!</div>
                <input value={this.state.inputValue} onChange={this.handleInputValue.bind(this)}/>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type="primary" onClick={this.getValue}>获取输入数据</Button>
                &nbsp; &nbsp;
                <Button type="primary" onClick={this.handleBtnClick.bind(this)}>添加</Button>

                <div>
                    <ol>
                        {listResult}
                    </ol>

                    </div>
            </div>
        );
    }
}


export default About;
