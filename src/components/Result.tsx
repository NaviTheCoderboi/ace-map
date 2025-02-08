'use client';
import { decodeResult } from '@lib/game';
import React from 'react';
// @ts-ignore
import confetti from 'canvas-confetti';
import { TbTargetArrow } from 'react-icons/tb';
import { FaRegClock } from 'react-icons/fa';
import { Button } from '@heroui/button';
import { BsFire } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { Time } from '@internationalized/date';
import { BiCategory } from 'react-icons/bi';
import { Select, SelectItem } from '@heroui/select';
import { categories } from '@lib/places';

const count = 200;
const defaults = {
    origin: { y: -0.7 },
    angle: 270
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const fire = (particleRatio: number, opts: Record<string, any>) => {
    confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
    });
};

const Result = ({ code }: { code: string }) => {
    const {
        score,
        total: totalScore,
        category,
        strictness,
        time: timeTaken
    } = decodeResult(code);

    const router = useRouter();

    React.useEffect(() => {
        fire(0.4, {
            spread: 26,
            startVelocity: 55
        });
        fire(0.2, {
            spread: 60
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.5, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.5, {
            spread: 120,
            startVelocity: 45
        });
    }, []);

    const accuracy = Math.round((score / totalScore) * 100);
    const gradients = {
        0: 'from-rose-400 to-red-600 dark:from-rose-600 dark:to-red-800',
        50: 'from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800',
        75: 'from-emerald-400 to-emerald-600 dark:from-emerald-600 dark:to-emerald-800'
    };
    const txtColors = {
        0: 'text-rose-800 dark:text-rose-100',
        50: 'text-yellow-800 dark:text-yellow-100',
        75: 'text-emerald-800 dark:text-emerald-100'
    };
    const shadows = {
        0: 'sm:shadow-rose-500/60',
        50: 'sm:shadow-yellow-500/60',
        75: 'sm:shadow-emerald-500/60'
    };
    const messages = {
        0: {
            title: 'You can do better!',
            message: 'You can do better! Try again.'
        },
        50: {
            title: 'Good job!',
            message: 'Good job! You are getting there.'
        },
        75: {
            title: 'Great job!',
            message: 'Great job! You are doing amazing.'
        }
    };

    const gradient = Object.keys(gradients).reduce(
        // @ts-ignore
        (acc, key) => (accuracy >= +key ? gradients[key] : acc),
        ''
    );
    const txtColor = Object.keys(txtColors).reduce(
        // @ts-ignore
        (acc, key) => (accuracy >= +key ? txtColors[key] : acc),
        ''
    );
    const shadow = Object.keys(shadows).reduce(
        // @ts-ignore
        (acc, key) => (accuracy >= +key ? shadows[key] : acc),
        ''
    );
    const message = Object.keys(messages).reduce(
        // @ts-ignore
        (acc, key) => (accuracy >= +key ? messages[key] : acc),
        { title: '', message: '' }
    );

    const formattedTime = new Time(0, 0, timeTaken).toString();

    return (
        <div
            className={`max-w-2xl sm:shadow-2xl sm:mx-4 sm:grid sm:grid-cols-2 sm:rounded-3xl ${shadow}`}
        >
            <div
                className={`grid content-start items-center justify-center text-center gap-4 result py-6 px-12 bg-gradient-to-b  rounded-b-3xl sm:rounded-3xl ${gradient} ${txtColor}`}
            >
                <h1 className="text-xl">Your Result</h1>

                <p
                    className={`w-32 mx-auto aspect-square bg-gradient-to-b rounded-full grid place-content-center ${gradient}`}
                >
                    <span className="text-4xl font-bold">{accuracy}%</span>
                </p>

                <h2 className="text-2xl font-semibold">{message.title}</h2>

                <p>{message.message}</p>
            </div>

            <div className="p-6 grid content-start gap-6">
                <h1 className="text-xl text-dark-gray-blue font-bold">
                    Summary
                </h1>

                <div className="grid gap-4">
                    <div>
                        <div className="rounded-lg p-2 flex justify-between gap-4">
                            <div className="flex gap-2 items-center">
                                <TbTargetArrow className="size-6" />
                                <p>Accuracy</p>
                            </div>
                            <p className="font-bold">{accuracy}%</p>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-lg p-2 flex justify-between gap-4">
                            <div className="flex gap-2 items-center">
                                <FaRegClock className="size-6" />
                                <p>Time</p>
                            </div>
                            <p className="font-bold">{formattedTime}</p>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-lg p-2 flex justify-between gap-4">
                            <div className="flex gap-2 items-center">
                                <BsFire className="size-6" />
                                <p>Strictness</p>
                            </div>
                            <p className="font-bold">{strictness}</p>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-lg p-2 flex justify-between gap-4">
                            <div className="flex gap-2 items-center">
                                <BiCategory className="size-6" />
                                <p>Category</p>
                            </div>
                            <Select
                                label="Categories"
                                selectedKeys={
                                    category === 'all' ? ['all'] : category
                                }
                                className="w-full"
                            >
                                {['All', ...categories].map((cat) => (
                                    <SelectItem key={cat}>{cat}</SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>

                <Button
                    radius="full"
                    type="button"
                    color="success"
                    onPress={() => router.push('/')}
                >
                    Play Again
                </Button>
            </div>
        </div>
    );
};

export default Result;
