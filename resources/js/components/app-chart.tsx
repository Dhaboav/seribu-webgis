import ApexCharts from 'apexcharts';
import React, { useEffect, useRef } from 'react';

interface ChartDataItem {
    time: string;
    height: number;
}

interface UserStatsCardProps {
    data: ChartDataItem[];
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Ambil maksimal 8 data terakhir
        const limitedData = data.slice(-8);

        const categories = limitedData.map((item) => item.time);
        const seriesData = limitedData.map((item) => parseFloat(item.height as unknown as string));

        const chartOptions = {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Inter, sans-serif',
                toolbar: { show: false },
                zoom: {
                    enabled: false, // Nonaktifkan zoom
                },
            },
            series: [
                {
                    name: 'Ketinggian Air',
                    data: seriesData,
                    color: '#2F5BFD',
                },
            ],
            xaxis: {
                categories,
                labels: {
                    show: true,
                    style: {
                        colors: '#fff', // label x putih
                    },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
                crosshairs: {
                    show: true,
                    stroke: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        width: 2,
                        dashArray: 6,
                    },
                },
                tooltip: { enabled: false },
            },
            yaxis: { show: false },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: '#a24bb8',
                    gradientToColors: ['#a24bb8'],
                },
            },
            dataLabels: { enabled: false },
            stroke: { width: 6 },
            grid: { show: false },
            markers: {
                size: 0, // hilangkan titik hover
            },
            tooltip: {
                enabled: true,
                shared: false,
                custom: function ({ series, seriesIndex, dataPointIndex }: any) {
                    const val = series[seriesIndex][dataPointIndex];
                    return `
            <div style="background:#333;padding:6px 10px;border-radius:4px;color:white;font-size:13px;">
              Ketinggian: ${val} cm
            </div>`;
                },
            },
        };

        if (chartRef.current) {
            const chart = new ApexCharts(chartRef.current, chartOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [data]);

    return (
        <div className="h-full w-full max-w-lg rounded-lg bg-gray-400 p-4 shadow-sm md:p-6">
            <div className="w-full">
                <div ref={chartRef} className="h-full w-full" />
            </div>
        </div>
    );
};

export default UserStatsCard;
