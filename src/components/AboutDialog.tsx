import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
    Link,
} from "@fluentui/react-components";

import { InfoRegular } from "@fluentui/react-icons";

export const AboutDialog = () => {
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Button
                    style={{ color: "white" }}
                    icon={<InfoRegular />}
                    appearance="transparent"
                />
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>About Rheumalyze</DialogTitle>
                    <DialogContent>
                        Rheumalyze is based on{" "}
                        <Link
                            target="#"
                            href="https://doi.org/10.1038/s41746-025-01997-1"
                        >
                            {" "}
                            this research{" "}
                        </Link>{" "}
                        <br />
                        <b>Contact?</b> Send{" "}
                        <Link
                            target="#"
                            href="mailto:t.d.maarseveen@lumc.nl.com"
                        >
                            an email{" "}
                        </Link>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary">Close</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
