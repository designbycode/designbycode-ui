import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainHero from '@/layouts/main/main-hero';
import MainLayout from '@/layouts/main-layout';
import { BackDropLight } from '@/registry/new-york/components/ui/back-drop-light';
import { GlowRadial } from '@/registry/new-york/components/ui/glow/glow-radial';

export default function Home() {
    return (
        <div className="min-h-screen">
            <Head title="Home">
                <meta name="description" content="Your page description" />
            </Head>
            <MainHero />

            <div className="my-12 grid grid-cols-3 gap-6">
                <BackDropLight intensity={0.7}>
                    <Card className={`relative`}>
                        <CardHeader>
                            <CardTitle>Card 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Doloremque, quasi.
                            </p>
                            <p>
                                Consequuntur ducimus in, ipsum magni maiores
                                maxime rerum ut vel!
                            </p>
                        </CardContent>
                        <GlowRadial className={`absolute inset-0`} />
                        <GlowRadial className={`absolute -inset-1 blur-sm`} />
                    </Card>
                </BackDropLight>
                <BackDropLight intensity={0.7} blur={10}>
                    <Card className={`relative`}>
                        <CardHeader>
                            <CardTitle>Card 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Doloremque, quasi.
                            </p>
                            <p>
                                Consequuntur ducimus in, ipsum magni maiores
                                maxime rerum ut vel!
                            </p>
                        </CardContent>
                        <GlowRadial className={`absolute inset-0`} />
                        <GlowRadial className={`absolute -inset-1 blur-sm`} />
                    </Card>
                </BackDropLight>
                <BackDropLight intensity={0.7}>
                    <Card className={`relative`}>
                        <CardHeader>
                            <CardTitle>Card 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Doloremque, quasi.
                            </p>
                            <p>
                                Consequuntur ducimus in, ipsum magni maiores
                                maxime rerum ut vel!
                            </p>
                        </CardContent>
                        <GlowRadial className={`absolute inset-0`} />
                        <GlowRadial className={`absolute -inset-1 blur-sm`} />
                    </Card>
                </BackDropLight>
            </div>
        </div>
    );
}

Home.displayName = 'Home';

Home.layout = MainLayout;
