import { IChartProps, LineChart } from "@fluentui/react-charting";
import { getClusterColor, getSelectedClusterColor } from "./clusterColerUtils";
import { useMeasure } from "@uidotdev/usehooks";

//Find way to hide vertical dashes and axis

// With this there are no scrollbars and everything is visible
import "./ScatterChartWrapper-hack.css";
import { getJIPname } from "@/utils/jipUtils";

interface ScatterChartWrapperProps {
    points: Point[];
    selected: number[];
}

interface Point {
    x: number;
    y: number;
    cluster: number;
    patientId: string;
    isOutlier: boolean;
}

import MinMaxScaler from "@/utils/minMaxScaler";
import CustomHoverCardOutsideSVG from "../CustomHoverCardOutsideSVG";

export function ScatterChartWrapper({
    points,
    selected,
}: ScatterChartWrapperProps) {
    // Scale every point between 5 and 95 so there is always a 5% margin in the chart.
    const scaledX = new MinMaxScaler(5, 95).fitTransform(
        points.map((x) => x.x),
    );
    const scaledY = new MinMaxScaler(5, 95).fitTransform(
        points.map((x) => x.y),
    );

    return (
        <svg width={"100%"} height={"100%"} viewBox="0 0 100 100">
            {points.map((point, i) => (
                <CustomHoverCardOutsideSVG
                    data={{
                        color: getClusterColor(point.cluster) ?? "white",
                        legend: point.patientId.toString(),
                        xValue: point.isOutlier ? "Outlier" : "",
                        yValue: getJIPname(point.cluster),
                    }}
                >
                    {/* Use path here so that when scaling the chart, the points dont grow. */}
                    <path
                        d={`M ${scaledX[i]} ${scaledY[i]} l 0.0001 0`}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth="10"
                        strokeLinecap="round"
                        stroke={getSelectedClusterColor(
                            point.cluster,
                            selected,
                        )}
                    />
                </CustomHoverCardOutsideSVG>
            ))}
        </svg>
    );
}
