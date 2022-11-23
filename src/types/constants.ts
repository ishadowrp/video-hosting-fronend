import {INumberUtility, IPosition, ITimeUtility} from "./types";
import React from "react";

export const backendURL = 'http://127.0.0.1:8000';

export const webSocketUrl = 'ws://127.0.0.1:8000';

export const defaultPosition = (): IPosition => ({
    left: 0,
    x: 0
});

export const N: INumberUtility = {
    clamp: (min: number, value: number, max: number) =>
        Math.min(Math.max(min, value), max),
    rand: (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1) + min)
};

export const T: ITimeUtility = {
    format: (date: Date): string => {
        const hours: string = T.formatHours(date.getHours()),
            minutes: number = date.getMinutes(),
            seconds: number = date.getSeconds();

        return `${hours}:${T.formatSegment(minutes)}`;
    },
    formatHours: (hours: number): string => {
        return hours % 12 === 0 ? "12" : String(hours % 12);
    },
    formatSegment: (segment: number): string => {
        return segment < 10 ? `0${segment}` : String(segment);
    }
};

export const useCurrentDateEffect = (): Date => {
    const [date, setDate] = React.useState<Date>(new Date());

    React.useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            const update: Date = new Date();

            if (update.getSeconds() !== date.getSeconds()) {
                setDate(update);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [date]);

    return date;
};

