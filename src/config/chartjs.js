import useThemeOptions from "utilities/hooks/useThemeOptions";

const ConfigChartJS = () => {
  const { colors } = useThemeOptions();

  // Tooltips Options
  const tooltipOptions = {
    backgroundColor: "white",
    borderColor: "rgb(" + colors.primary + ")",
    borderWidth: 0.5,
    bodyColor: "rgb(" + colors.text + ")",
    bodySpacing: 8,
    cornerRadius: 4,
    padding: 16,
    titleColor: "rgb(" + colors.primary + ")",
  };

  const area = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: tooltipOptions,
    },
    scales: {
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        min: 0,
        max: 20,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const bar = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: tooltipOptions,
    },
    scales: {
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        min: 0,
        max: 20,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const line = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: tooltipOptions,
    },
    scales: {
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        min: 0,
        max: 20,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const pie = {
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: tooltipOptions,
    },
  };

  const doughnut = {
    aspectRatio: 2,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: tooltipOptions,
    },
  };

  const radar = {
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: tooltipOptions,
    },
    scales: {
      r: {
        max: 30,
        ticks: {
          display: false,
        },
      },
    },
  };

  const polarArea = {
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: tooltipOptions,
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
      },
    },
    layout: {
      padding: 5,
    },
  };

  return {
    area,
    bar,
    line,
    pie,
    doughnut,
    radar,
    polarArea,
  };
};

export default ConfigChartJS;
