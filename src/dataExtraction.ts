import { DataSet } from '../vis/index-network'
import { Edge } from './Edge';


var getEdges = (segueTriggers, from): Edge[] => {
    let toRet: Edge[] = []
    let arrTo: Array<string> = [];
    let roundness = 0.1;

    for (let segueKey in segueTriggers) {
        let segue = segueTriggers[segueKey];
        if (arrTo.indexOf(segue.segue.to) > -1) {
            toRet.push(new Edge(segue.segue.to, from, segue.suggestedTriggerStrings.concat(segue.triggerStrings).join(', '), 'curvedCW', roundness));
            roundness = roundness + 0.1;
        } else {
            arrTo.push(segue.segue.to);
            toRet.push(new Edge(segue.segue.to, from, segue.suggestedTriggerStrings.concat(segue.triggerStrings).join(', ')))
        }
    }

    return toRet
}

export var getDataFromJson = (): DataSet => {
    var options = {};
    var edgesArray = []
    var nodes = new DataSet(options);
    var edges = new DataSet(options);

    // Get data from JSON file
    var json = require('./data.json').plan.dialogs;

    for (let key in json) {
        nodes.add({ id: json[key].id, label: json[key].id.toString() });
        edgesArray = getEdges(json[key].segueTriggers, json[key].id);

        edges.add(edgesArray)
    }
    var data = {
        nodes: nodes,
        edges: edges,
    };
    return data;
}
