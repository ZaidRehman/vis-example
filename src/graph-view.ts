/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
import { Network, DataSet } from '../vis/index-network'
import { getDataFromJson } from './dataExtraction';

var drawPlay = (ctx, p, fillColor, nodeColor) => {
    var w = 25;
    var h = 25;
    var x = p.x - w / 2;
    var y = p.y - h / 2;

    ctx.beginPath();
    ctx.strokeStyle = fillColor;
    ctx.lineWidth = 0;
    ctx.fillStyle = fillColor;
    ctx.circle(p.x, p.y, 12);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 10, y + 7.5);
    ctx.lineTo(x + 10, y + 17.5);
    ctx.lineTo(x + 18.66, y + 12.5);
    ctx.lineTo(x + 10, y + 7.5);
    ctx.fillStyle = nodeColor;
    ctx.fill();
    ctx.closePath();

}

var drawPause = (ctx, p, pauseColor, nodeColor) => {

    ctx.beginPath();
    ctx.strokeStyle = pauseColor;
    ctx.lineWidth = 3;
    ctx.fillStyle = nodeColor;
    ctx.circle(p.x, p.y, 12);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = pauseColor;
    ctx.rect(p.x - 4, p.y - 4, 8, 8);
    ctx.fill();
    ctx.closePath();
}

