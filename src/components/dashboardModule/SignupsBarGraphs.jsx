import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './bars.css';

const SignupsBarGraphs = () => {
    const data = {
        labels: ['Primary', 'Secondary', 'IGCSE'],
        datasets: [
            {
                label: 'Zeraki Analytics',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [25, 30, 20], // Example data (number of sign-ups)
            },
            {
                label: 'Zeraki Finance',
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54,162,235,0.4)',
                hoverBorderColor: 'rgba(54,162,235,1)',
                data: [20, 15, 10], // Example data (number of sign-ups)
            },
            {
                label: 'Zeraki Timetable',
                backgroundColor: 'rgba(255,206,86,0.2)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,206,86,0.4)',
                hoverBorderColor: 'rgba(255,206,86,1)',
                data: [15, 20, 25], // Example data (number of sign-ups)
            },
        ],
    };

    const options = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div className="signups-card">
            <h3>Signups Overview</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default SignupsBarGraphs;
