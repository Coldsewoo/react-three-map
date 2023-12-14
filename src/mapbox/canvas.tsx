import { extend } from "@react-three/fiber";
import { MercatorCoordinate } from "mapbox-gl";
import { memo } from "react";
import { Layer, useMap } from "react-map-gl";
import * as THREE from "three";
import { CanvasProps } from "../api/canvas-props";
import { useCanvasInLayer } from "../core/canvas-in-layer/use-canvas-in-layer";

extend(THREE);

const fromLngLat = MercatorCoordinate.fromLngLat

/** react`-three-fiber` canvas inside `Mapbox` */
export const Canvas = memo<CanvasProps>(props => {

  const map = useMap().current!.getMap(); // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const { id, onRemove, render } = useCanvasInLayer(props, fromLngLat, map);

  return <Layer
    id={id}
    beforeId={props.beforeId}
    type="custom"
    renderingMode="3d"
    onRemove={onRemove}
    render={render}
  />
})
Canvas.displayName = 'Canvas'