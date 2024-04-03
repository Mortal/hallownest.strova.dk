from qgis.core import QgsApplication
qgs = QgsApplication([b''], False)
qgs.setPrefixPath('/usr')
qgs.initQgis()
from qgis import processing

qgs.run(
    "native:dissolve",
    {
        "INPUT": "dist/hallownest.gpkg|layername=mainrooms",
        "FIELD": [],
        "SEPARATE_DISJOINT": False,
        "OUTPUT": "mainroomsdissolve.geojson",
    },
)
