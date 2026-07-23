/**
 * @file useLockScene.ts
 * @description Custom hook encapsulating the Three.js and GSAP ScrollTrigger lifecycle for the 3D Lock animation.
 */

import { useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION_PHASES, LAYOUT_CONFIG } from "@/constants/animation";

gsap.registerPlugin(ScrollTrigger);

interface UseLockSceneProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvasWrapRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Custom hook to initialize and manage the Three.js 3D lock canvas and GSAP scroll timelines.
 * 
 * @param props References to the canvas, wrappers, and scroll containers
 * @returns The current scroll progress decimal value (0.0 to 1.0)
 */
export function useLockScene({
  canvasRef,
  viewportRef,
  containerRef,
  canvasWrapRef
}: UseLockSceneProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !viewportRef.current || !containerRef.current || !canvasWrapRef.current) return;

    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    const container = containerRef.current;
    const canvasWrap = canvasWrapRef.current;

    const width = canvasWrap.clientWidth || window.innerWidth || 800;
    const height = canvasWrap.clientHeight || window.innerHeight || 600;
    const aspect = width / height;

    // ─── Scene Setup ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x6FAFDE, 0.022);

    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // ─── Environment Mapping ──────────────────────────────────────────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    const skyGeo = new THREE.SphereGeometry(10, 16, 16);
    envScene.add(
      new THREE.Mesh(
        skyGeo,
        new THREE.MeshBasicMaterial({
          color: 0x7BB7E5,
          side: THREE.BackSide,
        })
      )
    );

    const cardGeo = new THREE.PlaneGeometry(4, 4);

    // Left cool blue reflection
    const indigoCard = new THREE.Mesh(cardGeo, new THREE.MeshBasicMaterial({ color: 0x294B80 }));
    indigoCard.position.set(-6, 6, -4);
    indigoCard.lookAt(0, 0, 0);
    envScene.add(indigoCard);

    // Right accent reflection (cyan)
    const aquaCard = new THREE.Mesh(cardGeo, new THREE.MeshBasicMaterial({ color: 0x5EA9DE }));
    aquaCard.position.set(6, -2, 3);
    aquaCard.lookAt(0, 0, 0);
    envScene.add(aquaCard);

    // Bottom navy reflection
    const navyCard = new THREE.Mesh(cardGeo, new THREE.MeshBasicMaterial({ color: 0x1F3557 }));
    navyCard.position.set(-3, -4, 5);
    navyCard.lookAt(0, 0, 0);
    envScene.add(navyCard);

    // Top fill for premium reflections
    const topBlueCard = new THREE.Mesh(cardGeo, new THREE.MeshBasicMaterial({ color: 0x4474BB }));
    topBlueCard.position.set(0, 8, 2);
    topBlueCard.lookAt(0, 0, 0);
    envScene.add(topBlueCard);

    const envTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // ─── Materials ────────────────────────────────────────────────────────
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1f3557,
      metalness: 0.92,
      roughness: 0.14,
      envMapIntensity: 2.4,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xc8d4e4,
      metalness: 0.99,
      roughness: 0.03,
      envMapIntensity: 2.8,
    });
    const voidMat = new THREE.MeshStandardMaterial({
      color: 0x1f2f47,
      metalness: 0.05,
      roughness: 0.95,
    });


    // Radial gradient alpha map to fade the floor plane towards its edges
    const canvasAlpha = document.createElement("canvas");
    canvasAlpha.width = 128;
    canvasAlpha.height = 128;
    const ctxAlpha = canvasAlpha.getContext("2d");
    if (ctxAlpha) {
      const grad = ctxAlpha.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(255, 255, 255, 0.9)");
      grad.addColorStop(0.75, "rgba(255, 255, 255, 0.35)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctxAlpha.fillStyle = grad;
      ctxAlpha.fillRect(0, 0, 128, 128);
    }
    const alphaTexture = new THREE.CanvasTexture(canvasAlpha);

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xbdede0,
      metalness: 0.15,
      roughness: 0.75,
      envMapIntensity: 0.15,
      alphaMap: alphaTexture,
      transparent: true,
    });

    // ─── Lock Mesh Assembly ───────────────────────────────────────────────
    const lockGroup = new THREE.Group();
    scene.add(lockGroup);

    // Rounded rectangle extruded lock body
    const bW = 2.2, bH = 1.85, bR = 0.32;
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(-bW / 2 + bR, -bH / 2);
    bodyShape.lineTo(bW / 2 - bR, -bH / 2);
    bodyShape.quadraticCurveTo(bW / 2, -bH / 2, bW / 2, -bH / 2 + bR);
    bodyShape.lineTo(bW / 2, bH / 2 - bR);
    bodyShape.quadraticCurveTo(bW / 2, bH / 2, bW / 2 - bR, bH / 2);
    bodyShape.lineTo(-bW / 2 + bR, bH / 2);
    bodyShape.quadraticCurveTo(-bW / 2, bH / 2, -bW / 2, bH / 2 - bR);
    bodyShape.lineTo(-bW / 2, -bH / 2 + bR);
    bodyShape.quadraticCurveTo(-bW / 2, -bH / 2, -bW / 2 + bR, -bH / 2);

    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.72,
      bevelEnabled: true,
      bevelSegments: 10,
      bevelSize: 0.09,
      bevelThickness: 0.09,
    });
    bodyGeo.center();
    const lockBody = new THREE.Mesh(bodyGeo, bodyMat);
    lockBody.castShadow = true;
    lockBody.receiveShadow = true;
    lockGroup.add(lockBody);

    // Shackle arch
    const shackleRadius = 0.58;
    const shackleBaseY = 0.28;
    const shackleArcY = 1.0;
    const shacklePoints: THREE.Vector3[] = [];
    shacklePoints.push(new THREE.Vector3(-shackleRadius, shackleBaseY, 0));
    shacklePoints.push(new THREE.Vector3(-shackleRadius, shackleArcY, 0));
    for (let i = 0; i <= 48; i++) {
      const theta = Math.PI - (i / 48) * Math.PI;
      shacklePoints.push(new THREE.Vector3(
        Math.cos(theta) * shackleRadius,
        shackleArcY + Math.sin(theta) * shackleRadius * 1.1,
        0
      ));
    }
    shacklePoints.push(new THREE.Vector3(shackleRadius, shackleArcY, 0));
    shacklePoints.push(new THREE.Vector3(shackleRadius, shackleBaseY, 0));

    const shackleMesh = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(shacklePoints), 96, 0.115, 22, false),
      chromeMat
    );
    shackleMesh.castShadow = true;
    lockGroup.add(shackleMesh);

    // Keyhole Chrome Face-Plate
    const plateGeo = new THREE.CylinderGeometry(0.30, 0.30, 0.04, 48);
    plateGeo.rotateX(Math.PI / 2);
    const plateMesh = new THREE.Mesh(plateGeo, chromeMat);
    plateMesh.position.set(0, -0.18, 0.41);
    lockGroup.add(plateMesh);



    // Keyhole Slot Void
    const keyholeGroup = new THREE.Group();
    keyholeGroup.position.set(0, -0.18, 0.445);

    const slotCircle = new THREE.Mesh(
      (() => { const g = new THREE.CylinderGeometry(0.065, 0.065, 0.03, 24); g.rotateX(Math.PI / 2); return g; })(),
      voidMat
    );
    slotCircle.position.set(0, 0.062, 0);
    keyholeGroup.add(slotCircle);

    const slotRect = new THREE.Mesh(
      new THREE.BoxGeometry(0.044, 0.13, 0.03),
      voidMat
    );
    slotRect.position.set(0, -0.032, 0);
    keyholeGroup.add(slotRect);
    lockGroup.add(keyholeGroup);

    // ─── Key Mesh Assembly ────────────────────────────────────────────────
    const keyGroup = new THREE.Group();
    lockGroup.add(keyGroup);

    const bowTorus = new THREE.Mesh(
      new THREE.TorusGeometry(0.295, 0.10, 26, 72),
      chromeMat
    );
    bowTorus.castShadow = true;
    keyGroup.add(bowTorus);

    const bowDisk = new THREE.Mesh(
      (() => { const g = new THREE.CylinderGeometry(0.20, 0.20, 0.06, 48); g.rotateX(Math.PI / 2); return g; })(),
      new THREE.MeshStandardMaterial({ color: 0x1f3557, metalness: 0.92, roughness: 0.14, envMapIntensity: 2.2 })
    );
    keyGroup.add(bowDisk);

    keyGroup.add(new THREE.Mesh(
      new THREE.TorusGeometry(0.105, 0.05, 14, 48),
      new THREE.MeshStandardMaterial({ color: 0x2f476a, metalness: 0.0, roughness: 1.0 })
    ));

    const shaft = new THREE.Mesh(
      (() => { const g = new THREE.CylinderGeometry(0.058, 0.058, 1.45, 28); g.rotateX(Math.PI / 2); return g; })(),
      chromeMat
    );
    shaft.castShadow = true;
    shaft.position.set(0, 0, -0.725);
    keyGroup.add(shaft);

    const tipCap = new THREE.Mesh(new THREE.SphereGeometry(0.058, 16, 16), chromeMat);
    tipCap.position.set(0, 0, -1.45);
    keyGroup.add(tipCap);

    const teethRoot = new THREE.Group();
    teethRoot.position.set(0, 0, -1.12);
    const teethDefs = [
      { h: 0.14, z: 0.0 },
      { h: 0.08, z: 0.13 },
      { h: 0.12, z: 0.26 },
      { h: 0.06, z: 0.39 },
    ];
    for (const t of teethDefs) {
      const tooth = new THREE.Mesh(
        new THREE.BoxGeometry(0.044, t.h, 0.10),
        chromeMat
      );
      tooth.position.set(0, -(0.058 + t.h / 2), t.z);
      tooth.castShadow = true;
      teethRoot.add(tooth);
    }
    keyGroup.add(teethRoot);

    // Floor Plane
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.75;
    floor.receiveShadow = true;
    scene.add(floor);

    // ─── Studio Lighting Setup ────────────────────────────────────────────
    const spotMain = new THREE.SpotLight(0xffffff, 55, 20, Math.PI / 6.5, 0.28, 1.0);
    spotMain.position.set(-5, 8, 6);
    spotMain.castShadow = true;
    spotMain.shadow.mapSize.set(2048, 2048);
    spotMain.shadow.bias = -0.001;
    scene.add(spotMain);

    // Icy Aqua rim light from right
    const rimAqua = new THREE.DirectionalLight(0x37c8a1, 2.8);
    rimAqua.position.set(6, 1, -3);
    scene.add(rimAqua);

    // Twilight Indigo fill light from left
    const fillIndigo = new THREE.DirectionalLight(0x294570, 4.5);
    fillIndigo.position.set(-5, -1, 3);
    scene.add(fillIndigo);

    // Dedicated keyhole spotlight (Icy Aqua)
    const keyholeSpot = new THREE.SpotLight(0x5fd3b4, 10, 8, Math.PI / 9, 0.5, 1.2);
    keyholeSpot.position.set(0.4, 0.4, 4.5);
    keyholeSpot.target.position.set(0, -0.18, 0.44);
    scene.add(keyholeSpot);
    scene.add(keyholeSpot.target);

    // Back depth light
    const backDepthLight = new THREE.PointLight(0x365c96, 4, 14);
    backDepthLight.position.set(0, 3, -4);
    scene.add(backDepthLight);

    // Soft floor glow
    const floorGlow = new THREE.PointLight(0x1f3557, 5.5, 10);
    floorGlow.position.set(0, -1.2, 0.5);
    scene.add(floorGlow);

    // Keyhole unlock glow (emissive dynamic light source)
    const unlockGlow = new THREE.PointLight(0x37c8a1, 0, 5);
    unlockGlow.position.set(0, -0.18, 0.6);
    scene.add(unlockGlow);

    scene.add(new THREE.AmbientLight(0x7BB7E5, 0.16));

    // ─── Responsive Layout Calculations ───────────────────────────────────
    const updateLayout = () => {
      const w = canvasWrap.clientWidth || window.innerWidth || 800;
      const h = canvasWrap.clientHeight || window.innerHeight || 600;
      const aspect = w / h;
      const isMobile = aspect < LAYOUT_CONFIG.MOBILE_ASPECT_RATIO_LIMIT;

      const scale = isMobile ? LAYOUT_CONFIG.MOBILE_SCALE : LAYOUT_CONFIG.DESKTOP_SCALE;
      const posX = isMobile ? LAYOUT_CONFIG.MOBILE_POS_X : LAYOUT_CONFIG.DESKTOP_POS_X;
      const posY = isMobile ? LAYOUT_CONFIG.MOBILE_POS_Y : LAYOUT_CONFIG.DESKTOP_POS_Y;

      lockGroup.scale.setScalar(scale);
      lockGroup.position.set(posX, posY, 0);
    };
    updateLayout();

    // Default angle for aesthetic display
    lockGroup.rotation.set(0.09, 0.64, 0);

    // Starting position of key (suspended back in space)
    keyGroup.position.set(0, -0.18, 2.6);
    keyGroup.rotation.set(0, 0, 0);

    // ─── Mouse Movement Parallax ──────────────────────────────────────────
    let mouseX = 0, mouseY = 0, tMX = 0, tMY = 0;
    const onMouseMove = (e: MouseEvent) => {
      tMX = (e.clientX / window.innerWidth - 0.5) * 0.22;
      tMY = -(e.clientY / window.innerHeight - 0.5) * 0.18;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ─── GSAP ScrollTrigger Configuration ─────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        // "bottom top": pin releases the instant the container's bottom edge reaches the
        // viewport's top edge — the next section is immediately visible with zero dead zone.
        end: "bottom top",
        scrub: 1.2,
        pin: viewport,
        onUpdate: (self) => setScrollProgress(self.progress),
      }
    });

    // Phase 1 (0.00 -> PHASE_1_END): Slide key forward from deep Z space
    tl.to(keyGroup.position, { x: 0, y: -0.18, z: 1.35, ease: "power1.inOut" }, 0);
    tl.to(keyGroup.rotation, { x: 0, y: 0, z: 0, ease: "power1.inOut" }, 0);

    // Phase 2 (PHASE_1_END -> PHASE_2_END): Insert key tip into cylinder core
    tl.to(keyGroup.position, { z: 0.445, ease: "power1.inOut" }, ANIMATION_PHASES.PHASE_1_END);

    // Phase 3 (PHASE_2_END -> PHASE_3_END): Rotate key 90 degrees clockwise (z rotation)
    tl.to(keyGroup.rotation, { z: Math.PI / 2, ease: "power2.inOut" }, ANIMATION_PHASES.PHASE_2_END);

    // Phase 4 (PHASE_3_END -> PHASE_4_END): Pop shackle hinge, tilt, turn on neon glows
    tl.to(shackleMesh.position, { y: 0.38, ease: "back.out(2.5)" }, ANIMATION_PHASES.PHASE_3_END);
    tl.to(shackleMesh.rotation, { z: -0.12, ease: "power1.out" }, ANIMATION_PHASES.PHASE_3_END);
    tl.to(unlockGlow, { intensity: 25, ease: "power1.out" }, ANIMATION_PHASES.PHASE_3_END);


    // ─── Render loop animation frame ──────────────────────────────────────
    let raf: number;
    const tick = () => {
      // Linear interpolation (lerp) mouse movement for buttery smoothing
      mouseX += (tMX - mouseX) * 0.045;
      mouseY += (tMY - mouseY) * 0.045;
      camera.position.x = mouseX;
      camera.position.y = 0.4 + mouseY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // ─── Resize listener ──────────────────────────────────────────────────
    const onResize = () => {
      // Use visualViewport dimensions on mobile to handle dynamic address-bar height changes
      const vv = window.visualViewport;
      const w = vv ? Math.round(vv.width) : (canvasWrap.clientWidth || window.innerWidth || 800);
      const h = vv ? Math.round(vv.height) : (canvasWrap.clientHeight || window.innerHeight || 600);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateLayout();
    };
    window.addEventListener("resize", onResize);
    // visualViewport fires on mobile when address bar shows/hides (different from window.resize)
    window.visualViewport?.addEventListener("resize", onResize);

    // ─── Component Teardown / Resource Disposal ───────────────────────────
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      
      tl.scrollTrigger?.kill();
      tl.kill();
      
      envTarget.dispose();
      alphaTexture.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [canvasRef, viewportRef, containerRef, canvasWrapRef]);

  return scrollProgress;
}
