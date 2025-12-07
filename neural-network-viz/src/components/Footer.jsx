import React, { useState } from 'react';
import { Heart, BookOpen, HelpCircle } from 'lucide-react';
import GuideModal from './GuideModal';
import FaqModal from './FaqModal';

const Footer = () => {
    const [showGuide, setShowGuide] = useState(false);
    const [showFaq, setShowFaq] = useState(false);

    return (
        <>
            <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
            <FaqModal isOpen={showFaq} onClose={() => setShowFaq(false)} />

            <footer style={{
                marginTop: '60px',
                width: '100%',
                maxWidth: '1600px',
                margin: '60px auto 0 auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'transparent' // Removed shadow gradient
            }}>
                <div style={{
                    padding: '40px 20px 0 20px',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'start',
                    gap: '20px'
                }}>
                    {/* Left: University Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.5px' }}>
                            UNIVERSITATEA ROMÂNO-AMERICANĂ
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '400', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Facultatea de Informatică Managerială
                        </div>
                    </div>

                    {/* Center: Authors */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '5px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                            Realizat de studenții grupei <span style={{ color: '#ff0080', fontWeight: 'bold' }}>624</span>:
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '500', color: '#fff' }}>
                            Octavian Mihai <span style={{ margin: '0 5px' }}>&</span> Abassi Pazeyazd Bianca-Maria
                        </div>
                    </div>

                    {/* Right: Links */}
                    <div style={{ display: 'flex', gap: '25px', fontSize: '0.85rem', justifySelf: 'end' }}>
                        <button
                            onClick={() => setShowGuide(true)}
                            className="hover-magenta"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'rgba(255,255,255,0.7)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontWeight: '500',
                                fontSize: 'inherit'
                            }}>
                            <BookOpen size={14} /> GHID UTILIZARE
                        </button>
                        <button
                            onClick={() => setShowFaq(true)}
                            className="hover-magenta"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'rgba(255,255,255,0.7)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontWeight: '500',
                                fontSize: 'inherit'
                            }}>
                            <HelpCircle size={14} /> FAQ
                        </button>
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.2)',
                    borderTop: '1px solid rgba(255,255,255,0.03)',
                    paddingTop: '10px',
                    paddingBottom: '50px'
                }}>
                    © 2025 Neuronal Networks Lab. All rights reserved. Made with <Heart size={10} fill="#ff0080" color="#ff0080" style={{ display: 'inline', margin: '0 2px' }} /> by Bubu & Dudu Dev Team.
                </div>
            </footer>
        </>
    );
};

export default Footer;
