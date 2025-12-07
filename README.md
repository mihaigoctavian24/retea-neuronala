# Demonstrație Rețele Neuronale & Backpropagation 🧠⚡

> **Lucrare pentru Sesiunea de Comunicări Științifice Studențești 2025**  
> **Universitatea Româno-Americană | Facultatea de Informatică Managerială**

![Project Status](https://img.shields.io/badge/Status-Finalizat-success)
![Version](https://img.shields.io/badge/Version-v2.0-blue)
![License](https://img.shields.io/badge/License-MIT-purple)

O aplicație interactivă concepută pentru a demistifica conceptul de "Black Box" al rețelelor neuronale. Proiectul oferă o vizualizare grafică în timp real a arhitecturii Perceptronului Multistrat (MLP), demonstrând procesul de ajustare a ponderilor sinaptice prin algoritmul **Backpropagation** pe problema neliniară XOR.

---

## 👥 Echipa de Proiect

**Autori (Grupa 624):**

* 🎓 **Octavian Mihai**
* 🎓 **Abbasi Pazeyazd Bianca-Maria**

**Profesor Coordonator:**

* 👩‍🏫 **Prof. Univ. Dr. Gruiescu Mihaela** (Disciplina: Statistică)

---

## ✨ Funcționalități Cheie

### 1. 🔍 Vizualizare Arhitectură Neurală

Observă în timp real conexiunile dintre neuroni.

* **Ponderi Dinamice**: Grosimea și opacitatea liniilor reflectă magnitudinea ponderilor sinaptice.
* **Cod Culori**: Ponderile pozitive și negative sunt diferențiate cromatic pentru o analiză rapidă.

### 2. 📉 Grafice & Metrici Live

* **Loss Graph**: Urmărește minimizarea erorii (MSE - Mean Squared Error) epocă cu epocă.
* **Decision Boundary**: O hartă termică ce arată cum rețeaua segmentează spațiul decizional 2D.

### 3. 🎛️ Laborator Experimental

Ai control total asupra parametrilor rețelei:

* **Arhitectură Flexibilă**: Adaugă sau elimină straturi ascunse și configurează numărul de neuroni.
* **Hiperparametri**: Ajustează Rata de Învățare (Learning Rate) pentru a vedea impactul asupra convergenței.
* **Antrenare Viteză Variabilă**: Controlează viteza simulării pentru a observa detaliile fine.

### 4. 📚 Documentație Integrată

* **Interfață Academică**: Termeni tehnici riguroși și explicații matematice.
* **Ghid Interactiv**: Instrucțiuni pas-cu-pas direct în aplicație.
* **FAQ**: Răspunsuri la întrebări despre overfitting, funcții de activare și normalizare.

---

## 🛠️ Tehnologii Utilizate

* **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Languages**: JavaScript (ES6+)
* **Styling**: Vanila CSS (Design Cyberpunk/Academic)
* **Libraries**: [Lucide React](https://lucide.dev/) (Icons)
* **Neural Engine**: **Custom Pure JS Implementation** (No external ML libs like TensorFlow) - Demonstrând înțelegerea profundă a algoritmilor.

---

## 🚀 Instalare și Rulare

Dacă dorești să rulezi proiectul local:

1. **Clonează repository-ul:**

    ```bash
    git clone https://github.com/mihaigoctavian24/retea-neuronala.git
    cd retea-neuronala
    ```

2. **Instalează dependențele:**

    ```bash
    npm install
    ```

3. **Pornește serverul de dezvoltare:**

    ```bash
    npm run dev
    ```

    Aplicația va fi disponibilă la `http://localhost:5173`.

---

## 📐 Fundamente Teoretice

Procesul de antrenare se bazează pe algoritmul **Gradient Descent** cu **Backpropagation**.

**Arhitectura de bază:**

* **Input Layer**: 2 neuroni (XOR inputs)
* **Hidden Layers**: Sigmoid Activation Function
* **Output Layer**: 1 neuron (Class probability)

**Matematica din spate:**
Actualizarea ponderilor se face conform regulii delta:
> $$w_{new} = w_{old} - \eta \cdot \frac{\partial E}{\partial w}$$

Unde $\eta$ este rata de învățare.

---

## 📄 Licență

Acest proiect este licențiat sub [MIT License](LICENSE).
Copyright © 2025 Octavian Mihai & Abassi Pazeyazd Bianca-Maria. All Rights Reserved.
