
import React from 'react';
import { Play, Pause, RotateCcw, Zap, Layers, Settings, Plus, Minus } from 'lucide-react';

const ControlPanel = ({
    isTraining,
    setIsTraining,
    handleReset,
    learningRate,
    setLearningRate,
    layerStructure,
    addLayer,
    removeLayer,
    updateLayerSize,
    showWeights,
    setShowWeights
}) => {
    return (
        <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Settings size={20} color="#4facfe" />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Control Panel</h3>
            </div>

            {/* Training Controls */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                <button
                    className={`glass-button ${isTraining ? 'danger' : 'primary'}`}
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => setIsTraining(!isTraining)}
                >
                    {isTraining ? <Pause size={18} /> : <Play size={18} />}
                    {isTraining ? 'Pauză' : 'Start'}
                </button>

                <button
                    className="glass-button"
                    onClick={handleReset}
                    title="Resetează Rețeaua"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            {/* Learning Rate */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                        <Zap size={16} color="#ff0080" /> Rată de Învățare
                    </label>
                    <span style={{ fontSize: '0.9rem', color: '#ff0080' }}>{learningRate}</span>
                </div>
                <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                />
            </div>

            {/* Dynamic Architecture Controls */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                        <Layers size={16} color="#00f2fe" /> Arhitectură
                    </label>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button className="glass-button" style={{ padding: '6px' }} onClick={removeLayer} title="Scoate Strat Ascuns">
                            <Minus size={14} />
                        </button>
                        <button className="glass-button" style={{ padding: '6px' }} onClick={addLayer} title="Adaugă Strat Ascuns">
                            <Plus size={14} />
                        </button>
                    </div>
                </div>

                {/* List Layers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {layerStructure.map((size, index) => {
                        const isInput = index === 0;
                        const isOutput = index === layerStructure.length - 1;
                        const label = isInput ? 'Noduri Intrare' : (isOutput ? 'Noduri Ieșire' : `Strat Ascuns ${index}`);

                        return (
                            <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{label}</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{size}</span>
                                </div>
                                {isInput || isOutput ? null : ( // Only allow changing Hidden Layers count
                                    <input
                                        type="range"
                                        min="1"
                                        max="8"
                                        step="1"
                                        value={size}
                                        onChange={(e) => updateLayerSize(index, parseInt(e.target.value))}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Toggles */}
            <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                        type="checkbox"
                        checked={showWeights}
                        onChange={(e) => setShowWeights(e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#4facfe' }}
                    />
                    Arată Ponderi
                </label>
            </div>
        </div>
    );
};

export default React.memo(ControlPanel);
