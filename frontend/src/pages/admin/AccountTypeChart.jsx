import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { getAccountTypeChart } from "../../api/employeeAccountService";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function AccountTypeChart() {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        loadChart();

    }, []);

    const loadChart = async () => {

        try {

            const response = await getAccountTypeChart();

            const labels =response.data.map(item => item.accountType);

            const values = response.data.map(item => item.count);

            setChartData({

                labels,

                datasets: [
                    {
                        label: "Customers",
                        data: values,
                        backgroundColor: [
                            "#0F4C81", // Savings
                            "#3B82F6", // Current
                            "#60A5FA"  // Salary
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
            Account Types
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