//
import React from "react";

import { faRotate } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    reloadInitState,
    selectDensity,
    selectInitState,
    setDensity,
    toggleInitStateCell,
} from "src/app/slices/initState";
import { Box, Grid } from "@mui/material";
import { DensitySlider } from "src/components/Slider";

export default function InitState1d() {
    //
    const density = useAppSelector(selectDensity);
    const dispatch = useAppDispatch();
    return (
        <Grid container rowSpacing={2}>
            {/* row 1 */}
            <Grid
                item
                container
                columnSpacing={3}
                alignItems="center"
                justifyContent="space-evenly"
            >
                {/* live cells */}
                <Grid item md={8}>
                    <DensitySlider
                        get={density}
                        set={(val: number) => dispatch(setDensity(val))}
                    />
                </Grid>
                {/* clusters */}
                {/* <Grid item md>
                    <Cluster />
                </Grid> */}
                <Grid item md="auto">
                    <ReloadBtn />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Cells />
            </Grid>
            {/* row 2 */}
            {/* <Grid item container>
                <Grid item xs={12}>
                    <Cells />
                </Grid>
                <Grid item xs={1}>
                    <ReloadBtn />
                </Grid>
            </Grid> */}
        </Grid>
    );
}

// function LiveCells() {
//     //
//     const numCells = useAppSelector(selectNumCells);
//     const liveCells = useAppSelector(selectLiveCells);

//     const dispatch = useAppDispatch();

//     return (
//         <Grid container className="cap-component-container">
//             <Grid container>
//                 <Box className="cap-component-label ms-2 my-2">Live cells</Box>
//             </Grid>

//             <Grid item md={9}>
//                 <StyledSlider
//                     defaultValue={1}
//                     min={1}
//                     max={numCells}
//                     value={liveCells}
//                     onChange={(
//                         event: Event,
//                         value: number | number[],
//                         activeThumb: number
//                     ) => dispatch(setLiveCells(value as number))}
//                     marks={[
//                         {
//                             value: 1,
//                             label: 1,
//                         },
//                         {
//                             value: numCells * (1 / 4),
//                             label: "25%",
//                         },
//                         {
//                             value: numCells * (1 / 2),
//                             label: "50%",
//                         },
//                         {
//                             value: numCells * (3 / 4),
//                             label: "75%",
//                         },
//                         {
//                             value: numCells,
//                             label: numCells,
//                         },
//                     ]}
//                 />
//             </Grid>

//             <Grid item md={3} className="flex justify-center">
//                 <StyledInput
//                     className="h-fit"
//                     value={liveCells}
//                     size="small"
//                     onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//                         dispatch(
//                             setLiveCells(
//                                 event.target.value === ""
//                                     ? 0
//                                     : Number(event.target.value)
//                             )
//                         )
//                     }
//                     onBlur={() => {
//                         if (liveCells < 0) {
//                             dispatch(setLiveCells(0));
//                         } else if (liveCells > numCells) {
//                             dispatch(setLiveCells(numCells));
//                         }
//                     }}
//                     inputProps={{
//                         step: 5,
//                         min: 1,
//                         max: numCells,
//                         type: "number",
//                     }}
//                     disableUnderline
//                 />
//             </Grid>
//         </Grid>
//     );
// }

// function Cluster() {
//     //
//     const clusterSize = useAppSelector(selectClusterSize);
//     const distribution = useAppSelector(selectDistribution);
//     const dispatch = useAppDispatch();

//     return (
//         <Grid container className="cap-component-container">
//             <Grid container>
//                 <Box className="cap-component-label ms-2 my-2">Clusters</Box>
//             </Grid>

//             <Grid item md={9}>
//                 <StyledSlider
//                     defaultValue={1}
//                     min={1}
//                     max={30}
//                     value={clusterSize}
//                     onChange={(
//                         event: Event,
//                         value: number | number[],
//                         activeThumb: number
//                     ) => dispatch(setClusterSize(value as number[]))}
//                     marks={[
//                         { value: 1, label: 1 },
//                         { value: 5, label: 5 },
//                         { value: 10, label: 10 },
//                         { value: 15, label: 15 },
//                         { value: 20, label: 20 },
//                         { value: 25, label: 25 },
//                         { value: 30, label: 30 },
//                     ]}
//                 />
//             </Grid>

//             <Grid item md={3} className="flex justify-center">
//                 <RadioGroup
//                     aria-labelledby="cluster-dist-radio-group-label"
//                     defaultValue="even"
//                     name="cluster-dist-radio-group"
//                     row
//                     value={distribution}
//                     onChange={(event: React.ChangeEvent, value: string) =>
//                         dispatch(setDistribution(value as DistributionType))
//                     }
//                 >
//                     <FormControlLabel
//                         key={1}
//                         value="even"
//                         control={<StyledRadio />}
//                         label={<FontAwesomeIcon icon={faEquals} size="lg" />}
//                     />
//                     <FormControlLabel
//                         key={2}
//                         value="rand"
//                         control={<StyledRadio />}
//                         label={<FontAwesomeIcon icon={faShuffle} size="lg" />}
//                     />
//                 </RadioGroup>
//             </Grid>
//         </Grid>
//     );
// }

function Cells() {
    //
    const initState = useAppSelector(selectInitState);

    const dispatch = useAppDispatch();

    return (
        <div className="cap-component-container cells-container">
            {initState.map((e, i) => (
                <Box
                    key={i}
                    className={`cap-cell ${e ? "on" : "off"}`}
                    onClick={() => dispatch(toggleInitStateCell(i))}
                />
            ))}
        </div>
    );
}

function ReloadBtn() {
    //
    const dispatch = useAppDispatch();

    return (
        <Box className="">
            <Button
                className=""
                icon={faRotate}
                size="3x"
                tooltipLabel="Reload init state"
                onClick={() => dispatch(reloadInitState())}
            />
        </Box>
    );
}
