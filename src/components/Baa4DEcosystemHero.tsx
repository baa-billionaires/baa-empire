import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Cpu,
  Coins,
  Globe2,
  Sparkles,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  Maximize2,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Radio,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Orbit,
  Eye,
  Info
} from 'lucide-react';

interface Baa4DEcosystemHeroProps {
  onNavigate: (page: string) => void;
  onSelectCourse?: (courseId: string) => void;
}

interface PlanetNode {
  id: string;
  name: string;
  category: string;
  tagline: string;
  role: string;
  metrics: string;
  color: string;
  emissive: string;
  size: number;
  orbitRadius: number;
  speed: number;
  phase: number;
  elevation: number;
  pageRoute: string;
  description: string;
}

const ECOSYSTEM_PLANETS: PlanetNode[] = [
  {
    id: 'automode',
    name: '1. Automode AI',
    category: 'Co-Founded Core Tech',
    role: 'Autonomous AI Agents & Business Automation',
    tagline: 'Runs Student Businesses on Autopilot',
    metrics: '$290k MRR Target • 10,000 SMEs',
    color: '#00FF88',
    emissive: '#00aa55',
    size: 1.4,
    orbitRadius: 10,
    speed: 0.65,
    phase: 0.1,
    elevation: 0.4,
    pageRoute: 'uadc-lab',
    description: "Africa's first autonomous business automation AI. Deploys autonomous agents for WhatsApp closing, lead scoring, and automated accounting."
  },
  {
    id: 'autostack',
    name: '2. Autostack AI',
    category: 'Co-Founded Core Tech',
    role: 'No-Code AI Stack & Developer Platform',
    tagline: 'Drag, Drop, Deploy AI Apps',
    metrics: '$245k MRR Target • 5,000 Developers',
    color: '#00D4FF',
    emissive: '#0088cc',
    size: 1.5,
    orbitRadius: 14,
    speed: 0.52,
    phase: 1.2,
    elevation: -0.6,
    pageRoute: 'tools',
    description: "Full-stack AI developer foundry enabling students and creators to build and monetize AI apps with zero boilerplate code."
  },
  {
    id: 'codeorbit',
    name: '3. CodeOrbit Limited',
    category: 'Co-Founded Core Tech',
    role: 'Software Foundry & Enterprise Tech',
    tagline: 'Parent Lab for MODE Digital Creations',
    metrics: '$320k Annual Foundry Revenue',
    color: '#FFD700',
    emissive: '#cc9900',
    size: 1.6,
    orbitRadius: 18,
    speed: 0.44,
    phase: 2.3,
    elevation: 0.8,
    pageRoute: 'partners',
    description: "Software foundry building enterprise-grade sovereign architectures, CAC-compliant digital infrastructures, and smart systems."
  },
  {
    id: 'baa-academy',
    name: '4. BAA-BILLIONAIRES Academy',
    category: 'Flagship Platform (2026)',
    role: 'Autonomous Academy & Learn-to-Mine',
    tagline: '100 Master Courses • 10x BaaCoin Allocation',
    metrics: '2,400+ Students • 124 Businesses',
    color: '#FFB800',
    emissive: '#e69500',
    size: 2.4,
    orbitRadius: 23,
    speed: 0.35,
    phase: 3.5,
    elevation: -0.2,
    pageRoute: 'academy',
    description: "Flagship learning institution turning students into billionaires with 100 certified courses, AI tutors, and live mining."
  },
  {
    id: 'workos',
    name: '5. WorkOS',
    category: 'Flagship Platform',
    role: "Africa's Work Operating System",
    tagline: 'Skills into Sellable Micro-Services',
    metrics: '$150k Monthly Task Fees Target',
    color: '#38BDF8',
    emissive: '#0284c7',
    size: 1.7,
    orbitRadius: 28,
    speed: 0.29,
    phase: 4.6,
    elevation: 0.5,
    pageRoute: 'bounties',
    description: "Autonomous freelance and work operating system where verified students take up tasks, deliver code, and receive instant payouts."
  },
  {
    id: 'trillionaresos',
    name: '6. TrillionaresOS',
    category: 'Flagship Platform',
    role: 'Trillion-Naira Economy Simulator',
    tagline: '7-Day Zero-to-Funded Pipeline',
    metrics: '$99/mo Tier • 1,000 Elite Founders',
    color: '#A855F7',
    emissive: '#7e22ce',
    size: 1.9,
    orbitRadius: 33,
    speed: 0.24,
    phase: 5.4,
    elevation: -0.7,
    pageRoute: 'dashboard',
    description: "High-level architectural business operating system that simulates market dynamics, investor term sheets, and unit economics."
  },
  {
    id: 'rich-connect',
    name: '7. Rich Connect + Matchmaking',
    category: 'Flagship Platform',
    role: 'AI Wealth Matchmaking & Sponsor Portal',
    tagline: 'LinkedIn + Tinder for Wealth Transfer',
    metrics: '$54.5k MRR Pipeline • 500 Enterprises',
    color: '#EC4899',
    emissive: '#be185d',
    size: 1.8,
    orbitRadius: 38,
    speed: 0.20,
    phase: 0.8,
    elevation: 0.9,
    pageRoute: 'partners',
    description: "Matches student founders to sponsors, corporate partners, and mentors based on algorithmic business DNA and verification."
  },
  {
    id: 'abau',
    name: '8. Africa Blockchain & AI Univ.',
    category: 'Flagship Platform',
    role: 'On-Chain Accreditation & Subnet',
    tagline: '100,000 Certified Youths',
    metrics: 'Verifiable NFT Certificates on Subnet',
    color: '#10B981',
    emissive: '#047857',
    size: 2.1,
    orbitRadius: 43,
    speed: 0.17,
    phase: 1.9,
    elevation: -0.4,
    pageRoute: 'university',
    description: "Decentralized university delivering cryptographically verifiable degrees, smart contract credentials, and on-chain mastery proof."
  },
  {
    id: 'uadc-protocol',
    name: '9. UADC Protocol (Universal Data Center)',
    category: 'Core Patent-Pending Protocol',
    role: '15 Monetization Engines & Idle Phone Mesh',
    tagline: 'Turns 50M Phones into Money Printers',
    metrics: '4,892 Entangled Devices • $1.2M Treasury',
    color: '#00FF88',
    emissive: '#00cc66',
    size: 2.2,
    orbitRadius: 48,
    speed: 0.14,
    phase: 2.9,
    elevation: 0.3,
    pageRoute: 'uadc-lab',
    description: "Distributed AI supercomputing network harvesting idle smartphone compute and bandwidth while paying students daily data dividends."
  },
  {
    id: 'nyaie',
    name: '10. NYAIE Workforce Pipeline',
    category: 'National Initiative',
    role: 'National Youth AI Engineering Program',
    tagline: '50,000 Nigerian Youths Trained',
    metrics: 'Federated Nationwide Campuses',
    color: '#60A5FA',
    emissive: '#2563eb',
    size: 1.6,
    orbitRadius: 53,
    speed: 0.12,
    phase: 4.1,
    elevation: -0.8,
    pageRoute: 'academy',
    description: "National initiative providing hands-on prompt architecture, agent workflows, and practical generative engineering skills."
  },
  {
    id: 'gkap',
    name: '11. GKAP Global Kids AI Program',
    category: 'Global STEM Initiative',
    role: 'AI Cognition for Kids Ages 8–16',
    tagline: '12 Pioneer Partner Schools',
    metrics: 'Youngest AI Creators in Africa',
    color: '#F43F5E',
    emissive: '#be123c',
    size: 1.4,
    orbitRadius: 58,
    speed: 0.10,
    phase: 5.1,
    elevation: 0.6,
    pageRoute: 'free',
    description: "Empowering young prodigies with intuitive AI concepts, ethical foundations, and creative digital entrepreneurship."
  }
];

