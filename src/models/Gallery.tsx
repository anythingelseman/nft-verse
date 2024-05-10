import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RigidBody } from "@react-three/rapier";

type GLTFResult = GLTF & {
  nodes: {
    Gallery_Structure_0: THREE.Mesh;
    Gallery_Backwall_0: THREE.Mesh;
    Benches_Benches_0: THREE.Mesh;
    Benches_Chrome_0: THREE.Mesh;
    Podiums_Podiums_0: THREE.Mesh;
    Portraits_PaintingFrame_0: THREE.Mesh;
    Portraits_Portraits_0: THREE.Mesh;
  };
  materials: {
    Structure: THREE.MeshStandardMaterial;
    Backwall: THREE.MeshStandardMaterial;
    Benches: THREE.MeshStandardMaterial;
    Chrome: THREE.MeshStandardMaterial;
    Podiums: THREE.MeshStandardMaterial;
    PaintingFrame: THREE.MeshStandardMaterial;
    Portraits: THREE.MeshStandardMaterial;
  };
};

const whiteMaterial = new THREE.MeshBasicMaterial({ color: "white" });

export default function Gallery(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/vr_gallery.glb") as GLTFResult;

  return (
    <>
      <RigidBody
        mass={1}
        type="fixed"
        position={[0, 4, 0]}
        colliders={"trimesh"}
      >
        <group {...props} dispose={null}>
          <mesh
            geometry={nodes.Gallery_Structure_0.geometry}
            material={materials.Structure}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            scale={[1.643, 1.643, 4.928]}
          />
          <mesh
            geometry={nodes.Gallery_Backwall_0.geometry}
            material={materials.Backwall}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            scale={[1.643, 1.643, 4.928]}
          />
          <mesh
            geometry={nodes.Benches_Benches_0.geometry}
            material={materials.Benches}
            position={[0, -2.842, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.306}
          />
          <mesh
            geometry={nodes.Benches_Chrome_0.geometry}
            material={materials.Chrome}
            position={[0, -2.842, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.306}
          />
          <mesh
            geometry={nodes.Podiums_Podiums_0.geometry}
            material={materials.Podiums}
            position={[0, -2.962, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.382}
          />
          <mesh
            geometry={nodes.Portraits_PaintingFrame_0.geometry}
            material={materials.PaintingFrame}
            position={[0, -1.607, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1.146, 0.382, 0.688]}
          />
          <mesh
            geometry={nodes.Portraits_Portraits_0.geometry}
            material={whiteMaterial}
            position={[0, -1.607, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1.146, 0.382, 0.688]}
          />
        </group>
      </RigidBody>
    </>
  );
}

useGLTF.preload("/vr_gallery.glb");
