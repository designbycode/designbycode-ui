import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PackageManagerSelect } from '@/components/ui/package-manager-select';
import { useCopyToClipboard } from '@/hooks/use-prism';

import MainLayout from '@/layouts/main-layout';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';
import { GlowRadial } from '@/registry/new-york/components/ui/glow/glow-radial';
import { index as animationsIndex } from '@/routes/animations';

gsap.registerPlugin(ScrollTrigger);

type AnimationItem = {
    name: string;
    text: string;
    category: string;
};

const animations: AnimationItem[] = [
    // Attention Seekers
    { name: 'animate-bounce', text: 'Bounce', category: 'Attention Seekers' },
    { name: 'animate-flash', text: 'Flash', category: 'Attention Seekers' },
    { name: 'animate-pulse', text: 'Pulse', category: 'Attention Seekers' },
    {
        name: 'animate-rubber-band',
        text: 'Rubber Band',
        category: 'Attention Seekers',
    },
    { name: 'animate-shake', text: 'Shake', category: 'Attention Seekers' },
    {
        name: 'animate-head-shake',
        text: 'Head Shake',
        category: 'Attention Seekers',
    },
    { name: 'animate-swing', text: 'Swing', category: 'Attention Seekers' },
    { name: 'animate-tada', text: 'Tada', category: 'Attention Seekers' },
    { name: 'animate-wobble', text: 'Wobble', category: 'Attention Seekers' },
    { name: 'animate-jello', text: 'Jello', category: 'Attention Seekers' },
    {
        name: 'animate-heart-beat',
        text: 'Heart Beat',
        category: 'Attention Seekers',
    },
    { name: 'animate-spin', text: 'Spin', category: 'Attention Seekers' },
    { name: 'animate-wiggle', text: 'Wiggle', category: 'Attention Seekers' },
    { name: 'animate-ping', text: 'Ping', category: 'Attention Seekers' },
    { name: 'animate-glitch', text: 'Glitch', category: 'Attention Seekers' },
    { name: 'animate-ring', text: 'Ring', category: 'Attention Seekers' },
    { name: 'animate-alarm', text: 'Alarm', category: 'Attention Seekers' },
    { name: 'animate-bell', text: 'Bell', category: 'Attention Seekers' },

    // Bouncing In
    { name: 'animate-bounce-in', text: 'Bounce In', category: 'Bouncing In' },
    {
        name: 'animate-bounce-in-down',
        text: 'Bounce In Down',
        category: 'Bouncing In',
    },
    {
        name: 'animate-bounce-in-left',
        text: 'Bounce In Left',
        category: 'Bouncing In',
    },
    {
        name: 'animate-bounce-in-right',
        text: 'Bounce In Right',
        category: 'Bouncing In',
    },
    {
        name: 'animate-bounce-in-up',
        text: 'Bounce In Up',
        category: 'Bouncing In',
    },

    // Bouncing Out
    {
        name: 'animate-bounce-out',
        text: 'Bounce Out',
        category: 'Bouncing Out',
    },
    {
        name: 'animate-bounce-out-down',
        text: 'Bounce Out Down',
        category: 'Bouncing Out',
    },
    {
        name: 'animate-bounce-out-left',
        text: 'Bounce Out Left',
        category: 'Bouncing Out',
    },
    {
        name: 'animate-bounce-out-right',
        text: 'Bounce Out Right',
        category: 'Bouncing Out',
    },
    {
        name: 'animate-bounce-out-up',
        text: 'Bounce Out Up',
        category: 'Bouncing Out',
    },

    // Back In
    {
        name: 'animate-back-in-down',
        text: 'Back In Down',
        category: 'Back In',
    },
    {
        name: 'animate-back-in-left',
        text: 'Back In Left',
        category: 'Back In',
    },
    {
        name: 'animate-back-in-right',
        text: 'Back In Right',
        category: 'Back In',
    },
    { name: 'animate-back-in-up', text: 'Back In Up', category: 'Back In' },

    // Back Out
    {
        name: 'animate-back-out-down',
        text: 'Back Out Down',
        category: 'Back Out',
    },
    {
        name: 'animate-back-out-left',
        text: 'Back Out Left',
        category: 'Back Out',
    },
    {
        name: 'animate-back-out-right',
        text: 'Back Out Right',
        category: 'Back Out',
    },
    { name: 'animate-back-out-up', text: 'Back Out Up', category: 'Back Out' },

    // Flippers
    { name: 'animate-flip', text: 'Flip', category: 'Flippers' },
    { name: 'animate-flip-in-x', text: 'Flip In X', category: 'Flippers' },
    { name: 'animate-flip-in-y', text: 'Flip In Y', category: 'Flippers' },
    { name: 'animate-flip-out-x', text: 'Flip Out X', category: 'Flippers' },
    { name: 'animate-flip-out-y', text: 'Flip Out Y', category: 'Flippers' },

    // Fades In
    { name: 'animate-fade-in', text: 'Fade In', category: 'Fades In' },
    {
        name: 'animate-fade-in-down',
        text: 'Fade In Down',
        category: 'Fades In',
    },
    {
        name: 'animate-fade-in-down-big',
        text: 'Fade In Down Big',
        category: 'Fades In',
    },
    {
        name: 'animate-fade-in-left',
        text: 'Fade In Left',
        category: 'Fades In',
    },
    {
        name: 'animate-fade-in-left-big',
        text: 'Fade In Left Big',
        category: 'Fades In',
    },
    {
        name: 'animate-fade-in-right',
        text: 'Fade In Right',
        category: 'Fades In',
    },
    {
        name: 'animate-fade-in-right-big',
        text: 'Fade In Right Big',
        category: 'Fades In',
    },
    { name: 'animate-fade-in-up', text: 'Fade In Up', category: 'Fades In' },
    {
        name: 'animate-fade-in-up-big',
        text: 'Fade In Up Big',
        category: 'Fades In',
    },
    { name: 'animate-blur-in', text: 'Blur In', category: 'Fades In' },

    // Fades Out
    { name: 'animate-fade-out', text: 'Fade Out', category: 'Fades Out' },
    {
        name: 'animate-fade-out-down',
        text: 'Fade Out Down',
        category: 'Fades Out',
    },
    {
        name: 'animate-fade-out-down-big',
        text: 'Fade Out Down Big',
        category: 'Fades Out',
    },
    {
        name: 'animate-fade-out-left',
        text: 'Fade Out Left',
        category: 'Fades Out',
    },
    {
        name: 'animate-fade-out-left-big',
        text: 'Fade Out Left Big',
        category: 'Fades Out',
    },
    {
        name: 'animate-fade-out-right',
        text: 'Fade Out Right',
        category: 'Fades Out',
    },
    {
        name: 'animate-fade-out-right-big',
        text: 'Fade Out Right Big',
        category: 'Fades Out',
    },
    { name: 'animate-fade-out-up', text: 'Fade Out Up', category: 'Fades Out' },
    {
        name: 'animate-fade-out-up-big',
        text: 'Fade Out Up Big',
        category: 'Fades Out',
    },
    { name: 'animate-blur-out', text: 'Blur Out', category: 'Fades Out' },

    // Slides In
    {
        name: 'animate-slide-in-down',
        text: 'Slide In Down',
        category: 'Slides In',
    },
    {
        name: 'animate-slide-in-left',
        text: 'Slide In Left',
        category: 'Slides In',
    },
    {
        name: 'animate-slide-in-right',
        text: 'Slide In Right',
        category: 'Slides In',
    },
    { name: 'animate-slide-in-up', text: 'Slide In Up', category: 'Slides In' },

    // Slides Out
    {
        name: 'animate-slide-out-down',
        text: 'Slide Out Down',
        category: 'Slides Out',
    },
    {
        name: 'animate-slide-out-left',
        text: 'Slide Out Left',
        category: 'Slides Out',
    },
    {
        name: 'animate-slide-out-right',
        text: 'Slide Out Right',
        category: 'Slides Out',
    },
    {
        name: 'animate-slide-out-up',
        text: 'Slide Out Up',
        category: 'Slides Out',
    },

    // Zooms In
    { name: 'animate-zoom-in', text: 'Zoom In', category: 'Zooms In' },
    {
        name: 'animate-zoom-in-down',
        text: 'Zoom In Down',
        category: 'Zooms In',
    },
    {
        name: 'animate-zoom-in-left',
        text: 'Zoom In Left',
        category: 'Zooms In',
    },
    {
        name: 'animate-zoom-in-right',
        text: 'Zoom In Right',
        category: 'Zooms In',
    },
    { name: 'animate-zoom-in-up', text: 'Zoom In Up', category: 'Zooms In' },

    // Zooms Out
    { name: 'animate-zoom-out', text: 'Zoom Out', category: 'Zooms Out' },
    {
        name: 'animate-zoom-out-down',
        text: 'Zoom Out Down',
        category: 'Zooms Out',
    },
    {
        name: 'animate-zoom-out-left',
        text: 'Zoom Out Left',
        category: 'Zooms Out',
    },
    {
        name: 'animate-zoom-out-right',
        text: 'Zoom Out Right',
        category: 'Zooms Out',
    },
    { name: 'animate-zoom-out-up', text: 'Zoom Out Up', category: 'Zooms Out' },

    // Rotates
    { name: 'animate-rotate-in', text: 'Rotate In', category: 'Rotates' },
    { name: 'animate-rotate-out', text: 'Rotate Out', category: 'Rotates' },
    { name: 'animate-roll-in', text: 'Roll In', category: 'Rotates' },
    { name: 'animate-roll-out', text: 'Roll Out', category: 'Rotates' },

    // Rotate Corners In
    {
        name: 'animate-rotate-in-down-left',
        text: 'Rotate In Down Left',
        category: 'Rotate Corners In',
    },
    {
        name: 'animate-rotate-in-down-right',
        text: 'Rotate In Down Right',
        category: 'Rotate Corners In',
    },
    {
        name: 'animate-rotate-in-up-left',
        text: 'Rotate In Up Left',
        category: 'Rotate Corners In',
    },
    {
        name: 'animate-rotate-in-up-right',
        text: 'Rotate In Up Right',
        category: 'Rotate Corners In',
    },

    // Rotate Corners Out
    {
        name: 'animate-rotate-out-down-left',
        text: 'Rotate Out Down Left',
        category: 'Rotate Corners Out',
    },
    {
        name: 'animate-rotate-out-down-right',
        text: 'Rotate Out Down Right',
        category: 'Rotate Corners Out',
    },
    {
        name: 'animate-rotate-out-up-left',
        text: 'Rotate Out Up Left',
        category: 'Rotate Corners Out',
    },
    {
        name: 'animate-rotate-out-up-right',
        text: 'Rotate Out Up Right',
        category: 'Rotate Corners Out',
    },

    // Specials
    {
        name: 'animate-light-speed-in',
        text: 'Light Speed In',
        category: 'Specials',
    },
    {
        name: 'animate-light-speed-out',
        text: 'Light Speed Out',
        category: 'Specials',
    },
    { name: 'animate-jack-in-box', text: 'Jack In Box', category: 'Specials' },
    { name: 'animate-hinge', text: 'Hinge', category: 'Specials' },

    // Effects
    { name: 'animate-float', text: 'Float', category: 'Effects' },
    { name: 'animate-pop', text: 'Pop', category: 'Effects' },
    { name: 'animate-compress', text: 'Compress', category: 'Effects' },
    { name: 'animate-expand', text: 'Expand', category: 'Effects' },
    { name: 'animate-drop', text: 'Drop', category: 'Effects' },
    { name: 'animate-sway', text: 'Sway', category: 'Effects' },
    { name: 'animate-ken-burns', text: 'Ken Burns', category: 'Effects' },
    { name: 'animate-tilt', text: 'Tilt', category: 'Effects' },
];

