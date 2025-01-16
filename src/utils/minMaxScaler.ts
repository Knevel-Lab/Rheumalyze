class MinMaxScaler {
    private dataMin: number;
    private dataMax: number;
    private rangeMin: number;
    private rangeMax: number;

    constructor(rangeMin: number = 0, rangeMax: number = 1) {
        this.dataMin = 0;
        this.dataMax = 1;
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
    }

    fit(data: number[]): void {
        this.dataMin = Math.min(...data);
        this.dataMax = Math.max(...data);
    }

    transform(data: number[]): number[] {
        const dataRange = this.dataMax - this.dataMin;
        const targetRange = this.rangeMax - this.rangeMin;

        if (dataRange === 0) {
            // All values are the same, map everything to rangeMin
            return data.map(() => this.rangeMin);
        }

        return data.map((value) => {
            return (
                ((value - this.dataMin) / dataRange) * targetRange +
                this.rangeMin
            );
        });
    }

    fitTransform(data: number[]): number[] {
        this.fit(data);
        return this.transform(data);
    }

    inverseTransform(scaledData: number[]): number[] {
        const dataRange = this.dataMax - this.dataMin;
        const targetRange = this.rangeMax - this.rangeMin;

        if (dataRange === 0) {
            return scaledData.map(() => this.dataMin);
        }

        return scaledData.map((value) => {
            return (
                ((value - this.rangeMin) / targetRange) * dataRange +
                this.dataMin
            );
        });
    }
}

export default MinMaxScaler;
