/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
import { Network, DataSet } from 'vis/index-network'

var drawPlay = (ctx, pos, fillColor, ext = 0) => {
    for (var node in pos) {
        var x = pos[node].x - 25;
        var y = pos[node].y - 25;
        var w = 50;
        var h = 50;

        //Draw triangle
        ctx.beginPath();
        ctx.moveTo(x + w / 3, y + h / 3);
        ctx.lineTo(x + w / 3, y + h - h / 3);
        ctx.lineTo(x + w - w / 4, y + h / 2);
        ctx.lineTo(x + w / 3, y + h / 3);
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

var drawPause = (ctx, nodePosition, nodeIds, pauseColor, nodeColor , ext = 0) => {
    nodeIds.forEach(nodeId => {
        ctx.strokeStyle = pauseColor;
        ctx.lineWidth = 3;
        ctx.fillStyle = nodeColor;
        ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 10 + ext);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = pauseColor;
        ctx.rect(nodePosition[nodeId].x - 4, nodePosition[nodeId].y - 4, 8, 8)
        ctx.fill();
    });

}

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
            { from: 1, to: 3, },
            { from: 1, to: 4 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 4 },
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
                    border: '#F5F5FA',
                    background: '#F4F4F6',
                    highlight: {
                        border: '#F5F5FA',
                        background: '#C5CAE9'
                    },
                    hover: {
                        border: '#F5F5FA',
                        background: '#F4F4F6'
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
                color: {
                    color: '#232635',
                    highlight: '#232635',
                    hover: '#232635',
                    inherit: 'from',
                    opacity: 1.0
                },
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
                improvedLayout: true,
                hierarchical: {
                    enabled: true,
                    parentCentralization: true,
                    levelSeparation: 100,
                    direction: 'UD',
                    sortMethod: 'directed'
                }
            }
        };

        // initialize your network!
        var network = new Network(container, data, options);
        network.on('click', function (properties) {

            //nodes
            var nodeIds = properties.nodes;
            if (nodeIds.length !== 0) {
                var clickedNodes = nodes.get(nodeIds);
                console.log('clicked nodes:', clickedNodes);

                network.on("afterDrawing", function (ctx) {
                    var nodeId = properties.nodes[0];
                    if (nodeId != undefined) {

                        var nodePosition = network.getPositions([nodeId]);

                        //Pause cliked node
                        drawPlay(ctx, nodePosition, '#F4F4F6')
                        drawPause(ctx,nodePosition,[nodeId], '#3F51B5', '#F4F4F6')

                        var otherNodeIds = nodes.getIds()

                        //Play all other nodes
                        otherNodeIds.splice(nodes.getIds().indexOf(nodeId), 1)
                        var otherNodePositions = network.getPositions(otherNodeIds);
                        drawPause(ctx,otherNodePositions,otherNodeIds, '#F4F4F6', '#F4F4F6',.5)
                        drawPlay(ctx, otherNodePositions, '#3F51B5')
                    }
                });
            }

            //edges
            var edgeIds = properties.edges;
            if (edgeIds.length !== 0) {
                var clickedEdges = edges.get(edgeIds);
                console.log('clicked edges:', clickedEdges);
            }
        });

        network.on('afterDrawing', function (ctx) {
            var pos = network.getPositions(nodes.getIds())
            drawPlay(ctx, pos, '#3F51B5')
        });
    }
});