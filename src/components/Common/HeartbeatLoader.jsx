import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import heartbeatAnimation from "../../assets/animations/heartbeat.json";

export default function HeartbeatLoader({
  size = 220,
  className = "",
  loop = true,
  speed = 1,
  autoplay = true,
  onComplete,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop,
      autoplay,
      animationData: heartbeatAnimation,
    });

    animation.setSpeed(speed);

    if (onComplete) {
      animation.addEventListener("complete", onComplete);
    }

    return () => {
      if (onComplete) {
        animation.removeEventListener("complete", onComplete);
      }
      animation.destroy();
    };
  }, [loop, speed, autoplay, onComplete]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        ref={containerRef}
        style={{
          width: size,
          height: size * (157 / 330),
        }}
      />
    </div>
  );
}
