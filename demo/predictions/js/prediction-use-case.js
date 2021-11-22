const alreadyExecutedElementsPredictedLate = [
    // customer
    '_6-61', // start event
    '_6-125', // sequence flow between 'start event' and 'select pizza'
    '_6-74', // select a pizza
    '_6-178', // sequence flow between 'select a pizza' and 'order a pizza'
    '_6-127', // order a pizza
    '_6-420', // sequence flow between 'order a pizza' and 'event-based gateway' (running element)

    '_6-638', // message flow

    // vendor
    '_6-450', // order received
    '_6-630', // sequence flow between 'order received' and 'parallel gateway'
    '_6-652', // parallel gateway
    '_6-693', // sequence flow between 'parallel gateway' and 'Bake the pizza'
    '_6-691', // sequence flow between 'parallel gateway' and 'where is my pizza'
];

class PredicatedLateUseCase extends UseCase {
    _alreadyExecutedElements;

    constructor(type) {
        super(type, () => pizzaDiagram(), true);
        this._alreadyExecutedElements = alreadyExecutedElementsPredictedLate;
    }

    display(dataType) {
        super.display(dataType);
        this._reduceVisibilityOfAlreadyExecutedElements();
    }

    _reduceVisibilityOfAlreadyExecutedElements() {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(this._alreadyExecutedElements, 'state-already-executed');
    }

    // running elements
    // '_6-180', // customer event based gateway
    // '_6-463', // vendor 'Bake the pizza'
}


class PredictedOnTimeUseCase extends PredicatedLateUseCase {

    constructor(type) {
        super(type);
        this._alreadyExecutedElements = [...alreadyExecutedElementsPredictedLate, ...[
            // vendor
            '_6-463', //'Bake the pizza'
            '_6-632', // sequence flow between 'Bake the pizza' and 'Deliver the pizza'
        ]];
    }

    // running elements
    // '_6-180', // customer event based gateway
    // '_6-514', // vendor 'Deliver the pizza'
}
