<Geographies
  geography="/map-file.json"
  parseGeographies={(geos) => {
    return geos.map((g) => {
      // Process geographies here...
      return g
    })
  }}
>
  {({ geographies }) =>
    geographies.map((geo) => {
      return <Geography key={geo.rsmKey} geography={geo} />
    })
  }
</Geographies>
