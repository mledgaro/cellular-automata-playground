import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { faFileExport, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { useFilePicker } from "use-file-picker";

import { IconButton } from "src/components/Button";
import { DataFileObj } from "src/app/types";

export default function Files({
    exportData,
    importData,
    fileName = "cellular_automaton",
}: {
    exportData: () => DataFileObj;
    importData: (data: DataFileObj) => void;
    fileName?: string;
}) {
    //
    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        accept: [".json"],
    });

    useEffect(() => {
        if (filesContent.length > 0) {
            const data = JSON.parse(filesContent[0].content);
            importData(data);
            // console.log("Files.tsx", data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filesContent]);

    return (
        <Box>
            <Box className="flex flex-row justify-center space-x-[3rem]">
                {/* <FormGroup>
                <Box className="flex flex-row">
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Configuration"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Initial state"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Current state"
                    />
                </Box>
            </FormGroup> */}

                <IconButton
                    icon={faFileImport}
                    iconSize="3x"
                    tooltipLabel="Import"
                    className="w-[6rem]"
                    onClick={() => {
                        openFilePicker();
                    }}
                />
                <IconButton
                    icon={faFileExport}
                    iconSize="3x"
                    tooltipLabel="Export"
                    className="w-[6rem]"
                    onClick={() => {
                        let blob = new Blob([JSON.stringify(exportData())], {
                            type: "application/json;charset=utf-8",
                        });
                        saveAs(blob, `${fileName}.json`);
                    }}
                />
            </Box>
        </Box>
    );
}
