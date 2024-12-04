import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import axios from "axios";

function SummaryPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#b882fa",
          "#7ba699",
          "#e67d57",
        ],
      },
    ],
    labels: [],
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") == null) navigate("/");
  }, []);

  const fetchData = async () => {
    axios
      .get("http://localhost:3001/api/summary/chart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        for (var i = 0; i < res.data.summaryChartData.length; i++) {
          dataSource.datasets[0].data[i] = res.data.summaryChartData[i].funds;
          dataSource.labels[i] = res.data.summaryChartData[i].project;
        }
        createPieChart();
        setIsLoading(false);
      })
      .catch((e) => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function createPieChart() {
    var canvas = document.getElementById("mySummaryChart");
    if (!canvas || canvas.chart) return;
    var ctx = canvas.getContext("2d");
    var chart = new Chart(ctx, {
      type: "pie",
      data: dataSource,
    });
    canvas.chart = chart;
  }

  return (
    <div className="summary-page">
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
          <canvas id="mySummaryChart" width="400" height="400"></canvas>
        )}
      </div>
      <div className="my-card" style={{ width: "85%" }}>
        <div style={{ textAlign: "center" }}>
          This pie chart depicts the allocation of investments into three major
          climate-focused sectors: EV batteries, sustainable aviation fuel
          production, and electric vehicle charging infrastructure. The largest
          share is dedicated to EV battery development, indicating a heavy
          emphasis on advancing electric vehicle technology. Smaller portions
          are allocated to sustainable aviation fuel production and charging
          infrastructure, showcasing a broader strategy for decarbonizing
          transportation.
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
