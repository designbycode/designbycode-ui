import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PackageManagerSelect } from '@/components/ui/package-manager-select';
import Wrapper from '@/components/wrapper';
import { useCopyToClipboard } from '@/hooks/use-prism';
import MainLayout from '@/layouts/main-layout';
import type {
    AnimationType,
    TextAnimatorRef,
} from '@/registry/new-york/components/ui/animations/text-animator';
import TextAnimator from '@/registry/new-york/components/ui/animations/text-animator';
import { useHover } from '@/registry/new-york/hooks/use-hover';
import { index as animationsIndex } from '@/routes/animations';

const baseAnimations: {
    name: AnimationType;
    text: string;
    category: string;
}[] = [
    // Fades
    { name: 'fadeIn', text: 'Fade In', category: 'Fades' },
    { name: 'fadeInUp', text: 'Fade In Up', category: 'Fades' },
    { name: 'fadeInDown', text: 'Fade In Down', category: 'Fades' },
    { name: 'fadeInLeft', text: 'Fade In Left', category: 'Fades' },
    { name: 'fadeInRight', text: 'Fade In Right', category: 'Fades' },
    { name: 'fadeInTopLeft', text: 'Fade In Top Left', category: 'Fades' },
    { name: 'fadeInTopRight', text: 'Fade In Top Right', category: 'Fades' },
    {
        name: 'fadeInBottomLeft',
        text: 'Fade In Bottom Left',
        category: 'Fades',
    },
    {
        name: 'fadeInBottomRight',
        text: 'Fade In Bottom Right',
        category: 'Fades',
    },

    // Slides
    { name: 'slideUp', text: 'Slide Up', category: 'Slides' },
    { name: 'slideDown', text: 'Slide Down', category: 'Slides' },
    { name: 'slideLeft', text: 'Slide Left', category: 'Slides' },
    { name: 'slideRight', text: 'Slide Right', category: 'Slides' },
    { name: 'slideTopLeft', text: 'Slide Top Left', category: 'Slides' },
    { name: 'slideTopRight', text: 'Slide Top Right', category: 'Slides' },
    { name: 'slideBottomLeft', text: 'Slide Bottom Left', category: 'Slides' },
    {
        name: 'slideBottomRight',
        text: 'Slide Bottom Right',
        category: 'Slides',
    },

    // Scale
    { name: 'scaleUp', text: 'Scale Up', category: 'Scale' },
    { name: 'scaleDown', text: 'Scale Down', category: 'Scale' },
    { name: 'scaleIn', text: 'Scale In', category: 'Scale' },
    { name: 'scaleInUp', text: 'Scale In Up', category: 'Scale' },
    { name: 'scaleInDown', text: 'Scale In Down', category: 'Scale' },

    // Blur
    { name: 'blurIn', text: 'Blur In', category: 'Blur' },
    { name: 'blurOut', text: 'Blur Out', category: 'Blur' },
    { name: 'blurInLeft', text: 'Blur In Left', category: 'Blur' },
    { name: 'blurInRight', text: 'Blur In Right', category: 'Blur' },
    { name: 'blurInUp', text: 'Blur In Up', category: 'Blur' },
    { name: 'blurInDown', text: 'Blur In Down', category: 'Blur' },

    // Rotate
    { name: 'rotateIn', text: 'Rotate In', category: 'Rotate' },
    { name: 'rotateOut', text: 'Rotate Out', category: 'Rotate' },
    { name: 'rotateInLeft', text: 'Rotate In Left', category: 'Rotate' },
    { name: 'rotateInRight', text: 'Rotate In Right', category: 'Rotate' },
    { name: 'rotateOutLeft', text: 'Rotate Out Left', category: 'Rotate' },
    { name: 'rotateOutRight', text: 'Rotate Out Right', category: 'Rotate' },

    // Physics
    { name: 'bounce', text: 'Bounce', category: 'Physics' },
    { name: 'elastic', text: 'Elastic', category: 'Physics' },
    { name: 'jelly', text: 'Jelly', category: 'Physics' },
    { name: 'squash', text: 'Squash', category: 'Physics' },
    { name: 'liquid', text: 'Liquid', category: 'Physics' },
    { name: 'swing', text: 'Swing', category: 'Physics' },
    { name: 'stretch', text: 'Stretch', category: 'Physics' },
    { name: 'spring', text: 'Spring', category: 'Physics' },
    { name: 'wobble', text: 'Wobble', category: 'Physics' },
    { name: 'shake', text: 'Shake', category: 'Physics' },
    { name: 'drift', text: 'Drift', category: 'Physics' },
    { name: 'float', text: 'Float', category: 'Physics' },

    // Character
    { name: 'wave', text: 'Wave', category: 'Character' },
    { name: 'pop', text: 'Pop', category: 'Character' },
    { name: 'flip', text: 'Flip', category: 'Character' },
    { name: 'rollIn', text: 'Roll In', category: 'Character' },
    { name: 'skewIn', text: 'Skew In', category: 'Character' },
    { name: 'spiral', text: 'Spiral', category: 'Character' },
    { name: 'morph', text: 'Morph', category: 'Character' },
    { name: 'crash', text: 'Crash', category: 'Character' },
    { name: 'explode', text: 'Explode', category: 'Character' },
    { name: 'letterByLetter', text: 'Letter By Letter', category: 'Character' },
    { name: 'typewriter', text: 'Typewriter', category: 'Character' },
    { name: 'jitter', text: 'Jitter', category: 'Character' },

    // Text Effects
    { name: 'reveal', text: 'Reveal', category: 'Text Effects' },
    { name: 'glitch', text: 'Glitch', category: 'Text Effects' },
    { name: 'gradient', text: 'Gradient', category: 'Text Effects' },
    { name: 'shadow', text: 'Shadow', category: 'Text Effects' },
    { name: 'neon', text: 'Neon', category: 'Text Effects' },
    { name: 'marquee', text: 'Marquee', category: 'Text Effects' },
    { name: 'flicker', text: 'Flicker', category: 'Text Effects' },
    { name: 'spotlight', text: 'Spotlight', category: 'Text Effects' },
    { name: 'outline', text: 'Outline', category: 'Text Effects' },
    { name: 'pulse', text: 'Pulse', category: 'Text Effects' },
    { name: 'breathe', text: 'Breathe', category: 'Text Effects' },
    { name: 'aurora', text: 'Aurora', category: 'Text Effects' },

    // Special Effects
    { name: 'matrix', text: 'Matrix', category: 'Special' },
    { name: 'fire', text: 'Fire', category: 'Special' },
    { name: 'rainbow', text: 'Rainbow', category: 'Special' },
    { name: 'magnetic', text: 'Magnetic', category: 'Special' },
    { name: 'particles', text: 'Particles', category: 'Special' },
    { name: 'dissolve', text: 'Dissolve', category: 'Special' },
    { name: 'scramble', text: 'Scramble', category: 'Special' },
    { name: 'zap', text: 'Zap', category: 'Special' },
    { name: 'orbit', text: 'Orbit', category: 'Special' },
    { name: 'vortex', text: 'Vortex', category: 'Special' },
    { name: 'ripple', text: 'Ripple', category: 'Special' },
    { name: 'piano', text: 'Piano', category: 'Special' },
    { name: 'domino', text: 'Domino', category: 'Special' },
    { name: 'pendulum', text: 'Pendulum', category: 'Special' },
    { name: 'shatter', text: 'Shatter', category: 'Special' },
    { name: 'smoke', text: 'Smoke', category: 'Special' },
    { name: 'thunder', text: 'Thunder', category: 'Special' },
    { name: 'crystallize', text: 'Crystallize', category: 'Special' },
    { name: 'warp', text: 'Warp', category: 'Special' },
    { name: 'cinema', text: 'Cinema', category: 'Special' },
    { name: 'gravity', text: 'Gravity', category: 'Special' },
    { name: 'levitate', text: 'Levitate', category: 'Special' },
    { name: 'twinkle', text: 'Twinkle', category: 'Special' },
    { name: 'shimmerFade', text: 'Shimmer Fade', category: 'Special' },
    { name: 'fold', text: 'Fold', category: 'Special' },
    { name: 'cascade', text: 'Cascade', category: 'Special' },
    { name: 'pinball', text: 'Pinball', category: 'Special' },
    { name: 'neonFlicker', text: 'Neon Flicker', category: 'Special' },
    { name: 'rise', text: 'Rise', category: 'Special' },
    { name: 'unfurl', text: 'Unfurl', category: 'Special' },
];

