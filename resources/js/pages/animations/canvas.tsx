import MainLayout from '@/layouts/main-layout';
import { index as animationsIndex } from '@/routes/animations';

export default function Canvas() {
    return (
        <MainLayout
            breadcrumbs={[
                { title: 'Animations', href: animationsIndex() },
                { title: 'Canvas', href: '#' },
            ]}
        >
            <div className="min-h-screen">
                <h1>Canvas</h1>
            </div>
        </MainLayout>
    );
}

Canvas.displayName = 'Canvas';
