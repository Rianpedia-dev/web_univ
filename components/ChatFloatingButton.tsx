"use client";

import { motion, useAnimation, PanInfo, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useRef, useState, useEffect } from 'react';

interface ChatFloatingButtonProps {
    onClick: () => void;
    isOpen: boolean;
}

export function ChatFloatingButton({ onClick, isOpen }: ChatFloatingButtonProps) {
    const controls = useAnimation();
    const [isDragging, setIsDragging] = useState(false);
    const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

    // Use MotionValues for smoother, unthrottled movement during drag
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Create spring-animated versions of the coordinates for the "snap" effect
    const springConfig = { stiffness: 500, damping: 35, mass: 0.8 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const updateConstraints = () => {
            const buttonSize = 128; // w-32
            const margin = 16;
            const initialRightPosition = 32; // from right-8

            setConstraints({
                left: -(window.innerWidth - buttonSize - margin - initialRightPosition),
                right: initialRightPosition,
                top: -(window.innerHeight - buttonSize - margin - initialRightPosition),
                bottom: initialRightPosition
            });
        };

        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        return () => window.removeEventListener('resize', updateConstraints);
    }, []);

    const handleDragStart = () => {
        setIsDragging(true);
        // Stop any ongoing animations when user starts dragging
        controls.stop();
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setTimeout(() => setIsDragging(false), 100);

        const screenWidth = window.innerWidth;
        const buttonWidth = 128;
        const margin = 16;
        const initialRightMargin = 32;

        const currentAbsoluteLeft = (screenWidth - buttonWidth - initialRightMargin) + info.offset.x;

        let targetX = 0;

        // Logical snap to edges
        if (currentAbsoluteLeft + buttonWidth / 2 < screenWidth / 2) {
            targetX = margin - (screenWidth - initialRightMargin - buttonWidth);
        } else {
            targetX = 0;
        }

        // Animate the snap using the control for the final resting position
        controls.start({
            x: targetX,
            transition: { type: "spring", ...springConfig }
        });
    };

    const handleClick = () => {
        if (!isDragging) {
            onClick();
        }
    };

    return (
        <motion.button
            drag
            dragConstraints={constraints}
            dragElastic={0.08}
            dragMomentum={true} // Enable momentum for a more "physical" feel
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            onClick={handleClick}
            style={{
                touchAction: 'none'
            }}
            className={cn(
                "fixed bottom-8 right-8 z-[9999]",
                "w-32 h-32",
                "flex items-center justify-center",
                "hover:scale-110 active:scale-95 transition-transform duration-200", // Faster transition
                "focus:outline-none cursor-grab active:cursor-grabbing touch-none",
                isOpen && "hidden"
            )}
            aria-label="Buka chat dengan Pal"
        >
            {/* Shadow beneath the robot */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.1, 0.2]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-2 w-16 h-3 bg-black/30 rounded-[100%] blur-md pointer-events-none"
            />

            {/* Floating Robot */}
            <motion.div
                animate={{
                    y: [0, -12, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative w-full h-full drop-shadow-2xl pointer-events-none"
            >
                <Image
                    src="/images/robot.png"
                    alt="Pal AI Robot"
                    fill
                    className="object-contain select-none"
                    priority
                />
            </motion.div>
        </motion.button>
    );
}
