import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";

import MenuPanel from "terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel";
import PanelStyles from "terriajs/lib/ReactViews/Map/Panels/panel.scss";
import Plotly from "plotly.js";
import Plot from "react-plotly.js";
import Loader from "react-loader-spinner";
import Styles from "./related-maps.scss";
import classNames from "classnames";

// TODO: Make a generic component instead of the iterative one here
const CovidChart = props => {
  const [regionsName, setRegionsName] = useState([]);
  const [totalActiveRegionValues, setTotalActiveRegionValues] = useState([]);
  const [totalRecoveredRegionValues, setTotalRecoveredRegionValues] = useState(
    []
  );
  const [totalDeathRegionValues, setTotalDeathRegionValues] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(true);

  const [governoratesName, setGovernoratesName] = useState([]);
  const [
    totalActiveGovernorateValues,
    settotalActiveGovernorateValues
  ] = useState([]);
  const [
    totalRecoveredGovernorateValues,
    setTotalRecoveredGovernorateValues
  ] = useState([]);
  const [
    totalDeathGovernorateValues,
    setTotalDeathGovernorateValues
  ] = useState([]);
  const [loadingGovernorates, setLoadingGovernorates] = useState(true);

  useEffect(() => {
    const regions =
      "http://datagovsa.mapapps.cloud/geoserver/ows?outputFormat=csv&service=WFS&srs=EPSG%3A3857&request=GetFeature&typename=geonode%3Ar&version=1.0.0";
    const governorates =
      "http://datagovsa.mapapps.cloud/geoserver/ows?outputFormat=csv&service=WFS&srs=EPSG%3A3857&request=GetFeature&typename=geonode%3Asagov&version=1.0.0";

    Plotly.d3.csv(regions, data => {
      generateRegionsValidData(data);
    });
    Plotly.d3.csv(governorates, data => {
      generateGovernoratesValidData(data);
    });
  }, []);

  const generateRegionsValidData = data => {
    const regionsName = [];
    const totalActiveValues = [];
    const totalRecoveredValues = [];
    const totalDeathValues = [];

    data.map(region => {
      regionsName.push(region["region_n_1"]);
      totalActiveValues.push(region["TotalActiv"]);
      totalRecoveredValues.push(region["TotalRecov"]);
      totalDeathValues.push(region["TotalDeath"]);

      return data;
    });

    setRegionsName(regionsName);
    setTotalActiveRegionValues(totalActiveValues);
    setTotalRecoveredRegionValues(totalRecoveredValues);
    setTotalDeathRegionValues(totalDeathValues);
    setLoadingRegions(false);
  };

  const generateGovernoratesValidData = data => {
    const governoratesName = [];
    const totalActiveValues = [];
    const totalRecoveredValues = [];
    const totalDeathValues = [];

    data.map(region => {
      governoratesName.push(region["Governor_1"]);
      totalActiveValues.push(region["TotalActiv"]);
      totalRecoveredValues.push(region["TotalRecov"]);
      totalDeathValues.push(region["TotalDeath"]);

      return data;
    });

    setGovernoratesName(governoratesName);
    settotalActiveGovernorateValues(totalActiveValues);
    setTotalRecoveredGovernorateValues(totalRecoveredValues);
    setTotalDeathGovernorateValues(totalDeathValues);
    setLoadingGovernorates(false);
  };

  const generateChartRegionsTraces = () => {
    if (
      regionsName &&
      regionsName.length !== 0 &&
      totalActiveRegionValues &&
      totalActiveRegionValues.length !== 0 &&
      totalRecoveredRegionValues &&
      totalRecoveredRegionValues.length !== 0 &&
      totalDeathRegionValues &&
      totalDeathRegionValues.length !== 0
    ) {
      return [
        {
          x: regionsName,
          y: totalActiveRegionValues,
          name: "Active",
          type: "bar",
          width: 0.8,
          marker: {
            color: "#1F77B4"
          }
        },
        {
          x: regionsName,
          y: totalRecoveredRegionValues,
          name: "Recovered",
          type: "bar",
          width: 0.8,
          marker: {
            color: "#3C8B22"
          }
        },
        {
          x: regionsName,
          y: totalDeathRegionValues,
          name: "Death",
          type: "bar",
          width: 0.8,
          marker: {
            color: "#F64225"
          }
        }
      ];
    }
  };

  const generateChartGovernoratesTraces = () => {
    if (
      governoratesName &&
      governoratesName.length !== 0 &&
      totalActiveGovernorateValues &&
      totalActiveGovernorateValues.length !== 0 &&
      totalRecoveredGovernorateValues &&
      totalRecoveredGovernorateValues.length !== 0 &&
      totalDeathGovernorateValues &&
      totalDeathGovernorateValues.length !== 0
    ) {
      return [
        {
          x: governoratesName,
          y: totalActiveGovernorateValues,
          name: "Active",
          type: "bar",
          width: 0.8,
          marker: {
            color: "#1F77B4"
          }
        },
        {
          x: governoratesName,
          y: totalRecoveredGovernorateValues,
          name: "Recovered",
          type: "bar",
          width: 0.8,
          marker: {
            color: "#3C8B22"
          }
        },
        {
          x: governoratesName,
          y: totalDeathGovernorateValues,
          name: "Death",
          type: "bar",
          width: 0.8,
          marker: {
            color: "#F64225"
          }
        }
      ];
    }
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
  const dropdownTheme = {
    inner: Styles.dropdownInner,
    icon: "lineChart"
  };
  return (
    <div>
      <MenuPanel
        theme={dropdownTheme}
        btnText="COVID-19 Statistics"
        smallScreen={props.smallScreen}
        viewState={props.viewState}
        btnTitle="COVID-19 Statistics"
      >
        <div className={classNames(PanelStyles.header)}>
          <h2 className={PanelStyles.heading}>COVID-19 Statistics</h2>
        </div>

        <p>
          This graph is visualizing some statistics about COVID-19 in Saudi
          Arabia.
        </p>

        <div className={classNames(PanelStyles.section, Styles.section)}>
          {!loadingRegions && !loadingGovernorates ? (
            <>
              <Plot
                data={generateChartRegionsTraces()}
                layout={customLayout("Regions")}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
              <Plot
                data={generateChartGovernoratesTraces()}
                layout={customLayout("Governorates")}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </>
          ) : (
            <Loader type="Oval" color="#4BAE53" height={100} width={100} />
          )}
        </div>
      </MenuPanel>
    </div>
  );
};

CovidChart.propTypes = {
  viewState: Proptypes.object.isRequired,
  smallScreen: Proptypes.bool
};

export default CovidChart;
