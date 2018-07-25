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

let calculatedEdges = [];
let processedDialogs = [];
let calculatedNodes = new DataSet({});
let x = 1;
let y = 1;
let posNodes = {};
var process = (dialogs, dialog) => {
    if (processedDialogs.indexOf(dialog.id) == -1) {
        processedDialogs.push(dialog.id);
        calculatedNodes.add({ id: dialog.id, label: dialog.id.toString(), x: posNodes[dialog.id][x] * 100, y: y * 100 })
        y = 1;
        x = 1;
        dialog.segueTriggers.forEach(segueTrigger => {
            x++;
            calculatedEdges.push({ from: dialog.id, to: segueTrigger.segue.to});
            posNodes[segueTrigger.segue.to][x] = x
        });

        calculatedEdges.forEach(edge => {
            if (edge.from == dialog.id) {
                y++;
                process(dialogs, dialogs[edge.to - 1]);
            }
        })
    }
}


export var getDataFromJson = (): DataSet => {
    var options = {};
    var nodes = new DataSet(options);
    var edges = new DataSet(options);

    // Get data from JSON file
    var dialogs = require('./data.json').plan.dialogs;
    let startingDialogs = [];
    startingDialogs.push(dialogs[0]);
    startingDialogs.push(...dialogs.filter(d => {
        return d.jumpSegueTrigger.triggerStrings.length >= 1;
    }));
    startingDialogs.forEach(d => {
        process(dialogs, d)
    });
    for (let key in dialogs) {
        nodes.add({ id: dialogs[key].id, label: dialogs[key].id.toString(), x: Number(key) * 100, y: Number(key) * 100 });
    }
    calculatedEdges.sort((a, b) => {
        return a.from - b.from;
    })
    calculatedEdges.forEach((e) => {
        edges.add({ to: e.to, from: e.from });
    })

    console.log(calculatedEdges);
    var data = {
        nodes: calculatedNodes,
        edges: edges,
    };

    return data;
}

