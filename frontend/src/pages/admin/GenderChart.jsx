import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { getGenderChart } from "../../api/customerService";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function GenderChart() {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        loadChart();

    }, []);

    const loadChart = async () => {

        try {

            const response = await getGenderChart();

            const labels = response.data.map(item => item.gender);

            const values = response.data.map(item => item.count);

            setChartData({

                labels,

                datasets: [
                    {
                        label: "Customers",
                        data: values,
                        backgroundColor: [
                            "#2563EB", // Male
                            "#EC4899", // Female
                            "#A855F7"  // Other
                        ],

                        borderColor: "#FFFFFF",
                        borderWidth: 3,
                        hoverOffset: 12
                    }
                ]

            });

        } catch (error) {

            console.error(error);

        }

    };

    if (!chartData) {

        if (!chartData) {

    return (
        <div className="chart-card d-flex justify-content-center align-items-center">
            Loading...
        </div>
    );

}

    }

    return (
    <div className="chart-card">

        <h4 className="chart-title">
            Gender Distribution
        </h4>

        <Pie
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            }}
        />

    </div>
);

}