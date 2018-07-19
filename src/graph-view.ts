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
            { id: 1, label: '1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: '4' },
            { id: 5, label: 'Node 5' }
        ]);

        // create an array with edges
        var edges = new DataSet([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 2 },
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
                // margin: {
                //     top: 0,
                //     bottom: 40,
                //     left: 0,
                //     right: 0,
                // },
                borderWidth: 1,
                borderWidthSelected: 2,
                color: {
                    border: '#5C6BC0',
                    background: '#E8EAF7',
                    highlight: {
                        border: '#5C6BC0',
                        background: '#7986CB'
                    },
                    hover: {
                        border: '#5C6BC0',
                        background: '#BAD9FD'
                    }
                },
                font: {
                    align: 'left',
                    vadjust: -20,
                },
                fixed: {
                    x: true,
                    y: true
                },
                heightConstraint: {
                    minimum: 50,
                    valign: 'middle'
                },
                widthConstraint: {
                    minimum: 50,
                },
                shape: 'box',
                shapeProperties: {
                    borderRadius: 3,
                }
            },
            edges: {
                arrows: {
                    to: { enabled: true, scaleFactor: 0.5, type: 'circle' }
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
            },
            physics: {
                enabled: false,
                barnesHut: {
                    gravitationalConstant: 0,
                    centralGravity: 0,
                    springConstant: 0,
                }
            },
            layout: {
                hierarchical: {
                    enabled: true,
                    parentCentralization: true,
                    levelSeparation: 100,
                    direction: 'DU'
                }
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

        network.on('afterDrawing', function (ctx) {
            console.log(ctx)

            var pos = network.getPositions(nodes.getIds())
            for (var node in pos) {
                var x = pos[node].x - 25;
                var y = pos[node].y - 25;

                var w = 50;
                var h = 50;

                //Draw triangle
                ctx.strokeStyle = 'green';
                ctx.beginPath();
                ctx.moveTo(x + w / 3, y + h / 3);
                ctx.lineTo(x + w / 3, y + h - h / 3);
                ctx.lineTo(x + w - w / 4, y + h / 2);
                ctx.lineTo(x + w / 3, y + h / 3);
                ctx.fillStyle = 'black';
                ctx.fill();

            }

        });
    }
});