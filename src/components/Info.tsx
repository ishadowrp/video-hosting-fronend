import React from "react";
import {IInfoProps} from "../types/types";
import {Time} from "./Time";
import {WeatherSnap} from "./WeatherSnap";

export const Info: React.FC<IInfoProps> = (props: IInfoProps) => {
    return (
        <div id={props.id} className="info">
            <Time />
            <WeatherSnap />
        </div>
    );
};