const demoAnimations = baseAnimations;

const categories = [...new Set(baseAnimations.map((a) => a.category))];

export default function AnimationAnimator() {
    return (
        <MainLayout
            breadcrumbs={[
                { title: 'Animations', href: animationsIndex() },
                { title: 'Text Animator', href: '#' },
            ]}
        >
            <Wrapper className="min-h-screen">
                <div className="mb-12">
                    <div className="grid gap-4 lg:grid-cols-3">
                        <div className={`col-span-full lg:col-span-2`}>
                            <h1 className="mb-4 text-3xl font-bold text-balance">
                                Text Animations
                            </h1>
                            <p className="mb-6 max-w-4xl text-xl text-balance text-muted-foreground">
                                Scroll to see animations trigger as they come
                                into view. Click any animation card to view and
                                copy the code.{' '}
                                <TextAnimator
                                    animation="pulse"
                                    trigger="scrollTrigger"
                                    duration={0.8}
                                    repeat={-1}
                                    yoyo
                                    className="text-brand"
                                >
                                    102+
                                </TextAnimator>{' '}
                                animations available.
                            </p>
                            <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                                About
                            </h2>
                            <p className="mb-4 max-w-4xl text-balance text-muted-foreground">
                                <TextAnimator
                                    text="TextAnimator"
                                    animation={`zap`}
                                    trigger={`scrollTrigger`}
                                    duration={0.8}
                                    repeat={-1}
                                    yoyo
                                    className="font-bold text-brand"
                                />{' '}
                                is a powerful React component that creates
                                stunning character-level text animations using
                                GSAP (GreenSock Animation Platform). It splits
                                your text into individual characters and applies
                                smooth, performant animations to each one.
                            </p>
                        </div>
                        <div
                            className={`relative isolate col-span-full lg:col-span-1`}
                        >
                            <Card className="relative z-10 bg-linear-to-b from-background to-muted/50 p-6 shadow-md shadow-black/30">
                                <CardContent>
                                    <ul className="list-disc text-muted-foreground">
                                        <li>102+ built-in animation types</li>
                                        <li>
                                            Three trigger modes: click, hover,
                                            scroll
                                        </li>
                                        <li>
                                            Full GSAP timeline control via ref
                                        </li>
                                        <li>
                                            ScrollTrigger integration for
                                            scroll-based animations
                                        </li>
                                        <li>
                                            Customizable easing, duration, and
                                            stagger
                                        </li>
                                        <li>Loop and yoyo support</li>
                                        <li>
                                            TypeScript support with full type
                                            definitions
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="absolute inset-x-0 -translate-y-5 scale-80 bg-linear-to-b from-background to-muted/50 p-6 shadow-md shadow-black/15" />
                            <Card className="absolute inset-x-0 -translate-y-9 scale-90 bg-linear-to-b from-background to-muted/50 p-6 shadow-md shadow-black/20" />
                        </div>
                    </div>

                    <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                        Installation
                    </h2>
                    <PackageManagerSelect
                        className={`my-4`}
                        codes={{
                            npm: 'npm shadcn@latest add @designbycode/text-animator',
                            yarn: 'yarn shadcn@latest add @designbycode/text-animator',
                            pnpm: 'pnpm shadcn@latest add @designbycode/text-animator',
                            bun: 'bunx --bun shadcn@latest add @designbycode/text-animator',
                        }}
                    />
                    <p className="text-zinc-500">
                        Prerequisites: Ensure you have{' '}
                        <code className="rounded bg-muted px-1 text-muted-foreground">
                            gsap
                        </code>{' '}
                        and{' '}
                        <code className="rounded bg-muted px-1 text-muted-foreground">
                            @gsap/react
                        </code>{' '}
                        installed.
                    </p>

                    <h2 className="mt-8 mb-4 text-2xl font-semibold text-foreground">
                        Code Examples
                    </h2>

                    <div className="mb-6">
                        <p className="text-balance text-muted-foreground">
                            Click on any animation card below to view and copy
                            the code.
                        </p>
                    </div>
                </div>

                {categories.map((category) => (
                    <section key={category} className="mb-12">
                        <h2 className="mb-6 text-2xl font-semibold text-foreground">
                            {category}
                        </h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {demoAnimations
                                .filter((a) => a.category === category)
                                .map((anim) => (
                                    <AnimationCard
                                        key={anim.name}
                                        anim={anim}
                                    />
                                ))}
                        </div>
                    </section>
                ))}
            </Wrapper>
        </MainLayout>
    );
}

