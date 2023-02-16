//

import CAPOptionGroup from "./CAPOptionGroup";


function CAPSectionSelector(props) {
    //

    const labels = props.sections.map(e => e.label);

    return (
        <div className="">
            <CAPOptionGroup
                labels={labels}
                selected={props.selected}
                size={props.size}
                alignment={props.alignment}
                bs5Class={props.bs5Class}
            />
            {props.sections[props.selected.get].component}
        </div>
    );
}

export default CAPSectionSelector;
