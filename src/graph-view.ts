/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
import { Network , DataSet} from '../vis/index-network'
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
            physics: false,
            layout: {
                randomSeed: 159600,
                //improvedLayout: true,
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