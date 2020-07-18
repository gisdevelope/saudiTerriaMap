import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import Plot from "react-plotly.js";

const CovidChart = props => {
  const [regionsName, setRegionsName] = useState([]);
  const [totalActiveValues, setTotalActiveValues] = useState([]);
  const [totalRecoveredValues, setTotalRecoveredValues] = useState([]);
  const [totalDeathValues, setTotalDeathValues] = useState([]);
  const { data, dataType } = props;

  useEffect(() => {
    const regions = [];
    const totalActive = [];
    const totalRecovered = [];
    const totalDeath = [];

    data.map(region => {
      if (dataType === "Regions") {
        regions.push(region["region_n_1"]);
      } else {
        regions.push(region["Governor_1"]);
      }
      totalActive.push(region["TotalActiv"]);
      totalRecovered.push(region["TotalRecov"]);
      totalDeath.push(region["TotalDeath"]);

      return data;
    });

    setRegionsName(regions);
    setTotalActiveValues(totalActive);
    setTotalRecoveredValues(totalRecovered);
    setTotalDeathValues(totalDeath);
  }, [data]);

  const generateChartTraces = () => {
    return [
      {
        x: regionsName,
        y: totalActiveValues,
        name: "Active",
        type: "bar",
        width: 0.8,
        marker: {
          color: "#1F77B4"
        }
      },
      {
        x: regionsName,
        y: totalRecoveredValues,
        name: "Recovered",
        type: "bar",
        width: 0.8,
        marker: {
          color: "#3C8B22"
        }
      },
      {
        x: regionsName,
        y: totalDeathValues,
        name: "Death",
        type: "bar",
        width: 0.8,
        marker: {
          color: "#F64225"
        }
      }
    ];
  };

  const customLayout = type => {
    return {
      title: "COVID-19 Cases distribution by case type for Saudi " + type,
      barmode: "stack",
      xaxis: {
        tickangle: -45
      },
      yaxis: {
        zeroline: false,
        gridwidth: 2,
        title: "Total Cases (log scaled)",
        type: "log"
      },
      bargap: 0.05
    };
  };

  return (
    <Plot
      data={generateChartTraces()}
      layout={customLayout(dataType)}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

CovidChart.propTypes = {
  data: Proptypes.array.isRequired,
  dataType: Proptypes.string.isRequired
};

export default CovidChart;
