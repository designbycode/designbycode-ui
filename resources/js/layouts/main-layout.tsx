import { Breadcrumbs } from '@/components/breadcrumbs';
import Wrapper from '@/components/wrapper';
import MainFooter from '@/layouts/main/main-footer';
import MainNavigation from '@/layouts/main/main-navigation';
import { cn } from '@/lib/utils';
import { GlowStack } from '@/registry/new-york/components/ui/glow/glow-stack';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

type MainLayoutProps = {
    className?: string;
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItemType[];
};

export default function MainLayout({
    className,
    children,
    breadcrumbs = [],
    ...props
}: MainLayoutProps) {
    return (
        <GlowStack>
            <div
                {...props}
                className={cn(
                    `flex min-h-screen flex-col overflow-x-clip pt-20`,
                    className,
                )}
            >
                <MainNavigation />
                <Wrapper className={`mb-4`}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </Wrapper>
                <main className={`flex-1`}>{children}</main>
                <MainFooter />
            </div>
        </GlowStack>
    );
}

MainLayout.displayName = 'MainLayout';
