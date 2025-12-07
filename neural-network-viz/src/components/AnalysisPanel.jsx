import React, { useState, useEffect, useRef } from 'react';
import { ClipboardCheck, CheckCircle, XCircle, Timer } from 'lucide-react';

const AnalysisPanel = ({ loss, isTraining }) => {
    const [tolerance, setTolerance] = useState(0.1);

    const isGood = loss <= tolerance;
    const difference = Math.abs(loss - tolerance);

    // Time to Goal Logic
    const [timeToGoal, setTimeToGoal] = useState(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (isTraining && !startTimeRef.current) {
            // Training started
            startTimeRef.current = Date.now();
            setTimeToGoal(null); // Reset
        } else if (!isTraining && loss === 1.0) {
            // Reset
            startTimeRef.current = null;
            setTimeToGoal(null);
        } else if (isTraining && isGood && !timeToGoal) {
            // Goal reached for the first time
            const duration = (Date.now() - startTimeRef.current) / 1000;
            setTimeToGoal(duration.toFixed(2));
        }
    }, [isTraining, isGood, loss, timeToGoal]);

    // Status text generator
    const getStatusText = () => {
        if (!isTraining && loss === 1.0) return "Rețeaua nu este antrenată încă.";

        if (isGood) {
            if (difference < 0.05) return "Performanță Acceptabilă. Obiectiv atins la limită.";
            return "Performanță Excelentă! Rețeaua a învățat modelul cu precizie mare.";
        } else {
            if (difference < 0.1) return "Aproape de țintă. Mai necesită puțin antrenament.";
            return "Performanță Slabă. Rețeaua nu a învățat suficient modelul.";
        }
    };

    return (
        <div className="glass-panel" style={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <ClipboardCheck size={20} color="#00f2fe" />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Analiză Rezultate</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                {/* Control Slider */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Prag Toleranță Eroare:</span>
                        <strong style={{ color: '#00f2fe' }}>{tolerance.toFixed(2)}</strong>
                    </div>
                    <input
                        type="range"
                        min="0.01"
                        max="0.5"
                        step="0.01"
                        value={tolerance}
                        onChange={(e) => setTolerance(parseFloat(e.target.value))}
                        className="glass-slider"
                    />
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                {/* Analysis Result */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    background: isGood ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 0, 128, 0.1)',
                    padding: '15px',
                    borderRadius: '8px',
                    border: `1px solid ${isGood ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255, 0, 128, 0.3)'}`,
                    transition: 'all 0.3s ease'
                }}>
                    {isGood ?
                        <CheckCircle size={32} color="#00f2fe" /> :
                        <XCircle size={32} color="#ff0080" />
                    }
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: isGood ? '#00f2fe' : '#ff0080' }}>
                            {isGood ? "OBIECTIV ATINS" : "NEANTRENAT"}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '2px' }}>
                            {getStatusText()}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', opacity: 0.7 }}>
                    <div>Eroare Actuală: <strong>{loss.toFixed(4)}</strong></div>
                    <div>Diferență: <strong>{(loss - tolerance).toFixed(4)}</strong></div>

                    {timeToGoal && (
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px', color: '#00f2fe' }}>
                            <Timer size={14} />
                            <strong>Obiectiv atins în {timeToGoal} secunde!</strong>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default React.memo(AnalysisPanel);
