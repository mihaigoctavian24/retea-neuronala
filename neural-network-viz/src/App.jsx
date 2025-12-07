import { useState, useEffect, useRef } from 'react'
import { NeuralNetwork } from './lib/NeuralNetwork'
import NetworkCanvas from './components/NetworkCanvas'
import DecisionBoundary from './components/DecisionBoundary'
import ControlPanel from './components/ControlPanel'
import MetricsPanel from './components/MetricsPanel'
import Explanation from './components/Explanation'
import AnalysisPanel from './components/AnalysisPanel'

import Footer from './components/Footer'
import DocsModal from './components/DocsModal'
import CookieBanner from './components/CookieBanner'
import { BookOpen, Github, BrainCircuit, GraduationCap } from 'lucide-react'
import './App.css'

function App() {
  // State
  // Default architecture: 2 inputs, 4 hidden, 1 output
  const [layerStructure, setLayerStructure] = useState([2, 4, 1]);

  const nnRef = useRef(new NeuralNetwork([2, 4, 1]));
  const [nn, setNn] = useState(() => nnRef.current);

  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const epochRef = useRef(0); // Track epoch synchronously to avoid stale closures/double logs
  const [loss, setLoss] = useState(1.0);
  const [lossHistory, setLossHistory] = useState([]);
  const [logs, setLogs] = useState([{ time: new Date().toLocaleTimeString(), text: "Sistem inițializat. Pregătit de învățare." }]);

  const addLog = (text) => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), text }, ...prev].slice(0, 50));
  };

  const [learningRate, setLearningRate] = useState(0.5);
  const [animationStep, setAnimationStep] = useState(0);
  const [showWeights, setShowWeights] = useState(true);
  const [showDocs, setShowDocs] = useState(false);

  const requestRef = useRef();
  const trainingRef = useRef();

  // Re-initialize network when architecture changes
  useEffect(() => {
    // Check if structure actually changed
    if (JSON.stringify(nnRef.current.layerSizes) !== JSON.stringify(layerStructure)) {
      const newNN = new NeuralNetwork(layerStructure);
      nnRef.current = newNN;
      setNn(newNN);
      setEpoch(0);
      epochRef.current = 0;
      setLoss(1.0);
      setLossHistory([]);
      setIsTraining(false);
    }
  }, [layerStructure]);

  // Training Data (XOR)
  const trainingData = [
    { input: [0, 0], target: [0] },
    { input: [0, 1], target: [1] },
    { input: [1, 0], target: [1] },
    { input: [1, 1], target: [0] }
  ];

  // Training Loop
  useEffect(() => {
    if (isTraining) {
      const trainLoop = () => {
        const currentNN = nnRef.current;

        // Shuffle data so visualization doesn't always show the last static sample [1,1]
        const shuffledData = [...trainingData].sort(() => Math.random() - 0.5);

        let totalLoss = 0;
        for (let data of shuffledData) {
          const res = currentNN.train(data.input, data.target, learningRate);
          totalLoss += res.loss;
        }
        const avgLoss = totalLoss / shuffledData.length;

        // Update Stats
        setLoss(avgLoss);

        epochRef.current += 1;
        const currentEpoch = epochRef.current;
        setEpoch(currentEpoch);

        if (currentEpoch === 1) addLog("A început bucla de antrenare...");
        if (currentEpoch % 100 === 0) addLog(`Epoca ${currentEpoch}: Eroare ${avgLoss.toFixed(4)}`);
        if (avgLoss < 0.1 && totalLoss > 0.09) addLog("🚀 Eroare mică atinsă! Rețeaua converge.");
        setLossHistory(prev => [...prev, avgLoss]);

        setNn(currentNN.clone());

        trainingRef.current = setTimeout(trainLoop, 20); // Faster training
      };

      trainLoop();
      return () => clearTimeout(trainingRef.current);
    }
  }, [isTraining, learningRate]);

  // Animation Loop (Visuals)
  useEffect(() => {
    const animate = () => {
      setAnimationStep(s => (s + 2) % 60);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleReset = () => {
    const newNN = new NeuralNetwork(layerStructure);
    nnRef.current = newNN;
    setNn(newNN);
    setEpoch(0);
    epochRef.current = 0;
    setLoss(1.0);
    setLossHistory([]);
    setIsTraining(false);
    setLogs([{ time: new Date().toLocaleTimeString(), text: "Rețea resetată. Memoria a fost ștearsă." }]);
    addLog("Ponderile au fost randomizate.");
  };

  // Helpers to modify architecture
  const addLayer = () => {
    const newStruct = [...layerStructure];
    // Insert new hidden layer before the last output layer
    newStruct.splice(newStruct.length - 1, 0, 4);
    setLayerStructure(newStruct);
    addLog(`Architecture updated: Hidden layer added. [${newStruct.join('-')}]`);
  };

  const removeLayer = () => {
    if (layerStructure.length <= 2) return; // Min 2 layers (Input, Output) - though strictly XOR needs hidden
    const newStruct = [...layerStructure];
    newStruct.splice(newStruct.length - 2, 1);
    setLayerStructure(newStruct);
    addLog(`Architecture updated: Layer removed. [${newStruct.join('-')}]`);
  };

  const updateLayerSize = (layerIndex, size) => {
    const newStruct = [...layerStructure];
    newStruct[layerIndex] = size;
    setLayerStructure(newStruct);
    // Debounce logging for sliders? For now just log.
  };

  return (
    <div className="app-container">

      {/* Academic Header (Absolute Top) */}
      {/* Hero Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1600px',
        margin: '20px auto 40px auto',
        padding: '0',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-container">
            <BrainCircuit size={32} color="#ff0080" />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>NNLab</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>v2.0 Final</div>
          </div>
        </div>

        {/* Center: Academic Info & Title */}
        <div style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '1200px', pointerEvents: 'none' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(20, 0, 10, 0.6)',
            border: '1px solid rgba(255, 0, 128, 0.3)',
            color: '#ff0080',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            marginBottom: '3px',
            marginTop: '30px',
            boxShadow: '0 0 15px rgba(255, 0, 128, 0.15)'
          }}>
            SESIUNEA DE COMUNICĂRI ȘTIINȚIFICE STUDENȚEȘTI 2025
          </div>

          <div style={{
            height: '2px',
            width: '80%',
            maxWidth: '850px',
            background: 'linear-gradient(90deg, transparent, #ff0080, transparent)',
            margin: '5px auto 10px auto',
            opacity: 0.8
          }} />

          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            margin: '0 0 10px 0',
            background: 'linear-gradient(to right, #fff, #b0b0b0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(255,255,255,0.1)'
          }}>
            Demonstrație Practică: Rețele Neuronale & Backpropagation
          </h1>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.7)',
            alignItems: 'center',
            fontWeight: '300'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={16} color="#ff0080" />
              Profesor Coordonator: <span style={{ marginLeft: '4px' }}>Gruiescu Mihaela</span>
            </span>
            <span style={{ opacity: 0.2 }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="#00f2fe" />
              Disciplina: <span style={{ marginLeft: '4px' }}>Statistică</span>
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href="https://github.com/vostru/proiect-retea"
            target="_blank"
            rel="noreferrer"
            className="glass-button"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>

          <button
            className="glass-button"
            onClick={() => setShowDocs(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 0, 128, 0.1)', border: '1px solid rgba(255, 0, 128, 0.3)', color: '#ff0080' }}
          >
            <BookOpen size={18} />
            <span>Documentație</span>
          </button>
        </div>
      </div>



      {/* Top Section: Header & Large Visualization */}
      <div className="top-section">
        <div className="canvas-wrapper-large" style={{ position: 'relative', overflow: 'hidden' }}>
          <DecisionBoundary nn={nn} />
          <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
            <NetworkCanvas
              nn={nn}
              animationStep={animationStep}
              showWeights={showWeights}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section: Flexible Layout */}
      <div className="bottom-layout">
        {/* Left Column: Controls */}
        <div className="left-panel">
          <ControlPanel
            isTraining={isTraining}
            setIsTraining={setIsTraining}
            handleReset={handleReset}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
            layerStructure={layerStructure}
            addLayer={addLayer}
            removeLayer={removeLayer}
            updateLayerSize={updateLayerSize}
            showWeights={showWeights}
            setShowWeights={setShowWeights}
          />
        </div>

        {/* Right Column: Visuals & Analysis */}
        <div className="right-panel">
          <div className="metrics-row">
            <div style={{ flex: 1 }}>
              <MetricsPanel
                lossHistory={lossHistory}
                epoch={epoch}
                isTraining={isTraining}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Explanation logs={logs} />
            </div>
          </div>

          <AnalysisPanel loss={loss} isTraining={isTraining} />
        </div>
      </div>

      <Footer />

      <DocsModal isOpen={showDocs} onClose={() => setShowDocs(false)} />
      <CookieBanner />
    </div >
  )
}

export default App
