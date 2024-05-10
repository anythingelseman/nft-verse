import { getInputSourceId } from "@coconut-xr/natuerlich";
import { PointerController, TouchHand } from "@coconut-xr/natuerlich/defaults";
import {
  useXRGamepadButton,
  useXRGamepadReader,
} from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";
import * as THREE from "three";
import { useAppContext } from "../contexts/AppProvider";

const SPEED = 5;
const vector2 = new THREE.Vector2();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function InputSource({
  inputSource,
  body,
}: {
  inputSource: XRInputSource;
  body: RefObject<RapierRigidBody>;
}) {
  const inputSourceId = getInputSourceId(inputSource);
  const reader = useXRGamepadReader(inputSource);
  const { toggleMainMenu } = useAppContext();
  useXRGamepadButton(inputSource, "a-button", () => {
    toggleMainMenu();
  });

  useFrame((state) => {
    if (!body.current) return;
    const velocity = body.current.linvel();

    reader.readAxes("xr-standard-thumbstick", vector2);
    if (vector2.x === 0 && vector2.y === 0) return;
    frontVector.set(0, 0, vector2.y);
    sideVector.set(-vector2.x, 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    body.current.setLinvel(
      { x: direction.x, y: velocity.y, z: direction.z },
      true
    );
  });

  return inputSource.hand != null ? (
    <TouchHand
      cursorOpacity={1}
      key={inputSourceId}
      id={inputSourceId}
      inputSource={inputSource}
      hand={inputSource.hand}
    />
  ) : (
    <PointerController
      key={inputSourceId}
      id={inputSourceId}
      inputSource={inputSource}
    />
  );
}