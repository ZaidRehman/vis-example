"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_binding_scope_1 = require("./type_binding_scope");
var lookup_1 = require("./lookup");
var Kernel = (function () {
    function Kernel() {
        this._bindingDictionary = new lookup_1.Lookup();
    }
    Kernel.prototype.bind = function (typeBinding) {
        this._bindingDictionary.add(typeBinding.runtimeIdentifier, typeBinding);
    };
    Kernel.prototype.unbind = function (runtimeIdentifier) {
        try {
            this._bindingDictionary.remove(runtimeIdentifier);
        }
        catch (e) {
            throw new Error("Could not resolve service " + runtimeIdentifier);
        }
    };
    Kernel.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Kernel.prototype.resolve = function (runtimeIdentifier) {
        var bindings;
        if (this._bindingDictionary.hasKey(runtimeIdentifier)) {
            bindings = this._bindingDictionary.get(runtimeIdentifier);
        }
        else {
            return null;
        }
        var binding = bindings[0];
        if ((binding.scope === type_binding_scope_1.TypeBindingScopeEnum.Singleton) && (binding.cache !== null)) {
            return binding.cache;
        }
        else {
            var result = this._injectDependencies(binding.implementationType);
            binding.cache = result;
            return result;
        }
    };
    Kernel.prototype._getConstructorArguments = function (func) {
        var typeIdentifiers = func.__INJECT || [];
        return typeIdentifiers;
    };
    Kernel.prototype._injectDependencies = function (func) {
        var args = this._getConstructorArguments(func);
        if (args.length === 0) {
            return new func();
        }
        else {
            var injections = [], implementation = null;
            for (var i = 0; i < args.length; i++) {
                var service = args[i];
                implementation = this.resolve(service);
                injections.push(implementation);
            }
            return this._construct(func, injections);
        }
    };
    Kernel.prototype._construct = function (constr, args) {
        return new (Function.prototype.bind.apply(constr, [null].concat(args)));
    };
    return Kernel;
}());
exports.Kernel = Kernel;
