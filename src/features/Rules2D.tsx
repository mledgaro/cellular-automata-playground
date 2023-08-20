//
import React from "react";
import {
    faSquare as faSquareRegular,
    faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { faSquare as faSquareSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { diagonalNeighbors } from "../ts/Utils";
import { NbhdType2D } from "./Neighborhood2D";
import { useStateObj } from "src/app/hooks";

function Rule2D() {
    //

    const state = useStateObj<number>(0);
    let icon;

    switch (state.get) {
        case 1:
            icon = faSquareRegular;
            break;
        case 2:
            icon = faSquareSolid;
            break;
        default:
            icon = faSquareMinus;
    }

    return (
        <span
            className=""
            onClick={() => state.set(state.get === 2 ? 0 : state.get + 1)}
        >
            <FontAwesomeIcon icon={icon} size="2x" />
        </span>
    );
}
export function Rules2D({
    nbhdType,
    nbhdWidth,
    nbhdHeight,
    mainCell,
}: {
    nbhdType: NbhdType2D;
    nbhdWidth: number;
    nbhdHeight: number;
    mainCell: { r: number; c: number };
}) {
    //

    let numRules;

    switch (nbhdType) {
        case "moore":
            numRules = nbhdWidth * nbhdHeight - 1;
            break;
        case "vonneumann":
            numRules = nbhdWidth + nbhdHeight - 2;
            break;
        case "diagonal":
            numRules = diagonalNeighbors(
                nbhdWidth,
                nbhdHeight,
                mainCell.r,
                mainCell.c
            );
            break;
    }

    let rules = [];

    let headers = [];

    headers.push(<td className="p-2">Neighbors</td>);
    rules.push(<td className="p-2">State</td>);

    for (let i = 0; i <= numRules; i++) {
        //

        headers.push(<td className="p-2">{i}</td>);

        rules.push(
            <td className="p-2">
                <Rule2D />
            </td>
        );
    }

    return (
        <table className="cap-component-container text-xl text-center w-full">
            <tr>{headers}</tr>
            <tr>{rules}</tr>
        </table>
    );
}
