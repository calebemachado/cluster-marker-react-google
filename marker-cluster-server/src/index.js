const express = require("express");
const cors = require("cors");
const Supercluster = require("supercluster");
const GeoJSON = require("geojson");

const data = require("./poi.json");

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

app.get("/api/v1/", (req, res) => {
  try {
    let {
      zoom,
      nwlng = -180,
      selat = -90,
      selng = 180,
      nwlat = 90,
    } = req.query;
    let geoJsonData = GeoJSON.parse(data, {
      Point: ["latitude", "longitude"],
    });

    let index = new Supercluster({
      radius: 128,
      maxZoom: 18,
    }).load(geoJsonData.features);

    let clusteredData = index.getClusters(
      [
        parseFloat(nwlng),
        parseFloat(selat),
        parseFloat(selng),
        parseFloat(nwlat),
      ],
      zoom
    );

    res.send({
      success: true,
      total: clusteredData.length,
      data: clusteredData,
    });
  } catch (err) {
    console.warn(err);
    return res.json({ error: "Internal Server Error", stack: err });
  }
});

app.listen(port, () => {
  console.log(`Marker Cluster Server listening at http://localhost:${port}`);
});
