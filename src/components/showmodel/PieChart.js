import { Layout, Menu, Breadcrumb, Icon ,Button} from 'antd';
import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'antd/dist/antd.css';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';



class PieChart extends React.Component {

    componentDidMount() {

        // 初始化
        var myChart = echarts.init(document.getElementById('main'));

        var seriesArray=[];
        for (var i=0; i<this.props.data.ydata.length;i++)
        {
            var object ={
                name: this.props.data.yname[i],
                type: 'pie',
                data:this.props.data.ydata[i],
                radius : '55%',
                center: ['40%', '50%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            seriesArray.push(object);
        }

        myChart.setOption({

            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {
                        show: true,
                        type: 'jpg'
                    }
                }
            },

            series:seriesArray,

        });
        window.onresize = myChart.resize;}

    componentWillReceiveProps() {
        // 初始化
        var myChart = echarts.init(document.getElementById('main'));

        var seriesArray=[];
        for (var i=0; i<this.props.data.ydata.length;i++)
        {
            var object ={
                name: this.props.data.yname[i],
                type: 'pie',
                data:this.props.data.ydata[i],
                radius : '55%',
                center: ['40%', '50%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            seriesArray.push(object);
        }

        myChart.setOption({

            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {
                        show: true,
                        type: 'jpg'
                    }
                }
            },

            series:seriesArray,

        });
        window.onresize = myChart.resize;

    }


    render() {
        return (


            <div>
                读取到的title
                {/* {this.props.data.ydata[0]}*/}
                <div id="main" style={{ width: '80%', height: 500 }}>

                </div>
            </div>
        );
    }
}
export default PieChart;