import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Wheel() {
    const ref = useRef();

    useEffect(() => {
        const data = [
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 }
        ];

        if (ref.current) {
            var padding = {top:0, right:0, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [];

            const svg = d3.select(ref.current)
                .append("svg")
                .attr("width",  w + padding.left + padding.right)
                .attr("height", h + padding.top + padding.bottom);

            // Replaced category20 with schemeCategory20
            // const color = d3.scaleOrdinal(d3.schemeCategory20);

            // Further D3.js code here
            // ...
        }
    }, []);

    const spin = (d) => {
        // Your spin logic here
        // ...
    }

    return (
        <div>
            <div ref={ref} id="chart">
                {/* The chart will be appended here */}
            </div>
        </div>
    );
}

export default Wheel;
