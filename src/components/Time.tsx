import React from "react";
import {T, useCurrentDateEffect} from "../types/constants";

export const Time: React.FC = () => {
    const date: Date = useCurrentDateEffect();

    return <span className="time">{T.format(date)}</span>;
};