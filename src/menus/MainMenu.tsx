import { useThree } from "@react-three/fiber";
import { Container, Root, Text } from "@react-three/uikit";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useAppContext } from "../contexts/AppProvider";
import { Card } from "../components/apfel/card";
import {
  Columns3,
  Home,
  LogIn,
  LogOut,
  Wallet,
} from "@react-three/uikit-lucide";
import { Button } from "../components/apfel/button";

const position = new THREE.Vector3();
const direction = new THREE.Vector3();

export default function MainMenu() {
  const camera = useThree((state) => state.camera);
  const ref = useRef<THREE.Mesh>(null);
  const { openMainMenu } = useAppContext();

  const isVR = true;

  useEffect(() => {
    if (openMainMenu && camera && ref.current) {
      camera.getWorldPosition(position);
      camera.getWorldDirection(direction);
      ref.current.position.copy(position).add(direction.multiplyScalar(2));
      ref.current.rotation.copy(camera.rotation);
    }
  }, [openMainMenu, camera, ref.current]);

  return (
    <mesh ref={ref} visible={openMainMenu}>
      <Root>
        <Container flexDirection="column" gap={4}>
          <Card
            flexDirection="row"
            justifyContent="space-between"
            gap={4}
            padding={8}
            borderRadius={4}
            width={200}
            flexWrap="wrap"
          >
            <Button
              flexDirection="column"
              alignItems="center"
              padding={4}
              borderRadius={4}
              border={1}
              width={50}
              gap={4}
            >
              <Columns3 height={10} />
              <Text fontSize={8}>Text</Text>
            </Button>
            <Button
              flexDirection="column"
              alignItems="center"
              padding={4}
              borderRadius={4}
              border={1}
              width={50}
              gap={4}
            >
              <Home height={10} />
              <Text fontSize={8}>Dashboard</Text>
            </Button>
            {isVR ? (
              <Button
                flexDirection="column"
                alignItems="center"
                padding={4}
                borderRadius={4}
                border={1}
                width={50}
                gap={4}
              >
                <LogOut height={10} />
                <Text fontSize={8} justifyContent="center">
                  Text
                </Text>
              </Button>
            ) : (
              <Button
                flexDirection="column"
                alignItems="center"
                padding={4}
                borderRadius={4}
                border={1}
                width={50}
                gap={4}
              >
                <LogIn height={10} />
                <Text fontSize={8} justifyContent="center">
                  Text
                </Text>
              </Button>
            )}

            <Button
              flexDirection="column"
              alignItems="center"
              padding={4}
              borderRadius={4}
              border={1}
              flexGrow={1}
              gap={4}
            >
              <Wallet height={10} />
              <Text fontSize={8} justifyContent="center">
                Text
              </Text>
            </Button>
          </Card>
        </Container>
      </Root>
    </mesh>
  );
}
