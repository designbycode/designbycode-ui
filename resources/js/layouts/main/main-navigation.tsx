import { Link } from '@inertiajs/react';
import { Crown } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import Wrapper from '@/components/wrapper';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { UseHeadroomOptions } from '@/registry/new-york/hooks/use-headroom';
import useHeadroom from '@/registry/new-york/hooks/use-headroom';
import { home } from '@/routes';
import { index as animationIndex } from '@/routes/animations';

const links = [
    {
        title: 'Animations',
        href: animationIndex(),
    },

    {
        title: 'Blocks',
        href: '#',
    },
    {
        title: 'Components',
        href: '#',
    },
    {
        title: 'Hooks',
        href: '#',
    },
];

const MainNavigation = ({ className }: { className?: string }) => {
    const isMobile = useIsMobile();

    const { ref, pinned } = useHeadroom({
        enabled: !isMobile,
        offset: 16,
        tolerance: {
            down: 5,
            up: 5,
        },
    } as UseHeadroomOptions);

    return (
        <div
            ref={ref}
            className={cn(
                `fixed inset-x-0 top-0 z-50 flex h-16 items-center border-b border-border bg-background/75 backdrop-blur-sm transition-all`,
                pinned ? 'translate-y-0' : '-translate-y-16',
                className,
            )}
        >
            <Wrapper className="flex items-center justify-between">
                <Link
                    prefetch
                    className={`text-xl font-bold tracking-tight focus:outline-offset-4`}
                    href={home()}
                >
                    designbycode
                </Link>

                <div className="flex items-center space-x-2">
                    <NavigationMenu>
                        <NavigationMenuList className={`space-x-4 text-sm`}>
                            {links.map((link) => (
                                <NavigationMenuItem asChild key={link.title}>
                                    <Link
                                        className="text-muted-foreground hover:text-foreground"
                                        prefetch
                                        href={link.href}
                                    >
                                        {link.title}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center space-x-2">
                    <NavigationMenu>
                        <NavigationMenuList
                            className={`flex items-center space-x-4 text-sm`}
                        >
                            <NavigationMenuItem>
                                <ThemeToggle className="grid size-5 place-content-center text-muted-foreground hover:text-foreground" />
                            </NavigationMenuItem>
                            <NavigationMenuItem asChild>
                                <Button>
                                    <Crown className="size-4" />
                                    <span>Premium</span>
                                </Button>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </Wrapper>
        </div>
    );
};

export default MainNavigation;
