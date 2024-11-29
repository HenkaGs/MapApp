import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countriesInfo from "./countries_updated.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapChart() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [hoverTooltip, setHoverTooltip] = useState({ content: "", x: 0, y: 0 });

  const getCountryStyle = (geo) => {
    const countryName = geo.properties.name.toLowerCase();
    const countryData = countriesInfo[countryName];
    const color = countryData ? getCountryColor(countryData.povertyPercentage) : "#d9d9d9";
    return {
      default: { fill: color, outline: "black", stroke: "black", strokeWidth: 0.5 },
      hover: { fill: "#666666", outline: "black", stroke: "black", strokeWidth: 1 },
      pressed: { fill: "#333333", outline: "black", stroke: "black", strokeWidth: 1.5 }
    };
  };

  const Headline = () => (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1>Poverty Rate by Country</h1>
      <p style={{ fontSize: "14px", color: "#555" }}>
      Poverty Rate is measured as the percentage of the population living below the national poverty line(s). National estimates are based on population-weighted subgroup estimates from household surveys.</p>
      <p style={{ fontSize: "14px", color: "#555" }}> 
      The World Bank updated the global poverty lines in September 2022. The decision, announced in May, followed the release in 2020 of new purchasing power parities (PPPs)—the main data used to convert different currencies into a common, comparable unit and account for price differences across countries. The new extreme poverty line became $2.15 per person per day, replacing the previous value of $1.90, which was based on 2017 PPPs.</p>
      <p style={{ fontSize: "14px", color: "#555" }}> 
      Poverty rates for Australia, Canada, Israel, and the United States were computed from OECD data for 2022 or the latest available year. All other countries' rates courtesy of World Bank.</p>
    </div>
  );

  const Reference = () => (
    <div style={{ marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#555" }}>
      <p>
        Data Source: <a href="https://worldpopulationreview.com/country-rankings/poverty-rate-by-country" target="_blank" rel="noopener noreferrer">https://worldpopulationreview.com/country-rankings/poverty-rate-by-country</a>
      </p>
      <p>
        Note: 
      </p>
      <p style={{ fontStyle: "italic" }}>nooottia</p>
    </div>
  );
  

  const getCountryColor = (povertyPercentage) => {
    if (povertyPercentage === undefined || povertyPercentage === 0.0) return "#d9d9d9"; // No data or 0.0
    if (povertyPercentage <= 5) return "#ffffcc";
    if (povertyPercentage <= 10) return "#ffeda0";
    if (povertyPercentage <= 15) return "#fed976";
    if (povertyPercentage <= 20) return "#feb24c";
    if (povertyPercentage <= 25) return "#fd8d3c";
    if (povertyPercentage <= 30) return "#fc4e2a";
    if (povertyPercentage <= 35) return "#e31a1c";
    if (povertyPercentage <= 40) return "#bd0026";
    if (povertyPercentage <= 45) return "#800026";
    if (povertyPercentage <= 50) return "#4d0000";
    if (povertyPercentage <= 55) return "#3d0000";
    if (povertyPercentage <= 60) return "#2e0000";
    if (povertyPercentage <= 65) return "#1e0000";
    if (povertyPercentage <= 70) return "#110000";
    if (povertyPercentage <= 75) return "#0b0000";
    if (povertyPercentage <= 80) return "#050000";
    if (povertyPercentage <= 85) return "#040000";
    if (povertyPercentage <= 90) return "#030000";
    if (povertyPercentage <= 95) return "#020000";
    return "#010000"; // 95% - 100%
  };

  const Legend = () => (
    <div style={{ padding: "10px" }}>
      <h4>Poverty Levels (5% Increments)</h4>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ color: "#ffffcc" }}>0% - 5%</li>
        <li style={{ color: "#ffeda0" }}>5% - 10%</li>
        <li style={{ color: "#fed976" }}>10% - 15%</li>
        <li style={{ color: "#feb24c" }}>15% - 20%</li>
        <li style={{ color: "#fd8d3c" }}>20% - 25%</li>
        <li style={{ color: "#fc4e2a" }}>25% - 30%</li>
        <li style={{ color: "#e31a1c" }}>30% - 35%</li>
        <li style={{ color: "#bd0026" }}>35% - 40%</li>
        <li style={{ color: "#800026" }}>40% - 45%</li>
        <li style={{ color: "#4d0000" }}>45% - 50%</li>
        <li style={{ color: "#3d0000" }}>50% - 55%</li>
        <li style={{ color: "#2e0000" }}>55% - 60%</li>
        <li style={{ color: "#1e0000" }}>60% - 65%</li>
        <li style={{ color: "#110000" }}>65% - 70%</li>
        <li style={{ color: "#0b0000" }}>70% - 75%</li>
        <li style={{ color: "#050000" }}>75% - 80%</li>
        <li style={{ color: "#040000" }}>80% - 85%</li>
        <li style={{ color: "#030000" }}>85% - 90%</li>
        <li style={{ color: "#020000" }}>90% - 95%</li>
        <li style={{ color: "#010000" }}>95% - 100%</li>
        <li style={{ color: "#d9d9d9" }}>No Data</li>
      </ul>
    </div>
  );

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name.toLowerCase();
    const countryData = countriesInfo[countryName];
    console.log(geo.properties);
    if (countryData) {
      const { povertyPercentage, year, info } = countryData; // Destructure the necessary fields
      setTooltipContent(
        `Info about ${geo.properties.name}:\n
         Poverty Rate: ${povertyPercentage || "No data"}% (${year || "Year not available"})\n
         ${info || ""}`
      );
    } else {
      setTooltipContent(`Info about ${geo.properties.name}: No data available.`);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      {/* Headline */}
      <Headline />

      {/* Map */}
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={(e) => {
                  const countryName = geo.properties.name;
                  setHoverTooltip({ content: countryName, x: e.pageX, y: e.pageY });
                }}
                onMouseMove={(e) => {
                  setHoverTooltip((prev) => ({ ...prev, x: e.pageX, y: e.pageY }));
                }}
                onMouseLeave={() => setHoverTooltip({ content: "", x: 0, y: 0 })}
                onClick={() => handleCountryClick(geo)}
                style={getCountryStyle(geo)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      <div>{tooltipContent}</div>
      <div
        style={{
          position: "absolute",
          top: hoverTooltip.y + 10,
          left: hoverTooltip.x + 10,
          background: "rgba(0, 0, 0, 0.75)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "5px",
          pointerEvents: "none",
          fontSize: "12px",
          display: hoverTooltip.content ? "block" : "none",
          zIndex: 1000,
        }}
      >
        {hoverTooltip.content}
      </div>

      {/* Legend */}
      <Legend />

      {/* Reference Section */}
      <Reference />
    </div>
  );
}
