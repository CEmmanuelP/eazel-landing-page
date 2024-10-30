import { Cloud, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';

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
      <meshStandardMaterial color="red" />
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

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 100 }}
      eventSource={document.getElementById('root')}
      eventPrefix="client">
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
        maxDistance={20}         // 최대 줌 거리
        minPolarAngle={0}        // 최소 수직 회전 각도
        maxPolarAngle={Math.PI / 1.75} // 최대 수직 회전 각도
        target={[0, 0, 0]}       // 카메라가 바라보는 중심점
      />

      {/* Fog 설정
           첫 번째 인자: 안개 색상
           두 번째 인자: 안개가 시작되는 거리 (near)
           세 번째 인자: 안개가 완전히 차단되는 거리 (far) */}
      <fog attach="fog" args={['#202020', 1, 10]} />

      {/* Cloud */}
      <Cloud concentrate="outside" growth={100} color="#ffccdd" opacity={1.25} seed={0.3} bounds={200} volume={200} />

    </Canvas>
  )
}


