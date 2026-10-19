import React, { useRef, useEffect } from 'react';

export const HeroSphere: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 500;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D sphere points
    const numPoints = 140;
    const points: { x: number; y: number; z: number; ox: number; oy: number; oz: number }[] = [];
    const radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      points.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    let angleX = 0;
    let angleY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 0.001;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 0.001;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += 0.005 + mouseY;
      angleY += 0.007 + mouseX;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projectedPoints: { x: number; y: number; z: number; scale: number }[] = [];

      // Rotate points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Rotate around Y
        let x1 = p.ox * cosY - p.oz * sinY;
        let z1 = p.oz * cosY + p.ox * sinY;
        // Rotate around X
        let y2 = p.oy * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.oy * sinX;

        const fov = 400;
        const scale = fov / (fov + z2);
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y2 * scale;

        projectedPoints.push({ x: px, y: py, z: z2, scale });
      }

      // Draw connective neural lines
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const dx = projectedPoints[i].x - projectedPoints[j].x;
          const dy = projectedPoints[i].y - projectedPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 46) {
            const alpha = (1 - dist / 46) * 0.35;
            ctx.strokeStyle = i % 2 === 0 ? `rgba(255, 215, 0, ${alpha})` : `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        const pointSize = Math.max(1, p.scale * 2.8);
        const alpha = Math.max(0.2, (p.z + radius) / (radius * 2));

        ctx.fillStyle = i % 3 === 0 ? `rgba(255, 215, 0, ${alpha})` : `rgba(0, 212, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glowing Golden Core in center
      const coreGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius * 0.7);
      coreGrad.addColorStop(0, 'rgba(255, 215, 0, 0.18)');
      coreGrad.addColorStop(0.5, 'rgba(0, 212, 255, 0.08)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Outer Electric Blue Ring
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(angleY * 0.5);
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.25, radius * 0.45, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
export default HeroSphere;