var GraphView = Polymer(<any>{
    is: 'graph-view',
    properties: {},
    ready: function () {

        // create a network
        var container = document.getElementById('graphDiv')
        // provide the data in the vis format
        var data = getDataFromJson();

        // var nodes = new DataSet([
        //     { id: 1, label: '1' },
        //     { id: 3, label: '3' },
        //     { id: 2, label: '2', shapeColor: 'rejected' },
        //     { id: 4, label: '4', shapeColor: 'accepted' },
        //     { id: 5, label: '5', shapeColor: 'triggered' },
        //     { id: 6, label: '6' },
        //     { id: 7, label: '7', shapeColor: 'triggered' },
        //     { id: 8, label: '8', shapeColor: 'triggered' },
        //     { id: 9, label: '9' },
        //     { id: 10, label: '10' },
        //     { id: 11, label: '11' },
        //     { id: 12, label: '12' },
        //     { id: 13, label: '13' },
        //     { id: 14, label: '14' },
        //     { id: 15, label: '15' },
        //     { id: 16, label: '16' },
        //     { id: 17, label: '17' },
        //     { id: 18, label: '18' },
        //     { id: 19, label: '19' },
        //     { id: 20, label: '20' },
        //     { id: 21, label: '21' },
        //     { id: 22, label: '22' },
        //     { id: 23, label: '23' },
        //     { id: 24, label: '24' },
        //     { id: 25, label: '25' },
        //     { id: 26, label: '26' },
        //     { id: 27, label: '27' },
        //     { id: 28, label: '28' },
        //     { id: 29, label: '29' },
        //     { id: 30, label: '30' },
        //     { id: 31, label: '31' },
        //     { id: 32, label: '32' },
        //     { id: 33, label: '33' },
        //     { id: 34, label: '34' },
        //     { id: 35, label: '35' },
        //     { id: 36, label: '36' },
        //     { id: 37, label: '37' },
        //     { id: 38, label: '38' },
        //     { id: 39, label: '39' },
        //     { id: 40, label: '40' },
        //     { id: 41, label: '41' },
        //     { id: 42, label: '42' },
        //     { id: 43, label: '43' },
        //     { id: 44, label: '44' },
        //     { id: 45, label: '45' },
        //     { id: 46, label: '46' },
        //     { id: 47, label: '47' },
        //     { id: 48, label: '48' },
        //     { id: 49, label: '49' },
        //     { id: 50, label: '50' },
        //     { id: 51, label: '51' },
        //     { id: 52, label: '52' },
        //     { id: 53, label: '53' },
        // ]);

        // // create an array with edges
        // var edges = new DataSet([
        //     { from: 1, to: 6, label: 'event', title: 'this is hover' },
        //     { from: 1, to: 3, label: 'event', title: 'this is hover' },

        //     { from: 2, to: 4, label: 'event', title: 'this is hover' },
        //     { from: 2, to: 4, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 4, to: 53, label: 'event', title: 'this is hover' },
        //     { from: 5, to: 16, label: 'event', title: 'this is hover' },
        //     { from: 5, to: 2, label: 'event', title: 'this is hover' },
        //     { from: 5, to: 2, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },
        //     { from: 5, to: 2, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },

        //     { from: 6, to: 7, label: 'event', title: 'this is hover' },
        //     { from: 6, to: 3, label: 'event', title: 'this is hover' },
        //     { from: 6, to: 7, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 7, to: 19, label: 'event', title: 'this is hover' },
        //     { from: 7, to: 18, label: 'event', title: 'this is hover' },
        //     { from: 8, to: 22, label: 'event', title: 'this is hover' },
        //     { from: 8, to: 9, label: 'event', title: 'this is hover' },
        //     { from: 8, to: 9, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 9, to: 25, label: 'event', title: 'this is hover' },
        //     { from: 9, to: 10, label: 'event', title: 'this is hover' },
        //     { from: 9, to: 10, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 10, to: 12, label: 'event', title: 'this is hover' },
        //     { from: 10, to: 11, label: 'event', title: 'this is hover' },
        //     { from: 10, to: 11, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 11, to: 30, label: 'event', title: 'this is hover' },
        //     { from: 11, to: 14, label: 'event', title: 'this is hover' },
        //     { from: 11, to: 14, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 12, to: 13, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0 } },
        //     { from: 12, to: 13, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },
        //     { from: 12, to: 13, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.4 } },
        //     { from: 12, to: 13, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.6 } },
        //     { from: 12, to: 13, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.8 } },

        //     { from: 13, to: 14, label: 'event', title: 'this is hover' },

        //     { from: 16, to: 2, label: 'event', title: 'this is hover' },
        //     { from: 16, to: 2, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },
        //     { from: 16, to: 2, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },
        //     { from: 16, to: 17, label: 'event', title: 'this is hover' },
        //     { from: 16, to: 18, label: 'event', title: 'this is hover' },

        //     { from: 17, to: 2, label: 'event', title: 'this is hover' },
        //     { from: 17, to: 2, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },
        //     { from: 17, to: 2, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },

        //     { from: 18, to: 2, label: 'event', title: 'this is hover' },
        //     { from: 18, to: 2, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 19, to: 29, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0 } },
        //     { from: 19, to: 29, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },
        //     { from: 19, to: 29, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.4 } },
        //     { from: 19, to: 29, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.6 } },
        //     { from: 19, to: 29, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.8 } },

        //     { from: 20, to: 21, label: 'event', title: 'this is hover' },

        //     { from: 21, to: 8, label: 'event', title: 'this is hover' },
        //     { from: 21, to: 8, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },
        //     { from: 21, to: 19, label: 'event', title: 'this is hover' },

        //     { from: 22, to: 23, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0 } },
        //     { from: 22, to: 23, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },
        //     { from: 22, to: 23, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.4 } },
        //     { from: 22, to: 23, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.6 } },
        //     { from: 22, to: 23, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.8 } },

        //     { from: 23, to: 24, label: 'event', title: 'this is hover' },

        //     { from: 24, to: 22, label: 'event', title: 'this is hover' },
        //     { from: 24, to: 9, label: 'event', title: 'this is hover' },
        //     { from: 24, to: 9, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 25, to: 26, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0 } },
        //     { from: 25, to: 26, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },
        //     { from: 25, to: 26, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.4 } },
        //     { from: 25, to: 26, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.6 } },
        //     { from: 25, to: 26, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.8 } },

        //     { from: 26, to: 27, label: 'event', title: 'this is hover' },

        //     { from: 27, to: 28, label: 'event', title: 'this is hover' },

        //     { from: 28, to: 10, label: 'event', title: 'this is hover' },
        //     { from: 28, to: 10, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },
        //     { from: 28, to: 25, label: 'event', title: 'this is hover' },

        //     { from: 29, to: 20, label: 'event', title: 'this is hover' },

        //     { from: 30, to: 31, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0 } },
        //     { from: 30, to: 31, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.2 } },
        //     { from: 30, to: 31, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.4 } },
        //     { from: 30, to: 31, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.6 } },
        //     { from: 30, to: 31, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.8 } },

        //     { from: 31, to: 32, label: 'event', title: 'this is hover' },

        //     { from: 32, to: 33, label: 'event', title: 'this is hover' },

        //     { from: 33, to: 34, label: 'event', title: 'this is hover' },
        //     { from: 33, to: 34, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },
        //     { from: 33, to: 30, label: 'event', title: 'this is hover' },

        //     { from: 34, to: 35, label: 'event', title: 'this is hover' },
        //     { from: 34, to: 38, label: 'event', title: 'this is hover' },
        //     { from: 34, to: 35, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 35, to: 36, label: 'event', title: 'this is hover' },
        //     { from: 35, to: 38, label: 'event', title: 'this is hover' },

        //     { from: 36, to: 37, label: 'event', title: 'this is hover' },

        //     { from: 37, to: 38, label: 'event', title: 'this is hover' },

        //     { from: 38, to: 39, label: 'event', title: 'this is hover' },
        //     { from: 38, to: 41, label: 'event', title: 'this is hover' },
        //     { from: 38, to: 41, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 39, to: 40, label: 'event', title: 'this is hover' },

        //     { from: 40, to: 41, label: 'event', title: 'this is hover' },

        //     { from: 41, to: 42, label: 'event', title: 'this is hover' },
        //     { from: 41, to: 43, label: 'event', title: 'this is hover' },
        //     { from: 41, to: 43, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 42, to: 43, label: 'event', title: 'this is hover' },

        //     { from: 43, to: 44, label: 'event', title: 'this is hover' },
        //     { from: 43, to: 45, label: 'event', title: 'this is hover' },
        //     { from: 43, to: 45, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 44, to: 45, label: 'event', title: 'this is hover' },

        //     { from: 45, to: 46, label: 'event', title: 'this is hover' },
        //     { from: 45, to: 47, label: 'event', title: 'this is hover' },
        //     { from: 45, to: 47, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 46, to: 47, label: 'event', title: 'this is hover' },

        //     { from: 47, to: 48, label: 'event', title: 'this is hover' },
        //     { from: 47, to: 49, label: 'event', title: 'this is hover' },
        //     { from: 47, to: 49, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 48, to: 49, label: 'event', title: 'this is hover' },

        //     { from: 49, to: 50, label: 'event', title: 'this is hover' },
        //     { from: 49, to: 51, label: 'event', title: 'this is hover' },
        //     { from: 49, to: 51, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 50, to: 51, label: 'event', title: 'this is hover' },

        //     { from: 51, to: 52, label: 'event', title: 'this is hover' },
        //     { from: 51, to: 5, label: 'event', title: 'this is hover' },
        //     { from: 51, to: 5, label: 'event', title: 'this is hover', smooth: { type: 'curvedCW', roundness: 0.1 } },

        //     { from: 52, to: 5, label: 'event', title: 'this is hover' },

        // ]);
        var nodes: DataSet = data.nodes;
        var edges: DataSet = data.edges;

        var options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            nodes: {
                margin: {
                    top: -10,
                    bottom: 10,
                    left: 5,
                    right: -5,
                },
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
                    color: '#3f51b5',
                    size: 19, // px
                    face: 'Roboto',
                    background: 'none',
                    strokeWidth: 0, // px
                    strokeColor: '#ffffff',
                    align: 'left',
                    multi: false,
                    vadjust: 0,
                },
                fixed: {
                    x: true,
                    y: true
                },
                shadow: {
                    enabled: true,
                    color: 'rgba(0,0,0,1)',
                    size: 10,
                    x: 5,
                    y: 5
                },
                heightConstraint: {
                    minimum: 53,
                    valign: 'middle'
                },
                widthConstraint: {
                    minimum: 80,
                },
                shape: 'dialog',
                shapeProperties: {
                    borderRadius: 3,
                }
            },
            edges: {
                arrows: {
                    from: { enabled: true, scaleFactor: 0.7, type: 'circle' },
                    to: { enabled: true, scaleFactor: 0.5, type: 'arrow' }
                },
                arrowStrikethrough: false,
                color: {
                    color: '#9b9b9b',
                    highlight: '#9b9b9b',
                    hover: '#9b9b9b',
                    inherit: 'from',
                    opacity: 1.0
                },
                length: 100,
                scaling: {
                    label: true,
                },
                font: {
                    color: '#9b9b9b',
                    size: 14, // px
                    face: 'Roboto',
                    background: '#f2f2f2',
                    strokeWidth: 0, // px
                    strokeColor: '#9b9b9b',
                    align: 'horizontal',
                    //vadjust: 10,
                    multi: false,
                },
                hoverWidth: 0,
                labelHighlightBold: true,
                selectionWidth: 1,
                shadow: false,
                widthConstraint: {
                    maximum: 50,
                }
            },
            physics: {
                hierarchicalRepulsion: {
                    centralGravity: 0.0,
                    springLength: 100,
                    springConstant: 0.01,
                    nodeDistance: 300,
                    damping: 0.09
                },
                solver: 'hierarchicalRepulsion',
                stabilization: {
                    enabled: true,
                    iterations: 10000,
                    fit: true
                },
            },
            layout: {
                // randomSeed: 367848,
                // improvedLayout: true,
                // hierarchical: {
                //     enabled: true,
                //     treeSpacing: 200,
                //     nodeSpacing: 150,
                //     levelSeparation: 200,
                //     parentCentralization: true,
                //     blockShifting: true,
                //     edgeMinimization: true,
                //     direction: 'UD',
                // }
            },
            interaction: {
                hover: true,
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

                // retrieve played nodes
                var playedNodes = nodes.get({
                    fields: ['id', 'played'],
                    filter: function (node) {
                        return node.played == true;
                    }
                });

                if (playedNodes[0] && playedNodes[0].played == true) {
                    playedNodes[0].played = false
                }

                if (clickedNodes[0] && clickedNodes[0].played == true) {
                    clickedNodes[0].played = false;
                } else {
                    clickedNodes[0].played = true;
                }

                nodes.update(clickedNodes.concat(playedNodes));
            }


            //edges
            var edgeIds = properties.edges;
            if (edgeIds.length !== 0) {
                var clickedEdges = edges.get(edgeIds);
                console.log('clicked edges:', clickedEdges);
            }
        });

        network.on('afterDrawing', function (ctx) {
            console.log(network.getSeed())
            var pos = network.getPositions(nodes.getIds())
            nodes.forEach(node => {
                if (node.played) {
                    drawPause(ctx, pos[node.id], '#3F51B5', '#FFFFFF')
                } else {
                    drawPlay(ctx, pos[node.id], '#3F51B5', '#FFFFFF')
                }
            });
        });

        network.on("hoverEdge", function (params) {
            var tooltip = <HTMLElement>document.getElementById('custom-tooltip');
            var x = params.pointer.DOM.x;
            var y = params.pointer.DOM.y - 40;
            tooltip.innerHTML = "<p class='tooltip-text' >" + edges.get(params.edge).title + '</p>';
            tooltip.setAttribute('style', 'top:' + y + 'px;left:' + x + 'px;display:block;');
        });

        network.on("blurEdge", function (params) {
            var tooltip = <HTMLElement>document.getElementById('custom-tooltip');
            tooltip.setAttribute('style', 'display:none;');
        });
    }
});