import { useState, useEffect, useCallback } from 'react';
import { DeviceHardwareSpecs, DeviceHardwareType } from '../types/udwn';

export function useDeviceHardwareDetection() {
  const [specs, setSpecs] = useState<DeviceHardwareSpecs>({
    cpuCores: 4,
    ramGb: 8,
    hasWebGL: true,
    hasWebGpu: false,
    osName: 'Unknown OS',
    networkDownlinkMbps: 10,
    estimatedLatencyMs: 45
  });

  const [hardwareType, setHardwareType] = useState<DeviceHardwareType>('laptop');
  const [isDetecting, setIsDetecting] = useState<boolean>(true);

  useEffect(() => {
    const detectHardware = async () => {
      const nav = typeof window !== 'undefined' ? window.navigator : ({} as any);
      const userAgent = nav.userAgent || '';

      // 1. Cores & Memory
      const cpuCores = nav.hardwareConcurrency || 4;
      const ramGb = (nav as any).deviceMemory || (cpuCores >= 8 ? 16 : 8);

      // 2. WebGL / GPU Renderer
      let gpuRenderer = 'Standard Integrated Graphics';
      let hasWebGL = false;
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          hasWebGL = true;
          const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            gpuRenderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || gpuRenderer;
          }
        }
      } catch {
        // canvas fallback
      }

      // 3. WebGPU
      const hasWebGpu = typeof nav.gpu !== 'undefined';

      // 4. OS & Hardware Type Detection
      let os = 'Desktop OS';
      let detectedType: DeviceHardwareType = 'laptop';

      const isAndroid = /Android/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      const isTV = /SmartTV|GoogleTV|HbbTV|BRAVIA|Android TV|CrKey|Tizen|Web0S/i.test(userAgent);
      const isMac = /Macintosh|Mac OS X/i.test(userAgent);
      const isWindows = /Windows/i.test(userAgent);
      const isLinux = /Linux/i.test(userAgent);

      if (isTV) {
        detectedType = 'smart_tv';
        os = 'Smart TV / Android TV OS';
      } else if (isAndroid) {
        detectedType = 'android_phone';
        os = 'Android Mobile';
      } else if (isIOS) {
        detectedType = 'ios_phone';
        os = 'iOS / iPadOS';
      } else if (isMac) {
        os = 'macOS';
        detectedType = cpuCores >= 12 ? 'workstation_gpu' : 'laptop';
      } else if (isWindows) {
        os = 'Windows 11 / 10';
        detectedType = gpuRenderer.toLowerCase().includes('nvidia') || gpuRenderer.toLowerCase().includes('rtx')
          ? 'workstation_gpu'
          : cpuCores >= 8 ? 'desktop' : 'laptop';
      } else if (isLinux) {
        os = 'Linux / Ubuntu Server';
        detectedType = cpuCores >= 16 ? 'server_cluster' : 'desktop';
      }

      // 5. Battery info
      let batteryLevel: number | undefined;
      let isCharging: boolean | undefined;
      try {
        if (typeof (nav as any).getBattery === 'function') {
          const battery = await (nav as any).getBattery();
          batteryLevel = Math.round(battery.level * 100);
          isCharging = battery.charging;
        }
      } catch {
        // battery API unsupported or permission denied
      }

      // 6. Network connection
      let networkDownlinkMbps = 15;
      try {
        const conn = (nav as any).connection;
        if (conn && conn.downlink) {
          networkDownlinkMbps = conn.downlink;
        }
      } catch {
        // network info fallback
      }

      const screenResolution = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '1920x1080';

      setSpecs({
        cpuCores,
        ramGb,
        gpuRenderer,
        hasWebGL,
        hasWebGpu,
        batteryLevel,
        isCharging,
        networkDownlinkMbps,
        estimatedLatencyMs: 38,
        osName: os,
        screenResolution
      });

      setHardwareType(detectedType);
      setIsDetecting(false);
    };

    detectHardware();
  }, []);

  // Real in-browser benchmarking function (runs real matrix operations and float calculations)
  const runLiveBenchmark = useCallback(async (): Promise<{ flopsGiga: number; score: number }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = performance.now();
        let ops = 0;
        // Run computation test of floating point matrix-like iterations
        const size = 150;
        const a = new Float64Array(size * size);
        const b = new Float64Array(size * size);
        for (let i = 0; i < size * size; i++) {
          a[i] = Math.sin(i) * 0.5;
          b[i] = Math.cos(i) * 0.5;
        }

        for (let iter = 0; iter < 15; iter++) {
          for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
              let sum = 0;
              for (let k = 0; k < size; k++) {
                sum += a[i * size + k] * b[k * size + j];
                ops += 2; // multiply and add
              }
            }
          }
        }

        const elapsedMs = Math.max(1, performance.now() - start);
        // Estimate GigaFLOPS
        const gigaFlops = +((ops / (elapsedMs / 1000)) / 1e9).toFixed(2);
        // Normalized score from 50 to 98
        const score = Math.min(99, Math.max(52, Math.round(55 + gigaFlops * 8 + (specs.cpuCores * 2.5))));

        resolve({
          flopsGiga: Math.max(1.2, gigaFlops),
          score
        });
      }, 50);
    });
  }, [specs.cpuCores]);

  return {
    specs,
    hardwareType,
    isDetecting,
    runLiveBenchmark
  };
}
