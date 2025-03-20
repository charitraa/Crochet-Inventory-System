import React, { useContext } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useEffect } from "react";
import { AppContext } from "../../context/ContextApp";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';


const Home = () => {
  const { user } = useContext(AppContext);
  // Sample data for the line chart
  const lineChartData = [
    { time: '6:00', orders: 10 },
    { time: '8:00', orders: 20 },
    { time: '10:00', orders: 30 },
    { time: '12:00', orders: 40 },
    { time: '14:00', orders: 20 },
    { time: '16:00', orders: 30 },
    { time: '18:00', orders: 25 },
  ];

  // Sample data for the bar chart
  const barChartData = [
    { day: '10', sales: 50 },
    { day: '11', sales: 70 },
    { day: '12', sales: 30 },
    { day: '13', sales: 90 },
    { day: '14', sales: 60 },
    { day: '15', sales: 80 },
    { day: '16', sales: 40 },
  ];

  // Sample data for the table
  const tableData = [
    { name: 'JellyFish Key Ring', price: 'Rs.40', unitsSold: 204 },
    { name: 'JellyFish Key Ring', price: 'Rs.40', unitsSold: 195 },
    { name: 'JellyFish Key Ring', price: 'Rs.40', unitsSold: 120 },
    { name: 'JellyFish Key Ring', price: 'Rs.40', unitsSold: 204 },
    { name: 'JellyFish Key Ring', price: 'Rs.40', unitsSold: 195 },
  ];
  return (
    <>
      <Dashboard mainContent={
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-gray-500 text-sm mb-4">MAIN DASHBOARD</h1>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-gray-500">ORDERS</h2>
              <p className="text-2xl font-bold">1,056</p>
              <p className="text-green-500">+34%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-gray-500">SALES</h2>
              <p className="text-2xl font-bold">5,420</p>
              <p className="text-green-500">+12%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-gray-500">PRODUCTS</h2>
              <p className="text-2xl font-bold">1,650</p>
              <p className="text-green-500">+15%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-gray-500">REVENUE</h2>
              <p className="text-2xl font-bold">9,653</p>
              <p className="text-green-500">+20%</p>
            </div>
          </div>

          {/* Charts and Sales */}
          <div className="grid grid-cols-3 gap-4">
            {/* Line Chart */}
            <div className="col-span-2 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">ORDERS OVER TIME</h2>
              <div className="flex space-x-4 mb-4">
                <p>645 <span className="text-gray-500">Orders on May 22</span></p>
                <p>472 <span className="text-gray-500">Orders on May 21</span></p>
              </div>
              <LineChart width={600} height={300} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#3B82F6" />
              </LineChart>
            </div>

            {/* Bar Chart and Sales */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">LAST 7 DAYS SALES</h2>
              <p className="text-2xl font-bold">1,259</p>
              <p className="text-gray-500">Rs.1100000.40 Revenue</p>
              <BarChart width={200} height={200} data={barChartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="sales" fill="#34D399" />
              </BarChart>
              <p className="text-green-500 text-center">+52%</p>
            </div>
          </div>

          {/* Table */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">MATERIALS</h2>
              <div className="text-gray-500">No data available</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">TOP PRODUCTS BY UNITS SOLD</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500">
                    <th>Name</th>
                    <th>Price</th>
                    <th>Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.unitsSold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      } />
    </>
  );
};

export default Home;
