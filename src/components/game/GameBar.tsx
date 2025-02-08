import { Button } from '@heroui/button';
import { encodeResult, type GameState } from '@lib/game';
import React from 'react';
import { TimeInput } from '@heroui/date-input';
import { Time } from '@internationalized/date';
import { Chip } from '@heroui/chip';
import { Show } from '@components/Flow';
import { Progress } from '@heroui/progress';
import { Input } from '@heroui/input';
import { BsFire } from 'react-icons/bs';
import { toast } from 'sonner';

interface WithGameState {
    gameState: GameState;
}

const GameBar = (
    props: WithGameState & {
        infoState: ReturnType<GameState['submitMarker']> | null;
        setInfoState: React.Dispatch<
            React.SetStateAction<ReturnType<GameState['submitMarker']> | null>
        >;
    }
) => {
    const { gameState, infoState, setInfoState } = props;

    const timeValue = React.useMemo(() => {
        const minutes =
            gameState.timer > 60 ? Math.floor(gameState.timer / 60) : 0;
        const seconds =
            minutes > 0 ? gameState.timer - minutes * 60 : gameState.timer;

        return new Time(0, minutes, seconds);
    }, [gameState.timer]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useEffect(() => {
        if (gameState.toMark === null && gameState.status === 'running') {
            gameState.reset();

            const resultCode = encodeResult(gameState);
            toast.success(
                <span>
                    Game Over!{' '}
                    <a href={`/?code=${resultCode}`} className="font-bold">
                        Get your result
                    </a>
                </span>
            );
        }
    }, [gameState.toMark, gameState.status]);

    return (
        <div className="w-full overflow-hidden">
            <Progress
                radius="none"
                color="success"
                value={(gameState.score.current / gameState.score.total) * 100}
                aria-label="Game Progress"
                size="sm"
            />
            <div
                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                role="group"
                className="flex flex-wrap justify-center items-center gap-4 m-2 w-full"
            >
                <Show
                    condition={
                        gameState.status === 'paused' ||
                        gameState.status === 'running'
                    }
                >
                    <Chip>{gameState.toMark?.name ?? 'Done'}</Chip>
                </Show>
                <Button
                    radius="full"
                    color="primary"
                    onPress={() => {
                        if (
                            gameState.toMark === null &&
                            gameState.status === 'running'
                        ) {
                            gameState.resetAndStart();
                        } else if (gameState.status === 'idle') {
                            gameState.start();
                        } else if (gameState.status === 'running') {
                            gameState.pause();
                        } else if (gameState.status === 'paused') {
                            gameState.resume();
                        }
                    }}
                    isDisabled={gameState.currentMarker === 'submitted'}
                >
                    {gameState.toMark === null && gameState.status === 'running'
                        ? 'Reset'
                        : gameState.status === 'idle'
                          ? 'Start'
                          : gameState.status === 'running'
                            ? 'Pause'
                            : 'Resume'}
                </Button>
                <Button
                    radius="full"
                    color="danger"
                    onPress={() => {
                        if (infoState) {
                            gameState.next(infoState);
                            setInfoState(null);
                        } else {
                            const info = gameState.submitMarker();
                            setInfoState(info);
                        }
                    }}
                    isDisabled={
                        gameState.currentMarker === 'none' ||
                        gameState.status === 'idle'
                    }
                >
                    {infoState ? 'Next' : 'Submit'}
                </Button>
                <TimeInput
                    value={timeValue}
                    hideTimeZone
                    aria-label="Game Timer"
                    hourCycle={24}
                    granularity="second"
                    className="w-fit"
                    isReadOnly
                />
                <Input
                    aria-label="Strictness"
                    type="number"
                    min={0.1}
                    step={0.1}
                    max={10.0}
                    value={gameState.strictness.toString()}
                    onValueChange={(v) => {
                        gameState.setStrictness(Number.parseFloat(v));
                    }}
                    className="w-fit"
                    label="Strictness"
                    labelPlacement="outside-left"
                    endContent={<BsFire className="size-6" />}
                />
            </div>
        </div>
    );
};

export default GameBar;
