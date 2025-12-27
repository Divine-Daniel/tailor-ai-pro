import React, { useEffect } from 'react';

/**
 * Snowfall component that creates a "Let it snow" effect.
 * Attaches to #snow-root in index.html to avoid re-renders interfering with React UI.
 */
const Snowfall: React.FC = () => {
  useEffect(() => {
    const snowContainer = document.getElementById('snow-root');
    if (!snowContainer) return;

    // Limit active snowflakes for performance
    const MAX_SNOWFLAKES = 50;
    let count = 0;

    const createSnowflake = () => {
      if (count >= MAX_SNOWFLAKES) return;
      
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      count++;
      
      const size = Math.random() * 3 + 1 + 'px';
      snowflake.style.width = size;
      snowflake.style.height = size;
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.opacity = (Math.random() * 0.6 + 0.2).toString();
      
      const duration = Math.random() * 8 + 6; // slow fall
      const drift = (Math.random() * 150 - 75) + 'px';
      
      const animation = snowflake.animate([
        { transform: `translateY(-20px) translateX(0px)`, opacity: 0 },
        { transform: `translateY(10vh) translateX(${parseInt(drift)/10}px)`, opacity: 0.8, offset: 0.1 },
        { transform: `translateY(110vh) translateX(${drift}px)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'linear'
      });

      snowContainer.appendChild(snowflake);

      animation.onfinish = () => {
        snowflake.remove();
        count--;
      };
    };

    const interval = setInterval(createSnowflake, 400);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Snowfall;