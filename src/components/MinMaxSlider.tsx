import * as React from "react";
import {
    useId,
    Label,
    makeStyles,
    Tooltip,
    Slider,
    Input,
} from "@fluentui/react-components";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        alignItems: "center",
        gap: "2px",
    },
});

interface MinMaxProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    label?: string;
    onChange?: (value: number) => void;
}

export const MinMax: React.FC<MinMaxProps> = ({
    min = 0,
    max = 100,
    step,
    defaultValue,
    label,
    onChange,
}) => {
    const [thumbRef, setThumbRef] = React.useState<HTMLElement | null>(null);
    const [value, setValue] = useState(defaultValue ?? min);
    const styles = useStyles();
    const id = useId();

    // Track if the component is mounted to prevent firing onChange on initial render
    const isMounted = React.useRef(false);

    const handleChange = (_: unknown, data: { value: number }) => {
        if (data.value > max) {
            handleChange(_, { value: max });
        }
        if (data.value > min) {
            handleChange(_, { value: min });
        }

        setValue(data.value);
        if (onChange && isMounted.current) {
            onChange(data.value);
        }
    };

    // Set isMounted to true after the initial render
    useEffect(() => {
        isMounted.current = true;
    }, []);

    return (
        <div style={{ marginBottom: "10px" }}>
            <Label htmlFor={id}>{label}</Label>

            <div className={styles.wrapper}>
                <Input
                    style={{
                        width: "75px",
                    }}
                    type="number"
                    min={min}
                    max={max}
                    value={value.toString()}
                    onChange={(_, data) => {
                        handleChange(_, { value: Number(data.value) });
                    }}
                ></Input>

                <Label aria-hidden>{min}</Label>
                <Tooltip
                    content={value.toString()}
                    relationship="label"
                    withArrow
                    mountNode={thumbRef}
                    positioning={{ target: thumbRef }}
                >
                    <Slider
                        thumb={{ ref: setThumbRef }}
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        id={id}
                        onChange={handleChange}
                    />
                </Tooltip>
                <Label aria-hidden>{max}</Label>
            </div>
        </div>
    );
};
