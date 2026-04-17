import TextAnimator from '@/registry/new-york/components/ui/animations/text-animator';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';


export default function MainHero()
{
    return (
        <div className={`relative rounded-2xl`}>
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
