import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const useCountUp = (end, duration, startAnimation) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const increment = end / (duration * 60); // Calculate increment per frame (assuming 60fps)
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(handle);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60); // Run at 60fps

    return () => clearInterval(handle);
  }, [end, duration, startAnimation]);

  return count;
};

const StatsSection = () => {
  const duration = 2; // Duration of the count-up animation in seconds
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const projectsCount = useCountUp(15, duration, isInView);
  const villagesCount = useCountUp(15, duration, isInView);
  const fedCount = useCountUp(15, duration, isInView);

  return (
    <section ref={ref} className="bg-darkGreen py-8 sm:mt-[150px] mt-12 sm:h-40 h-96">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 text-center text-white gap-14 sm:gap-4">
        {/* Statistic 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1.0 }}
        >
          <h3 className="text-3xl font-bold">{projectsCount}+</h3>
          <p className="text-lg">Projecten</p>
        </motion.div>

        {/* Statistic 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1.0 }}
        >
          <h3 className="text-3xl font-bold">{villagesCount}+</h3>
          <p className="text-lg">Dorpen</p>
        </motion.div>

        {/* Statistic 3 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1.0 }}
        >
          <h3 className="text-3xl font-bold">{fedCount}+</h3>
          <p className="text-lg">Arme gevoed</p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;