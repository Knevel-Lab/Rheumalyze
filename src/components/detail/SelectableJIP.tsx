import FeetIcon from "@/icon/Feet";
import { useEffect, useState } from "react";
import { getSelectedClusterColor } from "./clusterColerUtils";

import { DropFilled, HandRightFilled } from "@fluentui/react-icons";
import ThunderIcon from "@/icon/Thunder";

interface SelectableJIPProps {
    counts: {
        1: number;
        2: number;
        3: number;
        4: number;
    };
    onSelectionChanged: (newSelected: (1 | 2 | 3 | 4)[]) => void;
}

const itemConfig = [
    { label: "Feet", Icon: FeetIcon, props: { width: 24 } },
    { label: "Oligo", Icon: DropFilled, props: { fontSize: "x-large" } },
    { label: "Hand", Icon: HandRightFilled, props: { fontSize: "x-large" } },
    { label: "Poly", Icon: ThunderIcon, props: { width: 18 } },
];

export function SelectableJIP({
    counts,
    onSelectionChanged,
}: SelectableJIPProps) {
    const [selected, setSelected] = useState([1, 2, 3, 4]);

    useEffect(() => {
        onSelectionChanged(selected as (1 | 2 | 3 | 4)[]);
        console.log(selected);
    }, [selected, onSelectionChanged]);

    return itemConfig.map((x, index) => {
        const { label, Icon, props } = x;
        const cluster = (index + 1) as 1 | 2 | 3 | 4;
        const isSelected = selected.includes(cluster);
        return (
            <div
                key={cluster}
                onClick={() => setSelected((prev) => toggle(prev, cluster))}
                style={{ cursor: "pointer", userSelect: "none" }}
            >
                <p style={{ color: "#000000" + (isSelected ? "" : "4f") }}>
                    <Icon
                        {...props}
                        color={getSelectedClusterColor(cluster, selected)}
                    />
                    <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
                        {" "}
                        {counts[cluster]}{" "}
                    </span>
                    {label}
                </p>
            </div>
        );
    });
}

function toggle(source: Array<number>, value: number): Array<number> {
    if (source.length == 4) {
        return [value];
    }
    if (source.length == 1 && source[0] == value) {
        return [1, 2, 3, 4];
    }
    if (source.includes(value)) {
        return source.filter((x) => x !== value);
    } else {
        return [...source, value];
    }
}
