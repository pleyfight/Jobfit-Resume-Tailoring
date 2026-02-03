'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorSize, setCursorSize] = useState<'small' | 'medium' | 'large'>('small');
  
  // Position refs for smooth animation
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>();

  useEffect(() => {
    // Don't run on touch devices or mobile
    if (typeof window === 'undefined') return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 768;
    if (isTouch || isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Smooth position animation loop
    const animate = () => {
      // Lerp position for smooth trailing
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      // Apply transform
      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      
      animationId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Setup hover detection for interactive elements
    const setupHoverListeners = () => {
      // Large hover targets - headlines, hero text
      const largeTargets = document.querySelectorAll(
        '.hero-headline, [data-cursor="large"], h1, h2'
      );
      
      // Medium hover targets - buttons, links, nav items
      const mediumTargets = document.querySelectorAll(
        'a, button, [role="button"], [data-cursor="medium"], nav a'
      );

      largeTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorSize('large'));
        el.addEventListener('mouseleave', () => setCursorSize('small'));
      });

      mediumTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorSize('medium'));
        el.addEventListener('mouseleave', () => setCursorSize('small'));
      });
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Setup hover listeners
    setupHoverListeners();

    // Re-setup on DOM changes
    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Start animation loop
    animationId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationId.current) cancelAnimationFrame(animationId.current);
      observer.disconnect();
    };
  }, [isVisible]);

  // Don't render on touch/mobile
  if (typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768)) {
    return null;
  }

  // Size classes using Tailwind
  const sizeClasses = {
    small: 'w-3 h-3',      // 12px
    medium: 'w-10 h-10',   // 40px  
    large: 'w-24 h-24',    // 96px
  };

  return (
    <>
      <div
        ref={cursorRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9999]
          rounded-full bg-white mix-blend-difference
          transition-[width,height,opacity] duration-300 ease-out
          ${sizeClasses[cursorSize]}
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ willChange: 'transform' }}
      />

      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) and (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
