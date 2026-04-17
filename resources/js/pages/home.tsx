import Wrapper from '@/components/wrapper';
import MainLayout from '@/layouts/main-layout';


export default function Home() {
    return (
        <Wrapper>
            <div>Home</div>
        </Wrapper>
    )
}


Home.displayName = 'Home';

Home.layout = MainLayout;
