import React from 'react';
import { useUser } from '../../context/UserContext';
import {
  BarChart3,
  BatteryCharging,
  Zap,
  AlertTriangle,
  Leaf,
  Sun,
  Plug,
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusIndicator } from '../../components/common/StatusIndicator';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const site = {
  id: 'site-5',
  name: '6ha',
  location: 'Antananarivo',
  capacity: 150,
  status: 'online',
  installDate: '2024-01-15T08:00:00Z',
  productionToday: 120,
  productionYesterday: 140,
  batteryLevel: 58,
  currentSource: 'PV',
  alerts: [],
  equipments: [
    'Onduleur Huawei SUN2000',
    'Batterie BYD 10.2kWh',
    'Panneaux JA Solar 150kWc',
  ],
  co2Saved: 72,
  energyGain: '35 000 Ar',
  selfConsumption: 65,
};

const Dashboard: React.FC = () => {
  const { user } = useUser();

  const totalSites = 1;
  const onlineSites = 1;
  const activeAlerts = 0;

  const productionChartData = {
    labels: ['Hier', "Aujourd'hui"],
    datasets: [
      {
        label: 'Production (kWh)',
        data: [site.productionYesterday, site.productionToday],
        backgroundColor: ['#CBD5E1', '#59BDC1'],
        borderRadius: 6,
        barThickness: 28,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Bienvenue, {user?.firstName} {user?.lastName}
      </h1>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Sites Installés" value={totalSites} icon={BarChart3} />
        <MetricCard
          title="Sites En Ligne"
          value={`${onlineSites}/${totalSites}`}
          icon={StatusIndicator}
          status="online"
        />
        <MetricCard
          title="Alertes Actives"
          value={activeAlerts}
          icon={AlertTriangle}
          status="online"
        />
      </div>

      {/* Image */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <img
          src="https://source.unsplash.com/1000x300/?solar-panel,energy"
          alt="Installation solaire"
          className="w-full object-cover"
        />
      </div>

      {/* Infos sous forme de cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border shadow p-4 flex items-center gap-4">
          <Sun size={24} className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Production aujourd’hui</p>
            <p className="text-lg font-semibold text-gray-800">{site.productionToday} kWh</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow p-4 flex items-center gap-4">
          <BatteryCharging size={24} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Batterie</p>
            <p className="text-lg font-semibold text-gray-800">{site.batteryLevel}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow p-4 flex items-center gap-4">
          <Plug size={24} className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Source actuelle</p>
            <p className="text-lg font-semibold text-gray-800">{site.currentSource}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow p-4 flex items-center gap-4">
          <Leaf size={24} className="text-green-700" />
          <div>
            <p className="text-sm text-gray-500">CO₂ évité</p>
            <p className="text-lg font-semibold text-gray-800">{site.co2Saved} kg</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow p-4 flex items-center gap-4">
          <Zap size={24} className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Gain énergétique</p>
            <p className="text-lg font-semibold text-gray-800">{site.energyGain}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow p-4 flex items-center gap-4">
          <Zap size={24} className="text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Autoconsommation</p>
            <p className="text-lg font-semibold text-gray-800">{site.selfConsumption}%</p>
          </div>
        </div>
      </div>

      {/* Équipements */}
      <div className="bg-white rounded-lg border shadow p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-2">Équipements installés</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {site.equipments.map((eq, i) => (
            <li key={i}>{eq}</li>
          ))}
        </ul>
      </div>

      {/* Graphique de production */}
      <div className="bg-white rounded-lg border shadow p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-4">Comparatif de production</h4>
        <div className="w-full h-56">
          <Bar
            data={productionChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { color: '#6B7280' },
                },
                x: {
                  ticks: { color: '#6B7280' },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
