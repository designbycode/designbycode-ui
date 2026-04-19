import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { PackageManagerSelect } from '@/components/ui/package-manager-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/layouts/main-layout';
import type { WaveStyle } from '@/registry/new-york/components/ui/threejs/waves-three';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';
import { index as animationsIndex } from '@/routes/animations';

const waveStyles: { value: WaveStyle; label: string }[] = [
    { value: 'grid', label: 'Grid' },
    { value: 'wireframe', label: 'Wireframe' },
    { value: 'dots', label: 'Dots' },
    { value: 'dots-wave', label: 'Dots Wave' },
    { value: 'crosses', label: 'Crosses' },
    { value: 'diagonal-left', label: 'Diagonal Left' },
    { value: 'diagonal-right', label: 'Diagonal Right' },
    { value: 'zigzag', label: 'Zigzag' },
    { value: 'hexagons', label: 'Hexagons' },
    { value: 'dashes', label: 'Dashes' },
    { value: 'contour', label: 'Contour' },
    { value: 'solid', label: 'Solid' },
];

export default function Three() {
    const [selectedStyle, setSelectedStyle] = useState<WaveStyle>('grid');

    return (
        <MainLayout
            breadcrumbs={[
                { title: 'Animations', href: animationsIndex() },
                { title: 'Three.js', href: '#' },
            ]}
        >
            <div className="container mx-auto py-3">
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-bold text-foreground">
                            Three.js Waves
                        </h1>
                        <Badge variant="secondary" className="text-xs">
                            Premium
                        </Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                        Interactive 3D wave animations built with Three.js
                    </p>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Interactive Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center gap-4">
                            <label
                                htmlFor="style-select"
                                className="text-sm font-medium"
                            >
                                Style:
                            </label>
                            <Select
                                value={selectedStyle}
                                onValueChange={(value) =>
                                    setSelectedStyle(value as WaveStyle)
                                }
                            >
                                <SelectTrigger
                                    id="style-select"
                                    className="w-45"
                                >
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent>
                                    {waveStyles.map((style) => (
                                        <SelectItem
                                            key={style.value}
                                            value={style.value}
                                        >
                                            {style.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="relative aspect-video overflow-clip rounded-lg border">
                            <WavesThree
                                style={selectedStyle}
                                className="absolute inset-0"
                            />
                        </div>
                    </CardContent>
                </Card>

                <h2 className="mt-12 mb-4 text-2xl font-semibold text-foreground">
                    Installation
                </h2>
                <PackageManagerSelect
                    className="my-4"
                    codes={{
                        npm: 'npm shadcn@latest add https://ui.designbycode.co.za/r/waves-three.json',
                        yarn: 'yarn shadcn@latest add https://ui.designbycode.co.za/r/waves-three.json',
                        pnpm: 'pnpm shadcn@latest add https://ui.designbycode.co.za/r/waves-three.json',
                        bun: 'bunx --bun shadcn@latest add https://ui.designbycode.co.za/r/waves-three.json',
                    }}
                />
                <p className="text-zinc-500">
                    Prerequisites: Ensure you have{' '}
                    <code className="rounded bg-muted px-1 text-muted-foreground">
                        three
                    </code>{' '}
                    installed.
                </p>

                <h2 className="mt-12 mb-4 text-2xl font-semibold text-foreground">
                    Usage
                </h2>

                <CodeBlock
                    code={`<WavesThree
    style={'${selectedStyle}'}
    className="absolute inset-0"
/>`}
                    language="typescript"
                    className="my-4"
                />

                <h2 className="mt-12 mb-4 text-2xl font-semibold text-foreground">
                    Props
                </h2>

                <div className="rounded-md border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">
                                    Prop
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Default
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="px-4 py-3 font-mono text-primary">
                                    style
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    WaveStyle
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    'grid'
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    Visual style of the wave
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-primary">
                                    colors
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    string[]
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    Auto-detect
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    CSS colors blended across the mesh
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-primary">
                                    speed
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    number
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    1
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    Animation speed multiplier
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-primary">
                                    amplitude
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    number
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    1.5
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    Wave peak height
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-primary">
                                    paused
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    boolean
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    false
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    Pause animation
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="mt-12 mb-4 text-2xl font-semibold text-foreground">
                    Wave Styles
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {waveStyles.map((style) => (
                        <Dialog key={style.value}>
                            <DialogTrigger asChild>
                                <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                                    <CardContent className="p-4">
                                        <div className="relative aspect-video overflow-clip rounded-md border">
                                            <WavesThree
                                                style={style.value}
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <p className="mt-2 text-center font-medium">
                                            {style.label}
                                        </p>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>{style.label}</DialogTitle>
                                    <DialogDescription>
                                        Interactive 3D wave with {style.label}{' '}
                                        style
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="relative aspect-video overflow-hidden rounded-lg border">
                                    <WavesThree
                                        style={style.value}
                                        className="absolute inset-0"
                                    />
                                </div>
                                <CodeBlock
                                    code={`<WavesThree style="${style.value}" />`}
                                    language="typescript"
                                    className="my-4"
                                />
                                <div className="flex justify-end">
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `<WavesThree style="${style.value}" />`,
                                            );
                                            toast.success('Code copied!');
                                        }}
                                    >
                                        Copy Code
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

Three.displayName = 'Three';
