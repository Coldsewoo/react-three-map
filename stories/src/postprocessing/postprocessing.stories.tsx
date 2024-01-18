import { Environment, Stats } from "@react-three/drei";
import { ComponentProps, useRef } from "react";
import ReactMap from 'react-map-gl';
import { Canvas } from "react-three-map";
import { MapboxCanvas } from "../canvas/mapbox-canvas";
import { Buildings3D } from "./buildings-3d";
import { SourceBuildings3D } from "./source-buildings-3d";

const origin = { longitude: -0.1281, latitude: 51.508 }

const mapProps: ComponentProps<typeof ReactMap> = {
  antialias: true,
  initialViewState: {
    ...origin,
    zoom: 18,
    pitch: 60,
  },
  mapStyle: "mapbox://styles/mapbox/streets-v12",
  // mapStyle: "mapbox://styles/mapbox/dark-v11",
  children: <SourceBuildings3D />
}

const canvasProps: ComponentProps<typeof Canvas> = {
  ...origin,
  shadows: 'variance',
  // overlay: true,
}

export function Default() {
  const ref = useRef<HTMLDivElement>(null)
  return <div ref={ref} style={{ height: '100vh', position: 'relative' }}>
    <style>{`.stats{position:absolute !important}`}</style>
    <MapboxCanvas map={mapProps} canvas={canvasProps}>
      <Stats className="stats" parent={ref} />
      <Environment preset="city" />

      <ambientLight intensity={Math.PI / 2} />
      {/* <hemisphereLight
        args={["#ffffff", "#60666C"]}
        position={[1, 4.5, 3]}
        intensity={Math.PI}
      /> */}
      <Buildings3D origin={origin} />
    </MapboxCanvas>
  </div>
}


