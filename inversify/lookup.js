"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyValuePair = (function () {
    function KeyValuePair(key, value) {
        this.key = key;
        this.value = new Array();
        this.value.push(value);
    }
    return KeyValuePair;
}());
var Lookup = (function () {
    function Lookup() {
        this._hashMap = new Array();
    }
    Lookup.prototype.getIndexByKey = function (key) {
        var index = -1;
        for (var i = 0; i < this._hashMap.length; i++) {
            var keyValuePair = this._hashMap[i];
            if (keyValuePair.key === key) {
                index = i;
            }
        }
        return index;
    };
    Lookup.prototype.add = function (key, value) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        if (value === null || value === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            var keyValuePair = this._hashMap[index];
            keyValuePair.value.push(value);
        }
        else {
            this._hashMap.push(new KeyValuePair(key, value));
        }
    };
    Lookup.prototype.get = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            var keyValuePair = this._hashMap[index];
            return keyValuePair.value;
        }
        else {
            throw new Error("Key Not Found");
        }
    };
    Lookup.prototype.remove = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            this._hashMap.splice(index, 1);
        }
        else {
            throw new Error("Key Not Found");
        }
    };
    Lookup.prototype.hasKey = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            return true;
        }
        else {
            return false;
        }
    };
    return Lookup;
}());
exports.Lookup = Lookup;
