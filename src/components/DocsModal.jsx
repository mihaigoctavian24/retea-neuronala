import React, { useState } from 'react';
import { X, BookOpen, BrainCircuit, Activity, Network, ArrowLeftRight, ChevronDown, ChevronUp } from 'lucide-react';

const DocsModal = ({ isOpen, onClose }) => {
    const [openSection, setOpenSection] = useState(null);

    if (!isOpen) return null;

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '900px',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                background: 'rgba(0, 0, 0, 0.95)', // Black Glass
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                borderRadius: '24px'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '25px',
                        right: '25px',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ padding: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                        <div style={{ background: 'rgba(0, 242, 254, 0.1)', padding: '15px', borderRadius: '16px' }}>
                            <BookOpen size={40} color="#00f2fe" />
                        </div>
                        <div>
                            <h2 style={{
                                margin: 0,
                                fontSize: '2.2rem',
                                fontWeight: '800',
                                background: 'linear-gradient(to right, #00f2fe, #4facfe)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Documentație Tehnică
                            </h2>
                            <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
                                Concepte fundamentale ale rețelelor neuronale artificiale
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Section
                            index={0}
                            isOpen={openSection === 0}
                            toggle={() => toggleSection(0)}
                            title="Rețea Neuronală Artificială (ANN)"
                            icon={<BrainCircuit size={24} color="#ff0080" />}
                            text="O Rețea Neuronală Artificială este un model computațional inspirat din structura biologică a creierului uman. Aceasta este compusă din unități interconectate (neuroni artificiali) organizate în straturi, capabile să învețe recunoașterea tiparelor complexe prin ajustarea ponderilor sinaptice în urma procesului de antrenare."
                        />

                        <Section
                            index={1}
                            isOpen={openSection === 1}
                            toggle={() => toggleSection(1)}
                            title="Neuron Artificial (Perceptron)"
                            icon={<Activity size={24} color="#7928ca" />}
                            text="Unitatea fundamentală de procesare a rețelei. Fiecare neuron primește un set de intrări (inputs), le multiplică cu ponderile asociate (weights), însumează rezultatele și adaugă un termen liber (bias). Rezultatul acestei sume ponderate este trecut printr-o funcție de activare (ex: Sigmoid, ReLU) pentru a determina ieșirea neuronului."
                        />

                        <Section
                            index={2}
                            isOpen={openSection === 2}
                            toggle={() => toggleSection(2)}
                            title="Ponderi Sinaptice (Weights)"
                            icon={<Network size={24} color="#00f2fe" />}
                            text="Ponderile sunt parametrii ajustabili ai rețelei care determină intensitatea conexiunii dintre doi neuroni. În timpul procesului de învățare, aceste valori sunt modificate iterativ pentru a minimiza eroarea de predicție a rețelei. O pondere mare indică o influență semnificativă a intrării respective asupra rezultatului final."
                        />

                        <Section
                            index={3}
                            isOpen={openSection === 3}
                            toggle={() => toggleSection(3)}
                            title="Backpropagation (Algoritmul de Retropropagare)"
                            icon={<ArrowLeftRight size={24} color="#ffbd00" />}
                            text="Backpropagation este algoritmul fundamental pentru antrenarea rețelelor neuronale supravegheate. Acesta calculează gradientul funcției de eroare în raport cu ponderile rețelei, propagând eroarea de la stratul de ieșire înapoi spre straturile ascunse. Prin aplicarea regulii înlănțuirii (Chain Rule), algoritmul determină direcția și magnitudinea cu care fiecare pondere trebuie ajustată."
                        />
                    </div>

                    <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                        Documentație elaborată pentru Sesiunea de Comunicări Științifice 2025
                    </div>
                </div>
            </div>
        </div>
    );
};

const Section = ({ index, isOpen, toggle, title, text, icon }) => (
    <div style={{
        background: isOpen ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        borderRadius: '12px',
        border: isOpen ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
    }}>
        <button
            onClick={toggle}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'white',
                textAlign: 'left'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ opacity: isOpen ? 1 : 0.7 }}>{icon}</div>
                <span style={{ fontSize: '1.2rem', fontWeight: '600', color: isOpen ? 'white' : 'rgba(255,255,255,0.8)' }}>{title}</span>
            </div>
            {isOpen ? <ChevronUp size={20} color="rgba(255,255,255,0.5)" /> : <ChevronDown size={20} color="rgba(255,255,255,0.5)" />}
        </button>

        {/* Accordion Content */}
        <div style={{
            maxHeight: isOpen ? '500px' : '0',
            opacity: isOpen ? 1 : 0,
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <div style={{ padding: '0 20px 20px 60px' }}>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'rgba(255,255,255,0.7)',
                    margin: 0,
                    borderLeft: '2px solid rgba(255,255,255,0.1)',
                    paddingLeft: '15px'
                }}>
                    {text}
                </p>
            </div>
        </div>
    </div>
);

export default DocsModal;
