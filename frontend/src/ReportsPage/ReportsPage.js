import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import axios from "axios";
import { BACKEND_URL } from "../App";

function ReportsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: ["#fd6b19", "#b882fa", "#7ba699", "#e67d57"],
      },
    ],
    labels: [],
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") == null) navigate("/");
  }, []);

  const fetchData = async () => {
    axios
      .get(`${BACKEND_URL}/api/reports/chart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        for (var i = 0; i < res.data.reportsChartData.length; i++) {
          dataSource.datasets[0].data[i] = res.data.reportsChartData[i].lpo;
          dataSource.labels[i] = res.data.reportsChartData[i].district;
        }
        dataSource.datasets[0].label = res.data.reportsChartData[0].district;
        setIsLoading(false);
        createPieChart();
      })
      .catch((e) => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  };

  useEffect(() => {
    fetchData();
  }, [isLoading, setIsLoading]);

  function createPieChart() {
    var canvas = document.getElementById("myReportsChart");
    if (!canvas || canvas.chart) return;
    var ctx = canvas.getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: dataSource,
    });
    canvas.chart = chart;
  }

  return (
    <div className="reports-page">
      <div className="my-card">
        {isLoading ? (
          <div
            style={{
              width: "400px",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        ) : (
          <canvas id="myReportsChart" width="400" height="400"></canvas>
        )}
      </div>
      <div className="my-card" style={{ width: "85%" }}>
        <div style={{ textAlign: "center" }}>
          The bar chart compares the frequency of legislative proposals labeled
          as Conditional Republican, Final Republican, and Conditional Democrat.
          Conditional Republican proposals dominate, signifying a strong
          partisan stance in climate-related legislative discussions. The lesser
          counts of Final Republican and minimal Conditional Democrat proposals
          suggest narrower bipartisan agreement on climate measures.
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
