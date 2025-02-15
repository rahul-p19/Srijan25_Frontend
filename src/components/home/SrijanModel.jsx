import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ wave = true, ...props })  {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/mascot/Srijan_2025_mascot_pose-updated.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if(wave){
      actions['Armature.001|mixamo.com|Layer0.002'].reset().fadeIn(.5).setDuration(2.7).play();
      setTimeout(() => {
        actions['Armature.001|mixamo.com|Layer0.002'].fadeOut(0.5).halt(0.5);
      }, 2700);
      return;
    }
  }, [])

  return (
    <group ref={group} {...props} dispose={null}
      onPointerEnter={() => {
        actions['Armature|mixamo.com|Layer0'].reset().setDuration(1.5).play();
        setTimeout(() => {
          actions['Armature|mixamo.com|Layer0'].fadeOut(0.5).halt(0.5);
        }, 1500);
      }}
    >
      <group name="Scene">
        <group name="Armature001" position={[-0.975, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <group
          name="Armature"
          position={[0.019, 0, -0.032]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.195, 1, 1]}>
          <group name="model">
            <skinnedMesh
              name="model001"
              geometry={nodes.model001.geometry}
              material={materials['Body.001']}
              skeleton={nodes.model001.skeleton}
            />
            <skinnedMesh
              name="model001_1"
              geometry={nodes.model001_1.geometry}
              material={materials['chest.001']}
              skeleton={nodes.model001_1.skeleton}
            />
            <skinnedMesh
              name="model001_2"
              geometry={nodes.model001_2.geometry}
              material={materials['face.001']}
              skeleton={nodes.model001_2.skeleton}
            />
            <skinnedMesh
              name="model001_3"
              geometry={nodes.model001_3.geometry}
              material={materials['RGB.001']}
              skeleton={nodes.model001_3.skeleton}
            />
          </group>
          <primitive object={nodes.mixamorigHips_1} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/mascot/Srijan_2025_mascot_pose-updated.glb')
