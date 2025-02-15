import { Canvas } from "@react-three/fiber";
import Model from "./SrijanModel";

function ModelFallback() {
  return <>
    <img src='/srijan-mascot_enhanced.webp' className='absolute z-[100] top-[32%] sm:top-[20%] left-[50%] -translate-x-[50%] h-3/4' />
  </>
}

function MascotAnimation({scale=4, wave=true}) {

  return (
    <Canvas className="h-full w-full" fallback={<ModelFallback />}>
      <ambientLight />
      <directionalLight position={[-5, 5, 5]} intensity={2} color={"#ffffff"} />
      <directionalLight position={[5, 5, 5]} intensity={2} color={"#ffffff"} />
      <Model position={[0, -3, 0]} scale={scale} wave={wave} />
    </Canvas >)
}

export default MascotAnimation;
