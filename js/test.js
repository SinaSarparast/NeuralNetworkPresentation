function script() {

	// Init various tools to build NN
	var Neuron = synaptic.Neuron,
		Layer = synaptic.Layer,
		Network = synaptic.Network,
		Trainer = synaptic.Trainer,
		Architect = synaptic.Architect;

	// create the network
	var inputLayer = new Layer(2);
	var hiddenLayer = new Layer(3);
	var outputLayer = new Layer(1);

	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	// here the goal is to train a NN to represent a XOR gate
	var myNetwork = new Network({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});

	var count = 0;
	var perf = {
		data: [],
		labels: [],
		raw: {a:[], b:[], c:[], d:[]}
	};

	// train the network
	var learningRate = .3;
	for (var i = 0; i < 20000; i++)
	{
		// 0,0 => 0
		var a = myNetwork.activate([0,0]);
		myNetwork.propagate(learningRate, [0]);

		// 0,1 => 1
		var b = myNetwork.activate([0,1]);
		myNetwork.propagate(learningRate, [1]);


		// 1,0 => 1
		var c = myNetwork.activate([1,0]);
		myNetwork.propagate(learningRate, [1]);

		// 1,1 => 0
		var d = myNetwork.activate([1,1]);
		myNetwork.propagate(learningRate, [0]);


		if(i % 100 == 0) {

			var _a =  1.0 - a[0];

			var _d = 1.0 - d[0];

			var sum = _a + b[0] + c[0] + _d;

			var avg = (sum / 4) * 100;

			perf.data.push(avg);
			perf.labels.push(count);
			perf.raw.a.push(a[0]);
			perf.raw.b.push(b[0]);
			perf.raw.c.push(c[0]);
			perf.raw.d.push(d[0]);
			count++;
		}
	}
	return perf;
}