import Wrapper from '@/components/wrapper';
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
            <Wrapper className="min-h-screen">
                <h1>Canvas</h1>
            </Wrapper>
        </MainLayout>
    );
}

Canvas.displayName = 'Canvas';
