import React from "react";
import {IPinDigitProps} from "../types/types";
import classNames from "classnames";

export const PinDigit: React.FC<IPinDigitProps> = (props: IPinDigitProps) => {
    const [hidden, setHiddenTo] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.value) {
            const timeout: NodeJS.Timeout = setTimeout(() => {
                setHiddenTo(true);
            }, 500);

            return () => {
                setHiddenTo(false);

                clearTimeout(timeout);
            };
        }
    }, [props.value]);

    return (
        <div
            className={classNames("app-pin-digit", {
                focused: props.focused,
                hidden
            })}
        >
            <span className="app-pin-digit-value">{props.value || ""}</span>
        </div>
    );
};
