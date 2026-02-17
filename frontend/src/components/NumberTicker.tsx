import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function NumberTicker({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
      if (ref.current) {
        // latest.toFixed(0) 앞에 Number()를 감싸서 숫자로 변환합니다.
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Number(latest.toFixed(0)) 
        );
      }
    }),
    [springValue]
  );

  return (
    <span
      className={className}
      ref={ref}
    />
  );
}