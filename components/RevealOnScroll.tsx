
import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface RevealOnScrollProps {
    children: ReactNode;
    delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                   setTimeout(() => {
                     setIsVisible(true);
                     scrollObserver.unobserve(entry.target);
                   }, delay)
                }
            },
            {
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.01,
            }
        );
        
        if (ref.current) {
            scrollObserver.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                scrollObserver.unobserve(ref.current);
            }
        };
    }, [delay]);

    return (
        <div ref={ref} className={`reveal-on-scroll ${isVisible ? 'visible' : ''}`}>
            {children}
        </div>
    );
};

export default RevealOnScroll;
