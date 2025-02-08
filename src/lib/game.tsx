import { useMemo, useRef, useState } from 'react';
import {
    getPlace,
    isNearlyCorrect,
    type PlaceWithoutName,
    type Place
} from './places';
import { toast } from 'sonner';

type GameStatus = 'idle' | 'running' | 'paused';

export type Marker = Omit<Place, 'name'>;
export type SumbitInfo = {
    toMark: Place & {
        isMarked?: boolean;
    };
    updateGame: () => void;
} | null;

export interface GameState {
    status: GameStatus;
    timer: number;
    score: {
        total: number;
        current: number;
    };
    category: 'all' | string[];
    strictness: number;
    currentMarker: PlaceWithoutName | 'submitted' | 'none';
    toMark: Place | null;
    setCategory: React.Dispatch<React.SetStateAction<'all' | string[]>>;
    setStrictness: React.Dispatch<React.SetStateAction<number>>;
    setCurrentMarker: React.Dispatch<
        React.SetStateAction<PlaceWithoutName | 'submitted' | 'none'>
    >;
    submitMarker: () => SumbitInfo;
    resetAndStart: () => void;
    next: (info: SumbitInfo) => void;
    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
}

interface Result {
    score: number;
    total: number;
    time: number;
    category: 'all' | string[];
    strictness: number;
}

export const encodeResult = (result: GameState) => {
    const data = {
        score: result.score.current,
        total: result.score.total,
        time: result.timer,
        category: result.category,
        strictness: result.strictness
    };

    return encodeURIComponent(btoa(JSON.stringify(data)));
};

export const decodeResult = (data: string): Result =>
    JSON.parse(atob(decodeURIComponent(data))) as Result;

export const useGame = (): GameState => {
    const [status, setStatus] = useState<GameStatus>('idle');
    const [timer, setTimer] = useState(0);
    const [score, setScore] = useState<{
        total: number;
        current: number;
    }>({
        total: 0,
        current: 0
    });
    const [strictness, setStrictness] = useState(0.5);
    const [category, setCategory] = useState<'all' | string[]>('all');
    const _toMarkPlaces = useMemo(() => getPlace(category), [category]);
    const [toMarkPlaces, setToMarkPlaces] = useState<
        (Place & {
            isMarked?: boolean;
        })[]
    >([]);
    const toMark = useMemo<(Place & { isMarked?: boolean }) | null>(
        () => toMarkPlaces.filter((p) => !p.isMarked)[0] ?? null,
        [toMarkPlaces]
    );
    // its place where user is placing marker not the actual place
    const [currentMarker, setCurrentMarker] = useState<
        PlaceWithoutName | 'submitted' | 'none'
    >('none');

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const playTimer = () => {
        timerRef.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
    };
    const pauseTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const start = () => {
        setStatus('running');
        playTimer();
        setScore({
            total: 0,
            current: 0
        });
        setToMarkPlaces(_toMarkPlaces);
        setCurrentMarker('none');
    };

    const pause = () => {
        setStatus('paused');
        pauseTimer();
    };

    const resume = () => {
        setStatus('running');
        playTimer();
    };

    const sumbitPause = () => {
        pause();
        setCurrentMarker('submitted');
    };

    const submitMarker = () => {
        if (
            currentMarker === 'none' ||
            currentMarker === 'submitted' ||
            toMark === null
        )
            return null;

        const isCorrect = isNearlyCorrect(currentMarker, toMark);

        if (!isCorrect) {
            toast.error('Incorrect! Next time');
        }

        setScore((prev) => ({
            total: prev.total + 1,
            current: isCorrect ? prev.current + 1 : prev.current
        }));
        setCurrentMarker('submitted');
        sumbitPause();

        return {
            toMark: JSON.parse(JSON.stringify(toMark)),
            updateGame: () => {
                setToMarkPlaces((prev) =>
                    prev.map((p) => {
                        if (p === toMark) {
                            return {
                                ...p,
                                isMarked: true
                            };
                        }
                        return p;
                    })
                );
            }
        };
    };

    const next = (info: SumbitInfo) => {
        if (!info) return;
        info.updateGame();
        setCurrentMarker('none');
        resume();
    };

    const reset = () => {
        setStatus('idle');
        pauseTimer();
        setTimer(0);
        setScore({
            total: 0,
            current: 0
        });
        setToMarkPlaces([]);
        setCurrentMarker('none');
    };

    const resetAndStart = () => {
        reset();
        start();
    };

    return {
        status,
        timer,
        score,
        category,
        setCategory,
        strictness,
        setStrictness,
        currentMarker,
        setCurrentMarker,
        toMark,
        submitMarker,
        resetAndStart,
        next,
        start,
        pause,
        resume,
        reset
    };
};
