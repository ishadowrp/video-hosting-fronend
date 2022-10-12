import React from "react";
import {IMenuSectionProps} from "../../types/types";
import {ScrollableComponent} from "../tools/ScrollableComponent";

export const MenuSection: React.FC<IMenuSectionProps> = (props: IMenuSectionProps) => {
    const getContent = (): JSX.Element => {
        if (props.scrollable) {
            return (
                <ScrollableComponent className="menu-section-content">
                    {props.children}
                </ScrollableComponent>
            );
        }

        return <div className="menu-section-content">{props.children}</div>;
    };

    return (
        <div id={props.id} className="menu-section">
            <div className="menu-section-title">
                <i className={props.icon} />
                <span className="menu-section-title-text">{props.title}</span>
            </div>
            {getContent()}
        </div>
    );
};
