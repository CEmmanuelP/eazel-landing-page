import { Cloud, Clouds, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { useMemo } from 'react';
import * as THREE from "three";

// 랜덤 위치를 생성하는 함수
const generateRandomPosition = () => {
  return [
    (Math.random() - 0.5) * 20,  // x: -10 ~ 10
    (Math.random() - 0.5) * 20,  // y: -10 ~ 10
    (Math.random() - 0.5) * 20   // z: -10 ~ 10
  ]
}

// 개별 큐브 컴포넌트
const Cube = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  )
}

// 여러 개의 큐브를 생성하는 컴포넌트
const RandomCubes = ({ count = 20 }) => {
  // useMemo를 사용하여 위치값들을 메모이제이션
  const cubePositions = useMemo(() => {
    return Array.from({ length: count }, () => generateRandomPosition())
  }, [count])

  return (
    <>
      {cubePositions.map((position, index) => (
        <Cube key={index} position={position} />
      ))}
    </>
  )
}

//
const CustomCloud = () => {
  const { color, x, y, z, range, ...config } = useControls({
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 6, min: 0, max: 100, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    fade: { value: 10, min: 0, max: 400, step: 1 },
    growth: { value: 4, min: 0, max: 20, step: 1 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
    x: { value: 6, min: 0, max: 100, step: 1 },
    y: { value: 1, min: 0, max: 100, step: 1 },
    z: { value: 1, min: 0, max: 100, step: 1 },
    color: "white",
  })

  return (
    <Clouds material={THREE.MeshBasicMaterial}>
      {/* <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" position={[0, 0, 0]} /> */}
      <Cloud {...config} bounds={[x, y, z]} color="#eed0d0" seed={2} position={[0, 0, 0]} />
    </Clouds>
  )
}

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 100 }}
    >
      {/* Lights */}
      <color attach="background" args={['white']} />
      <hemisphereLight intensity={1} groundColor="black" />
      {/* Objects */}


      {/* 무작위 큐브들 */}
      <RandomCubes count={20} />

      {/* OrbitControls 설정 */}
      <OrbitControls
        enableZoom={true}        // 줌 가능 여부
        enablePan={true}         // 패닝 가능 여부
        enableRotate={true}      // 회전 가능 여부
        zoomSpeed={0.6}          // 줌 속도
        panSpeed={0.5}           // 패닝 속도
        rotateSpeed={0.4}        // 회전 속도
        minDistance={2}          // 최소 줌 거리
        maxDistance={100}         // 최대 줌 거리
        minPolarAngle={0}        // 최소 수직 회전 각도
        maxPolarAngle={Math.PI / 1.75} // 최대 수직 회전 각도
        target={[0, 0, 0]}       // 카메라가 바라보는 중심점
      />

      {/* Fog 설정
           첫 번째 인자: 안개 색상
           두 번째 인자: 안개가 시작되는 거리 (near)
           세 번째 인자: 안개가 완전히 차단되는 거리 (far) */}
      {/* <fog attach="fog" args={['#202020', 1, 10]} /> */}

      {/* Cloud */}
      <CustomCloud />

    </Canvas>
  )
}


