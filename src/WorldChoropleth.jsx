import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";


const WorldChoropleth = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 960;
    const height = 600;

    // Projection and Path Generator
    const projection = d3.geoNaturalEarth1().scale(150).translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath().projection(projection);

    // Set up SVG
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");

    // Load World Map Data
    Promise.all([
      d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),
      d3.csv("https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv")
    ]).then(([world, data]) => {
      const countries = topojson.feature(world, world.objects.countries).features;


      // Join data and draw countries
      svg
        .append("g")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", pathGenerator)
        .attr("fill", "#ccc")
        .attr("stroke", "black");
    });
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default WorldChoropleth;
