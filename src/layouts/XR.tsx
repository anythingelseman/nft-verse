import { Sky, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import { Ground } from "../components/Ground";
import { Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import MainMenu from "../menus/MainMenu";
import ToastContainer from "../contexts/ToastContainer";
import { Component } from "./../pages/Collection";

export default function XR() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ToastContainer>
        <Sky sunPosition={[100, 20, 100]} />
        <Physics>
          <Component />
          <Ground />
        </Physics>
        <MainMenu />
        <PointerLockControls />
      </ToastContainer>
    </Suspense>
  );
}
