
export class NeuralNetwork {
    constructor(layerSizes) {
        // layerSizes is an array, e.g. [2, 4, 4, 1]
        this.layerSizes = layerSizes;
        this.layers = layerSizes.length;

        // Initialize weights and biases
        // weights[i] connects layer i to i+1
        this.weights = [];
        this.biases = [];

        for (let i = 0; i < this.layers - 1; i++) {
            const inputCount = layerSizes[i];
            const outputCount = layerSizes[i + 1];

            this.weights.push(this.randomMatrix(outputCount, inputCount));
            this.biases.push(this.randomMatrix(outputCount, 1));
        }

        // For visualization and backprop
        this.activations = []; // Stores output of each layer
        this.weightedSums = []; // Stores Z (before activation)
    }

    clone() {
        const nn = new NeuralNetwork([...this.layerSizes]);
        nn.weights = this.weights.map(w => w.map(row => [...row]));
        nn.biases = this.biases.map(b => b.map(row => [...row]));
        nn.activations = this.activations.map(a => [...(a || [])]);
        return nn;
    }

    randomMatrix(rows, cols) {
        return Array(rows).fill(0).map(() =>
            Array(cols).fill(0).map(() => Math.random() * 2 - 1)
        );
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    sigmoidDerivative(x) {
        return x * (1 - x);
    }

    // Matrix Multiplication Helper
    multiply(ma, mb) {
        // ma = rowsA x colsA
        // mb = vector (colsA x 1)
        if (ma[0].length !== mb.length) {
            console.error("Matrix mismatch", ma, mb);
            return [];
        }

        let result = new Array(ma.length).fill(0);
        for (let i = 0; i < ma.length; i++) {
            let sum = 0;
            for (let j = 0; j < mb.length; j++) {
                sum += ma[i][j] * mb[j];
            }
            result[i] = sum;
        }
        return result;
    }

    forward(inputs) {
        // Inputs is assumed to be an array matching layerSizes[0]

        this.activations = [inputs];
        this.weightedSums = [];

        let current = inputs;

        for (let i = 0; i < this.layers - 1; i++) {
            // Weights * Input
            // Weights are [NextLayer x CurrentLayer]
            // Input is [CurrentLayer]
            let next = this.multiply(this.weights[i], current);

            // Add Biases
            for (let j = 0; j < next.length; j++) {
                next[j] += this.biases[i][j][0];
            }

            this.weightedSums.push([...next]);

            // Activation
            next = next.map(val => this.sigmoid(val));

            this.activations.push(next);
            current = next;
        }

        return current;
    }

    train(inputs, targets, learningRate = 0.1) {
        // 1. Forward Pass
        this.forward(inputs);

        // 2. Backpropagation
        const errors = []; // Stores error for each layer (reversed or indexed)

        // Calculate Output Error
        // Error = Target - Output
        const outputLayerIndex = this.layers - 1;
        const outputs = this.activations[outputLayerIndex];

        let outputErrors = new Array(outputs.length).fill(0);
        for (let i = 0; i < outputs.length; i++) {
            outputErrors[i] = targets[i] - outputs[i];
        }

        // List of errors, starting from last layer
        // We will store gradients here directly for update? 
        // Or better: calculate all errors first, then update.

        // Let's do Standard Backprop loop

        let currentErrors = outputErrors;

        // Iterate backwards through layers (weights indices: layers-2 down to 0)
        for (let i = this.layers - 2; i >= 0; i--) {
            // Metrics for Gradient Descent:
            // Gradient = Error * Derivative(Output)
            const nextLayerOutputs = this.activations[i + 1];
            const gradients = nextLayerOutputs.map(val => this.sigmoidDerivative(val));

            // Multiply gradient by error and learning rate
            for (let j = 0; j < gradients.length; j++) {
                gradients[j] *= currentErrors[j] * learningRate;
            }

            // Calculate Deltas for Weights: Gradient * PreviousActivation_Transposed
            // WeightDelta = Gradient * Inputs
            const currentInputs = this.activations[i];

            // Update Weights
            // weight[j][k] connects input[k] to neuron[j]
            for (let j = 0; j < this.weights[i].length; j++) { // for each neuron in next layer
                for (let k = 0; k < this.weights[i][j].length; k++) { // for each input from prev layer
                    const delta = gradients[j] * currentInputs[k];
                    this.weights[i][j][k] += delta;
                }
                // Update Biases
                this.biases[i][j][0] += gradients[j];
            }

            // Calculate Errors for Previous Layer (if not at start)
            if (i > 0) {
                // Next Error = Transpose(Weights) * CurrentError
                const prevErrors = new Array(this.layerSizes[i]).fill(0);
                for (let j = 0; j < this.weights[i].length; j++) { // output/next nodes
                    for (let k = 0; k < this.weights[i][j].length; k++) { // input/prev nodes
                        prevErrors[k] += currentErrors[j] * this.weights[i][j][k];
                    }
                }
                currentErrors = prevErrors;
            }
        }

        const loss = outputErrors.reduce((sum, e) => sum + e * e, 0) / outputErrors.length;
        return { loss };
    }

    // Pure forward pass without updating internal state (for visualization)
    predict(inputs) {
        let current = inputs;

        for (let i = 0; i < this.layers - 1; i++) {
            let next = this.multiply(this.weights[i], current);
            for (let j = 0; j < next.length; j++) {
                next[j] += this.biases[i][j][0];
            }
            next = next.map(val => this.sigmoid(val));
            current = next;
        }
        return current;
    }
}
