import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countriesInfo from "./countries_updated.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapChart() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [hoverTooltip, setHoverTooltip] = useState({ content: "", x: 0, y: 0 });
  const [references, setReferences] = useState([]);

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
    if (povertyPercentage === undefined || povertyPercentage === null) return "#d9d9d9"; // No data or 0.0
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
      <h4 style={{ marginRight: "10px" }}>Poverty Levels:</h4>
      <div style={{ display: "flex", gap: "5px" }}>
        <div style={{ background: "#ffffcc", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>5%</span>
        </div>
        <div style={{ background: "#ffeda0", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>10%</span>
        </div>
        <div style={{ background: "#fed976", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>15%</span>
        </div>
        <div style={{ background: "#feb24c", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>20%</span>
        </div>
        <div style={{ background: "#fd8d3c", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>25%</span>
        </div>
        <div style={{ background: "#fc4e2a", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>30%</span>
        </div>
        <div style={{ background: "#e31a1c", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>35%</span>
        </div>
        <div style={{ background: "#bd0026", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>40%</span>
        </div>
        <div style={{ background: "#800026", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>45%</span>
        </div>
        <div style={{ background: "#4d0000", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>50%</span>
        </div>
        <div style={{ background: "#d9d9d9", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #000", borderRadius: "5px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>No</span>
        </div>
      </div>
    </div>
  );
  

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name.toLowerCase();
    const countryData = countriesInfo[countryName];
    console.log(geo.properties);
    if (countryData) {
      const { povertyPercentage, year, info, references: countryReferences } = countryData;
      setTooltipContent(
        `Info about ${geo.properties.name}:\n
         Poverty Rate: ${povertyPercentage || "No data"}% (${year || "Year not available"})\n
         ${info || ""}`
      );
      setReferences(countryReferences || []);
    } else {
      setTooltipContent(`Info about ${geo.properties.name}: No data available.`);
      setReferences([]);
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

      <div>
        {references.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4>References</h4>
            <ul>
              {references.map((ref, index) => (
                <li key={index}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Legend */}
      <Legend />

      {/* Reference Section */}
      <Reference />
    </div>
  );
}
