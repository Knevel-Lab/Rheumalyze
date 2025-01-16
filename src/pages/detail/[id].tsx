import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbButton,
    BreadcrumbDivider,
    makeStyles,
    tokens,
    Toolbar,
    ToolbarButton,
} from "@fluentui/react-components";
import { useNavigate, useParams } from "../../router";
import { useGetAnalysesById } from "../../stores/ApplicationStore";
import DetailDataGrid from "@/components/detail/detailDatagrid";
import { DonutChartWrapper } from "@/components/detail/DonutChartWrapper";
import { DetailUmap } from "@/components/detail/DetailUmap";

import { ArrowDownload24Regular } from "@fluentui/react-icons";
import { exportJsonToExcel } from "@/utils/exportToExcel";
import { ChartToolbarWrapper } from "@/components/detail/ChartToolbarWrapper";

import Group from "@/components/Group";
import { SwellingPainOverView } from "@/components/detail/SwellingPainOverView";
import { DetailUmapSettings } from "@/components/detail/detailUmapSettings";
import { useMemo, useState } from "react";
import { SelectableJIP } from "@/components/detail/SelectableJIP";

const useClasses = makeStyles({
    div: {
        background: tokens.colorNeutralBackground1,
        borderRadius: tokens.borderRadiusXLarge,
        width: "200px",
        height: "240px",
        minHeight: "240px",
        padding: "12px",
    },
    datagrid: {
        maxWidth: "1000px",
        width: "-webkit-fill-available",
        height: "368px",
        overflow: "auto",
        background: tokens.colorNeutralBackground1,
        borderRadius: tokens.borderRadiusLarge,
        padding: "12px",
    },
});

export default function Details() {
    const classes = useClasses();

    const params = useParams("/detail/:id");
    const id = Number(params.id);

    const navigate = useNavigate();

    const analyse = useGetAnalysesById(id);

    const predictions = useMemo(
        () => (analyse.prediction ?? []).filter((x) => x.prediction !== -1),
        [analyse.prediction],
    );

    const data = useMemo(
        () =>
            analyse.files
                .flatMap((x) => x.content)
                .filter(
                    (_, i) => (analyse.prediction ?? [])[i].prediction !== -1,
                ),
        [analyse.files, analyse.prediction],
    );

    const clustering = useMemo(
        () => predictions.map((x) => x.prediction),
        [predictions],
    );
    const patients = useMemo(
        () => predictions.map((x) => x.patientId),
        [predictions],
    );

    const counts = useMemo(() => count(clustering), [clustering]);

    const [umapSettings, setUmapSettings] = useState({
        nNeighbors: data.length > 50 ? 30 : data.length / 2,
        minDist: 0.1,
        distanceFunction: "euclidean" as "euclidean" | "cosine",
    });

    const [selected, setSelected] = useState<number[]>([1, 2, 3, 4]);
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
                        {" "}
                        {analyse.name}{" "}
                    </BreadcrumbButton>
                </BreadcrumbItem>
            </Breadcrumb>

            <h1>Summary</h1>
            <Group childHeight="240px" childWidth="200px">
                <div>
                    <p style={{ marginTop: "0px" }}>
                        <b>JIPs</b> <br /> <i>Joint involvement patterns</i>
                    </p>

                    <SelectableJIP
                        counts={counts.counts}
                        onSelectionChanged={(x) => setSelected(x)}
                    />
                </div>

                <ChartToolbarWrapper title="Distribution">
                    <DonutChartWrapper
                        counts={counts.counts}
                        selected={selected}
                    />
                </ChartToolbarWrapper>

                <ChartToolbarWrapper
                    title="UMAP"
                    settings={
                        <DetailUmapSettings
                            initialSettings={umapSettings}
                            maxNeighbors={data.length - 1}
                            onSettingChange={(newSettings) => {
                                setUmapSettings(newSettings);
                            }}
                        />
                    }
                >
                    <DetailUmap
                        data={data.map((x) => Object.values(x))}
                        clusters={clustering}
                        patientIds={patients}
                        settings={umapSettings}
                        selected={selected}
                    />
                </ChartToolbarWrapper>
            </Group>

            <div>
                <h1>Overview</h1>
                <SwellingPainOverView data={data} clusters={clustering} />
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "12px",
                }}
            >
                <h1>Patients</h1>
                <Toolbar
                    aria-label="Default"
                    style={{
                        display: "flex",
                        justifyContent: "left",
                    }}
                >
                    <ToolbarButton
                        aria-label="Export to excel"
                        icon={<ArrowDownload24Regular />}
                        onClick={() =>
                            exportJsonToExcel(
                                predictions,
                                "Predictions",
                                "Predictions.xlsx",
                            )
                        }
                    />
                </Toolbar>
            </div>

            <div className={classes.datagrid}>
                <DetailDataGrid items={analyse.prediction ?? []} />
            </div>
        </>
    );
}
function count(data: number[]) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let sum = data.length;

    data.forEach((item) => {
        if (item in counts) {
            counts[item as keyof typeof counts] += 1;
        }
    });

    return { counts, sum };
}
