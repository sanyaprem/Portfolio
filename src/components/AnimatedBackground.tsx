'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Create gradient material with custom shaders
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: new THREE.Color('#667eea') },
        uColor2: { value: new THREE.Color('#764ba2') },
        uColor3: { value: new THREE.Color('#f093fb') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec2 uMouse;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          
          // Add wave animation
          float wave = sin(pos.x * 2.0 + uTime * 0.5) * 0.1;
          wave += sin(pos.y * 1.5 + uTime * 0.3) * 0.1;
          
          // Mouse interaction
          float dist = distance(pos.xy, uMouse);
          pos.z += wave + (1.0 - smoothstep(0.0, 1.5, dist)) * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Animated gradient
          float mixValue = sin(vUv.x * 3.14159 + uTime * 0.2) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, vUv.x);
          color = mix(color, uColor3, mixValue);
          
          // Add some brightness variation
          float brightness = 1.0 + sin(vUv.y * 6.28 + uTime) * 0.1;
          color *= brightness;
          
          gl_FragColor = vec4(color, 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      material.uniforms.uTime.value = time;
      
      // Smooth rotation
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.cos(time * 0.15) * 0.1;
    }
  });

  // Mouse move handler
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      material.uniforms.uMouse.value.set(
        mousePosition.current.x * 2,
        mousePosition.current.y * 2
      );
    });
  }

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[4, 4, 32, 32]} />
    </mesh>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)' }}
      >
        <ambientLight intensity={0.5} />
        <GradientMesh />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
