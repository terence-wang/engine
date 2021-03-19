import { AnimBlendTree } from './anim-blend-tree.js';

/**
 * @private
 * @class
 * @name AnimBlendTreeDirect
 * @classdesc An AnimBlendTree that calculates normalised weight values based on the total weight
 * @description Create a new BlendTree1D.
 */
class AnimBlendTreeDirect extends AnimBlendTree {
    calculateWeights() {
        if (this.updateParameterValues()) return;
        var i;
        var weightSum = 0.0;
        for (i = 0; i < this._children.length; i++) {
            weightSum += Math.max(this._parameterValues[i], 0.0);
        }
        for (i = 0; i < this._children.length; i++) {
            this._children[i].weight = Math.max(this._parameterValues[i], 0.0) / weightSum;
        }
    }
}

export { AnimBlendTreeDirect };
