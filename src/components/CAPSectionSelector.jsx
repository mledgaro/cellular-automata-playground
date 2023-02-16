//

import CAPOptionGroup from "./CAPOptionGroup";

export default function CAPSectionSelector({
    sections,
    selected,
    size,
    alignment,
    bs5Class,
}) {
    //

    const labels = sections.map((e) => e.label);

    return (
        <div className="">
            <CAPOptionGroup
                labels={labels}
                selected={selected}
                size={size}
                alignment={alignment}
                bs5Class={bs5Class}
            />
            {sections[selected.get].component}
        </div>
    );
}
