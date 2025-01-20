import { test, expect } from "@playwright/test";

const testCases = [
    {
        name: "spreadsheet",
        files: "tests\\input\\dummy_data2.xlsx",
        expectedText: "14 Feet 11 Oligo 24 Hand 51 Poly",
    },
    {
        name: "spreadsheet and empty cells",
        files: "tests\\input\\dummy_data2_empty_columns.xlsx",
        expectedText: "1 Feet 1 Oligo 0 Hand 2 Poly",
    },
    {
        name: "csv",
        files: "tests\\input\\dummy_data.csv",
        expectedText: "12 Feet 14 Oligo 19 Hand 55 Poly ",
    },
    {
        name: "mixed input",
        files: [
            "tests\\input\\dummy_data.csv",
            "tests\\input\\dummy_data2.xlsx",
        ],
        expectedText: "26 Feet 25 Oligo 43 Hand 106 Poly",
    },
    {
        name: "multiple tabs in excel",
        files: "tests\\input\\dummy_data_with_legend_and_multiple_tabs.xlsx",
        expectedText: "26 Feet 25 Oligo 43 Hand 106 Poly",
    },
    {
        name: "empty records",
        files: "tests\\input\\dummy_data_with_empty_records.csv",
        expectedText: "2 Feet 1 Oligo 1 Hand 0 Poly",
    },
    {
        name: "additonal whitespace in columnnames",
        files: "tests\\input\\dummy_data_with_white_space_columnames.csv",
        expectedText: "2 Feet 1 Oligo 1 Hand 0 Poly",
    },
];

test.describe("File upload and prediction tests", () => {
    for (const testCase of testCases) {
        test(`with ${testCase.name} and correct prediction`, async ({
            page,
        }) => {
            test.setTimeout(150_000);

            page.on("filechooser", async (fileChooser) => {
                await fileChooser.setFiles(testCase.files);
            });

            await page.goto("/");
            await page.getByRole("button", { name: "Create new" }).click();
            await page.getByLabel("Name*").click();
            await page.getByLabel("Name*").fill("Test");
            await page.getByLabel("Name*").press("Tab");
            await page.getByLabel("Description").fill("This is a test");
            await page.getByLabel("Select Files").click();
            await page
                .getByRole("button", { name: "Create", exact: true })
                .click();

            await page.waitForURL("#/detail/*");
            await expect(page.locator("#root")).toContainText(
                testCase.expectedText,
            );
        });
    }
});
