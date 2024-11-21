import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Dashnav } from "../../../components/navbar/Dashnav";
import "../../../styles/dashboard/adminsummary/adminsummary.css";

export const Summary = () => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  const generateFakeOrders = () => {
    const orders = [];
    for (let i = 0; i < 5; i++) {
      orders.push({
        invoiceId: faker.finance.accountNumber(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        status: faker.helpers.arrayElement([
          "Pending",
          "Completed",
          "Cancelled",
        ]),
        action: "View",
      });
    }
    return orders;
  };

  const orderData = generateFakeOrders();

  const generateBestSellerProducts = () => {
    const products = [];
    for (let i = 0; i < 3; i++) {
      products.push({
        name: faker.commerce.productName(),
        sales: faker.number.int({ min: 50, max: 300 }),
      });
    }
    return products;
  };

  const bestSellerProducts = generateBestSellerProducts();

  const generateFakeRevenueData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        date: faker.date.past().toLocaleDateString(),
        revenue: faker.number.int({ min: 1000, max: 5000 }),
        totalOrders: faker.number.int({ min: 10, max: 100 }),
        newCustomers: faker.number.int({ min: 5, max: 50 }),
        refund: faker.number.int({ min: 50, max: 500 }),
      });
    }
    return data;
  };

  const chartData = generateFakeRevenueData();

  const [revenueChartOptions, setRevenueChartOptions] = useState({
    chart: {
      type: "area",
      id: "revenue-chart",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    xaxis: {
      categories: chartData.map((data) => data.date),
    },
    colors: ["#00E396", "#0090FF", "#FF4560", "#775DD0"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: [
      {
        title: {
          text: "Revenue",
        },
      },
      {
        opposite: true,
        title: {
          text: "Total Orders / New Customers",
        },
      },
    ],
  });

  const [revenueChartSeries, setRevenueChartSeries] = useState([
    {
      name: "Revenue",
      data: chartData.map((data) => data.revenue),
    },
    {
      name: "Total Orders",
      data: chartData.map((data) => data.totalOrders),
    },
    {
      name: "New Customers",
      data: chartData.map((data) => data.newCustomers),
    },
    {
      name: "Refund",
      data: chartData.map((data) => data.refund),
    },
  ]);

  const [accountChartOptions, setAccountChartOptions] = useState({
    chart: {
      type: "pie",
    },
    labels: ["Admin", "Member", "Guest"],
    colors: ["#1E90FF", "#32CD32", "#FF6347"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [accountChartSeries, setAccountChartSeries] = useState([10, 30, 60]);

  const generateBarChartData = () => {
    return {
      categories: Array.from({ length: 5 }, () => faker.commerce.department()),
      series: [
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
        faker.number.int({ min: 50, max: 150 }),
      ],
    };
  };

  const barChartData = generateBarChartData();

  const [barChartOptions, setBarChartOptions] = useState({
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: barChartData.categories,
    },
    colors: ["#00E396"],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
      },
    },
  });

  const [barChartSeries, setBarChartSeries] = useState([
    {
      name: "Products",
      data: barChartData.series,
    },
  ]);

  const radarChartData = {
    labels: ["Design", "Functionality", "Performance", "Security", "Usability"],
    series: [
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
      faker.number.int({ min: 30, max: 100 }),
    ],
  };

  const [radarChartOptions, setRadarChartOptions] = useState({
    chart: {
      type: "radar",
    },
    colors: ["#775DD0"],
    fill: {
      opacity: 0.3,
    },
  });

  const [radarChartSeries, setRadarChartSeries] = useState([
    {
      name: "Features",
      data: radarChartData.series,
    },
  ]);

  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "donut",
    },
    labels: ["Blogs", "Articles", "Tutorials"],
    colors: ["#FF4500", "#32CD32", "#1E90FF"],
  });

  const [donutChartSeries, setDonutChartSeries] = useState([40, 30, 30]);

  const generateFakeBoxPlotData = () => {
    const data = [];
    for (let i = 0; i < 5; i++) {
      const values = Array.from({ length: 10 }, () =>
        faker.number.int({ min: 20, max: 100 })
      );
      const sorted = values.sort((a, b) => a - b);
      data.push({
        x: faker.commerce.department(),
        y: [sorted[0], sorted[2], sorted[5], sorted[7], sorted[9]],
      });
    }
    return data;
  };

  const boxPlotData = generateFakeBoxPlotData();

  const [boxPlotChartOptions, setBoxPlotChartOptions] = useState({
    chart: {
      type: "boxPlot",
      height: 350,
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#FF4560",
          lower: "#00E396",
        },
      },
    },
    xaxis: {
      type: "category",
    },
    title: {
      text: "Product Performance BoxPlot",
      align: "left",
    },
  });

  const [boxPlotChartSeries, setBoxPlotChartSeries] = useState([
    {
      name: "Product Performance",
      data: boxPlotData,
    },
  ]);

  return (
    <div className="admin-summary-container">
      <Dashnav />
      <div className="summary">
        <div className="admin-summary-header">
          <strong>Summary</strong>
        </div>
        <div className="section1">
          <div className="item">
            <strong>Welcome admin</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              minima aliquam totam sint cupiditate voluptas minus facere, veniam
              quasi autem voluptates libero ea recusandae numquam suscipit
              mollitia nam rem maiores.
            </p>
          </div>
          <div className="info">
            <div className="small-item">
              <div>
                <strong>{formatPrice(2500)}</strong>
                <p>Revenue</p>
              </div>
              <i className="bx bx-dollar"></i>
            </div>
            <div className="small-item">
              <div>
                <strong>20</strong>
                <p>Total orders</p>
              </div>
              <i className="bx bx-credit-card"></i>
            </div>
          </div>
        </div>
        <div className="section2">
          <div className="item">
            {/* <strong>Total active products</strong> */}
            <Chart
              options={boxPlotChartOptions}
              series={boxPlotChartSeries}
              type="boxPlot"
              width="100%"
              height="400px"
            />
          </div>
          <div className="item">
            <strong>Total active products</strong>
            <Chart
              options={radarChartOptions}
              series={radarChartSeries}
              type="radar"
              width="100%"
              height="300px"
            />
          </div>
          <div className="item">
            <strong>Total active blogs</strong>
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="chart-container">
          <div className="charts">
            <div className="left-chart">
              <h3>Account Distribution</h3>
              <Chart
                options={accountChartOptions}
                series={accountChartSeries}
                type="pie"
                width="100%"
                height="300"
              />
            </div>
            <div className="right-chart">
              <h3>Revenue</h3>
              <Chart
                options={revenueChartOptions}
                series={revenueChartSeries}
                type="area"
                width="100%"
                height="300"
              />
            </div>
          </div>
        </div>

        <div className="summary-bottom">
          <div className="left-bottom">
            <table>
              <thead>
                <tr>
                  <th>InvoiceId</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr key={index}>
                    <td>{order.invoiceId}</td>
                    <td>{order.category}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                    <td>
                      <button>{order.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="right-bottom">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Sales</th>
                </tr>
              </thead>
              <tbody>
                {bestSellerProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
