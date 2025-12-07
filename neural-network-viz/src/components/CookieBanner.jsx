import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookie_consent');
        if (!accepted) {
            // Small delay for smooth entry
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            background: 'rgba(5, 5, 20, 0.95)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            backdropFilter: 'blur(10px)',
            zIndex: 999,
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            animation: 'slideUp 0.5s ease-out'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(0, 242, 254, 0.1)', padding: '10px', borderRadius: '50%' }}>
                    <Cookie size={24} color="#00f2fe" />
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
                    Folosim module cookie pentru a îmbunătăți experiența de învățare a rețelei neuronale.
                    (Nu colectăm date personale real, e doar de decor 😉).
                </p>
            </div>

            <button
                onClick={handleAccept}
                className="glass-button primary"
                style={{ whiteSpace: 'nowrap', padding: '10px 24px' }}
            >
                Acceptă Tot
            </button>

            <style>{`
                @keyframes slideUp {
                    from { transform: translate(-50%, 100px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default CookieBanner;
