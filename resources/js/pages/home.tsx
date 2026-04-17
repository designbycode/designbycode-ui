import Wrapper from '@/components/wrapper';
import MainHero from '@/layouts/main/main-hero';
import MainLayout from '@/layouts/main-layout';
import { PackageManagerSelect } from '@/components/ui/package-manager-select';
import { CodeBlock} from '@/components/ui/code-block';

export default function Home() {
    return (
        <Wrapper>
            <MainHero />
            <PackageManagerSelect
                className="my-4"
                codes={{
                    npm: `npm shadcn@latest add @designbycode/test`,
                    yarn: `yarn shadcn@latest add @designbycode/test`,
                    pnpm: `pnpm shadcn@latest add @designbycode/test`,
                    bun: `bunx --bun shadcn@latest add @designbycode/test`,
                }}
            />

        </Wrapper>
    );
}


Home.displayName = 'Home';

Home.layout = MainLayout;
