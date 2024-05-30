import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/products");
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const productNames = products.map((item) => item.productName);
  const sales = products.map((item) => parseFloat(item.sales));
  const quantities = products.map((item) => parseInt(item.quantity));
  const prices = products.map((item) => parseFloat(item.price));

  const categoryCount = products.reduce((acc, product) => {
    const category = product.category;
    acc[category] = acc[category] ? acc[category] + 1 : 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: "Categories",
        data: Object.values(categoryCount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFCD56",
        ],
      },
    ],
  };

  const lineChartData = {
    labels: productNames,
    datasets: [
      {
        label: "Sales",
        borderColor: "#4CAF50",
        pointBorderColor: "#4CAF50",
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: "#4CAF50",
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        data: sales,
      },
    ],
  };

  const barChartQuantitiesData = {
    labels: productNames,
    datasets: [
      {
        label: "Quantity",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        data: quantities,
      },
    ],
  };

  const barChartPricesData = {
    labels: productNames,
    datasets: [
      {
        label: "Price",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        data: prices,
      },
    ],
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{ background: isDarkMode ? "#252525" : "#FFFFFF", minHeight: "100vh", transition: "background 0.3s ease" , }}>
      <div className="container-fluid" style={{ paddingTop: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h2 style={{ color: isDarkMode ? "#FFF" : "#000" }}>Admin Dashboard</h2>
          <button onClick={toggleTheme} style={{ background: "none", border: "1px solid", padding: "10px", cursor: "pointer", color: isDarkMode ? "#FFF" : "#000" }}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div style={{ width: "25%" }}>
            <h2 style={{ color: isDarkMode ? "#FFF" : "#000" }}>Product Categories</h2>
            <Pie
              data={pieChartData}
              options={{
                title: {
                  display: true,
                  text: "Product Categories",
                  fontSize: 16,
                  fontColor: isDarkMode ? "#FFF" : "#000",
                },
                legend: {
                  display: true,
                  position: "right",
                  labels: {
                    fontColor: isDarkMode ? "#FFF" : "#000",
                  },
                },
              }}
            />
          </div>
          <div style={{ width: "45%" }}>
            <h2 style={{ color: isDarkMode ? "#FFF" : "#000" }}>Sales by Product</h2>
            <Line
              data={lineChartData}
              options={{
                title: {
                  display: true,
                  text: "Sales by Product",
                  fontSize: 16,
                  fontColor: isDarkMode ? "#FFF" : "#000",
                },
                legend: {
                  display: true,
                  position: "right",
                  labels: {
                    fontColor: isDarkMode ? "#FFF" : "#000",
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      fontColor: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                      fontStyle: "bold",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10,
                    },
                    grid: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
                      zeroLineColor: "transparent",
                    },
                  },
                  x: {
                    ticks: {
                      fontColor: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                    },
                    grid: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
          <div style={{ width: "45%" }}>
            <h2 style={{ color: isDarkMode ? "#FFF" : "#000" }}>Quantity</h2>
            <Bar
              data={barChartQuantitiesData}
              options={{
                title: {
                  display: true,
                  text: "Quantity by Product",
                  fontSize: 16,
                  fontColor: isDarkMode ? "#FFF" : "#000",
                },
                legend: {
                  display: true,
                  position: "right",
                  labels: {
                    fontColor: isDarkMode ? "#FFF" : "#000",
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      fontColor: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                      fontStyle: "bold",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10,
                    },
                    grid: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
                      zeroLineColor: "transparent",
                    },
                  },
                  x: {
                    ticks: {
                      fontColor: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                    },
                    grid: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
                    },
                  },
                },
              }}
            />
          </div>
          <div style={{ width: "45%" }}>
            <h2 style={{ color: isDarkMode ? "#FFF" : "#000" }}>Prices</h2>
            <Bar
              data={barChartPricesData}
              options={{
                title: {
                  display: true,
                  text: "Prices by Product",
                  fontSize: 16,
                  fontColor: isDarkMode ? "#FFF" : "#000",
                },
                legend: {
                  display: true,
                  position: "right",
                  labels: {
                    fontColor: isDarkMode ? "#FFF" : "#000",
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      fontColor: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                      fontStyle: "bold",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10,
                    },
                    grid: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
                      zeroLineColor: "transparent",
                    },
                  },
                  x: {
                    ticks: {
                      fontColor: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                    },
                    grid: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
