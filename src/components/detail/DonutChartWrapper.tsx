import { DonutChart, IChartProps } from "@fluentui/react-charting";
import { getSelectedClusterColor } from "./clusterColerUtils";
import { useMeasure } from "@uidotdev/usehooks";

interface DonutChartWrapperProps {
    counts: {
        1: number;
        2: number;
        3: number;
        4: number;
    };
    selected: number[];
}

export function DonutChartWrapper({
    counts,
    selected,
}: DonutChartWrapperProps) {
    const [ref, { width, height }] = useMeasure();
    const data: IChartProps = {
        chartTitle: "OVerview per JIP",
        chartData: [
            {
                legend: "Feet",
                data: counts[1],
                color: getSelectedClusterColor(1, selected),
            },
            {
                legend: "Oligo",
                data: counts[2],
                color: getSelectedClusterColor(2, selected),
            },
            {
                legend: "Hand",
                data: counts[3],
                color: getSelectedClusterColor(3, selected),
            },
            {
                legend: "Poly",
                data: counts[4],
                color: getSelectedClusterColor(4, selected),
            },
        ],
    };

    return (
        <div ref={ref} style={{ height: "100%" }}>
            <DonutChart
                data={data}
                innerRadius={35}
                legendProps={{
                    allowFocusOnLegends: true,
                }}
                hideLegend
                hideLabels={false}
                showLabelsInPercent={false}
                valueInsideDonut={counts[1] + counts[2] + counts[3] + counts[4]}
                width={width ?? 200}
                height={height ?? 200}
            />
        </div>
    );
}
