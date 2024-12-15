<Geographies
  geography="/map-file.json"
  parseGeographies={(geos) => {
    return geos.map((g) => {

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
