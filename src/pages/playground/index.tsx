import Group from "@/components/Group";
import { ClickableMannequin } from "@/components/Mannequin/ClickableMannequin";
import { MinMax } from "@/components/MinMaxSlider";
import { useNavigate } from "@/router";
import { getJIPname } from "@/utils/jipUtils";
import { predict } from "@/utils/predict";
import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Spinner,
    Switch,
    Field,
    Radio,
    RadioGroup,
    Breadcrumb,
    BreadcrumbButton,
    BreadcrumbDivider,
    BreadcrumbItem,
} from "@fluentui/react-components";
import { AddCircleFilled, SubtractCircleFilled } from "@fluentui/react-icons";
import { useState } from "react";

interface Joints {
    id: string;
    isSelected: boolean;
}

export default function Index() {
    const [leuko, setLeuko] = useState<number>(0);
    const [hb, setHb] = useState<number>(0);
    const [mcv, setMcv] = useState<number>(0);
    const [trom, setTrom] = useState<number>(0);
    const [bse, setBse] = useState<number>(1);
    const [age, setAge] = useState<number>(1);

    const [sex, setSex] = useState<"M" | "F">("M");
    const [rf, setRf] = useState<number>(0);
    const [accp, setAccp] = useState<number>(0);

    const [pain, setPain] = useState<Joints[]>([]);
    const [swelling, setSwelling] = useState<Joints[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const data = [
        {
            "Patient number": "0000",
            Leukocytes: leuko,
            Hemoglobin: hb,
            MCV: mcv,
            Thrombocytes: trom,
            ESR: bse,
            Age: age,
            Sex: sex,
            RF: rf,
            ACPA: accp,
            ...Object.fromEntries(
                pain.map((x) => ["t_" + x.id, x.isSelected ? 1 : 0]),
            ),
            ...Object.fromEntries(
                swelling.map((x) => ["s_" + x.id, x.isSelected ? 1 : 0]),
            ),
        },
    ];

    function DoPrediction() {
        setLoading(true);
        predict({
            data,
            onComplete: (result) => {
                setLoading(false);
                setPrediction(result[0].prediction);
                setOpen(true);
            },
            onError: (error) => {
                console.log(error);
                setLoading(false);
            },
            onProgress: (progress) => console.log(progress),
        });
    }

    const [open, setOpen] = useState(false);
    const [prediction, setPrediction] = useState(0);
    const navigate = useNavigate();
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyItems: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Spinner size="extra-large" />
                <h3>Predicting</h3>
            </div>
        );
    }

    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbButton onClick={() => navigate("/")}>
                        My analyses
                    </BreadcrumbButton>
                </BreadcrumbItem>
                <BreadcrumbDivider />
                <BreadcrumbItem>
                    <BreadcrumbButton current>
                        Test a single case
                    </BreadcrumbButton>
                </BreadcrumbItem>
            </Breadcrumb>

            <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Result</DialogTitle>
                        <DialogContent>
                            This patients belongs to the{" "}
                            {getJIPname(prediction)} JIP phenotype
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="primary">Close</Button>
                            </DialogTrigger>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>

            <Group childHeight="550px" childWidth="400px">
                <div>
                    <h1>Numeric </h1>
                    <MinMax
                        label="Leukocytes"
                        onChange={(value) => setLeuko(value)}
                    />
                    <MinMax
                        label="Hemoglobin"
                        max={50}
                        onChange={(value) => setHb(value)}
                    />
                    <MinMax
                        label="MCV"
                        max={250}
                        onChange={(value) => setMcv(value)}
                    />
                    <MinMax
                        label="Thrombocytes"
                        max={2000}
                        onChange={(value) => setTrom(value)}
                    />
                    <MinMax
                        label="ESR"
                        min={1}
                        max={1000}
                        onChange={(value) => setBse(value)}
                    />
                    <MinMax
                        label="Age"
                        min={1}
                        max={120}
                        onChange={(value) => setAge(value)}
                    />
                </div>
                <div>
                    <h1>Categoric </h1>
                    <Field label="Sex">
                        <RadioGroup
                            layout="horizontal"
                            onChange={(_, d) => setSex(d.value as "M" | "F")}
                        >
                            <Radio value="M" label="Male" defaultChecked />
                            <Radio value="F" label="Female" />
                        </RadioGroup>
                    </Field>
                    <Switch
                        label="RF"
                        onChange={(_, data) => setRf(data.checked ? 1 : 0)}
                        indicator={
                            rf ? (
                                <div>
                                    {" "}
                                    <AddCircleFilled />{" "}
                                </div>
                            ) : (
                                <div>
                                    {" "}
                                    <SubtractCircleFilled />{" "}
                                </div>
                            )
                        }
                    />{" "}
                    <br />
                    <Switch
                        label="ACPA"
                        onChange={(_, data) => setAccp(data.checked ? 1 : 0)}
                        indicator={
                            accp ? (
                                <div>
                                    {" "}
                                    <AddCircleFilled />{" "}
                                </div>
                            ) : (
                                <div>
                                    {" "}
                                    <SubtractCircleFilled />{" "}
                                </div>
                            )
                        }
                    />
                </div>

                <div>
                    <h1>Swelling </h1>
                    <ClickableMannequin
                        onSelectionChange={(x) => setSwelling(x)}
                    ></ClickableMannequin>
                </div>

                <div>
                    <h1>Pain </h1>
                    <ClickableMannequin
                        onSelectionChange={(x) => setPain(x)}
                    ></ClickableMannequin>
                </div>
            </Group>

            <Button
                style={{ marginTop: "12px", marginBottom: "12px" }}
                appearance="primary"
                onClick={() => DoPrediction()}
            >
                Predict
            </Button>
        </>
    );
}