const categories = [...new Set(animations.map((a) => a.category))];

export default function AnimateCss() {
    const [selectedAnimation, setSelectedAnimation] =
        useState('animate-bounce');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAnimations = animations.filter(
        (anim) =>
            anim.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            anim.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <MainLayout
            breadcrumbs={[
                { title: 'Animations', href: animationsIndex() },
                { title: 'Animate css', href: '#' },
            ]}
        >
            <div className="min-h-screen">
                <div className="mb-12">
                    <div className="grid gap-4 lg:grid-cols-3">
                        <div className={`col-span-full lg:col-span-2`}>
                            <h1 className="mb-4 text-3xl font-bold text-balance">
                                <span>Animate</span>
                                <span className="font-semibold text-brand">
                                    CSS
                                </span>
                            </h1>
                            <p className="mb-6 max-w-4xl text-xl text-balance text-muted-foreground">
                                Click any animation card to view and copy the
                                code.{' '}
                                <span
                                    className={`inline-block animate-wiggle font-semibold text-brand`}
                                >
                                    {animations.length}+
                                </span>{' '}
                                CSS-based animations available.
                            </p>

                            <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                                About
                            </h2>
                            <p className="mb-4 max-w-4xl text-balance text-muted-foreground">
                                <span className="mr-1 inline-block animate-sway font-bold text-primary repeat-infinite">
                                    Animate
                                    <span className="font-semibold text-brand">
                                        CSS
                                    </span>
                                </span>
                                is a library of CSS animations that you can use
                                directly in your components. Simply add the
                                animation class name to any element to animate
                                it.
                            </p>
                        </div>
                        <div
                            className={`relative isolate col-span-full lg:col-span-1`}
                        >
                            <Card className="relative z-10 bg-linear-to-b from-background to-muted/50 p-6 shadow-md shadow-black/30">
                                <GlowRadial className={`absolute inset-0`} />
                                <PixelCanvas
                                    variant="vibrant"
                                    shape="circle"
                                    colors={['#818181', '#505050', '#3b3b3b']}
                                    animationType="random"
                                    className={`absolute inset-0 rounded-lg mask-radial-from-20% mask-radial-to-90% mask-radial-at-center mask-exclude opacity-50`}
                                />
                                <CardContent>
                                    <ul className="list-disc text-muted-foreground text-shadow-2xs text-shadow-muted/25 dark:text-shadow-black">
                                        <li>
                                            {animations.length}+ built-in
                                            animation types
                                        </li>
                                        <li>
                                            Simple CSS class-based animations
                                        </li>
                                        <li>Works with any HTML element</li>
                                        <li>
                                            Fully customizable duration and
                                            timing
                                        </li>
                                        <li>Repeat and loop support</li>
                                        <li>Works with Tailwind CSS</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="absolute inset-x-0 -translate-y-5 scale-80 bg-linear-to-b from-background to-muted/50 p-6 shadow-md shadow-black/15">
                                <GlowRadial
                                    borderWidth={1}
                                    className={`absolute inset-0 opacity-15`}
                                />
                            </Card>
                            <Card className="absolute inset-x-0 -translate-y-9 scale-90 bg-linear-to-b from-background to-muted/50 p-6 shadow-md shadow-black/20">
                                <GlowRadial
                                    borderWidth={1}
                                    className={`absolute inset-0 opacity-25`}
                                />
                            </Card>
                        </div>
                    </div>

                    <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                        Installation
                    </h2>
                    <div className="my-4">
                        <Combobox
                            value={selectedAnimation}
                            onValueChange={(value) =>
                                value && setSelectedAnimation(value)
                            }
                        >
                            <ComboboxInput
                                placeholder={
                                    animations.find(
                                        (a) => a.name === selectedAnimation,
                                    )?.text || 'Search animations...'
                                }
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                showTrigger={true}
                                showClear={true}
                            />
                            <ComboboxContent>
                                <ComboboxList>
                                    {filteredAnimations.map((anim) => (
                                        <ComboboxItem
                                            key={anim.name}
                                            value={anim.name}
                                        >
                                            {anim.text}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>
                    <PackageManagerSelect
                        className="my-4"
                        codes={{
                            npm: `npm shadcn@latest add https://ui.designbycode.co.za/r/${selectedAnimation}.json`,
                            yarn: `yarn shadcn@latest add https://ui.designbycode.co.za/r/${selectedAnimation}.json`,
                            pnpm: `pnpm shadcn@latest add https://ui.designbycode.co.za/r/${selectedAnimation}.json`,
                            bun: `bunx --bun shadcn@latest add https://ui.designbycode.co.za/r/${selectedAnimation}.json`,
                        }}
                    />

                    <h2 className="mt-8 mb-4 text-2xl font-semibold text-foreground">
                        Usage
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="mb-2 text-lg font-medium text-foreground">
                                Basic Usage
                            </h3>
                            <CodeBlock
                                variant="minimal"
                                language="html"
                                code={`<div className="${selectedAnimation} repeat-infinite">
    Bouncing Content
</div>`}
                            />
                        </div>
                    </div>

                    <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                        Installation all animations
                    </h2>

                    <PackageManagerSelect
                        className="my-4"
                        codes={{
                            npm: `npm shadcn@latest add https://ui.designbycode.co.za/r/animate-all.json`,
                            yarn: `yarn shadcn@latest add https://ui.designbycode.co.za/r/animate-all.json`,
                            pnpm: `pnpm shadcn@latest add https://ui.designbycode.co.za/r/animate-all.json`,
                            bun: `bunx --bun shadcn@latest add https://ui.designbycode.co.za/r/animate-all.json`,
                        }}
                    />

                    <h2 className="mt-8 mb-4 text-2xl font-semibold text-foreground">
                        Code Examples
                    </h2>
                    <p className="text-balance text-muted-foreground">
                        Click on any animation card below to view and copy the
                        code.
                    </p>
                </div>

                {categories.map((category) => (
                    <section key={category} className="mb-12">
                        <h2 className="mb-6 text-2xl font-semibold text-foreground">
                            {category}
                        </h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {animations
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
            </div>
        </MainLayout>
    );
}

function AnimationCard({ anim }: { anim: AnimationItem }) {
    const codeExample = `
<div className="${anim.name}">
    ${anim.text}
</div>
`.trim();
    const cardRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const { copy } = useCopyToClipboard();

    const handleCopy = useCallback(async () => {
        await copy(codeExample);
        toast.success(`"${anim.name}" code copied to clipboard!`);
    }, [copy, codeExample, anim.name]);

    useGSAP(() => {
        if (textRef.current && cardRef.current) {
            ScrollTrigger.create({
                trigger: cardRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                onEnter: () => textRef.current?.classList.add(anim.name),
                onLeave: () => textRef.current?.classList.remove(anim.name),
                onEnterBack: () => textRef.current?.classList.add(anim.name),
                onLeaveBack: () => textRef.current?.classList.remove(anim.name),
            });
        }
    }, [anim.name]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card
                    ref={cardRef}
                    className="group cursor-pointer transition-colors hover:bg-muted/50"
                >
                    <CardHeader>
                        <CardTitle className="flex items-baseline justify-between overflow-clip capitalize">
                            <span>{anim.name.replace('animate-', '')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid aspect-video max-w-lg min-w-0 place-items-center overflow-hidden">
                        <span
                            ref={textRef}
                            className="text-center font-bebas-neue text-sm text-[clamp(0.75rem,10vw+1rem,2rem)] font-medium text-foreground/40 transition-all delay-300 group-hover:repeat-infinite!"
                        >
                            {anim.text}
                        </span>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        {anim.name.replace('animate-', '')}
                    </DialogTitle>
                    <DialogDescription>
                        Animation type: {anim.category}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid aspect-video place-items-center overflow-hidden rounded-xl border border-border bg-muted/30 py-8">
                    <span
                        className={`text-center font-bebas-neue text-[clamp(0.75rem,9vw+1rem,3rem)] font-medium delay-1000 ${anim.name} repeat-infinite`}
                    >
                        {anim.text}
                    </span>
                </div>

                <PackageManagerSelect
                    codes={{
                        npm: `npx shadcn add https://ui.designbycode.co.za/r/${anim.name}.json`,
                        yarn: `yarn shadcn add https://ui.designbycode.co.za/r/${anim.name}.json`,
                        pnpm: `pnpm dlx shadcn add https://ui.designbycode.co.za/r/${anim.name}.json`,
                        bun: `bunx --bun shadcn add https://ui.designbycode.co.za/r/${anim.name}.json`,
                    }}
                />

                <CodeBlock
                    variant="minimal"
                    language="html"
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

AnimateCss.displayName = 'AnimateCss';
