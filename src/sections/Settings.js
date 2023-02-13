//

import CAPButtonGroupSelector from "../components/CAPButtonGroupSelector";

function Settings() {
    return (
        <div className="mt-5 mb-3">
            <CAPButtonGroupSelector
                labels={["Neighborhood", "Rules", "Initial state"]}
            />
        </div>
    );
    
}

export default Settings;
