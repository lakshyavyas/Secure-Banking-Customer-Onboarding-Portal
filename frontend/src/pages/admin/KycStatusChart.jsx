import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { getKycStatusChart } from "../../api/kycService";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function KycStatusChart() {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        loadChart();

    }, []);

    const loadChart = async () => {

        try {

            const response = await getKycStatusChart();

          const labels = response.data.map(item => item.status);

           const values = response.data.map(item => item.count);

            setChartData({

                labels,

                datasets: [
                    {
                        label: "Customers",
                        data: values,
                        backgroundColor: [
                            "#22C55E", // Approved - Green
                            "#F59E0B", // Pending - Orange
                            "#EF4444"  // Rejected - Red
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

        return (
    <div className="chart-card d-flex justify-content-center align-items-center">
        Loading...
    </div>
);

    }

    return (
    <div className="chart-card">

        <h4 className="chart-title">
            KYC Status
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