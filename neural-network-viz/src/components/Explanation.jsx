import React, { useEffect, useRef } from 'react';
import { Terminal, AlignLeft } from 'lucide-react';

const Explanation = ({ logs = [] }) => {
    const scrollRef = useRef(null);

    const isAtBottomRef = useRef(true);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // Check if user is near the bottom (within 50px)
        const isBottom = scrollHeight - scrollTop - clientHeight < 50;
        isAtBottomRef.current = isBottom;
    };

    // Auto-scroll ONLY if we were already at the bottom
    useEffect(() => {
        if (scrollRef.current && isAtBottomRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <Terminal size={20} color="#ff0080" />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Jurnal Activitate AI</h3>
            </div>

            <div
                ref={scrollRef}
                style={{
                    flex: 1,
                    height: '235px',
                    minHeight: '235px',
                    maxHeight: '235px', // Fixed height to match MetricsPanel
                    overflowY: 'auto',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    background: 'rgba(0,0,0,0.2)',
                    padding: '10px',
                    borderRadius: '8px'
                }}
                onScroll={handleScroll}
            >
                {logs.length === 0 && <span style={{ opacity: 0.5 }}>În așteptarea datelor de antrenare...</span>}

                {logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                        <span style={{ color: '#4facfe', marginRight: '8px', fontSize: '0.8rem' }}>[{log.time}]</span>
                        <span>{log.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Explanation);
