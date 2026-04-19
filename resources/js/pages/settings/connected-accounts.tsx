import { Form, Head, usePage } from '@inertiajs/react';
import { Github, Globe, Link2, Loader2, Unlink } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type ConnectedAccount = {
    provider: string;
    provider_id: string;
    avatar: string | null;
    connected_at: string;
};

type Props = {
    connectedAccounts: ConnectedAccount[];
    availableProviders: string[];
};

const providerLabels: Record<string, string> = {
    github: 'GitHub',
    google: 'Google',
};

const providerIcons: Record<string, typeof Github | typeof Globe> = {
    github: Github,
    google: Globe,
};

export default function ConnectedAccounts({
    connectedAccounts,
    availableProviders,
}: Props) {
    const { errors } = usePage<{ errors: Record<string, string> }>().props;
    const [disconnecting, setDisconnecting] = useState<string | null>(null);

    const handleDisconnect: FormEventHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const provider = form.dataset.provider;

        if (provider) {
            setDisconnecting(provider);
        }
    };

    return (
        <>
            <Head title="Connected accounts" />

            <h1 className="sr-only">Connected accounts</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Connected accounts"
                    description="Manage your connected social accounts"
                />

                {connectedAccounts.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium">Connected</h2>
                        <div className="grid gap-4">
                            {connectedAccounts.map((account) => {
                                const Icon =
                                    providerIcons[account.provider] || Link2;
                                const label =
                                    providerLabels[account.provider] ||
                                    account.provider;

                                return (
                                    <Card key={account.provider}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <div className="flex items-center gap-3">
                                                <Icon className="h-5 w-5" />
                                                <CardTitle className="text-base font-medium">
                                                    {label}
                                                </CardTitle>
                                            </div>
                                            <Form
                                                method="delete"
                                                data-provider={account.provider}
                                                onSubmit={handleDisconnect}
                                            >
                                                {({ processing }) => (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        type="submit"
                                                        disabled={
                                                            processing ||
                                                            disconnecting ===
                                                                account.provider
                                                        }
                                                    >
                                                        {disconnecting ===
                                                            account.provider && (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        )}
                                                        <Unlink className="mr-2 h-4 w-4" />
                                                        Disconnect
                                                    </Button>
                                                )}
                                            </Form>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription>
                                                Connected on{' '}
                                                {new Date(
                                                    account.connected_at,
                                                ).toLocaleDateString()}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {availableProviders.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium">Available</h2>
                        <div className="grid gap-4">
                            {availableProviders.map((provider) => {
                                const Icon = providerIcons[provider] || Link2;
                                const label =
                                    providerLabels[provider] || provider;

                                return (
                                    <Card key={provider}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <div className="flex items-center gap-3">
                                                <Icon className="h-5 w-5" />
                                                <CardTitle className="text-base font-medium">
                                                    {label}
                                                </CardTitle>
                                            </div>
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                            >
                                                <a href={`/auth/${provider}`}>
                                                    <Link2 className="mr-2 h-4 w-4" />
                                                    Connect
                                                </a>
                                            </Button>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {connectedAccounts.length === 0 &&
                    availableProviders.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            No connected accounts available.
                        </p>
                    )}

                <InputError message={errors.provider} className="mt-2" />
            </div>
        </>
    );
}

ConnectedAccounts.layout = {
    breadcrumbs: [
        {
            title: 'Connected accounts',
            href: '/settings/connected-accounts',
        },
    ],
};
