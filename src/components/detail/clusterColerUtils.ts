const colors = ["#1f77b4", "#17becf", "#bcbd22", "#d62728"];

export function getSelectedClusterColor(
    cluster: number | null | undefined,
    selected: number[] | undefined,
) {
    if (
        cluster === null ||
        cluster === undefined ||
        cluster < 0 ||
        cluster > 4
    ) {
        return undefined;
    }

    const color = getClusterColor(cluster);

    if (selected && selected.includes(cluster)) {
        return color;
    } else {
        return color + "4f";
    }
}

export function getClusterColor(cluster: number | null | undefined) {
    if (
        cluster === null ||
        cluster === undefined ||
        cluster < 0 ||
        cluster > 4
    ) {
        return undefined;
    }
    return colors[cluster - 1];
}
