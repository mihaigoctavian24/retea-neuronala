import React, { useRef, useEffect } from 'react';

const DecisionBoundary = ({ nn }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !nn) return;

        // Low resolution for performance (heatmap style)
        // We render a small canvas and let CSS scale it up? 
        // No, let's render nicely.
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const resolution = 50; // 50x50 grid
        const cellWidth = width / resolution;
        const cellHeight = height / resolution;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                // Normalize outputs to 0..1 input space
                const x = i / resolution;
                const y = j / resolution;

                // Predict
                // Note: The NN expects inputs, usually for XOR it's 2 inputs.
                // We map x->input[0], y->input[1]
                const output = nn.predict([x, y])[0];

                // Color mapping: 
                // 0 -> Red (234, 67, 53)
                // 1 -> Green (52, 168, 83)
                // We'll use simple interpolation

                // Magenta (255, 0, 128) -> Cyan (0, 242, 254)
                const r = 255 + (0 - 255) * output;
                const g = 0 + (242 - 0) * output;
                const b = 128 + (254 - 128) * output;

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`; // Low opacity to sit behind
                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth + 1, cellHeight + 1);
            }
        }

    }, [nn]); // Re-render when NN updates (cloned)

    return (
        <canvas
            ref={canvasRef}
            width={300} // Internal resolution
            height={300}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind valid z-index content
                borderRadius: '16px',
                filter: 'blur(10px)' // Soften the pixels for "heatmap" look
            }}
        />
    );
};

export default React.memo(DecisionBoundary);
