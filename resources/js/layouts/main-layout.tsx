import { cn } from '@/lib/utils';


type MainLayoutProps = {
    className?: string;
    children: React.ReactNode;
}

export default function MainLayout({className, children, ...props}: MainLayoutProps) {
    return (
        <div {...props} className={cn(`relative overflow-x-clip`, className)}>
            {children}
        </div>
    )
}

MainLayout.displayName = 'MainLayout';
