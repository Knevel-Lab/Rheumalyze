import { FluentProvider } from "@fluentui/react-components";

// Since I couldn't work out how to integrate the callout with the original one, we provide our own one.

export const CalloutProvider = () => {
    return (
        <>
            <FluentProvider>
                <div id="callout_provider" />
            </FluentProvider>
        </>
    );
};
