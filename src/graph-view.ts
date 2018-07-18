/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
import { Network, DataSet } from 'vis/index-network'


var GraphView = Polymer(<any>{
    is: 'graph-view',
    properties: {
        hello: {
            type: String,
            value: "Hello"
        }
    },
    ready: function () {
        // create a network
        var container = document.getElementById('graphDiv');

        var nodes = new DataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' }
        ]);

        // create an array with edges
        var edges = new DataSet([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
        ]);

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            nodes: {
                borderWidth: 1,
                borderWidthSelected: 2,
                color: {
                    border: '#2B7CE9',
                    background: '#FFFF',
                    highlight: {
                        border: '#2B7CE9',
                        background: '#D2E5FF'
                    },
                    hover: {
                        border: '#2B7CE9',
                        background: '#D2E5FF'
                    }
                },
                fixed: {
                    x: true,
                    y: true
                },
                heightConstraint: {
                    minimum: 50,
                    valign: 'middle'
                },
                shape: 'box',
                shapeProperties: {
                    borderRadius: 3,
                }
            },
            edges: {
                arrows: {
                    to: { enabled: true, scaleFactor: 1, type: 'arrow' }
                },
                color: 'red',
                font: '12px arial #ff0000',
                scaling: {
                    label: true,
                },
                shadow: true,
                smooth: {
                    enabled: true,
                    type: "straightCross",
                    roundness: 0.5
                },
            }
        };

        // initialize your network!
        var network = new Network(container, data, options);
        network.on('click', function (properties) {
            var ids = properties.nodes;
            var clickedNodes = nodes.get(ids);
            console.log('clicked nodes:', clickedNodes);
            var ids = properties.edges;
            var clickedEdges = edges.get(ids);
            console.log('clicked edges:', clickedEdges);
        });
    }
});