import { useEffect, useRef } from "react";

export default function BugsOverlay({
  count = 12,
  maxSpeed = 0.38,
  zIndex = 20,

  // Kill-all behavior
  killAllOnFirstTouch = true,
  respawnAllAfterMs = 2500, // pune 0 ca să NU mai reapară
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const bugsRef = useRef([]);
  const killedAllRef = useRef(false);
  const killAllAtRef = useRef(0);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    const makeBug = () => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.15, maxSpeed);
      return {
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: rand(0.6, 1.1),

        dying: false,
        deathStart: 0,
      };
    };

    const init = () => {
      bugsRef.current = Array.from({ length: count }, makeBug);
      killedAllRef.current = false;
      killAllAtRef.current = 0;
    };

    const killAll = (t) => {
      if (killedAllRef.current) return;
      killedAllRef.current = true;
      killAllAtRef.current = t;

      for (const b of bugsRef.current) {
        b.dying = true;
        b.deathStart = t + rand(0, 120); // mic stagger random ca să arate natural
        b.vx = 0;
        b.vy = 0;
      }
    };

    const onFirstTouch = () => {
      if (!killAllOnFirstTouch) return;
      killAll(performance.now());

      // după primul tap nu mai ascultăm (dacă vrei 1 singur trigger)
      window.removeEventListener("pointerdown", onFirstTouch);
      window.removeEventListener("touchstart", onFirstTouch);
    };

    // ascultăm global (canvas are pointer-events none)
    window.addEventListener("pointerdown", onFirstTouch, { passive: true });
    window.addEventListener("touchstart", onFirstTouch, { passive: true });

    const drawBug = (b, t) => {
      ctx.save();
      ctx.translate(b.x, b.y);

      // orientare normală (dacă e în mișcare)
      let rotation = Math.atan2(b.vy, b.vx) + Math.PI / 2;
      let alpha = 1;

      if (b.dying) {
        const dt = t - b.deathStart;

        // înainte de stagger: nu desenăm încă (ca să se simtă "wave")
        if (dt < 0) {
          ctx.restore();
          return;
        }

        // 0–350ms: răsturnare 180°
        if (dt < 350) rotation += (dt / 350) * Math.PI;
        else rotation += Math.PI;

        // 350–900ms: tremurat pe spate
        if (dt >= 350 && dt < 900) {
          const shake = Math.sin(t * 0.08) * 2.2;
          ctx.translate(shake, 0);
        }

        // 900–1200ms: fade out
        if (dt >= 900) alpha = 1 - (dt - 900) / 300;

        // după 1200ms sunt “morți” (invizibili)
        if (dt >= 1200) alpha = 0;
      }

      ctx.rotate(rotation);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

      const s = b.size;
      const bodyW = 10 * s;
      const bodyH = 16 * s;

      // body
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.beginPath();
      ctx.ellipse(0, 0, bodyW * 0.6, bodyH * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();

      // head
      ctx.beginPath();
      ctx.arc(0, -bodyH * 0.6, 4 * s, 0, Math.PI * 2);
      ctx.fill();

      // legs (ridicate când sunt morți)
      ctx.strokeStyle = "rgba(0,0,0,0.6)";
      ctx.lineWidth = 1.6 * s;
      const legLift = b.dying ? -6 * s : 4;

      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(-bodyW * 0.3, i * 4 * s);
        ctx.lineTo(-bodyW, i * 4 * s + legLift);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bodyW * 0.3, i * 4 * s);
        ctx.lineTo(bodyW, i * 4 * s + legLift);
        ctx.stroke();
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const tick = (t) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // mișcare doar dacă nu sunt dying
      for (const b of bugsRef.current) {
        if (!b.dying) {
          b.x += b.vx;
          b.y += b.vy;

          const pad = 30;
          if (b.x < -pad) b.x = w + pad;
          if (b.x > w + pad) b.x = -pad;
          if (b.y < -pad) b.y = h + pad;
          if (b.y > h + pad) b.y = -pad;
        }

        drawBug(b, t);
      }

      // respawn global (opțional)
      if (killedAllRef.current && respawnAllAfterMs > 0) {
        const dtAll = t - killAllAtRef.current;
        if (dtAll > respawnAllAfterMs) {
          init(); // repornește tot swarm-ul
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    init();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onFirstTouch);
      window.removeEventListener("touchstart", onFirstTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count, maxSpeed, killAllOnFirstTouch, respawnAllAfterMs]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
      }}
    />
  );
}

