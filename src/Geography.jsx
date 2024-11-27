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
