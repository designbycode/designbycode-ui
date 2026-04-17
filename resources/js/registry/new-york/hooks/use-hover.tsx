import { useCallback, useEffect, useState } from 'react';

export function useHover(): [boolean, (node: HTMLElement | null) => void] {
    const [isHovered, setIsHovered] = useState(false);
    const [node, setNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!node) {
            return;
        }

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [node]);

    const hoverRef = useCallback((node: HTMLElement | null) => {
        setNode(node);
    }, []);

    return [isHovered, hoverRef];
}
