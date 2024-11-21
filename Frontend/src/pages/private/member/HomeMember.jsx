import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import Chart from "react-apexcharts";
//import image
import member from "../../../assets/kois.png";
// import styles
import "../../../styles/dashboard/home/home.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";

export const HomeMember = () => {
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

  const generateBlogMetrics = () => {
    return {
      views: faker.number.int({ min: 100, max: 1000 }),
      shares: faker.number.int({ min: 10, max: 100 }),
      readMinutes: faker.number.int({ min: 50, max: 500 }),
    };
  };

  const blogMetrics = generateBlogMetrics();

  const generatePondData = () => {
    const pondData = [];
    for (let i = 0; i < 3; i++) {
      pondData.push({
        pondId: faker.finance.accountNumber(),
        pondName: `Pond ${i + 1}`,
        pondStatus: faker.helpers.arrayElement(["Good", "Bad", "Moderate"]),
      });
    }
    return pondData;
  };

  const pondData = generatePondData();

  const generateKoiLogs = () => {
    const logs = [];
    for (let i = 0; i < 12; i++) {
      logs.push({
        month: `Month ${i + 1}`,
        weight: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        growth: faker.number.float({ min: 2, max: 10, precision: 0.1 }),
      });
    }
    return logs;
  };

  const koiLogs = generateKoiLogs();

  const [blogChartOptions, setBlogChartOptions] = useState({
    chart: {
      type: "bar",
      id: "blog-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Views", "Shares", "Read Minutes"],
    },
    colors: ["#FF5733", "#C70039", "#900C3F"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  });

  const [blogChartSeries, setBlogChartSeries] = useState([
    {
      name: "Metrics",
      data: [blogMetrics.views, blogMetrics.shares, blogMetrics.readMinutes],
    },
  ]);

  const [koiChartOptions, setKoiChartOptions] = useState({
    chart: {
      type: "line",
      id: "koi-log-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: koiLogs.map((log) => log.month),
    },
    colors: ["#581845", "#FFC300"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: function (value) {
          return value.toFixed(1);
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Koi Weight (kg)",
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(1);
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Koi Growth (cm)",
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(1); // Format y-axis labels to 1 decimal place
          },
        },
      },
    ],
  });

  const [koiChartSeries, setKoiChartSeries] = useState([
    {
      name: "Weight",
      data: koiLogs.map((log) => log.weight),
    },
    {
      name: "Growth",
      data: koiLogs.map((log) => log.growth),
    },
  ]);

  return (
    <div className="homemem-dashboard-container">
      <Dashnav />
      <div className="dashboard">
        <div className="dashboard-header">
          <strong>Home Dashboard</strong>
        </div>
        <div className="section1">
          <div className="item">
            <div className="item1">
              <strong>Welcome back username</strong>
              <p>IZUMIYA is the Simplest Manage System of Koi</p>
            </div>
            <div className="item2">
              <img src={member} />
            </div>
          </div>

          <div className="info">
            <div className="small-item">
              <div>
                <strong>20 blogs</strong>
                <p> Contributed</p>
              </div>
              <i className="bx bx-news"></i>
            </div>
            <div className="small-item">
              <div>
                <strong>20</strong>
                <p>Total orders</p>
              </div>
              <i className="bx bx-package"></i>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="charts">
            <div className="left-chart">
              <h3>Blog Metrics</h3>
              <Chart
                options={blogChartOptions}
                series={blogChartSeries}
                type="bar"
                width="100%"
                height="300"
              />
            </div>
            <div className="right-chart">
              <h3>Koi Growth and Weight Logs</h3>
              <Chart
                options={koiChartOptions}
                series={koiChartSeries}
                type="line"
                width="100%"
                height="300"
              />
            </div>
          </div>
        </div>

        <div className="summary-bottom">
          <div className="left-bottom">
            <h3>Recent Orders</h3>
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
                    <td>{formatPrice(order.price)}</td>
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
            <h3>Pond Information</h3>
            <table>
              <thead>
                <tr>
                  <th>Pond Id</th>
                  <th>Pond Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pondData.map((pond, index) => (
                  <tr key={index}>
                    <td>{pond.pondId}</td>
                    <td>{pond.pondName}</td>
                    <td>{pond.pondStatus}</td>
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
