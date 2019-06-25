import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'antd/dist/antd.css';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import  BarChart from './BarChart';
import  LineChart from './LineChart';
import  PieChart from './PieChart';
import  RadarChart from './RaderChart';
import $ from 'jquery';


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            xheader:props.xheader,
            yheader: props.yheader,
            xnumber: [],
            ynumber: [],
            title:'',
            xname:'',
            yname:'',
            xdata:[],
            ydata:[],

        }
    }

    //在渲染前获取信息
    componentDidMount() {
        //使用ajax读取本地json文件
        console.log("xheader:" + this.state.xheader);
        console.log("yheader:" + this.state.yheader);
        $.ajax({
            url: "../ForEcharts.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                var  count=0;
                var newArray =[];
                var yDataArray=[];
                var yNameArray=[];
               // console.log("data",data);
                this.setState({data: data}, () => {
                    // console.log("xheader"+ this.state.xheader);
                    //  console.log("yheader"+ this.state.yheader);
                    var headers = this.state.data.sheetsData[1].sheetHeader;
                    //  console.log(headers)
                    for (var i = 0; i < headers.length; i++) {
                        if (headers[i] == this.state.xheader) {
                            console.log("xnumber:" + i);
                            this.setState({
                                xnumber: i
                            })

                        }
                    }

                    for (var k = 0; k < this.state.yheader.length; k++) {


                        for (var j = 0; j < headers.length; j++) {
                            if (headers[j] == this.state.yheader[k]) {
                                console.log("ynumber=" + j);
                                console.log(j);
                                newArray[count]=j;
                                count= count+1;
                            }

                        }
                    }
                    this.setState({
                        ynumber:newArray
                    })

                });

                for(var n=0;n <this.state.ynumber.length; n++)
                {
                    yDataArray.push(this.state.data.sheetsData[3].data[this.state.ynumber[n]]);
                    yNameArray.push(this.state.data.sheetsData[3].sheetHeader[this.state.ynumber[n]])
                }
                // 改变内存中的state
                this.setState({

                    title: this.state.data.sheetsData[3].sheetName,
                    xname: this.state.data.sheetsData[3].sheetHeader[this.state.xnumber],
                    yname: yNameArray,
                        //this.state.data.sheetsData[3].sheetHeader[this.state.ynumber],
                    xdata: this.state.data.sheetsData[3].data[this.state.xnumber],
                    ydata: yDataArray,
                        //this.state.data.sheetsData[3].data[this.state.ynumber],
                    show:true
                })

            }.bind(this),

            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        //相关设置
    }

     componentWillReceiveProps() {
         //使用ajax读取本地json文件
         console.log("xheader:" + this.state.xheader);
         console.log("yheader:" + this.state.yheader);
         $.ajax({
             url: "../test.json",
             dataType: 'json',
             cache: false,
             success: function (data) {
                 var  count=0;
                 var newArray =[];
                 var yDataArray=[];
                 var yNameArray=[];
                 // console.log("data",data);
                 this.setState({data: data}, () => {
                     // console.log("xheader"+ this.state.xheader);
                     //  console.log("yheader"+ this.state.yheader);
                     var headers = this.state.data.sheetsData[1].sheetHeader;
                     //  console.log(headers)
                     for (var i = 0; i < headers.length; i++) {
                         if (headers[i] == this.state.xheader) {
                             console.log("xnumber:" + i);
                             this.setState({
                                 xnumber: i
                             })

                         }
                     }

                     for (var k = 0; k < this.state.yheader.length; k++) {


                         for (var j = 0; j < headers.length; j++) {
                             if (headers[j] == this.state.yheader[k]) {
                                 console.log("ynumber=" + j);
                                 console.log(j);
                                 newArray[count]=j;
                                 count= count+1;
                             }

                         }
                     }
                     this.setState({
                         ynumber:newArray
                     })

                 });

                 for(var n=0;n <this.state.ynumber.length; n++)
                 {
                     yDataArray.push(this.state.data.sheetsData[3].data[this.state.ynumber[n]]);
                     yNameArray.push(this.state.data.sheetsData[3].sheetHeader[this.state.ynumber[n]])
                 }
                 // 改变内存中的state
                 this.setState({

                     title: this.state.data.sheetsData[3].sheetName,
                     xname: this.state.data.sheetsData[3].sheetHeader[this.state.xnumber],
                     yname: yNameArray,
                     //this.state.data.sheetsData[3].sheetHeader[this.state.ynumber],
                     xdata: this.state.data.sheetsData[3].data[this.state.xnumber],
                     ydata: yDataArray,
                     //this.state.data.sheetsData[3].data[this.state.ynumber],
                     show:true
                 })

             }.bind(this),

             error: function (xhr, status, err) {
                 console.error(this.props.url, status, err.toString());
             }.bind(this)
         });

         //相关设置
     }


    render()
        {

            return (
                <div>
                    { this.state.show == true &&   <BarChart data={
                        {
                            title:this.state.title,
                            xname: this.state.xname,
                            yname: this.state.yname,
                            xdata:this.state.xdata,
                            ydata:this.state.ydata,

                        }
                    }/> }
                </div>
            )
        }

}
export default Table;

