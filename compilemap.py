import os
import shlex
import subprocess
from typing import Literal


def run(cmdline: list[str]) -> None:
    subprocess.run(
        cmdline, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True
    )


def qgis_process(method: str, args: list[str]) -> None:
    run(["qgis_process", "run", method, *args])


def qgis_dissolve(
    *,
    distance_units: Literal["meters"] = "meters",
    area_units: Literal["m2"] = "m2",
    ellipsoid: Literal["EPSG:7030"] = "EPSG:7030",
    input: str,
    field: str | None = None,
    separate_disjoint: bool,
    output: str,
) -> str:
    qgis_process(
        "native:dissolve",
        [
            f"--distance_units={distance_units}",
            f"--area_units={area_units}",
            f"--ellipsoid={ellipsoid}",
            f"--INPUT={input}",
            *([] if field is None else [f"--FIELD={field}"]),
            f"--SEPARATE_DISJOINT={'true' if separate_disjoint else 'false'}",
            f"--OUTPUT={output}",
        ],
    )
    return output


def qgis_polygonstolines(
    *,
    distance_units: Literal["meters"] = "meters",
    area_units: Literal["m2"] = "m2",
    ellipsoid: Literal["EPSG:7030"] = "EPSG:7030",
    input: str,
    output: str,
) -> str:
    qgis_process(
        "native:polygonstolines",
        [
            f"--distance_units={distance_units}",
            f"--area_units={area_units}",
            f"--ellipsoid={ellipsoid}",
            f"--INPUT={input}",
            f"--OUTPUT={output}",
        ],
    )
    return output


def ogr_layer_algebra(
    *,
    operation: Literal["Clip"],
    input: str,
    method: str,
    output: str,
    output_lyr: str = "layer",
    format: Literal["GeoJSON"],
) -> str:
    run(
        [
            "ogr_layer_algebra.py",
            operation,
            "-input_ds",
            input,
            "-method_ds",
            method,
            "-output_ds",
            output,
            "-output_lyr",
            output_lyr,
            "-f",
            format,
        ]
    )
    return output


def ogr_layer_clip_append(
    *,
    input: str,
    method: str,
    output: str,
    output_lyr: str = "layer",
    format: Literal["GeoJSON"],
) -> str:
    return ogr_layer_algebra(
        operation="Clip",
        input=input,
        method=method,
        output=output,
        output_lyr=output_lyr,
        format=format,
    )


def ogr2ogr_append(
    *,
    input: str,
    input_layer: str,
    output: str,
) -> str:
    run(
        [
            "ogr2ogr",
            "-update",
            "-append",
            output,
            "-nln",
            "layer",
            input,
            input_layer,
        ]
    )
    return output


def main() -> None:
    sourcedb = "hallownestvectorlayers.gpkg"
    outdir = "public"
    tmpdir = "tmp"
    assert os.path.isfile(sourcedb)
    assert os.path.isdir(outdir)
    os.makedirs(tmpdir, exist_ok=True)
    sections = qgis_dissolve(
        input=f"{sourcedb}|layername=sections",
        field="area",
        separate_disjoint=True,
        output=f"{outdir}/sections.geojson",
    )
    mainroomsbyarea = qgis_dissolve(
        input=f"{sourcedb}|layername=mainrooms",
        field="area",
        separate_disjoint=True,
        output=f"{outdir}/mainroomsbyarea.geojson",
    )
    mainroomsall = qgis_dissolve(
        input=f"{sourcedb}|layername=mainrooms",
        separate_disjoint=True,
        output=f"{tmpdir}/mainroomsall.geojson",
    )
    mainroomslines = qgis_polygonstolines(
        input=mainroomsall,
        output=f"{tmpdir}/mainroomslines.geojson",
    )
    mainroomslinesarea = f"{outdir}/mainroomslinesarea.geojson"
    if os.path.isfile(mainroomslinesarea):
        os.remove(mainroomslinesarea)
    ogr_layer_clip_append(
        input=mainroomsbyarea,
        method=mainroomslines,
        output=mainroomslinesarea,
        format="GeoJSON",
    )
    ogr2ogr_append(
        input=sourcedb,
        input_layer="mainroomlines",
        output=mainroomslinesarea,
    )


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        print(f"Subprocess exited with code {exc.returncode}")
        print(" ".join(map(shlex.quote, exc.cmd)))
