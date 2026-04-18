import { Link } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import MainLayout from '@/layouts/main-layout';
import TextAnimator from '@/registry/new-york/components/ui/animations/text-animator';
import { PixelCanvas } from '@/registry/new-york/components/ui/canvas/pixel-canvas';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';
import { show } from '@/routes/animations';

export default function AnimationIndex() {
    return (
        <MainLayout
            breadcrumbs={[{ title: 'Animations', href: show('animations') }]}
        >
            <Wrapper className={`min-h-screen`}>
                <h1 className="mb-2 text-3xl font-semibold">Animations</h1>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <Link prefetch href={show('text-animator')}>
                        <Card
                            className={`grid aspect-video place-content-center font-bebas-neue text-sm text-[clamp(0.75rem,10vw+1rem,2rem)] font-medium text-foreground/40`}
                        >
                            <TextAnimator
                                yoyo={true}
                                repeat={-1}
                                animation={`jelly`}
                            >
                                Text Animator
                            </TextAnimator>
                        </Card>
                    </Link>
                    <Link prefetch href={show('animate-css')}>
                        <Card
                            className={`grid aspect-video place-content-center font-bebas-neue text-sm text-[clamp(0.75rem,10vw+1rem,2rem)] font-medium text-foreground/40`}
                        >
                            <div className={`animate-bounce repeat-infinite`}>
                                Animate CSS
                            </div>
                        </Card>
                    </Link>
                    <Link prefetch href={show('canvas')}>
                        <Card
                            className={`relative isolate grid aspect-video place-content-center overflow-clip font-bebas-neue text-sm text-[clamp(0.75rem,10vw+1rem,2rem)] font-medium text-foreground/40`}
                        >
                            Canvas
                            <PixelCanvas
                                variant="subtle"
                                active={true}
                                className="absolute inset-0 rounded-[inherit] mask-linear-from-10% mask-linear-to-50% dark:opacity-20"
                            />
                        </Card>
                    </Link>
                    <Link prefetch href={show('three')}>
                        <Card
                            className={`relative isolate grid aspect-video place-content-center overflow-clip font-bebas-neue text-sm text-[clamp(0.75rem,10vw+1rem,2rem)] font-medium text-foreground/40`}
                        >
                            Three
                            <WavesThree
                                cameraPosition={{ x: 0, y: -20, z: 5 }}
                                style="wireframe"
                                colors={['#a1a1a1', '#646464']}
                                className={`mask-linear -inset-10 -z-20 rounded-[inherit] mask-linear-from-10% mask-linear-to-50% opacity-20`}
                            />
                        </Card>
                    </Link>
                </div>
            </Wrapper>
        </MainLayout>
    );
}

AnimationIndex.displayName = 'AnimationIndex';
