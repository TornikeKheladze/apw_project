import Pie from "components/charts/Pie";

const StatisticChart = ({ data, chartValue, nameKey }) => {
  function getRandomRGB() {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
  }

  const pieData = {
    labels: data.map((item) => item[nameKey]),
    datasets: [
      {
        data: data.map((item) => item[chartValue]),
        backgroundColor: [
          "#1984c5",
          "#22a7f0",
          "#63bff0",
          "#a7d5ed",
          "#e2e2e2",
          "#e1a692",
          "#de6e56",
          "#e14b31",
          "#c23728",
          ...data.map(() => getRandomRGB()),
        ],
        // borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 0,
      },
    ],
  };

  return <Pie withShadow data={pieData} />;
};

export default StatisticChart;
