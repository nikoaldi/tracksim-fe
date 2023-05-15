import React, { useEffect, useState } from "react"






function Button_grup() {
    const [view, setView] = useState([]);

  return (

    <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button type="button" class="btn btn-outline-primary" onClick={() => setView(1)}>Own Platform</button>
        <button type="button" class="btn btn-outline-primary" onClick={() => setView(2)}>Radar</button>
        <button type="button" class="btn btn-outline-primary" onClick={() => setView(3)}>AIS</button>
        <button type="button" class="btn btn-outline-primary" onClick={() => setView(4)}>ADSB</button>
    </div>
  );
}


export default Button_grup;
