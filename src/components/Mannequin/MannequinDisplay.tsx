import React from "react";
import { Joints } from "./Joints";
import { Mannequin } from "./Mannequin";
import CustomHoverCardOutsideSVG from "../CustomHoverCardOutsideSVG";
import { round } from "../RangeGraph";

interface MannequinDisplayProps {
    jointsWithScore: Record<string, number>;
    fillColor?: string;
}

const radius = 12;

export const MannequinDisplay: React.FC<MannequinDisplayProps> = ({
    jointsWithScore,
    fillColor,
}) => {
    const orginalHeight = 450;
    const orginalWidth = 363;

    return (
        <svg
            viewBox={`0 0 ${orginalWidth} ${orginalHeight}`}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <image
                href={Mannequin}
                width={orginalWidth}
                height={orginalHeight}
            />

            {Joints.map((joint) => {
                const value = jointsWithScore[joint.id] ?? 0;
                const color =
                    value !== 0
                        ? (fillColor ?? "var(--colorBrandBackgroundStatic)")
                        : "black";

                return (
                    <CustomHoverCardOutsideSVG
                        data={{
                            color: color,
                            yValue: `${round(value * 100)}%`,
                            legend: joint.id,
                        }}
                    >
                        <circle
                            key={joint.id + "_black"}
                            cx={joint.x / 4}
                            cy={joint.y / 4}
                            r={radius}
                            fill={"black"}
                        />
                        <circle
                            key={joint.id}
                            cx={joint.x / 4}
                            cy={joint.y / 4}
                            r={value * radius}
                            fill={color}
                        />
                    </CustomHoverCardOutsideSVG>
                );
            })}
        </svg>
    );
};