function AnimationCard({
    anim,
}: {
    anim: { name: AnimationType; text: string; category: string };
}) {
    const ref = useRef<TextAnimatorRef>(null);
    const { isHovered, hoverRef } = useHover();
    const { copy } = useCopyToClipboard();

    const codeExample = `
<TextAnimator
    animation="${anim.name}"
    trigger={'scrollTrigger'}>
    ${anim.text}
</TextAnimator>
`.trim();

    const handleCopy = useCallback(async () => {
        await copy(codeExample);
        toast.success(`"${anim.name}" code copied to clipboard!`);
    }, [copy, codeExample, anim.name, anim.text]);

    useEffect(() => {
        if (isHovered) {
            ref.current?.restart();
        }
    }, [isHovered]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card ref={hoverRef} className="cursor-pointer">
                    <CardHeader>
                        <CardTitle
                            className={`flex items-baseline justify-between capitalize`}
                        >
                            <span>{anim.name}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent
                        className={`grid aspect-video place-items-center`}
                    >
                        <TextAnimator
                            ref={ref}
                            animation={anim.name}
                            trigger={'scrollTrigger'}
                            scrollTrigger={{
                                start: 'top 90%',
                                toggleActions: 'play pause play reverse',
                            }}
                            repeat={isHovered ? -1 : 0}
                            yoyo={isHovered ? true : false}
                            duration={1}
                            className="text-center font-bebas-neue text-sm text-[clamp(0.75rem,13vw+1rem,3rem)] font-medium text-foreground/40"
                        >
                            {anim.text}
                        </TextAnimator>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        {anim.name}
                    </DialogTitle>
                    <DialogDescription>
                        Animation type: {anim.category}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid aspect-video place-items-center overflow-hidden rounded-xl border border-border bg-muted/30 py-8">
                    <TextAnimator
                        ref={ref}
                        animation={anim.name}
                        trigger={'scrollTrigger'}
                        scrollTrigger={{
                            start: 'top 90%',
                            toggleActions: 'play pause play reverse',
                        }}
                        repeat={-1}
                        yoyo={true}
                        duration={1}
                        className="text-center font-bebas-neue text-sm text-[clamp(0.75rem,13vw+1rem,3rem)] font-medium text-foreground/40"
                    >
                        {anim.text}
                    </TextAnimator>
                </div>
                <CodeBlock
                    // className="border-none bg-muted"
                    variant={`minimal`}
                    language={`typescript`}
                    code={codeExample}
                    showCopyButton={false}
                />
                <div className="flex justify-end">
                    <Button variant={`secondary`} onClick={handleCopy}>
                        Copy Code
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

AnimationAnimator.displayName = 'TextAnimator';
