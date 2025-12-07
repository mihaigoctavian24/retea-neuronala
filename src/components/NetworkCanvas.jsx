
import React, { useRef, useEffect, useState } from 'react';

const NetworkCanvas = ({ nn, animationStep, showWeights }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const positionsRef = useRef([]);
    const [tooltip, setTooltip] = useState(null);

    // Optimize: Handle Resize separately to avoid recreating current observer on every frame
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
            }
        };
        handleResize();
        const observer = new ResizeObserver(handleResize);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || !nn || !nn.activations || nn.activations.length === 0) return;



        const draw = () => {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;

            // Clear
            ctx.clearRect(0, 0, width, height);

            // --- CALCULATE POSITIONS ---
            const totalLayers = nn.layerSizes.length;
            const marginX = width * 0.05;
            const availableWidth = width * 0.9;
            const neuronRadius = Math.min(width, height) * 0.035;

            const positions = [];

            for (let l = 0; l < totalLayers; l++) {
                const layerSize = nn.layerSizes[l];
                const x = marginX + (l / (totalLayers - 1)) * availableWidth;

                const layerPositions = [];
                const availableHeight = height * 0.7;
                const startY = height * 0.15 + 20;

                for (let n = 0; n < layerSize; n++) {
                    let y;
                    if (layerSize === 1) y = height / 2;
                    else y = startY + (availableHeight / (layerSize - 1)) * n;

                    const val = nn.activations && nn.activations[l] ? nn.activations[l][n] : 0;
                    // Store detailed info for tooltip
                    layerPositions.push({ x, y, value: val, layerIndex: l, neuronIndex: n, radius: neuronRadius });
                }
                positions.push(layerPositions);
            }
            // Update ref for mouse interaction
            positionsRef.current = positions;

            // --- DRAW CONNECTIONS ---
            for (let l = 0; l < totalLayers - 1; l++) {
                const currentLayer = positions[l];
                const nextLayer = positions[l + 1];
                const weights = nn.weights[l];

                for (let i = 0; i < currentLayer.length; i++) {
                    for (let j = 0; j < nextLayer.length; j++) {
                        const weight = weights[j][i];
                        drawConnection(ctx, currentLayer[i], nextLayer[j], weight, animationStep, showWeights);
                    }
                }
            }

            // --- DRAW NEURONS ---
            positions.forEach((layer, lIndex) => {
                let labelPrefix = 'h';
                if (lIndex === 0) labelPrefix = 'x';
                else if (lIndex === totalLayers - 1) labelPrefix = 'y';

                layer.forEach((pos, nIndex) => {
                    drawNeuron(ctx, pos, `${labelPrefix}${nIndex + 1}`, pos.radius);
                });
            });

            // Labels
            ctx.textAlign = 'center';
            positions.forEach((layer, lIndex) => {
                const x = layer[0].x;
                let text = `Hidden ${lIndex}`;
                if (lIndex === 0) text = "Intrare";
                else if (lIndex === totalLayers - 1) text = "Ieșire";

                ctx.font = 'bold 14px sans-serif';
                const textMetrics = ctx.measureText(text);
                const textWidth = textMetrics.width;
                const padding = 10;
                const boxHeight = 24;
                const boxWidth = textWidth + padding * 2;
                const boxY = 15;

                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.roundRect(x - boxWidth / 2, boxY, boxWidth, boxHeight, 6);
                ctx.fill();

                ctx.fillStyle = 'black';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, x, boxY + boxHeight / 2);
            });
        };

        const drawConnection = (ctx, p1, p2, weight, step, showText) => {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Cyan (Positive) : Magenta (Negative)
            const baseColor = weight > 0 ? '0, 242, 254' : '255, 0, 128';
            ctx.strokeStyle = `rgba(${baseColor}, 0.3)`;
            ctx.lineWidth = Math.min(Math.abs(weight) * 2 + 0.5, 5);
            ctx.stroke();

            if (step > 0) {
                const particleCount = 2;
                for (let k = 0; k < particleCount; k++) {
                    const offset = (step + k * 20) % 60;
                    const progress = offset / 60;
                    const x = p1.x + (p2.x - p1.x) * progress;
                    const y = p1.y + (p2.y - p1.y) * progress;

                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgb(${baseColor})`;
                    ctx.fill();
                }
            }

            if (showText && Math.abs(weight) > 0.5) {
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.font = '9px sans-serif';
                ctx.fillText(weight.toFixed(1), midX, midY);
            }
        };

        const drawNeuron = (ctx, pos, label, radius) => {
            // ... (same as before)
            const val = pos.value;
            const glowColor = `rgba(79, 172, 254, ${val * 0.6})`;
            const grad = ctx.createRadialGradient(pos.x, pos.y, radius * 0.5, pos.x, pos.y, radius * 2);
            grad.addColorStop(0, glowColor);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius * 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255, ${0.1 + val * 0.8})`;
            ctx.strokeStyle = 'rgba(255,255,255,0.8)';
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = val > 0.5 ? 'black' : 'white';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, pos.x, pos.y);

            ctx.fillStyle = 'white';
            ctx.font = '10px sans-serif';
            ctx.fillText(val.toFixed(2), pos.x, pos.y + radius + 15);
        };

        // Initialize
        draw();

    }, [nn, animationStep, showWeights]);

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let found = null;
        positionsRef.current.forEach((layer) => {
            layer.forEach((neuron) => {
                const dist = Math.sqrt((mouseX - neuron.x) ** 2 + (mouseY - neuron.y) ** 2);
                if (dist < neuron.radius) {
                    found = {
                        x: neuron.x,
                        y: neuron.y,
                        radius: neuron.radius,
                        value: neuron.value,
                        layerIndex: neuron.layerIndex,
                        neuronIndex: neuron.neuronIndex
                    };
                }
            });
        });

        if (found) {
            setTooltip(found);
        } else {
            setTooltip(null);
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <div ref={containerRef} className="canvas-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <canvas
                ref={canvasRef}
                style={{ display: 'block' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            {tooltip && (
                <div style={{
                    position: 'absolute',
                    left: tooltip.layerIndex === nn.layerSizes.length - 1
                        ? tooltip.x - 230 // Show to LEFT if output layer (width 200 + gap)
                        : tooltip.x + tooltip.radius + 10, // Show to RIGHT otherwise
                    top: tooltip.y - 20,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    pointerEvents: 'none',
                    zIndex: 100,
                    width: '200px',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#4facfe' }}>
                        {tooltip.layerIndex === 0 ? 'Nod Intrare' :
                            tooltip.layerIndex === nn.layerSizes.length - 1 ? 'Nod Ieșire' :
                                'Neuron Ascuns'}
                    </h4>
                    <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                        <div><strong>Valoare:</strong> {tooltip.value.toFixed(4)}</div>
                        <div style={{ opacity: 0.7, marginTop: '4px' }}>
                            {(() => {
                                const { value, layerIndex } = tooltip;
                                const isInput = layerIndex === 0;
                                const isOutput = layerIndex === nn.layerSizes.length - 1;

                                if (isInput) {
                                    const axis = tooltip.neuronIndex === 0 ? "X (Orizontală)" : "Y (Verticală)";
                                    return `Acest neuron primește Coordonata ${axis} a punctului de pe hartă. Rețeaua folosește poziția pentru a decide culoarea.`;
                                }
                                if (isOutput) {
                                    const confidence = value > 0.5 ? value : 1 - value;
                                    const cls = value > 0.5 ? "Pozitivă (Cyan)" : "Negativă (Magenta)";
                                    return `Rețeaua este ${(confidence * 100).toFixed(0)}% sigură că acesta e clasa ${cls}.`;
                                }
                                // Hidden
                                if (value > 0.7) return "🔥 Activare Puternică! Neuronul a găsit o trăsătură importantă.";
                                if (value > 0.3) return "⚡ Activare Moderată. Contribuie la rafinarea semnalului.";
                                return "💤 Neuron Inactiv. Nu detectează nimic relevant aici.";
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default NetworkCanvas;
