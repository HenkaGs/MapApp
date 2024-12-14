import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countriesInfo from "./countriesInfoNewest2.json";
import "./App.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapChart() {
  const [year, setYear] = useState(2024);
  const [tooltipContent, setTooltipContent] = useState("");
  const [hoverTooltip, setHoverTooltip] = useState({ content: "", x: 0, y: 0 });
  const [references, setReferences] = useState([]);

  const getCountryStyle = (geo) => {
    const countryName = geo.properties.name.toLowerCase();
    const countryData = countriesInfo[countryName];
    const povertyRate = countryData?.[year];
    const color = povertyRate !== null && povertyRate !== undefined ? getCountryColor(povertyRate) : "#d9d9d9";
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
      Extreme poverty is defined as living below the International Poverty Line of $2.15 per day. This data is adjusted for inflation and for differences in the cost of living between countries.
      </p>
    </div>
  );

  const Reference = () => (
    <div style={{ marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#555" }}>
      <p>
        Data Source: <a href="https://ourworldindata.org/poverty" target="_blank" rel="noopener noreferrer">https://ourworldindata.org/poverty</a>
      </p>
      <p>
        Note: 
      </p>
      <p style={{ fontStyle: "italic" }}>nooottia</p>
    </div>
  );
  

  const getCountryColor = (povertyPercentage) => {
    if (povertyPercentage === undefined || povertyPercentage === null) return "#d9d9d9"; // No data
  
    // Transition from light yellow to dark red
    const gradientStops = [
      { percent: 1, color: [255, 255, 204] }, // Light yellow
      { percent: 20, color: [255, 237, 160] }, // Yellowish
      { percent: 40, color: [254, 178, 76] },  // Orange
      { percent: 60, color: [252, 78, 42] },   // Red
      { percent: 80, color: [227, 26, 28] },   // Dark red
      { percent: 100, color: [153, 0, 13] },   // Very dark red
    ];
  
    // Find the gradient stop range for the given percentage
    for (let i = 0; i < gradientStops.length - 1; i++) {
      const start = gradientStops[i];
      const end = gradientStops[i + 1];
      if (povertyPercentage <= end.percent) {
        const ratio = (povertyPercentage - start.percent) / (end.percent - start.percent); // Normalize
        const red = Math.round(start.color[0] + ratio * (end.color[0] - start.color[0]));
        const green = Math.round(start.color[1] + ratio * (end.color[1] - start.color[1]));
        const blue = Math.round(start.color[2] + ratio * (end.color[2] - start.color[2]));
        return `rgb(${red}, ${green}, ${blue})`;
      }
    }
  
    return "#153001"; // Fallback for any undefined percentage > 100 (Very dark red)
  };
  
  

  const Legend = () => {
    // Define the gradient stops for the color bar
    const gradient = [
      "rgb(255, 255, 204)", // Light yellow (0%)
      "rgb(255, 237, 160)", // Yellowish (20%)
      "rgb(254, 178, 76)",  // Orange (40%)
      "rgb(252, 78, 42)",   // Red (60%)
      "rgb(227, 26, 28)",   // Dark red (80%)
      "rgb(153, 0, 13)",    // Very dark red (100%)
    ].join(",");
  
    // Positions for the percentage labels
    const percentageLabels = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h4>Poverty Levels (%):</h4>
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Percentage labels */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            {percentageLabels.map((percentage) => (
              <span
                key={percentage}
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {percentage}%
              </span>
            ))}
          </div>
          {/* Color gradient bar */}
          <div
            style={{
              background: `linear-gradient(to right, ${gradient})`,
              width: "100%",
              height: "20px",
              border: "1px solid #000",
              borderRadius: "5px",
            }}
          ></div>
        </div>
        {/* No Data Box */}
        <div style={{ marginTop: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#555" }}>No Data:</span>
          <div
            style={{
              display: "inline-block",
              background: "#d9d9d9",
              width: "30px",
              height: "20px",
              marginLeft: "5px",
              border: "1px solid #000",
              borderRadius: "3px",
              verticalAlign: "middle",
            }}
          ></div>
        </div>
      </div>
    );
  };
  
  
  
  
  

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name.toLowerCase();
    const countryData = countriesInfo[countryName];
    const povertyPercentage = countryData?.[year];
  
    if (countryData && povertyPercentage !== null && povertyPercentage !== undefined) {
      setTooltipContent(
        `Poverty Rate of ${geo.properties.name} is ${povertyPercentage}% in ${year}`
      );
      setReferences(countryData.references || []);
    } else {
      setTooltipContent(`Info about ${geo.properties.name}: No data available for ${year}.`);
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

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="yearSlider">Select Year: {year}</label>
        <input
          id="yearSlider"
          type="range"
          min="1964"
          max="2024"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          step="1"
          style={{ width: "80%" }}
        />
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
