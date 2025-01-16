import { ChartToolbarWrapper } from "@/components/detail/ChartToolbarWrapper";
import { DetailUmap } from "@/components/detail/DetailUmap";
import { DetailUmapSettings } from "@/components/detail/detailUmapSettings";
import Group from "@/components/Group";
import { ClickableMannequin } from "@/components/Mannequin/ClickableMannequin";
import { MinMax } from "@/components/MinMaxSlider";
import { predict } from "@/utils/predict";
import { Button, Spinner, Switch } from "@fluentui/react-components";
import { useState } from "react";

interface Joints {
    id: string;
    isSelected: boolean;
}

export default function Index() {
    const [umapSettings, setUmapSettings] = useState({
        nNeighbors: 1,
        minDist: 0.1,
        distanceFunction: "euclidean" as "euclidean" | "cosine",
    });

    const [datas, setDatas] = useState<any[]>([]);
    const [clusters, setClusters] = useState<any[]>([]);
    const [patientIds, setPatientIds] = useState<string[]>([]);

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
                setDatas([...datas, data]);
                setClusters([...clusters, result[0].prediction as Number]);
                setPatientIds([...patientIds, datas.length.toString()]);
                setLoading(false);
            },
            onError: (error) => {
                console.log(error);
                setLoading(false);
            },
            onProgress: (progress) => console.log(progress),
        });
    }

    return (
        <>
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
                    <Switch
                        label="Sex"
                        onChange={(_, data) => setSex(data.checked ? "M" : "F")}
                    />
                    <Switch
                        label="RF"
                        onChange={(_, data) => setRf(data.checked ? 1 : 0)}
                    />
                    <Switch
                        label="ACPA"
                        onChange={(_, data) => setAccp(data.checked ? 1 : 0)}
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
                disabled={loading}
                icon={loading ? <Spinner size="tiny" /> : undefined}
            >
                {loading ? "Simulating..." : "Simulate"}
            </Button>

            <Group childHeight="400px" childWidth="800px">
                <ChartToolbarWrapper
                    title="UMAP"
                    settings={
                        <DetailUmapSettings
                            initialSettings={umapSettings}
                            maxNeighbors={datas.length - 1}
                            onSettingChange={(newSettings) => {
                                setUmapSettings(newSettings);
                            }}
                        />
                    }
                >
                    <DetailUmap
                        data={datas}
                        clusters={clusters}
                        patientIds={patientIds}
                        settings={umapSettings}
                        selected={[1, 2, 3, 4]}
                    />
                </ChartToolbarWrapper>
            </Group>
        </>
    );
}
