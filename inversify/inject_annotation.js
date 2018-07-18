"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Inject = function () {
    var typeIdentifiers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeIdentifiers[_i] = arguments[_i];
    }
    return function (constructor) {
        constructor.__INJECT = typeIdentifiers;
        return constructor;
    };
};
exports.Inject = Inject;
