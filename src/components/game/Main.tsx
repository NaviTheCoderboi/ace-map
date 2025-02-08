'use client';
import GameBar from '@components/game/GameBar';
import { type GameState, useGame } from '@lib/game';
import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from '@heroui/spinner';
import { useSearchParams } from 'next/navigation';

const Game = dynamic(() => import('@components/game/Game'), {
    ssr: false,
    loading: () => (
        <Spinner size="lg" color="secondary" aria-label="Map loading..." />
    )
});

const Main = () => {
    const gameState = useGame();
    const [infoState, setInfoState] = React.useState<ReturnType<
        GameState['submitMarker']
    > | null>(null);
    const searchParams = useSearchParams();

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useEffect(() => {
        const category = searchParams.get('category');
        const arrayfied =
            category === 'all'
                ? 'all'
                : Array.from(new Set(category?.split(',') ?? []));

        gameState.setCategory(arrayfied);
    }, []);

    return (
        <>
            <div className="grow flex justify-center items-center p-2 sm:p-4 lg:p-6 xl:p-8 overflow-hidden size-full">
                <Game gameState={gameState} infoState={infoState} />
            </div>
            <GameBar
                gameState={gameState}
                infoState={infoState}
                setInfoState={setInfoState}
            />
        </>
    );
};

export default Main;