export const Baa4DEcosystemHero: React.FC<Baa4DEcosystemHeroProps> = ({
  onNavigate,
  onSelectCourse
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interaction State
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetNode | null>(ECOSYSTEM_PLANETS[3]); // BAA Academy default
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetNode | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'4d' | 'orbital' | 'topdown'>('4d');
  const [showRings, setShowRings] = useState<boolean>(true);
  const [meshActiveCount, setMeshActiveCount] = useState<number>(4892);

  // Live Simulated Device Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setMeshActiveCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Three.js & WebGL Setup
  useEffect(() => {
    const container = mountRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020308, 0.012);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 300);
    camera.position.set(0, 32, 68);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 2. 4D Spacetime Hyperspace Shader Plane (Custom GLSL)
    const vertexShader4D = `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader4D = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_colorCore;
      uniform vec3 u_colorAux;
      varying vec2 vUv;
      varying vec3 vPosition;

      // 4D Rotation helper in GLSL
      vec4 rotate4D(vec4 p, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return vec4(
          p.x * c - p.w * s,
          p.y,
          p.z,
          p.x * s + p.w * c
        );
      }

      void main() {
        vec2 uv = (vUv - 0.5) * 2.0;
        float dist = length(uv);

        // 4D Coordinates projection: w evolves over time and radial distance
        vec4 p4 = vec4(uv.x, uv.y, sin(dist * 5.0 - u_time * 0.8) * 0.3, cos(dist * 3.0 + u_time * 0.6) * 0.4);
        vec4 rotated4 = rotate4D(p4, u_time * 0.35);

        // Hyper-toroidal resonance rings
        float wave = sin(length(rotated4.xyz) * 12.0 - u_time * 2.0 + rotated4.w * 4.0);
        float rings = smoothstep(0.85, 0.98, wave) * (1.0 - smoothstep(0.0, 1.4, dist));

        // Gravitational Core Glow
        float core = 0.08 / (dist * dist + 0.02);

        // Color blend: Gold (#FFD700), Neon Green (#00FF88), Deep Cosmic Dark
        vec3 col = mix(vec3(0.01, 0.02, 0.05), u_colorCore, core * 0.6);
        col += u_colorAux * rings * 0.45;

        // Subtle dynamic cyber grid lines
        vec2 grid = abs(fract(uv * 18.0 - 0.5) - 0.5) / fwidth(uv * 18.0);
        float line = 1.0 - min(min(grid.x, grid.y), 1.0);
        col += vec3(0.0, 0.3, 0.2) * line * 0.08 * (1.0 - dist);

        float alpha = clamp(core * 0.7 + rings * 0.5 + 0.15, 0.0, 0.95);
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const shaderMaterial4D = new THREE.ShaderMaterial({
      vertexShader: vertexShader4D,
      fragmentShader: fragmentShader4D,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_colorCore: { value: new THREE.Color('#FFD700') },
        u_colorAux: { value: new THREE.Color('#00FF88') }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const spacePlaneGeo = new THREE.PlaneGeometry(160, 160);
    const spacePlane = new THREE.Mesh(spacePlaneGeo, shaderMaterial4D);
    spacePlane.rotation.x = -Math.PI / 2;
    spacePlane.position.y = -6;
    scene.add(spacePlane);

    // 3. Central Star: The BAA-BILLIONAIRES Nucleus (Sun)
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    const sunGeo = new THREE.SphereGeometry(3.6, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffd700
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Glowing Corona Atmosphere
    const coronaGeo = new THREE.SphereGeometry(4.4, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunGroup.add(coronaMesh);

    // Outer Solar Flare Ring
    const flareRingGeo = new THREE.RingGeometry(4.6, 5.8, 64);
    const flareRingMat = new THREE.MeshBasicMaterial({
      color: 0xffe144,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const flareRing = new THREE.Mesh(flareRingGeo, flareRingMat);
    flareRing.rotation.x = Math.PI / 2;
    sunGroup.add(flareRing);

    // Central Point Light for realistic illumination
    const sunLight = new THREE.PointLight(0xfff5aa, 3.5, 180, 0.8);
    sunGroup.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x1a243b, 0.8);
    scene.add(ambientLight);

    // 4. Stardust Particles Cloud
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#FFD700'),
      new THREE.Color('#00FF88'),
      new THREE.Color('#00D4FF'),
      new THREE.Color('#FFFFFF')
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 8 + Math.random() * 64;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 14;

      particlePositions[i * 3] = Math.cos(theta) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(theta) * radius;

      const c = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const stardust = new THREE.Points(particleGeo, particleMat);
    scene.add(stardust);

    // 5. Build Orbit Rings & Planetary Meshes
    const planetMeshes: {
      mesh: THREE.Mesh;
      group: THREE.Group;
      node: PlanetNode;
      ringMesh: THREE.Line;
    }[] = [];

    const orbitRingsGroup = new THREE.Group();
    scene.add(orbitRingsGroup);

    ECOSYSTEM_PLANETS.forEach((node) => {
      // Orbit Line Ring
      const segments = 96;
      const ringPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(
          new THREE.Vector3(
            Math.cos(theta) * node.orbitRadius,
            node.elevation * 0.4,
            Math.sin(theta) * node.orbitRadius
          )
        );
      }
      const ringGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0.22
      });
      const ringLine = new THREE.Line(ringGeometry, ringMaterial);
      orbitRingsGroup.add(ringLine);

      // Planet Container Group
      const planetPivot = new THREE.Group();
      scene.add(planetPivot);

      // Planet Sphere Mesh
      const pGeo = new THREE.SphereGeometry(node.size, 32, 32);
      const pMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.emissive),
        emissiveIntensity: 0.35,
        roughness: 0.3,
        metalness: 0.6
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.userData = { nodeId: node.id };

      // Optional Ring for Large Gas Giant / Academy
      if (node.id === 'baa-academy' || node.id === 'uadc-protocol') {
        const pRingGeo = new THREE.RingGeometry(node.size * 1.4, node.size * 2.0, 32);
        const pRingMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(node.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending
        });
        const pRing = new THREE.Mesh(pRingGeo, pRingMat);
        pRing.rotation.x = Math.PI / 2.3;
        pMesh.add(pRing);
      }

      // Atmospheric Glow
      const glowGeo = new THREE.SphereGeometry(node.size * 1.35, 24, 24);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      pMesh.add(glowMesh);

      planetPivot.add(pMesh);

      planetMeshes.push({
        mesh: pMesh,
        group: planetPivot,
        node,
        ringMesh: ringLine
      });
    });

    // 6. Interactive Raycasting & Mouse Controls
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.38;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      if (isMouseDown) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.005;
        targetRotationX = Math.max(0.1, Math.min(1.2, targetRotationX + deltaY * 0.005));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isMouseDown = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isMouseDown = false;
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / width) * 2 - 1,
        -((e.clientY - rect.top) / height) * 2 + 1
      );

      raycaster.setFromCamera(clickMouse, camera);
      const meshesToIntersect = planetMeshes.map(p => p.mesh);
      const intersects = raycaster.intersectObjects(meshesToIntersect, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitId = hitMesh.userData?.nodeId;
        const found = ECOSYSTEM_PLANETS.find(p => p.id === hitId);
        if (found) {
          setSelectedPlanet(found);
        }
      }
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('click', onCanvasClick);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      shaderMaterial4D.uniforms.u_resolution.value.set(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update 4D Shader Uniform
      shaderMaterial4D.uniforms.u_time.value = elapsedTime;

      // Sun Pulsation & Rotation
      sunMesh.rotation.y += 0.008;
      coronaMesh.rotation.y -= 0.005;
      flareRing.rotation.z += 0.004;

      const sunScale = 1.0 + Math.sin(elapsedTime * 2.0) * 0.035;
      sunGroup.scale.set(sunScale, sunScale, sunScale);

      // Rotate Stardust
      stardust.rotation.y += 0.0006;

      // Camera Orbit Damping
      const camRadius = viewMode === 'topdown' ? 62 : 68;
      const targetCamY = viewMode === 'topdown' ? 58 : Math.sin(targetRotationX) * camRadius;
      const targetCamZ = viewMode === 'topdown' ? 2 : Math.cos(targetRotationX) * camRadius;

      camera.position.x = Math.sin(targetRotationY) * targetCamZ;
      camera.position.z = Math.cos(targetRotationY) * targetCamZ;
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.06);
      camera.lookAt(0, 0, 0);

      // Update Planet Positions along their orbits
      if (!isPaused) {
        planetMeshes.forEach(({ mesh, node }) => {
          const effectiveSpeed = node.speed * speedMultiplier;
          const currentAngle = node.phase + elapsedTime * 0.4 * effectiveSpeed;

          const px = Math.cos(currentAngle) * node.orbitRadius;
          const pz = Math.sin(currentAngle) * node.orbitRadius;
          const py = node.elevation * 0.5 + Math.sin(elapsedTime * 1.5 + node.phase) * 0.4;

          mesh.position.set(px, py, pz);
          mesh.rotation.y += 0.02;

          // Pulse scale on hover or select
          const isSelected = selectedPlanet?.id === node.id;
          const isHovered = hoveredPlanet?.id === node.id;
          const targetScale = isSelected ? 1.45 : isHovered ? 1.25 : 1.0;
          mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        });
      }

      // Check Hovered Planet via Raycaster
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.mesh), false);
      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData?.nodeId;
        const found = ECOSYSTEM_PLANETS.find(p => p.id === hitId);
        setHoveredPlanet(found || null);
        canvas.style.cursor = 'pointer';
      } else {
        setHoveredPlanet(null);
        canvas.style.cursor = isMouseDown ? 'grabbing' : 'grab';
      }

      // Toggle Orbit Rings Visibility
      orbitRingsGroup.visible = showRings;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('click', onCanvasClick);

      // Dispose Geometries & Materials
      spacePlaneGeo.dispose();
      shaderMaterial4D.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      flareRingGeo.dispose();
      flareRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      planetMeshes.forEach(p => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach(m => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
        p.ringMesh.geometry.dispose();
        (p.ringMesh.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, [speedMultiplier, isPaused, viewMode, showRings, selectedPlanet]);

  return (
    <div className="relative w-full rounded-3xl bg-black border border-zinc-800/80 overflow-hidden shadow-2xl font-sans select-none">
      {/* Dynamic Background Glow Lines */}
      <div className="absolute inset-0 bg-radial from-[#FFD700]/5 via-transparent to-black pointer-events-none" />

      {/* TOP HUD TELEMETRY BAR */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="font-bold text-white tracking-wider uppercase text-[11px] sm:text-xs">
              BAA 4D HYPER-ORBITAL ECOSYSTEM
            </span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline text-[11px]">
            11 Autonomous Celestial Engines
          </span>
        </div>

        {/* Real-Time Live Metrics Pills */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-[#00FF88]/40 text-[#00FF88]">
            <Cpu className="w-3 h-3" />
            <span>{meshActiveCount.toLocaleString()} Nodes Mesh</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/40 text-[#FFD700] hidden md:flex">
            <Coins className="w-3 h-3" />
            <span>10x BaaCoin Mined</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/60 border border-[#00D4FF]/40 text-[#00D4FF]">
            <Activity className="w-3 h-3 animate-spin-slow" />
            <span>4D Shader Live</span>
          </div>
        </div>
      </div>

      {/* MAIN 3D / 4D INTERACTIVE CANVAS VIEWPORT */}
      <div
        ref={mountRef}
        className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] bg-gradient-to-b from-[#02040a] via-[#010206] to-black cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Central Sun Brand Label Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
          <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-[#FFD700]/40 text-[10px] font-mono text-[#FFD700] uppercase tracking-widest font-bold shadow-lg">
            BAA SOVEREIGN NUCLEUS
          </div>
        </div>

        {/* Floating Quick Hint */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <Compass className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>Click any planet to inspect architecture • Drag to orbit 4D space</span>
        </div>

        {/* CAMERA & SIMULATION CONTROLS */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {/* View Perspective Buttons */}
          <div className="p-1 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('4d')}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono transition ${
                viewMode === '4d'
                  ? 'bg-[#00FF88] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              4D Angle
            </button>
            <button
              onClick={() => setViewMode('orbital')}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono transition ${
                viewMode === 'orbital'
                  ? 'bg-[#FFD700] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Orbit View
            </button>
            <button
              onClick={() => setViewMode('topdown')}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono transition ${
                viewMode === 'topdown'
                  ? 'bg-[#00D4FF] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Top Solar
            </button>
          </div>

          {/* Speed & Ring Controls */}
          <div className="p-1 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 flex items-center justify-between gap-1 text-[11px] font-mono">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
              title={isPaused ? 'Resume Simulation' : 'Pause Simulation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#00FF88]" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setSpeedMultiplier(s => (s === 1.0 ? 2.5 : s === 2.5 ? 0.5 : 1.0))}
              className="px-2 py-0.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-[#FFD700] transition"
            >
              {speedMultiplier}x
            </button>

            <button
              onClick={() => setShowRings(!showRings)}
              className={`p-1.5 rounded-lg transition ${showRings ? 'text-[#00FF88]' : 'text-zinc-500'}`}
              title="Toggle Orbital Rings"
            >
              <Orbit className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* HOVER TOOLTIP FLOATER */}
        {hoveredPlanet && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-[#00FF88]/40 shadow-xl max-w-xs space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: hoveredPlanet.color }}
              />
              <span className="text-xs font-bold text-white font-mono">
                {hoveredPlanet.name}
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 font-sans">{hoveredPlanet.tagline}</p>
            <div className="text-[10px] font-mono text-[#00FF88]">
              {hoveredPlanet.metrics}
            </div>
          </div>
        )}

        {/* SELECTED PLANET TELEMETRY CAPSULE (Framer Motion Drawer) */}
        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute bottom-4 right-4 z-20 w-[calc(100%-2rem)] sm:w-96 rounded-3xl bg-zinc-950/95 backdrop-blur-xl border-2 p-5 shadow-2xl text-left space-y-3"
              style={{ borderColor: selectedPlanet.color }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider font-bold block"
                    style={{ color: selectedPlanet.color }}
                  >
                    {selectedPlanet.category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {selectedPlanet.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="text-zinc-400 hover:text-white p-1 rounded-lg text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Tagline & Description */}
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {selectedPlanet.description}
              </p>

              {/* Role & Live Metric Box */}
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                  <span>Functional Role:</span>
                  <span className="text-white font-medium">{selectedPlanet.role}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">Live Metric / Traction:</span>
                  <span className="font-bold" style={{ color: selectedPlanet.color }}>
                    {selectedPlanet.metrics}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onNavigate(selectedPlanet.pageRoute);
                    if (selectedPlanet.pageRoute === 'academy' && onSelectCourse) {
                      onSelectCourse('course-1');
                    }
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl text-black font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                  style={{ backgroundColor: selectedPlanet.color }}
                >
                  <span>Teleport to Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('investor-one-pager')}
                  className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-xs font-mono transition"
                  title="View in Investor One-Pager"
                >
                  Deck
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QUICK PLANETARY SELECTOR CHIPS CAROUSEL */}
      <div className="px-4 sm:px-6 py-3 bg-zinc-950/90 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Orbit className="w-3 h-3 text-[#FFD700]" />
          <span>11 Engines:</span>
        </span>

        {ECOSYSTEM_PLANETS.map((planet) => {
          const isSelected = selectedPlanet?.id === planet.id;
          return (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-zinc-800 text-white border font-bold shadow-md'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-800/80'
              }`}
              style={isSelected ? { borderColor: planet.color } : {}}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span>{planet.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Baa4DEcosystemHero;
