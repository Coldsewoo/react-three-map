import { Object3DNode, extend, useFrame } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { useMap } from "react-three-map";
import { BatchedMesh, MathUtils } from "three";
import { BatchedStandardMaterial } from "./batched-standard-material/batched-standard-material";
import { BuildingStore } from "./building-store";
import { useControls } from "leva";

extend({ BatchedStandardMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    batchedMesh: Object3DNode<BatchedMesh, typeof BatchedMesh>,
    batchedStandardMaterial: Object3DNode<BatchedStandardMaterial, typeof BatchedStandardMaterial>,
  }
}

const maxGeometryCount = 3000;
const maxVertexCount = 8192;
const maxIndexCount = 0;

export const Buildings3D: FC<{
  origin: { longitude: number, latitude: number }
}> = ({ origin }) => {

  const {batch} = useControls({batch: true})

  const ref = useRef<BatchedMesh>(null)
  const map = useMap();
  const store = useRef<BuildingStore>();

  useFrame((_, delta)=>{
    if(!store.current) return;
    store.current.step(delta);
  })

  useEffect(() => {
    if (!ref.current) return;
    const st = new BuildingStore(origin, ref.current, maxGeometryCount, maxVertexCount, maxIndexCount, map);
    store.current = st;
    return () => {
      st.dispose();
    }
  }, [])

  return <batchedMesh
    ref={ref}
    visible={batch}
    args={[maxGeometryCount, maxGeometryCount * maxVertexCount, maxGeometryCount * maxIndexCount]}
    rotation={[-90 * MathUtils.DEG2RAD, 0, -90 * MathUtils.DEG2RAD]}
  >
    <batchedStandardMaterial attach="material"
      // metalness diffuse roughness emissive
      args={[maxGeometryCount]}
    />
    {/* <meshPhongMaterial attach="material" color="#656565" shininess={100} /> */}
  </batchedMesh>
}