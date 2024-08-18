import { motion } from "framer-motion";

const Logo = () => {
  /*const svgVariants = {
    initial: { rotate: -180 },
    animate: {
      rotate: 0,
      transition: {
        duration: 3,
      },
    },
  };*/
  const pathVariants = {
    initial: {
      pathLength: 0,
    },
    animate: {
      pathLength: 1,
      transition: {
        duration: 2,
      },
    },
  };
  return (
    <svg
      width="46"
      height="38"
      viewBox="0 0 46 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M22.4161 36.2638C15.349 31.4173 1.21484 19.8242 1.21484 12.2242C1.21484 2.72418 9.9618 1.16026 11.41 1.16016C16.913 1.15975 20.2728 4.86737 22.4161 7.64796C23.8449 5.48536 27.8496 1.16016 32.4374 1.16016C36.4923 1.16016 43.3856 3.76686 43.6173 12.2242C43.6173 14.4004 42.354 17.008 40.4295 19.6967"
        stroke="#01AF96"
        strokeWidth="1.85366"
        strokeLinecap="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <path
        d="M26.4141 25.8359V36.0311"
        stroke="#C7231F"
        stroke-width="2.66463"
        stroke-linecap="round"
      />
      <path
        d="M31.2812 28.7891V36.0299"
        stroke="#C7231F"
        stroke-width="2.66463"
        stroke-linecap="round"
      />
      <path
        d="M36.1445 17.668V36.0308"
        stroke="#C7231F"
        stroke-width="2.66463"
        stroke-linecap="round"
      />
      <path
        d="M41.0117 23.5781V36.0324"
        stroke="#C7231F"
        stroke-width="2.66463"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Logo;
