import React, { useEffect, useRef } from 'react';
import { useAmbience } from '../context/AmbienceContext';

export const AmbienceBackground: React.FC = () => {
  const {
    backgroundType,
    canvasAnimation,
    primaryAccent,
    secondaryAccent,
    backgroundColor,
    videoOpacity,
    isVideoPlaying,
    currentConfig
  } = useAmbience();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas rendering loop
  useEffect(() => {
    if (backgroundType !== 'canvas' && backgroundType !== 'video') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 1. NEURAL NETWORK NODES
    // ==========================================
    const nodeCount = Math.min(65, Math.floor((width * height) / 18000));
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2
      });
    }

    // ==========================================
    // 2. AI CODE MATRIX STREAM
    // ==========================================
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    const chars = '01BAA10990EVMΩΨλπ∆∇∑$฿Ξ0123456789ABCDEF'.split('');

    // ==========================================
    // 3. CYBER PARTICLES
    // ==========================================
    const particleCount = 70;
    const particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedY: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.6 + 0.2
      });
    }

    // ==========================================
    // 4. DATA GRID (3D Perspective)
    // ==========================================
    let gridOffset = 0;

    // ==========================================
    // 5. COSMIC NEBULA
    // ==========================================
    const stars: { x: number; y: number; r: number; alpha: number; dAlpha: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        dAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    // ==========================================
    // VIDEO NETWORK SIMULATION (High-Tech Flow)
    // ==========================================
    let videoTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Handle Video Loop Simulation
      if (backgroundType === 'video') {
        if (isVideoPlaying) videoTime += 0.02;

        ctx.save();
        ctx.globalAlpha = videoOpacity;

        // Render synthetic high-fps holographic cyber loop
        const cx = width / 2;
        const cy = height / 2;

        // Outer pulsing rings
        for (let ring = 1; ring <= 5; ring++) {
          const r = ring * 120 + Math.sin(videoTime + ring) * 20;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = ring % 2 === 0 ? primaryAccent : secondaryAccent;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Rotating satellites on each ring
          const angle = videoTime * (0.4 / ring) + ring;
          const satX = cx + Math.cos(angle) * r;
          const satY = cy + Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(satX, satY, 4, 0, Math.PI * 2);
          ctx.fillStyle = primaryAccent;
          ctx.fill();
        }

        // Concentric scanning rays
        for (let i = 0; i < 8; i++) {
          const rayAngle = (i * Math.PI) / 4 + videoTime * 0.2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(rayAngle) * width, cy + Math.sin(rayAngle) * width);
          ctx.strokeStyle = `${primaryAccent}22`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Handle Canvas Mode
      if (canvasAnimation === 'neural') {
        // Draw Neural Nodes & Connecting Synapses
        ctx.fillStyle = primaryAccent;
        ctx.strokeStyle = primaryAccent;

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Draw node point
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const alpha = (1 - dist / 130) * 0.25;
              ctx.strokeStyle = primaryAccent.startsWith('#')
                ? `${primaryAccent}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
                : 'rgba(255, 215, 0, 0.15)';
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        }
      } else if (canvasAnimation === 'matrix') {
        // AI Code Stream Matrix Rain
        ctx.fillStyle = primaryAccent;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else if (canvasAnimation === 'particles') {
        // Cyber Dust Particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speedY;
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${primaryAccent}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      } else if (canvasAnimation === 'grid') {
        // 3D Perspective Cyber Grid
        gridOffset = (gridOffset + 0.4) % 40;
        ctx.strokeStyle = `${primaryAccent}26`;
        ctx.lineWidth = 1;

        // Horizontal lines converging
        const horizon = height * 0.45;
        for (let y = horizon; y <= height; y += 25) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Vertical perspective lines
        const vanishingX = width / 2;
        const totalLines = 26;
        for (let i = -totalLines; i <= totalLines; i++) {
          const bottomX = vanishingX + (i * width) / 12 + gridOffset;
          ctx.beginPath();
          ctx.moveTo(vanishingX, horizon);
          ctx.lineTo(bottomX, height);
          ctx.stroke();
        }
      } else if (canvasAnimation === 'nebula') {
        // Cosmic Nebula & Twinkling Stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.alpha += s.dAlpha;
          if (s.alpha > 0.8 || s.alpha < 0.1) s.dAlpha *= -1;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `${primaryAccent}${Math.floor(s.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }

        // Radial ambient nebula glows
        const gradient = ctx.createRadialGradient(
          width * 0.3,
          height * 0.3,
          50,
          width * 0.3,
          height * 0.3,
          width * 0.6
        );
        gradient.addColorStop(0, `${primaryAccent}15`);
        gradient.addColorStop(0.5, `${secondaryAccent}0A`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    backgroundType,
    canvasAnimation,
    primaryAccent,
    secondaryAccent,
    videoOpacity,
    isVideoPlaying
  ]);

  if (backgroundType === 'none') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Background Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: currentConfig.isLight ? 0.35 : 0.85 }}
      />

      {/* Cyber Mesh Overlay */}
      {backgroundType === 'mesh' && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${primaryAccent}18 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${secondaryAccent}15 0%, transparent 60%)`
          }}
        />
      )}
    </div>
  );
};

export default AmbienceBackground;
