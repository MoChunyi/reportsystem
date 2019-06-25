import React from 'react';
import emitter from './events';
import {Button, Select, Table, Tree,Icon,List} from 'antd'

const OptionTable1 = Select.Option;
const OptionTable2 = Select.Option;
//用来存放选择相等连接的选项号


const connectSql =[
    {
        sheet1Name:'',
        sheet2Name:'',
        type:0,
        equationLefts:[],
        equationRights:[],
    }
]

const spec = {
    drop: () => ({ name: 'Dustbin' }),
}
const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
})

class ConnectionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            connectionForm:props.connectionForm,
            preconnectnode:props.preconnectnode,
            selfnodename:props.selfnodename,
            precNumber:0,
            selfNumber:0,
            range1:[],
            range2:[],
            selectedSheetsName:props.selectedSheets,
            //各个表挂载的表的序号
            connectionSheetsNum:[],
            //每个表在jsondata中的序号
            selectedSheetsJsonNum:[],
            lists:[]
        }
    }

    add=()=>
    {
        const lists=this.state.lists;
        lists.push({"id": lists.length});
        this.setState({lists:lists});

    }

    delete=(data)=>
    {
        const index=data.id
        console.log("要删除的是" + data.id)
            //e.target.getAttribute("data-index");
       /* this.setState(
            {
                range1:this.state.range1.splice(index,1)
            }
        )
        this.setState(
            {
                range2:this.state.range2.splice(index,1)
            }
        )*/
        let lists=this.state.lists;
        lists.splice(index,1);
     /*  for(var i =0; i <lists.length;i++)
        {
            lists[i].id=i;
        }*/
        this.setState({lists:lists})
    }

    handleChangeTable1= (data,value) => {
        console.log(data,value);
        console.log( "表1选择的维度是" + `${value}` );
        console.log("绑定读取的id" + data.id)
       //this.state.range1.push(`${value}`)

        var items =this.state.range1;
        items[data.id]=`${value}`;
        this.setState(
            {
                range1:items
            }
        )


    }

    handleChangeTable2= (data,value) => {
        console.log( "表2选择的维度是" +`${value}` );
        console.log("绑定读取的id" + data.id);

        var items = this.state.range2;
        items[data.id]=`${value}`;
        this.setState(
            {
                range2:items
            }
        )
        //var items =this.state.range2;
       // items[data.id]=`${value}`;

      //  this.state.range2.push(`${value}`)
        //console.log(this.state.connectionForm)
        /*      this.setState({
                  range2: `${value}`,


              })*/

    }


    componentWillMount() {
        for(var i =0;i<this.state.data.sheetsData.length;i++)
            if(this.state.data.sheetsData[i].sheetName ==this.state.preconnectnode )
            {
                this.state.selectedSheetsJsonNum.push(i)
            }

        for(var j =0;j<this.state.data.sheetsData.length;j++)
            if(this.state.data.sheetsData[j].sheetName ==this.state.selfnodename )
            {
                this.state.selectedSheetsJsonNum.push(j)
            }

        console.log("读取到的表的序号是"+ this.state.selectedSheetsJsonNum);
        console.log("读取到的连接方式是" + this.state.connectionForm);

    }
    connectionChange = () => {
        let type;
        switch (this.state.connectionForm) {
            case 'left join': {
                type = 0;
                break;
            }
            case 'right join': {
                type = 1;
                break;
            }
            case 'full join': {
                type = 2;
                break;
            }
            case 'join': {
                type = 3;
                break;
            }
            default:
                return
        }
        for(var i =0; i<connectSql.length;i++)
        {
            var flag=0;
            if (connectSql[i].sheet1Name ==this.state.preconnectnode && connectSql[i].sheet2Name == this.state.selfnodename)
            {
                connectSql[i].equationLefts = this.state.range1;
                connectSql[i].equationRights = this.state.range2;
                break;
            }
            else
            {
                flag++;
            }
            if(flag == connectSql.length)
            {
                connectSql.push(
                    {
                        sheet1Name:this.state.preconnectnode,
                        sheet2Name:this.state.selfnodename,
                        type:type,
                        equationLefts: this.state.range1,
                        equationRights:this.state.range2
                    }
                )
            }
        }

        console.log("emit")
        emitter.emit("sendConnectSql", connectSql)
        emitter.addListener("sendConnectSql", (con) => {
            console.log(con);
        })
    }

    render() {
        function content ()
        {

        }

        return (
            <div  >
                请添加相等的维度 &nbsp;
                <Button icon="plus" onClick={this.add} ></Button>
                {this.state.lists.map( (data)=>

                    {
                        console.log(data);
                        return <List key ={data.id} index ={data.id} id={data.id}>

                            <Select defaultValue="表1的维度选择" style={{width: 150}} onChange={this.handleChangeTable1.bind(this,data)}>
                                {
                                    this.props.data.sheetsData[this.state.selectedSheetsJsonNum[0]].sheetHeader.map((item, index) =>
                                        <OptionTable1 value={item} key={item + index}>
                                            {item}
                                        </OptionTable1>
                                    )
                                }
                            </Select>
                            &nbsp;
                            =
                            &nbsp;

                            <Select defaultValue="表2的维度选择" style={{width: 150}} onChange={this.handleChangeTable2.bind(this,data)}>
                                {

                                    this.props.data.sheetsData[this.state.selectedSheetsJsonNum[1]].sheetHeader.map((item, index) =>
                                        <OptionTable2 value={item} key={item + index}>
                                            {item}
                                        </OptionTable2>
                                    )
                                }
                            </Select>
                            <Button icon ='minus' onClick={this.delete.bind(this,data)} data-index={data.id} style={{ width : '10px'}}> </Button>


                        </List>

                    }
                )
                }



                <div>
                    <Button type="primary" onClick={this.connectionChange}>保存连接</Button>
                </div>
            </div>
        )
    }
}

export default ConnectionSelect;