import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
// import {
//   chartExample1,
//   chartExample2,
//   chartExample3,
//   chartExample4
// } from "../variables/charts";


class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{}
        }
    }

    componentDidMount() {
        axios.get('http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats')
            .then(response => {
                console.log(response.data);
                let map = response.data;
                let labels = [];
                let series = [];
                for (const key in map) {
                    let newKey = key.substring(0, key.length - 5);
                    labels.push(newKey);
                    series.push(map[key]);
                }
                this.setState({ chartData: {labels: labels, datasets: [{ label: 'submission', data: series,
                backgroundColor: '#FFDF00',
                borderWidth: 1.0,
                hoverBackgroundColor: "aqua",
                hoverBorderColor: "#e44cc4",
                borderColor: "mediumspringgreen",
                scaleStepWidth: 1 }]
               }})
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                });
    }



    render() {
        return (
            <div className="chart">
                <Bar
                data={this.state.chartData}
                options={{ maintainAspectRatio: false }}
                height={245}
                />
            </div>
        )
    }
}

export default BarChart;
