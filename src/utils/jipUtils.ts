export function getJIPname(cluster: number | null | undefined) {
    if (
        cluster === null ||
        cluster === undefined ||
        cluster < 0 ||
        cluster > 4
    ) {
        return "None";
    }

    const colors = ["Feet", "Oligo", "Hand", "Poly"];

    return colors[cluster - 1];
}
