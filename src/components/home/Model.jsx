import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useTexture } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const meshRef = useRef()
  const { nodes, animations } = useGLTF('/mascot/mascot-waving.glb')
  const { actions } = useAnimations(animations, group);
  const metallicTexture = useTexture("/mascot/texture_metallic.png");
  const roughnessTexture = useTexture("/mascot/texture_roughness.png");

  useEffect(() => {
    actions['Armature|mixamo.com|Layer0'].reset().fadeIn(.5).setDuration(2.7).play();
    setTimeout(() => {
      actions['Armature|mixamo.com|Layer0'].fadeOut(0.5).halt(0.5);
    }, 2700);
  }, [])

  return (
    <group ref={group} {...props} dispose={null}
      onPointerEnter={() => {
        actions['Armature|mixamo.com|Layer0'].reset().fadeIn(.5).setDuration(2.7).play();
        setTimeout(() => {
          actions['Armature|mixamo.com|Layer0'].fadeOut(0.5).halt(0.5);
        }, 2700);
      }}
    >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            ref={meshRef}
            name="model"
            geometry={nodes.model.geometry}
            material={nodes.model.material}
            skeleton={nodes.model.skeleton}
          >
            <meshStandardMaterial
              metalnessMap={metallicTexture}
              roughnessMap={roughnessTexture}
            />
          </skinnedMesh>
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/mascot/mascot-waving.glb')
