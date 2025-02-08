import 'leaflet/dist/leaflet.css';
import Main from '@components/game/Main';
import React from 'react';
import { Skeleton } from '@heroui/skeleton';

const page = async () => {
    return (
        <main className="flex flex-col justify-center items-center h-[calc(100vh-4rem)]">
            <React.Suspense
                fallback={
                    <>
                        <div className="grow size-full" />
                        <div className="w-full h-24" />
                    </>
                }
            >
                <Main />
            </React.Suspense>
        </main>
    );
};

export default page;
