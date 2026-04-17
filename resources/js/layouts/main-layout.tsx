import MainFooter from '@/layouts/main/main-footer';
import MainNavigation from '@/layouts/main/main-navigation';
import { cn } from '@/lib/utils';


type MainLayoutProps = {
    className?: string;
    children: React.ReactNode;
}

export default function MainLayout({className, children, ...props}: MainLayoutProps) {
    return (
        <div
            {...props}
            className={cn(
                `flex pt-20 min-h-screen flex-col overflow-x-clip`,
                className,
            )}
        >
            <MainNavigation />
            <main className={`flex-1`}>{children}</main>
            <MainFooter />
        </div>
    );
}

MainLayout.displayName = 'MainLayout';
