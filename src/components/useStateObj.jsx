//

import { useState } from "react";

export default function useStateObj(initValue) {

    const [getState, setState] = useState(initValue);

    return { get: getState, set: setState };
}
