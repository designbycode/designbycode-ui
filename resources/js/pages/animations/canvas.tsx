import Wrapper from '@/components/wrapper';
import MainLayout from '@/layouts/main-layout';


export default function Canvas() {
    return (
        <Wrapper className="min-h-screen">
            <h1>Canvas</h1>
        </Wrapper>
    );
}

Canvas.displayName = 'Canvas';

Canvas.layout = MainLayout;
