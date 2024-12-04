import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt") == null) navigate("/");
  }, []);

  return (
    <div className="dashboard-page">
      <div className="my-card">
        <span style={{ marginRight: "10px", fontWeight: 600 }}>
          Source URL:
        </span>
        <a
          href="https://www.politico.com/news/2024/11/20/biden-climate-trump-rollbacks-00190719?utm_source=chatgpt.com"
          target="_blank"
        >
          https://www.politico.com/news/2024/11/20/biden-climate-trump-rollbacks-00190719?utm_source=chatgpt.com
        </a>
      </div>
      <div className="my-card" style={{ width: "85%" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontWeight: "bolder",
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            Summary
          </div>
          The U.S. Department of Energy (DOE) is expediting the finalization of
          $25 billion in loans and guarantees for clean energy projects to
          secure the Biden administration’s climate legacy ahead of
          President-elect Donald Trump’s transition to office. These
          initiatives, overseen by the DOE’s Loan Programs Office, aim to
          support critical projects, including a nuclear power plant in
          Michigan, lithium mining in Nevada, and electric vehicle component
          factories in Tennessee and Ohio. The push underscores concerns that
          the incoming administration, under Energy Secretary nominee Chris
          Wright, a fracking executive critical of large government subsidies,
          could reverse or stall these efforts. The Loan Programs Office, a
          cornerstone of the Biden administration's clean energy strategy, had
          minimal activity during Trump's previous tenure, with only one project
          funded and proposals to significantly reduce its budget. Pending
          approvals include a $9.2 billion battery manufacturing project in
          Kentucky and Tennessee, a $1.5 billion sustainable aviation fuel
          initiative in South Dakota, and a $1.7 billion hydrogen production
          facility. These projects are seen as vital to reducing U.S. dependence
          on foreign imports, particularly from China, while advancing carbon
          reduction goals. Companies involved, such as Plug Power, are eager to
          secure agreements before January 20, fearing disruptions or
          cancellations under the new administration. The DOE is prioritizing
          finalizing these deals before the leadership transition, recognizing
          the vulnerability of unfinished agreements to potential policy shifts.
          The outcome will significantly influence the trajectory of U.S. clean
          energy innovation and its commitment to addressing climate change.
        </div>
      </div>
      <div className="my-card" style={{ width: "85%" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontWeight: "bolder",
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            Technical Aspects
          </div>
          The project is built using the MERN stack, with React for the
          frontend, Node.js and Express for the backend, and MongoDB for
          database. The frontend is served as static files by using NGINX. Both
          the frontend and backend are hosted on the same server, with NGINX
          handling traffic on port 80 for the frontend. The infrastructure is
          designed for scalability and performance, with the backend running on
          Node.js and Express, and the frontend optimized for delivery via
          NGINX.
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
