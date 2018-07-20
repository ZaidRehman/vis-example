/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
import { Network, DataSet } from 'vis/index-network'
import { Car } from './Car';

var drawPlay = (ctx, p, fillColor, ext = 0) => {
    var w = 25;
    var h = 25;
    var x = p.x - w/2;
    var y = p.y - h/2;

    //Draw triangle
    ctx.beginPath();
    ctx.arc(p.x,p.y,12,0,2*Math.PI);
    ctx.moveTo(x + w / 3, y + h / 3);
    ctx.lineTo(x + w / 3, y + h - h / 3);
    ctx.lineTo(x + w - w / 4, y + h / 2);
    ctx.lineTo(x + w / 3, y + h / 3);
    ctx.fillStyle = fillColor;
    ctx.fill();

}

var drawPause = (ctx, p, pauseColor, nodeColor, ext = 0) => {

    ctx.strokeStyle = pauseColor;
    ctx.lineWidth = 3;
    ctx.fillStyle = nodeColor;
    ctx.circle(p.x, p.y, 12 + ext);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = pauseColor;
    ctx.rect(p.x - 4, p.y - 4, 8, 8);
    ctx.fill();
    ctx.closePath();
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
            { id: 1, label: '1', car: new Car("XYZ", "2016") },
            { id: 2, label: '2', shapeColor: 'rejected' },
            { id: 3, label: '3' },
            { id: 4, label: '4', shapeColor: 'accepted' },
            { id: 5, label: '5', shapeColor: 'triggered' },
            { id: 6, label: '6' },
            { id: 7, label: '7', shapeColor: 'triggered' },
        ]);

        // create an array with edges
        var edges = new DataSet([
            { from: 1, to: 3 , label: 'event', title: 'this is hover'},
            { from: 1, to: 4 , label: 'event', title: 'this is hover'},
            { from: 1, to: 2 , label: 'event', title: 'this is hover'},
            { from: 2, to: 4 , label: 'event', title: 'this is hover'},
            { from: 2, to: 5 , label: 'event', title: 'this is hover'},
            { from: 3, to: 4 , label: 'event', title: 'this is hover'},
            { from: 6, to: 7 , label: 'event', title: 'this is hover'},
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
                margin: {
                    top: -10,
                    bottom: 10,
                    left: 10,
                    right: -10,
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
                    from: { enabled: true, scaleFactor: 0.5, type: 'circle' },
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
                length: 50,
                scaling: {
                    label: true,
                },
                font: {
                    color: '#9b9b9b',
                    size: 14, // px
                    face: 'Roboto',
                    //background: 'none',
                    strokeWidth: 0, // px
                    strokeColor: '#9b9b9b',
                    align: 'horizontal',
                    multi: false,
                },
                hoverWidth: 5,
                labelHighlightBold: false,
                selectionWidth: 0,
                shadow: false,
                smooth: {
                    enabled: true,
                    type: "cubicBezier",
                    roundness: .8
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
                    levelSeparation: 150,
                    nodeSpacing: 150,
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

                // retrieve played nodes
                var playedNodes = nodes.get({
                    fields: ['id', 'played'],
                    filter: function (node) {
                        return node.played == true;
                    }
                });

                if (playedNodes[0] && playedNodes[0].played) {
                    playedNodes[0].played = false
                }

                if (clickedNodes[0] && clickedNodes[0].played) {
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
            var pos = network.getPositions(nodes.getIds())

            nodes.forEach(node => {
                if (node.played) {
                    drawPlay(ctx, pos[node.id], '#F4F4F6')
                    drawPause(ctx, pos[node.id], '#3F51B5', '#F4F4F6')
                } else {
                    drawPause(ctx, pos[node.id], '#F4F4F6', '#F4F4F6')
                    drawPlay(ctx, pos[node.id], '#3F51B5')
                }
            });
        });
    }
});