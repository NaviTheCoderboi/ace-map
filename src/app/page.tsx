import { Show } from '@components/Flow';
import Result from '@components/Result';
import Start from '@components/Start';
import React from 'react';

const page = async ({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const resultCode = (await searchParams).code;

    return (
        <main className="min-h-screen flex flex-col justify-center items-center gap-4">
            <Show condition={resultCode === undefined}>
                <Start />
            </Show>
            <Show condition={typeof resultCode === 'string'}>
                <Result code={resultCode as string} />
            </Show>
        </main>
    );
};

export default page;
