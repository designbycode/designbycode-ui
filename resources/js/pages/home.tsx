import { BellRing } from 'lucide-react';
import Wrapper from '@/components/wrapper';
import MainHero from '@/layouts/main/main-hero';
import MainLayout from '@/layouts/main-layout';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';

export default function Home() {
    return (
        <Wrapper>
            <MainHero />

            <div className="my-6 grid max-w-full grid-cols-3 gap-6">
                <div className="relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <div
                        className={`pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background`}
                    >
                        <BellRing className="size-26 text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        className={`absolute inset-0 rounded-lg mask-radial-from-20% mask-radial-to-90% mask-radial-at-center mask-exclude`}
                    />
                </div>
                <div className="relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <div
                        className={`pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background`}
                    >
                        <BellRing className="size-26 text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        className={`absolute inset-0 rounded-lg mask-radial-from-20% mask-radial-to-90% mask-radial-at-center mask-exclude`}
                    />
                </div>
                <div className="relative isolate grid aspect-square place-items-center overflow-clip rounded-lg border border-border">
                    <div
                        className={`pointer-events-none relative z-10 grid size-2/3 place-items-center bg-radial from-background`}
                    >
                        <BellRing className="size-26 text-muted-foreground" />
                    </div>
                    <PixelCanvas
                        className={`absolute inset-0 rounded-lg mask-radial-from-20% mask-radial-to-90% mask-radial-at-center mask-exclude`}
                    />
                </div>
            </div>
        </Wrapper>
    );
}

Home.displayName = 'Home';

Home.layout = MainLayout;
