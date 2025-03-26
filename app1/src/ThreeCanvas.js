import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Box = () => {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    );
};

const ThreeCanvas = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box />
            <OrbitControls />
        </Canvas>
    );
};

export default ThreeCanvas;
