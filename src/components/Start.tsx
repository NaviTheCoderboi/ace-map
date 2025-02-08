'use client';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { startViewTransition } from '@lib/dom';
import { categories } from '@lib/places';
import { useRouter } from 'next/navigation';
import React from 'react';

const Start = () => {
    const [value, setValue] = React.useState<Set<string>>(new Set([]));
    const urlFriendlyCategories = React.useMemo(() => {
        const v = Array.from(value);
        const stringified = v.length === 0 ? 'all' : v.join(',');
        return encodeURIComponent(stringified);
    }, [value]);
    const router = useRouter();

    return (
        <>
            <Select
                label="Categories"
                placeholder="Select the categories"
                selectedKeys={value}
                variant="bordered"
                // @ts-ignore
                onSelectionChange={setValue}
                selectionMode="multiple"
                className="max-w-xs"
            >
                {categories.map((category) => (
                    <SelectItem key={category}>{category}</SelectItem>
                ))}
            </Select>
            <h3 className="text-default-500 text-small">
                If none is selected, `all` will be passed as category
            </h3>
            <Button
                onPress={() => {
                    startViewTransition(() => {
                        router.push(`/game?category=${urlFriendlyCategories}`);
                    });
                }}
            >
                Start
            </Button>
        </>
    );
};

export default Start;
