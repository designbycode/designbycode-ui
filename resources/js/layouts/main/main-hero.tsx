import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TextAnimator from '@/registry/new-york/components/ui/animations/text-animator';
import { GlowRadial } from '@/registry/new-york/components/ui/glow/glow-radial';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';

export default function MainHero() {
    return (
        <div className={`relative rounded-2xl`}>
            <GlowRadial className={`absolute inset-0`} />
            <GlowRadial
                borderWidth={15}
                className={`absolute -inset-2 opacity-25 blur-xs`}
            />
            <div
                className={`bg-mute/20 relative isolate grid min-h-100 w-full place-content-center overflow-clip rounded-[inherit] border border-border`}
            >
                <div className={`space-y-3 p-6`}>
                    <h1 className="text-center text-7xl font-bold tracking-tighter text-balance">
                        Components and{' '}
                        <TextAnimator
                            text="Animations"
                            animation={`zap`}
                            repeat={-1}
                        />
                    </h1>

                    <p
                        className={`mx-auto max-w-xl text-center text-lg tracking-wide text-balance`}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Accusamus dignissimos exercitationem, nulla
                        pariatur sed vel!
                    </p>
                    <div className="group flex justify-center space-x-4">
                        <Button className={`relative`}>
                            <GlowRadial
                                size={150}
                                colors={[
                                    `oklch(66.6% 0.179 58.318), transparent`,
                                ]}
                                borderWidth={3}
                                className={`absolute -inset-1 blur-xs`}
                            />
                            <GlowRadial
                                size={150}
                                colors={[
                                    `oklch(66.6% 0.179 58.318), transparent`,
                                ]}
                                borderWidth={2}
                                className={`absolute -inset-0.5`}
                            />
                            <GlowRadial
                                size={150}
                                colors={[
                                    `oklch(66.6% 0.179 58.318), transparent`,
                                ]}
                                borderWidth={2}
                                className={`absolute -inset-1.5 mix-blend-color-dodge blur-xs`}
                            />
                            <Crown className="size-4 group-hover:text-brand" />
                            <span>Premium Components</span>
                        </Button>
                        <Button className={`relative`} variant="secondary">
                            <GlowRadial
                                size={150}
                                borderWidth={3}
                                className={`absolute -inset-1 blur-xs`}
                            />
                            <GlowRadial
                                size={150}
                                borderWidth={2}
                                className={`absolute -inset-0.5`}
                            />
                            <GlowRadial
                                size={150}
                                borderWidth={2}
                                className={`absolute -inset-1.5 mix-blend-color-dodge blur-xs`}
                            />
                            View Components
                        </Button>
                    </div>
                </div>

                <WavesThree
                    cameraPosition={{ x: 0, y: -20, z: 5 }}
                    style="wireframe"
                    colors={['#a1a1a1', '#646464']}
                    className={`mask-linear -inset-10 -z-20 rounded-[inherit] mask-linear-from-10% mask-linear-to-50% opacity-20`}
                />
            </div>
        </div>
    );
}
