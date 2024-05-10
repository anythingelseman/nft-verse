import { Environment } from "@react-three/drei";
import Gallery from "../models/Gallery";
import NFT from "../components/NFT";
import { Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Player from "../components/Player";

export function Component() {
  return (
    <>
      <ambientLight intensity={1} color="#BBBBBB" />
      <directionalLight
        position={[-0.5, 1, 1]}
        color="#FFFFFF"
        intensity={0.6}
        castShadow
      />
      <Environment preset="apartment" />
      {/* <NFT
        information={{
          name: "",
          description: "",
          url: "",
        }}
        position={[0, 2.38, 2.94]}
        scale={1.2}
        rotation={[0, Math.PI, 0]}
      />
      <NFT
        information={{
          name: "",
          description: "",
          url: "",
        }}
        position={[5.73, 2.38, 2.94]}
        scale={1.2}
        rotation={[0, Math.PI, 0]}
      />
      <NFT
        information={{
          name: "",
          description: "",
          url: ""
        position={[-5.73, 2.38, 2.94]}
        scale={1.2}
        rotation={[0, Math.PI, 0]}
      />
      <NFT
        information={{
          name: "",
          description: "",
          url: "",
        }}
        position={[5.73, 2.38, -2.94]}
        scale={1.2}
      /> */}
      <NFT
        information={{
          name: "NFT",
          description: "This is an NFT",
          url: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/038273138030151.6215b21e27e00.jpg",
        }}
        position={[-5.73, 2.38, -2.94]}
        scale={1.2}
      />
      <NFT
        information={{
          name: "NFT 2",
          description: "Another NFT",
          url: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/038273138030151.6215b21e27e00.jpg",
        }}
        position={[0, 2.38, -2.94]}
        scale={1.2}
      />
      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
      <Player initial={[0, 4, 1]} />
    </>
  );
}
