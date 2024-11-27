import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countriesInfo from "./countriesInfo.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapChart() {
  const [tooltipContent, setTooltipContent] = useState("");

  const getCountryStyle = (geo) => {
    const countryName = geo.properties.name.toLowerCase();
    const countryData = countriesInfo[countryName];
    const color = countryData ? getCountryColor(countryData.povertyPercentage) : "#d9d9d9";
    return {
      default: { fill: color, outline: "none" },
      hover: { fill: "#666666", outline: "none" },
      pressed: { fill: "#333333", outline: "none" }
    };
  };

  const getCountryColor = (povertyPercentage) => {
    if (povertyPercentage === undefined) return "#d9d9d9"; // No data
    if (povertyPercentage <= 10) return "#ffffcc";
    if (povertyPercentage <= 20) return "#ffeda0";
    if (povertyPercentage <= 30) return "#fed976";
    if (povertyPercentage <= 40) return "#feb24c";
    if (povertyPercentage <= 50) return "#fd8d3c";
    if (povertyPercentage <= 60) return "#fc4e2a";
    if (povertyPercentage <= 70) return "#e31a1c";
    if (povertyPercentage <= 80) return "#bd0026";
    if (povertyPercentage <= 90) return "#800026";
    return "#4d0000"; // 90% - 100%
  };

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name.toLowerCase();
    const countryData = countriesInfo[countryName];
    if (countryData) {
      setTooltipContent(
        `Info about ${geo.properties.name}: ${countryData.info} (Poverty: ${
          countryData.povertyPercentage || "No data"
        }%)`
      );
    } else {
      setTooltipContent(`Info about ${geo.properties.name}: No data available.`);
    }
  };
  

  return (
    <div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleCountryClick(geo)}
                style={getCountryStyle(geo)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <div>{tooltipContent}</div>
    </div>
  );
}
