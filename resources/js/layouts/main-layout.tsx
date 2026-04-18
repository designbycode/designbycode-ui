import { usePage } from '@inertiajs/react';
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
    const { url } = usePage();

    return (
        <GlowStack>
            <div
                {...props}
                className={cn(
                    `flex min-h-screen flex-col overflow-x-clip pt-16`,
                    className,
                )}
            >
                <MainNavigation />
                <Wrapper>
                    {url !== '/' && (
                        <div
                            className={`mb-4 border-b border-dashed border-border py-4`}
                        >
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                        </div>
                    )}
                    <main className={`flex-1`}>{children}</main>
                </Wrapper>

                <MainFooter />
            </div>
        </GlowStack>
    );
}

MainLayout.displayName = 'MainLayout';
