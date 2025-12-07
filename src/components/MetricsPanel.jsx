
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';

const MetricsPanel = ({ lossHistory, epoch, isTraining }) => {
    // During training: Show last 50 points for "live" feel
    // When stopped: Show FULL history to analyze the curve
    const historyToShow = isTraining ? lossHistory.slice(-50) : lossHistory;

    const data = historyToShow.map((loss, i) => {
        // Correct epoch calculation:
        // If slicing, start from (total - 50 + i)
        // If full, start from i
        const currentEpoch = isTraining ? (epoch - 50 + i) : i;
        return {
            name: currentEpoch > 0 ? currentEpoch : 0, // avoid negative indices
            loss: loss
        };
    });

    return (
        <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Activity size={20} color="#ffffff" />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Metrici Antrenare</h3>
            </div>

            <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" hide />
                        <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.5)" tick={{ fill: 'white', fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#ffffff' }}
                            labelStyle={{ display: 'none' }}
                            formatter={(value) => [value.toFixed(4), 'Eroare']}
                        />
                        <Line
                            type="monotone"
                            dataKey="loss"
                            stroke="#ffffff"
                            strokeWidth={3}
                            dot={{ r: 1, fill: '#ffffff' }}
                            animationDuration={300}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                <span>Eroare Curentă: <strong style={{ color: 'white' }}>{lossHistory[lossHistory.length - 1]?.toFixed(4) || '1.000'}</strong></span>
                <span>Epoca: <strong style={{ color: 'white' }}>{epoch}</strong></span>
            </div>
        </div>
    );
};

export default React.memo(MetricsPanel);
