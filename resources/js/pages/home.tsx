import { Head } from '@inertiajs/react';
import { BellRing, Heart, Moon, Sparkles, Star, Sun, Zap } from 'lucide-react';
import Wrapper from '@/components/wrapper';
import MainHero from '@/layouts/main/main-hero';
import MainLayout from '@/layouts/main-layout';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';
import { GlowRadial } from '@/registry/new-york/components/ui/glow/glow-radial';
import useDarkMode from '@/registry/new-york/hooks/use-dark-mode';

export default function Home() {
    const isDark = useDarkMode();

    const defaultColors = isDark
        ? ['#94a3b8', '#cbd5e1', '#e2e8f0']
        : ['#64748b', '#94a3b8', '#cbd5e1'];

    const cyanColors = isDark
        ? ['#22d3ee', '#67e8f9', '#a5f3fc']
        : ['#0891b2', '#06b6d4', '#22d3ee'];

    const pinkColors = isDark
        ? ['#f472b6', '#f9a8d4', '#fbcfe8']
        : ['#db2777', '#ec4899', '#f472b6'];

    const purpleColors = isDark
        ? ['#a855f7', '#c084fc', '#e879f9']
        : ['#7c3aed', '#8b5cf6', '#a855f7'];

    const amberColors = isDark
        ? ['#fbbf24', '#fcd34d', '#fde68a']
        : ['#d97706', '#f59e0b', '#fbbf24'];

    const greenColors = isDark
        ? ['#4ade80', '#86efac', '#bbf7d0']
        : ['#16a34a', '#22c55e', '#4ade80'];

    const redColors = isDark
        ? ['#fb7185', '#fda4af', '#fecdd3']
        : ['#e11d48', '#f43f5e', '#fb7185'];

    return (
        <Wrapper>
            <Head title="Home">
                <meta name="description" content="Your page description" />
            </Head>
            <MainHero />

            <div className="my-6 grid max-w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className={`absolute inset-0`} />
                    <div
                        className={`pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background`}
                    >
                        <BellRing className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        variant="vibrant"
                        active={true}
                        className="absolute inset-0"
                    />
                </div>

                {/* Card 2: subtle + colors */}
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className="absolute inset-0" />
                    <div className="pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background">
                        <Zap className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        variant="subtle"
                        colors={['#94a3b8', '#cbd5e1', '#e2e8f0']}
                        className="absolute inset-0"
                    />
                </div>

                {/* Card 3: glow + colors */}
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className="absolute inset-0" />
                    <div className="pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background">
                        <Moon className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        variant="glow"
                        colors={['#22d3ee', '#67e8f9', '#a5f3fc']}
                        className="absolute inset-0"
                    />
                </div>

                {/* Card 4: minimal + colors */}
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className="absolute inset-0" />
                    <div className="pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background">
                        <Sun className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        variant="minimal"
                        colors={['#a855f7', '#c084fc', '#e879f9']}
                        className="absolute inset-0"
                    />
                </div>

                {/* Card 5: default + colors + shape circle */}
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className="absolute inset-0" />
                    <div className="pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background">
                        <Star className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        variant="default"
                        colors={['#fbbf24', '#fcd34d', '#fde68a']}
                        shape="circle"
                        className="absolute inset-0"
                    />
                </div>

                {/* Card 6: vibrant + animationType wave */}
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className="absolute inset-0" />
                    <div className="pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background">
                        <Heart className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        variant="vibrant"
                        animationType="wave"
                        className="absolute inset-0"
                    />
                </div>

                {/* Card 7: glow + shape circle + animationType wave */}
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className="absolute inset-0" />
                    <div className="pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background">
                        <Sparkles className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        variant="glow"
                        shape="circle"
                        animationType="wave"
                        className="absolute inset-0"
                    />
                </div>

                {/* Card 8: subtle + shape circle + animationType wave */}
                <div className="group relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <GlowRadial className="absolute inset-0" />
                    <div className="pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background">
                        <BellRing className="size-26 origin-top group-hover:animate-bell group-hover:text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        active={true}
                        variant="subtle"
                        speed={1000}
                        shape="star"
                        animationType="wave"
                        className="absolute inset-0"
                    />
                </div>
            </div>
        </Wrapper>
    );
}

Home.displayName = 'Home';

Home.layout = MainLayout;
