'use strict';

import NodeBase from '../util/NodeBase'

/**
 * A Dialog Node/Cluster shape.
 *
 * @extends NodeBase
 */
class Dialog extends NodeBase {
  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */

  //const state = ''
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
    this.state = options.shapeColor;
    this._setMargins(labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    if (this.needsRefresh(selected, hover)) {
      var dimensions = this.getDimensionsFromLabel(ctx, selected, hover);

      this.width = dimensions.width + this.margin.right + this.margin.left;
      this.height = dimensions.height + this.margin.top + this.margin.bottom;
      this.radius = this.width / 2;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);

    var headColor = '';
    switch (this.state) {
      case 'accepted': headColor = '#70DC76'; break;
      case 'rejected': headColor = '#FF4200'; break;
      case 'triggered': headColor = '#5C6BC0'; break;
      default: headColor = '#ffffff'
    }
    var radius = 4;
    var barHeight = 5;

    //Draw Body
    ctx.beginPath();
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff'
    ctx.roundRect(this.left, this.top, this.width, this.height, radius);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    //Draw Head
    ctx.beginPath();
    ctx.strokeStyle = headColor;
    ctx.fillStyle = headColor;
    ctx.moveTo(this.left + radius, this.top);
    ctx.lineTo(this.left + this.width - radius, this.top);
    ctx.quadraticCurveTo(this.left + this.width, this.top , this.left + this.width, this.top + radius);
    ctx.lineTo(this.left + this.width, this.top + barHeight)
    ctx.lineTo(this.left,this.top + barHeight)
    ctx.lineTo(this.left,this.top + radius)
    ctx.quadraticCurveTo(this.left, this.top, this.left + radius, this.top);
    ctx.fill()
    ctx.closePath();
    ctx.stroke();

    this.updateBoundingBox(x, y, ctx, selected, hover);
    this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left,
      this.top + this.textSize.height / 2 + this.margin.top, selected, hover);
  }

  /**
   *
   * @param {number} x width
   * @param {number} y height
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */
  updateBoundingBox(x, y, ctx, selected, hover) {
    this._updateBoundingBox(x, y, ctx, selected, hover);

    let borderRadius = this.options.shapeProperties.borderRadius; // only effective for box
    this._addBoundingBoxMargin(borderRadius);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    this.resize(ctx);
    let borderWidth = this.options.borderWidth;

    return Math.min(
      Math.abs((this.width) / 2 / Math.cos(angle)),
      Math.abs((this.height) / 2 / Math.sin(angle))) + borderWidth;
  }
}

export default Dialog;
