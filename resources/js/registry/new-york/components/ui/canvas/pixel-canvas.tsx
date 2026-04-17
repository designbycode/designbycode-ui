'use client';

import { useEffect, useRef } from 'react';

type PixelType = {
    x: number;
    y: number;
    color: string;
    size: number;
    speed: number;
    sizeStep: number;
    minSize: number;
    maxSize: number;
    delay: number;
    counter: number;
    counterStep: number;
    isIdle: boolean;
    isReverse: boolean;
    isShimmer: boolean;
};

function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function PixelCanvas({
    colors = ['#f8fafc', '#f1f5f9', '#cbd5e1'],
    gap = 5,
    speed = 35,
    noFocus = false,
    className,
}: {
    colors?: string[];
    gap?: number;
    speed?: number;
    noFocus?: boolean;
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pixelsRef = useRef<PixelType[]>([]);
    const animationRef = useRef<number>(0);
    const parentRef = useRef<HTMLDivElement | null>(null);

    const timePrevious = useRef(performance.now());
    const timeInterval = 1000 / 60;

    const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const normalizedGap = Math.min(Math.max(gap, 4), 50);

    const normalizedSpeed = (() => {
        const throttle = 0.001;

        if (speed <= 0 || reducedMotion) {
return 0;
}

        if (speed >= 100) {
return 100 * throttle;
}

        return speed * throttle;
    })();

    const getDistanceToCenter = (
        canvas: HTMLCanvasElement,
        x: number,
        y: number,
    ) => {
        const dx = x - canvas.width / 2;
        const dy = y - canvas.height / 2;

        return Math.sqrt(dx * dx + dy * dy);
    };

    const createPixels = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) => {
        const pixels: PixelType[] = [];

        for (let x = 0; x < canvas.width; x += normalizedGap) {
            for (let y = 0; y < canvas.height; y += normalizedGap) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const delay = reducedMotion
                    ? 0
                    : getDistanceToCenter(canvas, x, y);

                pixels.push({
                    x,
                    y,
                    color,
                    size: 0,
                    speed: getRandom(0.1, 0.9) * normalizedSpeed,
                    sizeStep: Math.random() * 0.4,
                    minSize: 0.5,
                    maxSize: getRandom(0.5, 2),
                    delay,
                    counter: 0,
                    counterStep:
                        Math.random() * 4 +
                        (canvas.width + canvas.height) * 0.01,
                    isIdle: false,
                    isReverse: false,
                    isShimmer: false,
                });
            }
        }

        pixelsRef.current = pixels;
    };

    const draw = (ctx: CanvasRenderingContext2D, p: PixelType) => {
        const centerOffset = 1 - p.size * 0.5;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x + centerOffset, p.y + centerOffset, p.size, p.size);
    };

    const shimmer = (p: PixelType) => {
        if (p.size >= p.maxSize) {
p.isReverse = true;
} else if (p.size <= p.minSize) {
p.isReverse = false;
}

        p.size += p.isReverse ? -p.speed : p.speed;
    };

    const appear = (ctx: CanvasRenderingContext2D, p: PixelType) => {
        p.isIdle = false;

        if (p.counter <= p.delay) {
            p.counter += p.counterStep;

            return;
        }

        if (p.size >= p.maxSize) {
            p.isShimmer = true;
        }

        if (p.isShimmer) {
            shimmer(p);
        } else {
            p.size += p.sizeStep;
        }

        draw(ctx, p);
    };

    const disappear = (ctx: CanvasRenderingContext2D, p: PixelType) => {
        p.isShimmer = false;
        p.counter = 0;

        if (p.size <= 0) {
            p.isIdle = true;

            return;
        }

        p.size -= 0.1;
        draw(ctx, p);
    };

    const animate = (
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        mode: 'appear' | 'disappear',
    ) => {
        animationRef.current = requestAnimationFrame(() =>
            animate(ctx, canvas, mode),
        );

        const now = performance.now();
        const delta = now - timePrevious.current;

        if (delta < timeInterval) {
return;
}

        timePrevious.current = now - (delta % timeInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pixelsRef.current.forEach((p) => {
            mode === 'appear' ? appear(ctx, p) : disappear(ctx, p);
        });

        if (pixelsRef.current.every((p) => p.isIdle)) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const init = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
return;
}

        const rect = canvas.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
return;
}

        createPixels(canvas, ctx);
    };

    useEffect(() => {
        init();

        const resizeObserver = new ResizeObserver(init);

        if (canvasRef.current) {
resizeObserver.observe(canvasRef.current);
}

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        const parent = parentRef.current;
        const canvas = canvasRef.current;

        if (!parent || !canvas) {
return;
}

        const ctx = canvas.getContext('2d');

        if (!ctx) {
return;
}

        const handleEnter = () => {
            cancelAnimationFrame(animationRef.current);
            animate(ctx, canvas, 'appear');
        };

        const handleLeave = () => {
            cancelAnimationFrame(animationRef.current);
            animate(ctx, canvas, 'disappear');
        };

        parent.addEventListener('mouseenter', handleEnter);
        parent.addEventListener('mouseleave', handleLeave);

        if (!noFocus) {
            parent.addEventListener('focusin', handleEnter);
            parent.addEventListener('focusout', handleLeave);
        }

        return () => {
            parent.removeEventListener('mouseenter', handleEnter);
            parent.removeEventListener('mouseleave', handleLeave);
            parent.removeEventListener('focusin', handleEnter);
            parent.removeEventListener('focusout', handleLeave);
        };
    }, [noFocus]);

    return (
        <div ref={parentRef} className={className}>
            <canvas ref={canvasRef} className="block h-full w-full" />
        </div>
    );
}
