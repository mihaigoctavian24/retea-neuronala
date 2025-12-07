# Demonstrație Practică: Arhitecturi de Rețele Neuronale Artificiale și Algoritmul Backpropagation

> **Sesiunea de Comunicări Științifice Studențești 2025**  
> **Universitatea Româno-Americană**  
> **Facultatea de Informatică Managerială**

---

## 1. Abstract

Acest proiect reprezintă o aplicație software educațională destinată vizualizării în timp real a proceselor interne dintr-o rețea neuronală artificială (ANN). Scopul principal este demistificarea conceptului de "cutie neagră" (black box) specific algoritmilor de învățare automată, oferind o perspectivă grafică asupra ajustării ponderilor sinaptice și minimizării funcției de eroare în timpul antrenării pe problema neliniară XOR.

## 2. Fundamente Teoretice

Aplicația implementează un **Perceptron Multistrat (MLP)** complet conectat, utilizând învățarea supervizată.

### 2.1. Arhitectura Rețelei

Arhitectura este flexibilă, permițând configurarea dinamică a straturilor ascunse. Structura de bază constă în:

* **Stratul de Intrare (Input Layer)**: 2 neuroni, corespunzând celor două intrări binare ale funcției XOR.
* **Straturi Ascunse (Hidden Layers)**: Configurabile (ex: 4 neuroni), utilizând funcția de activare **Sigmoid** sau **ReLU** pentru a introduce neliniaritate.
* **Stratul de Ieșire (Output Layer)**: 1 neuron, reprezentând probabilitatea clasei (0 sau 1).

### 2.2. Algoritmul de Învățare (Backpropagation)

Procesul de antrenare se bazează pe algoritmul **Gradient Descent** cu **Backpropagation**:

1. **Forward Propagation**: Semnalul este propagat de la intrare spre ieșire prin sume ponderate și activări.
2. **Calculul Erorii**: Se utilizează eroarea pătratică medie (MSE) pentru a cuantifica discrepanța dintre predicție și eticheta reală.
3. **Backward Propagation**: Gradientul erorii este propagat înapoi prin rețea, iar ponderile ($w$) și bias-urile ($b$) sunt actualizate conform regulii delta:
    $$w_{nou} = w_{vechi} - \eta \cdot \frac{\partial E}{\partial w}$$
    unde $\eta$ este rata de învățare (learning rate).

## 3. Specificații Tehnice

Aplicația este dezvoltată utilizând tehnologii moderne de dezvoltare web, punând accent pe performanță și interactivitate.

* **Frontend Framework**: React.js
* **Build Tool**: Vite (pentru optimizarea modulelor ES)
* **Manevrarea Stării**: React Hooks (`useState`, `useEffect`, `useRef`)
* **Grafică și Vizualizare**: SVG dinamic pentru arhitectura rețelei și HTML5 Canvas / CSS Grid pentru reprezentarea datelor.
* **Motorul Neural**: O librărie proprie (`NeuralNetwork.js`) scrisă în Pure JavaScript, fără dependențe externe de ML (precum TensorFlow.js), pentru a demonstra înțelegerea algoritmică profundă.

## 4. Ghid de Utilizare

### 4.1. Configurare

Panoul de control permite utilizatorului să definească topologia rețelei (numărul de straturi și neuroni) și să seteze hiperparametrii (Rata de învățare).

### 4.2. Vizualizare

* **Arhitectura**: Conexiunile dintre neuroni își schimbă grosimea și opacitatea în funcție de magnitudinea ponderii.
* **Decision Boundary**: O hartă termică ce arată cum rețeaua clasifică întreg spațiul 2D al intrărilor.
* **Grafice**: Evoluția funcției de pierdere (Loss) în timp real.

## 5. Instalare și Rulare Locală

Pentru a rula aplicația într-un mediu local, sunt necesare **Node.js** și **npm**.

```bash
# 1. Clonarea repository-ului
git clone https://github.com/mihaigoctavian24/retea-neuronala.git

# 2. Instalarea dependențelor
npm install

# 3. Pornirea serverului de dezvoltare
npm run dev
```

Aplicația va fi accesibilă la adresa `http://localhost:5173`.

---

## Echipa de Proiect

**Studenți:**

* Octavian Mihai
* Abassi Pazeyazd Bianca-Maria

**Grupa:** 624

**Coordonator Științific:**

* Prof. Univ. Dr. Gruiescu Mihaela
* **Disciplina:** Statistică
