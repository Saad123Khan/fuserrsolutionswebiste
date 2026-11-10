import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the top of the viewport showing page scroll progress. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
    />
  );
}
