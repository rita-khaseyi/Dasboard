import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto'; 

const TargetsPieCharts = () => {
    const [targetsData, setTargetsData] = useState([]);

    useEffect(() => {
        const fetchTargets = async () => {
            try {
                const response = await axios.get('http://localhost:3001/targets');
                setTargetsData(response.data);
            } catch (error) {
                console.error('Error fetching targets:', error);
            }
        };

        fetchTargets();
}, []);

    // Calculate progress towards target for each product
    const calculateProgress = (actual, target) => {
        return Math.round((actual / target) * 100);
    };

    // Prepare chart data for each product
    const prepareChartData = () => {
        const chartData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Example colors
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Example colors
            }],
        };

        targetsData.forEach(target => {
            chartData.labels.push(target.product);
            const progress = calculateProgress(target.actual, target.target);
            chartData.datasets[0].data.push(progress);
        });

        return chartData;
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const dataIndex = tooltipItem.dataIndex;
                        const value = dataset.data[dataIndex];
                        return `progress: ${value}%`;
                    }
                }
            }
        }
    };

    return (
        <div className="card">
            <h2>Progress Towards Targets</h2>
            <Pie data={prepareChartData()} options={options} />
        </div>
    );
};

export default TargetsPieCharts;
