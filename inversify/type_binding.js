"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_binding_scope_1 = require("./type_binding_scope");
var TypeBinding = (function () {
    function TypeBinding(runtimeIdentifier, implementationType, scopeType) {
        this.runtimeIdentifier = runtimeIdentifier;
        this.implementationType = implementationType;
        this.cache = null;
        if (typeof scopeType === "undefined") {
            this.scope = type_binding_scope_1.TypeBindingScopeEnum.Transient;
        }
        else {
            if (type_binding_scope_1.TypeBindingScopeEnum[scopeType]) {
                this.scope = scopeType;
            }
            else {
                var msg = "Invalid scope type " + scopeType;
                throw new Error(msg);
            }
        }
    }
    return TypeBinding;
}());
exports.TypeBinding = TypeBinding;
