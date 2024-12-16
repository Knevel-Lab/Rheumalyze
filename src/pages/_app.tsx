import {
    FluentProvider,
    teamsLightTheme,
    Toaster,
} from "@fluentui/react-components";
import { Outlet } from "react-router-dom";
import AppBar from "../components/Appbar";

import { makeStyles } from "@fluentui/react-components";
import { CalloutProvider } from "@/components/CalloutProvider";

const useClasses = makeStyles({
    div: {
        padding: "24px",
    },
});

export default function App() {
    const classes = useClasses();
    return (
        <FluentProvider theme={teamsLightTheme}>
            <CalloutProvider />
            <AppBar />
            <div className={classes.div}>
                <Toaster />
                <Outlet />
            </div>
        </FluentProvider>
    );
}
