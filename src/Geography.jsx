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
