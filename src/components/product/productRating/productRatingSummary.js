import "./productRating.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  Tooltip,
  LinearScale,
  CategoryScale,
} from "chart.js";

Chart.register(BarElement, Tooltip, LinearScale, CategoryScale);

function countStarRatings(reviews) {
  const starCounts = reviews.reduce(
    (counts, review) => {
      const { star } = review;
      counts[star - 1] = (counts[star - 1] || 0) + 1;
      return counts;
    },
    [0, 0, 0, 0, 0]
  );

  return starCounts;
}

function ProductRatingSummary({ ratings }) {
  const starCounts = countStarRatings(ratings).reverse();

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: ["☆☆☆☆☆", "☆☆☆☆", "☆☆☆", "☆☆", "☆"],
    datasets: [
      {
        label: "No of stars",
        data: starCounts,
        backgroundColor: "rgba(246, 176, 30, 0.8)",
      },
    ],
  };

  return (
    <div className="star-chart">
      <Bar options={options} data={data} />
    </div>
  );
}

export default ProductRatingSummary;
