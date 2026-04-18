import MainLayout from '@/layouts/main-layout';
import { index as animationsIndex } from '@/routes/animations';

export default function Three() {
    return (
        <MainLayout
            breadcrumbs={[
                { title: 'Animations', href: animationsIndex() },
                { title: 'Threejs', href: '#' },
            ]}
        >
            <div className="min-h-screen">
                <h1>Threejs</h1>
            </div>
        </MainLayout>
    );
}

Three.displayName = 'Three';
