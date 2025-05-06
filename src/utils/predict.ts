import { expectedOrderForModel } from "@/orders";
import { reorderObjectValuesByKeyList } from "./reorder";
import { FileInput } from "@/types";

export function predict({
    data,
    onProgress,
    onComplete,
    onError,
}: {
    data: FileInput[];
    onProgress: (type: string, index: number, total: number) => void;
    onComplete: (predictions: any) => void;
    onError: (error: any) => void;
}) {
    try {
        const worker = new Worker("/Rheumalyze/web_model/predictWorker.js");

        const pre_processed = data.map((x) => pre_process(x));
        worker.postMessage({ data: pre_processed });

        worker.onmessage = (event) => {
            const { type, index, total, predictions } = event.data;

            if (type === "loading" || type === "progress") {
                onProgress(type, index, total);
            } else if (type === "done") {
                onComplete(predictions);
                worker.terminate();
            }
        };

        worker.onerror = (error) => {
            onError(error);
            worker.terminate();
        };

        return () => {
            worker.terminate();
        };
    } catch (error) {
        onError(error);
    }
}

// Preprocess by duplicating keys with t or s into _positieve and _negatieve and reorder as expected by the model.
function pre_process(data: FileInput) {
    data["s_onderste_spronggewricht_left"] = 0;
    data["t_onderste_spronggewricht_left"] = 0;
    data["s_onderste_spronggewricht_right"] = 0;
    data["t_onderste_spronggewricht_right"] = 0;

    const copy = { ...data };

    for (const key of Object.keys(data)) {
        const value = copy[key];

        if (key.includes("s_") || key.includes("t_")) {
            copy[`${key}_positive`] = value;
            copy[`${key}_negative`] = value == 1 ? 0 : 1;

            delete copy[key];
        }
    }

    copy["Age_Early"] = copy["Age"] < 65 ? 1 : 0;
    copy["Age_Late"] = copy["Age"] >= 65 ? 1 : 0;

    copy["Sex"] = copy["Sex"][0] == "M" ? 0 : 1;

    return reorderObjectValuesByKeyList(copy, expectedOrderForModel);
}
