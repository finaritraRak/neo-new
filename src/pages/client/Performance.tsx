import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const Performance: React.FC = () => {
  const site = {
    name: '6ha',
    location: 'Antananarivo',
    capacity: 150,
    productionToday: 120,
    productionYesterday: 140,
    batteryLevel: 58,
    currentSource: 'PV',
  };

  const productionLine = {
    labels: ['00h', '06h', '12h', '18h', '24h'],
    datasets: [
      {
        label: 'Production (kWh)',
        data: [0, 25, 60, 30, 5],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Consommation (kWh)',
        data: [10, 20, 50, 40, 20],
        borderColor: '#EA580C',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const productionBar = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Production (kWh)',
        data: [115, 130, 120, 110, 140, 135, 125],
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const energySourcePie = {
    labels: ['Solaire', 'Batterie', 'Réseau'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#59BDC1', '#10B981', '#EF4444'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Performances énergétiques – {site.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Production aujourd’hui</h2>
          <p className="text-xl text-blue-600 font-bold">{site.productionToday} kWh</p>
          <p className="text-xs text-gray-500">
            Hier : {site.productionYesterday} kWh (
            {Math.round(((site.productionToday - site.productionYesterday) / site.productionYesterday) * 100)}%)
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">État de la batterie</h2>
          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="h-3 rounded bg-green-500"
              style={{ width: `${site.batteryLevel}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{site.batteryLevel}% SOC</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Source actuelle</h2>
          <p className="text-base text-gray-800">🔋 {site.currentSource}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
          <h3 className="text-md font-semibold mb-3 text-gray-800">Production vs Consommation</h3>
          <Line data={productionLine} height={180} />
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
          <h3 className="text-md font-semibold mb-3 text-gray-800">Historique de production</h3>
          <Bar data={productionBar} height={180} />
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-100 col-span-1 lg:col-span-2 max-w-md mx-auto">
          <h3 className="text-md font-semibold mb-3 text-gray-800">Répartition des sources d’énergie</h3>
          <Doughnut data={energySourcePie} />
        </div>
      </div>
    </div>
  );
};

export default Performance;
