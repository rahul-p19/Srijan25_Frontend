import { Canvas } from "@react-three/fiber";
import Model from "./SrijanModel";
import { OrbitControls } from "@react-three/drei";

function MascotAnimation() {

  return (
    <Canvas className="h-full w-full" >
      <ambientLight />
      <directionalLight position={[-5, 5, 5]} intensity={2} color={"#ffffff"} />
      <directionalLight position={[5, 5, 5]} intensity={2} color={"#ffffff"} />
      <Model position={[0, -3, 0]} scale={4} />
    </Canvas >)
}

export default MascotAnimation;
