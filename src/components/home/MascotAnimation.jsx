import { Canvas } from "@react-three/fiber";
import Model from "./Model";

function MascotAnimation() {

  return (
    <Canvas className="h-full w-full" >
      <ambientLight />
      <directionalLight position={[-5, 5, 5]} intensity={3} color={"#ffffff"} />
      <directionalLight position={[5, 5, 5]} intensity={3} color={"#ffffff"} />
      <Model position={[0, -3, 0]} scale={2.25} />
    </Canvas >)
}

export default MascotAnimation;
