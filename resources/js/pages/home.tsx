import { Head } from '@inertiajs/react';
import MainHero from '@/layouts/main/main-hero';
import MainLayout from '@/layouts/main-layout';

export default function Home() {
    return (
        <div className="min-h-screen">
            <Head title="Home">
                <meta name="description" content="Your page description" />
            </Head>
            <MainHero />
        </div>
    );
}

Home.displayName = 'Home';

Home.layout = MainLayout;
