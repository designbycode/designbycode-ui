import { Link } from '@inertiajs/react';
import Wrapper from '@/components/wrapper';
import MainLayout from '@/layouts/main-layout';
import { show } from '@/routes/animations';

export default function AnimationIndex() {
    return (
        <Wrapper className={`min-h-screen`}>
            <h1 className="mb-2 text-3xl font-semibold">Animations</h1>
            <ul className={`space-y-2`}>
                <li>
                    <Link prefetch href={show('text-animator')}>
                        Text Animator
                    </Link>
                </li>
                <li>
                    <Link prefetch href={show('animate-css')}>
                        Animate CSS
                    </Link>
                </li>
                <li>
                    <Link prefetch href={show('canvas')}>
                        Canvas
                    </Link>
                </li>
            </ul>
        </Wrapper>
    );
}


AnimationIndex.displayName = 'AnimationIndex';

AnimationIndex.layout = MainLayout;
