(self["webpackChunkrST_Miner"] = self["webpackChunkrST_Miner"] || []).push([[151],{

/***/ 1416:
/*!***************************************************************!*\
  !*** ./src/app/classes/models/eventlog/eventlog-attribute.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BooleanAttribute": () => (/* binding */ BooleanAttribute),
/* harmony export */   "DateAttribute": () => (/* binding */ DateAttribute),
/* harmony export */   "EventlogAttribute": () => (/* binding */ EventlogAttribute),
/* harmony export */   "FloatAttribute": () => (/* binding */ FloatAttribute),
/* harmony export */   "IntAttribute": () => (/* binding */ IntAttribute),
/* harmony export */   "StringAttribute": () => (/* binding */ StringAttribute)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 8825);



class EventlogAttribute {
  constructor() {
    this.key = '';
  }

}

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(String), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", String)], EventlogAttribute.prototype, "key", void 0);

let StringAttribute = class StringAttribute extends EventlogAttribute {
  constructor(value, key) {
    super();
    this.value = value;
    this.key = key;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(String), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", String)], StringAttribute.prototype, "value", void 0);

StringAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [String, String])], StringAttribute);

let DateAttribute = class DateAttribute extends EventlogAttribute {
  constructor(value, key) {
    super();
    this.value = value;
    this.key = key;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Date), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Date)], DateAttribute.prototype, "value", void 0);

DateAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Date, String])], DateAttribute);

let IntAttribute = class IntAttribute extends EventlogAttribute {
  constructor(value, key) {
    super();
    this.value = Math.round(value);
    this.key = key;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Number)], IntAttribute.prototype, "value", void 0);

IntAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Number, String])], IntAttribute);

let FloatAttribute = class FloatAttribute extends EventlogAttribute {
  constructor(value, key) {
    super();
    this.value = value;
    this.key = key;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Number)], FloatAttribute.prototype, "value", void 0);

FloatAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Number, String])], FloatAttribute);

let BooleanAttribute = class BooleanAttribute extends EventlogAttribute {
  constructor(value, key) {
    super();
    this.value = value;
    this.key = key;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], BooleanAttribute.prototype, "value", void 0);

BooleanAttribute = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Boolean, String])], BooleanAttribute);


/***/ }),

/***/ 8991:
/*!****************************************************************!*\
  !*** ./src/app/classes/models/eventlog/eventlog-classifier.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventlogClassifier": () => (/* binding */ EventlogClassifier)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 8772);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 8825);



let EventlogClassifier = class EventlogClassifier {
  constructor(name, keys) {
    this._name = name;
    this._keys = keys;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get keys() {
    return this._keys;
  }

  set keys(value) {
    this._keys = value;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(String), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", String)], EventlogClassifier.prototype, "_name", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonArrayMember)(String), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Array)], EventlogClassifier.prototype, "_keys", void 0);

EventlogClassifier = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [String, Array])], EventlogClassifier);


/***/ }),

/***/ 9924:
/*!***********************************************************!*\
  !*** ./src/app/classes/models/eventlog/eventlog-event.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventlogEvent": () => (/* binding */ EventlogEvent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlog-attribute */ 1416);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 8772);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! typedjson */ 8825);
/* harmony import */ var _utils_lifecycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/lifecycle */ 7616);





let EventlogEvent = class EventlogEvent {
  constructor(attributes, activity, lifecycle) {
    this._activity = activity;
    this._attributes = attributes;
    this._lifecycleAsString = lifecycle;
  }

  get attributes() {
    return this._attributes;
  }

  set attributes(value) {
    this._attributes = value;
  }

  get activity() {
    return this._activity;
  }

  set activity(value) {
    this._activity = value;
  }

  get lifecycle() {
    if (this._lifecycleAsString == undefined) {
      return undefined;
    }

    return this._lifecycleAsString;
  }

  set lifecycle(value) {
    this._lifecycleAsString = value;
  }

  getAttribute(key) {
    return this._attributes.filter(attribute => key === attribute.key.toString())[0];
  }

  setPairEvent(pair) {
    this._pair = pair;
  }

  getPairEvent() {
    return this._pair;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonArrayMember)(_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.EventlogAttribute), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", Array)], EventlogEvent.prototype, "_attributes", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonMember)(String), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", String)], EventlogEvent.prototype, "_activity", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonMember)(String), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", String)], EventlogEvent.prototype, "_lifecycleAsString", void 0);

EventlogEvent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonObject)({
  knownTypes: [_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute]
}), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:paramtypes", [Array, String, String])], EventlogEvent);


/***/ }),

/***/ 2289:
/*!***********************************************************!*\
  !*** ./src/app/classes/models/eventlog/eventlog-trace.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventlogTrace": () => (/* binding */ EventlogTrace)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlog-attribute */ 1416);
/* harmony import */ var _eventlog_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlog-event */ 9924);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 8772);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! typedjson */ 8825);
var EventlogTrace_1;





let EventlogTrace = EventlogTrace_1 = class EventlogTrace {
  constructor(attributes, events, caseId) {
    this._attributes = attributes;
    this._events = events;
    this._caseId = caseId;
  }

  get attributes() {
    return this._attributes;
  }

  set attributes(value) {
    this._attributes = value;
  }

  get events() {
    return this._events;
  }

  set events(value) {
    this._events = value;
  }

  get caseId() {
    return this._caseId;
  }

  set caseId(value) {
    this._caseId = value;
  }

  get(i) {
    return this.events[i].activity;
  }

  set(i, value) {
    this.events[i].activity = value;
  }

  length() {
    return this.events.length;
  }

  get eventActivities() {
    return this.events.map(e => e.activity);
  }

  clone() {
    return new EventlogTrace_1([...this.attributes], [...this.events], this.caseId);
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonArrayMember)(_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.EventlogAttribute), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", Array)], EventlogTrace.prototype, "_attributes", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonArrayMember)(_eventlog_event__WEBPACK_IMPORTED_MODULE_1__.EventlogEvent), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", Array)], EventlogTrace.prototype, "_events", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:type", Number)], EventlogTrace.prototype, "_caseId", void 0);

EventlogTrace = EventlogTrace_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonObject)({
  knownTypes: [_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute]
}), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__metadata)("design:paramtypes", [Array, Array, Number])], EventlogTrace);


/***/ }),

/***/ 5081:
/*!*****************************************************!*\
  !*** ./src/app/classes/models/eventlog/eventlog.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Eventlog": () => (/* binding */ Eventlog)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlog-attribute */ 1416);
/* harmony import */ var _eventlog_classifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlog-classifier */ 8991);
/* harmony import */ var _eventlog_trace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventlog-trace */ 2289);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typedjson */ 8772);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! typedjson */ 8825);






let Eventlog = class Eventlog {
  constructor(classifiers, globalEventAttributes, globalTraceAttributes, traces, attributes) {
    this._classifiers = classifiers;
    this._globalEventAttributes = globalEventAttributes;
    this._globalTraceAttributes = globalTraceAttributes;
    this._attributes = attributes;
    this._traces = traces;
  }

  get classifiers() {
    return this._classifiers;
  }

  set classifiers(value) {
    this._classifiers = value;
  }

  get globalEventAttributes() {
    return this._globalEventAttributes;
  }

  set globalEventAttributes(value) {
    this._globalEventAttributes = value;
  }

  get globalTraceAttributes() {
    return this._globalTraceAttributes;
  }

  set globalTraceAttributes(value) {
    this._globalTraceAttributes = value;
  }

  get attributes() {
    return this._attributes;
  }

  set attributes(value) {
    this._attributes = value;
  }

  get traces() {
    return this._traces;
  }

  set traces(value) {
    this._traces = value;
  }

  get sortedTraces() {
    let result = new Array();

    this._traces.forEach(trace => {
      const index = result.findIndex(val => {
        for (let i = 0; i < val[0].events.length; i++) {
          if (val[0].events.length !== trace.events.length) {
            return false;
          }

          if (val[0].events[i].activity !== trace.events[i].activity) {
            return false;
          }
        }

        return true;
      });

      if (index == -1) {
        let arr = new Array();
        arr.push(trace);
        result.push(arr);
      } else {
        result[index].push(trace); // Trace zu den anderen hinzufügen die die gleichen Events haben
      }
    });

    result.sort((a, b) => {
      return b.length - a.length;
    });
    return result;
  }

};

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlog_classifier__WEBPACK_IMPORTED_MODULE_1__.EventlogClassifier), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)], Eventlog.prototype, "_classifiers", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.EventlogAttribute), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)], Eventlog.prototype, "_globalEventAttributes", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.EventlogAttribute), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)], Eventlog.prototype, "_globalTraceAttributes", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.EventlogAttribute), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)], Eventlog.prototype, "_attributes", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonArrayMember)(_eventlog_trace__WEBPACK_IMPORTED_MODULE_2__.EventlogTrace), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Array)], Eventlog.prototype, "_traces", void 0);

Eventlog = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonObject)({
  knownTypes: [_eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.StringAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.DateAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.IntAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.FloatAttribute, _eventlog_attribute__WEBPACK_IMPORTED_MODULE_0__.BooleanAttribute]
}), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [Array, Array, Array, Array, Array])], Eventlog);


/***/ }),

/***/ 7616:
/*!************************************************************!*\
  !*** ./src/app/classes/models/eventlog/utils/lifecycle.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lifecycle": () => (/* binding */ Lifecycle)
/* harmony export */ });
var Lifecycle = /*#__PURE__*/(() => {
  (function (Lifecycle) {
    Lifecycle["START"] = "start";
    Lifecycle["COMPLETE"] = "complete";
  })(Lifecycle || (Lifecycle = {}));

  return Lifecycle;
})();

/***/ }),

/***/ 3037:
/*!**************************************************!*\
  !*** ./node_modules/reflect-metadata/Reflect.js ***!
  \**************************************************/
/***/ (() => {

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;

(function (Reflect) {
  // Metadata Proposal
  // https://rbuckton.github.io/reflect-metadata/
  (function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect);

    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }

    factory(exporter);

    function makeExporter(target, previous) {
      return function (key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, {
            configurable: true,
            writable: true,
            value: value
          });
        }

        if (previous) previous(key, value);
      };
    }
  })(function (exporter) {
    var hasOwn = Object.prototype.hasOwnProperty; // feature test for Symbol support

    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support

    var supportsProto = {
      __proto__: []
    } instanceof Array; // feature test for __proto__ support

    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function () {
        return MakeDictionary(Object.create(null));
      } : supportsProto ? function () {
        return MakeDictionary({
          __proto__: null
        });
      } : function () {
        return MakeDictionary({});
      },
      has: downLevel ? function (map, key) {
        return hasOwn.call(map, key);
      } : function (map, key) {
        return key in map;
      },
      get: downLevel ? function (map, key) {
        return hasOwn.call(map, key) ? map[key] : undefined;
      } : function (map, key) {
        return map[key];
      }
    }; // Load global or shim versions of Map, Set, and WeakMap

    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";

    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();

    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();

    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill(); // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots


    var Metadata = new _WeakMap();
    /**
     * Applies a set of decorators to a property of a target object.
     * @param decorators An array of decorators.
     * @param target The target object.
     * @param propertyKey (Optional) The property key to decorate.
     * @param attributes (Optional) The property descriptor for the target key.
     * @remarks Decorators are applied in reverse order.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     Example = Reflect.decorate(decoratorsArray, Example);
     *
     *     // property (on constructor)
     *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
     *
     *     // property (on prototype)
     *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
     *
     *     // method (on constructor)
     *     Object.defineProperty(Example, "staticMethod",
     *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
     *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
     *
     *     // method (on prototype)
     *     Object.defineProperty(Example.prototype, "method",
     *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
     *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
     *
     */

    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsObject(target)) throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
        if (IsNull(attributes)) attributes = undefined;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsConstructor(target)) throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }

    exporter("decorate", decorate); // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata

    /**
     * A default metadata decorator factory that can be used on a class, class member, or parameter.
     * @param metadataKey The key for the metadata entry.
     * @param metadataValue The value for the metadata entry.
     * @returns A decorator function.
     * @remarks
     * If `metadataKey` is already defined for the target and target key, the
     * metadataValue for that key will be overwritten.
     * @example
     *
     *     // constructor
     *     @Reflect.metadata(key, value)
     *     class Example {
     *     }
     *
     *     // property (on constructor, TypeScript only)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         static staticProperty;
     *     }
     *
     *     // property (on prototype, TypeScript only)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         property;
     *     }
     *
     *     // method (on constructor)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         static staticMethod() { }
     *     }
     *
     *     // method (on prototype)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         method() { }
     *     }
     *
     */

    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }

      return decorator;
    }

    exporter("metadata", metadata);
    /**
     * Define a unique metadata entry on the target.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param metadataValue A value that contains attached metadata.
     * @param target The target object on which to define metadata.
     * @param propertyKey (Optional) The property key for the target.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     Reflect.defineMetadata("custom:annotation", options, Example);
     *
     *     // property (on constructor)
     *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
     *
     *     // property (on prototype)
     *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
     *
     *     // method (on constructor)
     *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
     *
     *     // method (on prototype)
     *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
     *
     *     // decorator factory as metadata-producing annotation.
     *     function MyAnnotation(options): Decorator {
     *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
     *     }
     *
     */

    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }

    exporter("defineMetadata", defineMetadata);
    /**
     * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.hasMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }

    exporter("hasMetadata", hasMetadata);
    /**
     * Gets a value indicating whether the target object has the provided metadata key defined.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }

    exporter("hasOwnMetadata", hasOwnMetadata);
    /**
     * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }

    exporter("getMetadata", getMetadata);
    /**
     * Gets the metadata value for the provided metadata key on the target object.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getOwnMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }

    exporter("getOwnMetadata", getOwnMetadata);
    /**
     * Gets the metadata keys defined on the target object or its prototype chain.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns An array of unique metadata keys.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getMetadataKeys(Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getMetadataKeys(Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getMetadataKeys(Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getMetadataKeys(Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getMetadataKeys(Example.prototype, "method");
     *
     */

    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }

    exporter("getMetadataKeys", getMetadataKeys);
    /**
     * Gets the unique metadata keys defined on the target object.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns An array of unique metadata keys.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getOwnMetadataKeys(Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
     *
     */

    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }

    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    /**
     * Deletes the metadata entry from the target object with the provided key.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata entry was found and deleted; otherwise, false.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.deleteMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(target, propertyKey,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return false;
      if (!metadataMap.delete(metadataKey)) return false;
      if (metadataMap.size > 0) return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0) return true;
      Metadata.delete(target);
      return true;
    }

    exporter("deleteMetadata", deleteMetadata);

    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);

        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated)) throw new TypeError();
          target = decorated;
        }
      }

      return target;
    }

    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);

        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated)) throw new TypeError();
          descriptor = decorated;
        }
      }

      return descriptor;
    }

    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);

      if (IsUndefined(targetMetadata)) {
        if (!Create) return undefined;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }

      var metadataMap = targetMetadata.get(P);

      if (IsUndefined(metadataMap)) {
        if (!Create) return undefined;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }

      return metadataMap;
    } // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata


    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    } // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata


    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    } // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata


    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
      return undefined;
    } // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata


    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return undefined;
      return metadataMap.get(MetadataKey);
    } // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata


    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      true);
      metadataMap.set(MetadataKey, MetadataValue);
    } // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys


    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null) return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0) return ownKeys;
      if (ownKeys.length <= 0) return parentKeys;
      var set = new _Set();
      var keys = [];

      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);

        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }

      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);

        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }

      return keys;
    } // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys


    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;

      while (true) {
        var next = IteratorStep(iterator);

        if (!next) {
          keys.length = k;
          return keys;
        }

        var nextValue = IteratorValue(next);

        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }

        k++;
      }
    } // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values


    function Type(x) {
      if (x === null) return 1
      /* Null */
      ;

      switch (typeof x) {
        case "undefined":
          return 0
          /* Undefined */
          ;

        case "boolean":
          return 2
          /* Boolean */
          ;

        case "string":
          return 3
          /* String */
          ;

        case "symbol":
          return 4
          /* Symbol */
          ;

        case "number":
          return 5
          /* Number */
          ;

        case "object":
          return x === null ? 1
          /* Null */
          : 6
          /* Object */
          ;

        default:
          return 6
          /* Object */
          ;
      }
    } // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type


    function IsUndefined(x) {
      return x === undefined;
    } // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type


    function IsNull(x) {
      return x === null;
    } // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type


    function IsSymbol(x) {
      return typeof x === "symbol";
    } // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type


    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    } // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive


    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0
        /* Undefined */
        :
          return input;

        case 1
        /* Null */
        :
          return input;

        case 2
        /* Boolean */
        :
          return input;

        case 3
        /* String */
        :
          return input;

        case 4
        /* Symbol */
        :
          return input;

        case 5
        /* Number */
        :
          return input;
      }

      var hint = PreferredType === 3
      /* String */
      ? "string" : PreferredType === 5
      /* Number */
      ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);

      if (exoticToPrim !== undefined) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result)) throw new TypeError();
        return result;
      }

      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    } // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive


    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;

        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result)) return result;
        }

        var valueOf = O.valueOf;

        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }
      } else {
        var valueOf = O.valueOf;

        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }

        var toString_2 = O.toString;

        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result)) return result;
        }
      }

      throw new TypeError();
    } // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean


    function ToBoolean(argument) {
      return !!argument;
    } // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring


    function ToString(argument) {
      return "" + argument;
    } // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey


    function ToPropertyKey(argument) {
      var key = ToPrimitive(argument, 3
      /* String */
      );
      if (IsSymbol(key)) return key;
      return ToString(key);
    } // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray


    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    } // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable


    function IsCallable(argument) {
      // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
      return typeof argument === "function";
    } // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor


    function IsConstructor(argument) {
      // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
      return typeof argument === "function";
    } // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey


    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3
        /* String */
        :
          return true;

        case 4
        /* Symbol */
        :
          return true;

        default:
          return false;
      }
    } // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod


    function GetMethod(V, P) {
      var func = V[P];
      if (func === undefined || func === null) return undefined;
      if (!IsCallable(func)) throw new TypeError();
      return func;
    } // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects


    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method)) throw new TypeError(); // from Call

      var iterator = method.call(obj);
      if (!IsObject(iterator)) throw new TypeError();
      return iterator;
    } // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue


    function IteratorValue(iterResult) {
      return iterResult.value;
    } // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep


    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    } // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose


    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f) f.call(iterator);
    } // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof


    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype) return proto; // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
      // Try to determine the superclass constructor. Compatible implementations
      // must either set __proto__ on a subclass constructor to the superclass constructor,
      // or ensure each class has a valid `constructor` property on its prototype that
      // points back to the constructor.
      // If this is not the same as Function.[[Prototype]], then this is definately inherited.
      // This is the case when in ES6 or when using __proto__ in a compatible browser.

      if (proto !== functionPrototype) return proto; // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.

      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype) return proto; // If the constructor was not a function, then we cannot determine the heritage.

      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function") return proto; // If we have some kind of self-reference, then we cannot determine the heritage.

      if (constructor === O) return proto; // we have a pretty good guess at the heritage.

      return constructor;
    } // naive Map shim


    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];

      var MapIterator =
      /** @class */
      function () {
        function MapIterator(keys, values, selector) {
          this._index = 0;
          this._keys = keys;
          this._values = values;
          this._selector = selector;
        }

        MapIterator.prototype["@@iterator"] = function () {
          return this;
        };

        MapIterator.prototype[iteratorSymbol] = function () {
          return this;
        };

        MapIterator.prototype.next = function () {
          var index = this._index;

          if (index >= 0 && index < this._keys.length) {
            var result = this._selector(this._keys[index], this._values[index]);

            if (index + 1 >= this._keys.length) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            } else {
              this._index++;
            }

            return {
              value: result,
              done: false
            };
          }

          return {
            value: undefined,
            done: true
          };
        };

        MapIterator.prototype.throw = function (error) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }

          throw error;
        };

        MapIterator.prototype.return = function (value) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }

          return {
            value: value,
            done: true
          };
        };

        return MapIterator;
      }();

      return (
        /** @class */
        function () {
          function Map() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }

          Object.defineProperty(Map.prototype, "size", {
            get: function () {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });

          Map.prototype.has = function (key) {
            return this._find(key,
            /*insert*/
            false) >= 0;
          };

          Map.prototype.get = function (key) {
            var index = this._find(key,
            /*insert*/
            false);

            return index >= 0 ? this._values[index] : undefined;
          };

          Map.prototype.set = function (key, value) {
            var index = this._find(key,
            /*insert*/
            true);

            this._values[index] = value;
            return this;
          };

          Map.prototype.delete = function (key) {
            var index = this._find(key,
            /*insert*/
            false);

            if (index >= 0) {
              var size = this._keys.length;

              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }

              this._keys.length--;
              this._values.length--;

              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }

              return true;
            }

            return false;
          };

          Map.prototype.clear = function () {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };

          Map.prototype.keys = function () {
            return new MapIterator(this._keys, this._values, getKey);
          };

          Map.prototype.values = function () {
            return new MapIterator(this._keys, this._values, getValue);
          };

          Map.prototype.entries = function () {
            return new MapIterator(this._keys, this._values, getEntry);
          };

          Map.prototype["@@iterator"] = function () {
            return this.entries();
          };

          Map.prototype[iteratorSymbol] = function () {
            return this.entries();
          };

          Map.prototype._find = function (key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }

            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;

              this._keys.push(key);

              this._values.push(undefined);
            }

            return this._cacheIndex;
          };

          return Map;
        }()
      );

      function getKey(key, _) {
        return key;
      }

      function getValue(_, value) {
        return value;
      }

      function getEntry(key, value) {
        return [key, value];
      }
    } // naive Set shim


    function CreateSetPolyfill() {
      return (
        /** @class */
        function () {
          function Set() {
            this._map = new _Map();
          }

          Object.defineProperty(Set.prototype, "size", {
            get: function () {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });

          Set.prototype.has = function (value) {
            return this._map.has(value);
          };

          Set.prototype.add = function (value) {
            return this._map.set(value, value), this;
          };

          Set.prototype.delete = function (value) {
            return this._map.delete(value);
          };

          Set.prototype.clear = function () {
            this._map.clear();
          };

          Set.prototype.keys = function () {
            return this._map.keys();
          };

          Set.prototype.values = function () {
            return this._map.values();
          };

          Set.prototype.entries = function () {
            return this._map.entries();
          };

          Set.prototype["@@iterator"] = function () {
            return this.keys();
          };

          Set.prototype[iteratorSymbol] = function () {
            return this.keys();
          };

          return Set;
        }()
      );
    } // naive WeakMap shim


    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function () {
          function WeakMap() {
            this._key = CreateUniqueKey();
          }

          WeakMap.prototype.has = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? HashMap.has(table, this._key) : false;
          };

          WeakMap.prototype.get = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? HashMap.get(table, this._key) : undefined;
          };

          WeakMap.prototype.set = function (target, value) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            true);
            table[this._key] = value;
            return this;
          };

          WeakMap.prototype.delete = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? delete table[this._key] : false;
          };

          WeakMap.prototype.clear = function () {
            // NOTE: not a real clear, just makes the previous data unreachable
            this._key = CreateUniqueKey();
          };

          return WeakMap;
        }()
      );

      function CreateUniqueKey() {
        var key;

        do key = "@@WeakMap@@" + CreateUUID(); while (HashMap.has(keys, key));

        keys[key] = true;
        return key;
      }

      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create) return undefined;
          Object.defineProperty(target, rootKey, {
            value: HashMap.create()
          });
        }

        return target[rootKey];
      }

      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i) buffer[i] = Math.random() * 0xff | 0;

        return buffer;
      }

      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined") return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined") return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }

        return FillRandomBytes(new Array(size), size);
      }

      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE); // mark as random - RFC 4122 § 4.4

        data[6] = data[6] & 0x4f | 0x40;
        data[8] = data[8] & 0xbf | 0x80;
        var result = "";

        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8) result += "-";
          if (byte < 16) result += "0";
          result += byte.toString(16).toLowerCase();
        }

        return result;
      }
    } // uses a heuristic used by v8 and chakra to force an object into dictionary mode.


    function MakeDictionary(obj) {
      obj.__ = undefined;
      delete obj.__;
      return obj;
    }
  });
})(Reflect || (Reflect = {}));

/***/ }),

/***/ 8389:
/*!********************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/deserializer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Deserializer": () => (/* binding */ Deserializer),
/* harmony export */   "defaultTypeResolver": () => (/* binding */ defaultTypeResolver)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ 1239);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ 3547);
/* harmony import */ var _options_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options-base */ 2013);
/* harmony import */ var _type_descriptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type-descriptor */ 1056);




function defaultTypeResolver(sourceObject, knownTypes) {
  if (sourceObject.__type != null) {
    return knownTypes.get(sourceObject.__type);
  }
}
class Deserializer {
  constructor() {
    this.typeResolver = defaultTypeResolver;
    this.errorHandler = _helpers__WEBPACK_IMPORTED_MODULE_0__.logError;
    this.deserializationStrategy = new Map([[_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.AnyT.ctor, _helpers__WEBPACK_IMPORTED_MODULE_0__.identity], [Number, deserializeDirectly], [String, deserializeDirectly], [Boolean, deserializeDirectly], [Date, deserializeDate], [ArrayBuffer, stringToArrayBuffer], [DataView, stringToDataView], [Array, convertAsArray], [Set, convertAsSet], [Map, convertAsMap], [Float32Array, convertAsFloatArray], [Float64Array, convertAsFloatArray], [Uint8Array, convertAsUintArray], [Uint8ClampedArray, convertAsUintArray], [Uint16Array, convertAsUintArray], [Uint32Array, convertAsUintArray]]);
  }

  setDeserializationStrategy(type, deserializer) {
    this.deserializationStrategy.set(type, deserializer);
  }

  setNameResolver(nameResolverCallback) {
    this.nameResolver = nameResolverCallback;
  }

  setTypeResolver(typeResolverCallback) {
    if (typeof typeResolverCallback !== 'function') {
      throw new TypeError('\'typeResolverCallback\' is not a function.');
    }

    this.typeResolver = typeResolverCallback;
  }

  getTypeResolver() {
    return this.typeResolver;
  }

  setErrorHandler(errorHandlerCallback) {
    if (typeof errorHandlerCallback !== 'function') {
      throw new TypeError('\'errorHandlerCallback\' is not a function.');
    }

    this.errorHandler = errorHandlerCallback;
  }

  getErrorHandler() {
    return this.errorHandler;
  }

  convertSingleValue(sourceObject, typeDescriptor, knownTypes, memberName = 'object', memberOptions) {
    if (this.retrievePreserveNull(memberOptions) && sourceObject === null) {
      return null;
    } else if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(sourceObject)) {
      return;
    }

    const deserializer = this.deserializationStrategy.get(typeDescriptor.ctor);

    if (deserializer !== undefined) {
      return deserializer(sourceObject, typeDescriptor, knownTypes, memberName, this, memberOptions);
    }

    if (typeof sourceObject === 'object') {
      return convertAsObject(sourceObject, typeDescriptor, knownTypes, memberName, this);
    }

    let error = `Could not deserialize '${memberName}'; don't know how to deserialize type`;

    if (typeDescriptor.hasFriendlyName()) {
      error += ` '${typeDescriptor.ctor.name}'`;
    }

    this.errorHandler(new TypeError(`${error}.`));
  }

  instantiateType(ctor) {
    return new ctor();
  }

  mergeKnownTypes(...knownTypeMaps) {
    const result = new Map();
    knownTypeMaps.forEach(knownTypes => {
      knownTypes.forEach((ctor, name) => {
        if (this.nameResolver === undefined) {
          result.set(name, ctor);
        } else {
          result.set(this.nameResolver(ctor), ctor);
        }
      });
    });
    return result;
  }

  createKnownTypesMap(knowTypes) {
    const map = new Map();
    knowTypes.forEach(ctor => {
      if (this.nameResolver === undefined) {
        const knownTypeMeta = _metadata__WEBPACK_IMPORTED_MODULE_2__.JsonObjectMetadata.getFromConstructor(ctor);
        const customName = (knownTypeMeta === null || knownTypeMeta === void 0 ? void 0 : knownTypeMeta.isExplicitlyMarked) === true ? knownTypeMeta.name : null;
        map.set(customName !== null && customName !== void 0 ? customName : ctor.name, ctor);
      } else {
        map.set(this.nameResolver(ctor), ctor);
      }
    });
    return map;
  }

  retrievePreserveNull(memberOptions) {
    return (0,_options_base__WEBPACK_IMPORTED_MODULE_3__.getOptionValue)('preserveNull', (0,_options_base__WEBPACK_IMPORTED_MODULE_3__.mergeOptions)(this.options, memberOptions));
  }

}

function throwTypeMismatchError(targetType, expectedSourceType, actualSourceType, memberName) {
  throw new TypeError(`Could not deserialize ${memberName} as ${targetType}:` + ` expected ${expectedSourceType}, got ${actualSourceType}.`);
}

function makeTypeErrorMessage(expectedType, actualType, memberName) {
  const expectedTypeName = typeof expectedType === 'function' ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(expectedType) : expectedType;
  const actualTypeName = typeof actualType === 'function' ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(actualType) : actualType;
  return `Could not deserialize ${memberName}: expected '${expectedTypeName}',` + ` got '${actualTypeName}'.`;
}

function srcTypeNameForDebug(sourceObject) {
  return sourceObject == null ? 'undefined' : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceObject.constructor);
}

function deserializeDirectly(sourceObject, typeDescriptor, knownTypes, objectName) {
  if (sourceObject.constructor !== typeDescriptor.ctor) {
    throw new TypeError(makeTypeErrorMessage((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(typeDescriptor.ctor), sourceObject.constructor, objectName));
  }

  return sourceObject;
}

function convertAsObject(sourceObject, typeDescriptor, knownTypes, memberName, deserializer) {
  if (typeof sourceObject !== 'object' || sourceObject === null) {
    deserializer.getErrorHandler()(new TypeError(`Cannot deserialize ${memberName}: 'sourceObject' must be a defined object.`));
    return undefined;
  }

  let expectedSelfType = typeDescriptor.ctor;
  let sourceObjectMetadata = _metadata__WEBPACK_IMPORTED_MODULE_2__.JsonObjectMetadata.getFromConstructor(expectedSelfType);
  let knownTypeConstructors = knownTypes;
  let typeResolver = deserializer.getTypeResolver();

  if (sourceObjectMetadata !== undefined) {
    sourceObjectMetadata.processDeferredKnownTypes();
    knownTypeConstructors = deserializer.mergeKnownTypes(knownTypeConstructors, deserializer.createKnownTypesMap(sourceObjectMetadata.knownTypes));

    if (sourceObjectMetadata.typeResolver != null) {
      typeResolver = sourceObjectMetadata.typeResolver;
    }
  }

  const typeFromTypeHint = typeResolver(sourceObject, knownTypeConstructors);

  if (typeFromTypeHint != null) {
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isSubtypeOf)(typeFromTypeHint, expectedSelfType)) {
      expectedSelfType = typeFromTypeHint;
      sourceObjectMetadata = _metadata__WEBPACK_IMPORTED_MODULE_2__.JsonObjectMetadata.getFromConstructor(typeFromTypeHint);

      if (sourceObjectMetadata !== undefined) {
        knownTypeConstructors = deserializer.mergeKnownTypes(knownTypeConstructors, deserializer.createKnownTypesMap(sourceObjectMetadata.knownTypes));
      }
    }
  }

  if ((sourceObjectMetadata === null || sourceObjectMetadata === void 0 ? void 0 : sourceObjectMetadata.isExplicitlyMarked) === true) {
    const sourceMetadata = sourceObjectMetadata;
    const sourceObjectWithDeserializedProperties = {};
    const classOptions = (0,_options_base__WEBPACK_IMPORTED_MODULE_3__.mergeOptions)(deserializer.options, sourceMetadata.options);
    sourceMetadata.dataMembers.forEach((objMemberMetadata, propKey) => {
      const objMemberValue = sourceObject[propKey];
      const objMemberDebugName = `${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceMetadata.classType)}.${propKey}`;
      const objMemberOptions = (0,_options_base__WEBPACK_IMPORTED_MODULE_3__.mergeOptions)(classOptions, objMemberMetadata.options);
      let revivedValue;

      if (objMemberMetadata.deserializer != null) {
        revivedValue = objMemberMetadata.deserializer(objMemberValue, {
          fallback: (so, td) => deserializer.convertSingleValue(so, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeDescriptor)(td), knownTypes)
        });
      } else if (objMemberMetadata.type == null) {
        throw new TypeError(`Cannot deserialize ${objMemberDebugName} there is` + ` no constructor nor deserialization function to use.`);
      } else {
        revivedValue = deserializer.convertSingleValue(objMemberValue, objMemberMetadata.type(), knownTypeConstructors, objMemberDebugName, objMemberOptions);
      }

      if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(revivedValue) || deserializer.retrievePreserveNull(objMemberOptions) && revivedValue === null) {
        sourceObjectWithDeserializedProperties[objMemberMetadata.key] = revivedValue;
      } else if (objMemberMetadata.isRequired === true) {
        deserializer.getErrorHandler()(new TypeError(`Missing required member '${objMemberDebugName}'.`));
      }
    });
    let targetObject;

    if (typeof sourceObjectMetadata.initializerCallback === 'function') {
      try {
        targetObject = sourceObjectMetadata.initializerCallback(sourceObjectWithDeserializedProperties, sourceObject);

        if (targetObject == null) {
          throw new TypeError(`Cannot deserialize ${memberName}:` + ` 'initializer' function returned undefined/null` + `, but '${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceObjectMetadata.classType)}' was expected.`);
        } else if (!(targetObject instanceof sourceObjectMetadata.classType)) {
          throw new TypeError(`Cannot deserialize ${memberName}:` + `'initializer' returned '${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(targetObject.constructor)}'` + `, but '${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceObjectMetadata.classType)}' was expected` + `, and '${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(targetObject.constructor)}' is not a subtype of` + ` '${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceObjectMetadata.classType)}'`);
        }
      } catch (e) {
        deserializer.getErrorHandler()(e);
        return undefined;
      }
    } else {
      targetObject = deserializer.instantiateType(expectedSelfType);
    }

    Object.assign(targetObject, sourceObjectWithDeserializedProperties);
    const methodName = sourceObjectMetadata.onDeserializedMethodName;

    if (methodName != null) {
      if (typeof targetObject[methodName] === 'function') {
        targetObject[methodName]();
      } else if (typeof targetObject.constructor[methodName] === 'function') {
        targetObject.constructor[methodName]();
      } else {
        deserializer.getErrorHandler()(new TypeError(`onDeserialized callback` + `'${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceObjectMetadata.classType)}.${methodName}' is not a method.`));
      }
    }

    return targetObject;
  } else {
    const targetObject = {};
    Object.keys(sourceObject).forEach(sourceKey => {
      targetObject[sourceKey] = deserializer.convertSingleValue(sourceObject[sourceKey], new _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ConcreteTypeDescriptor(sourceObject[sourceKey].constructor), knownTypes, sourceKey);
    });
    return targetObject;
  }
}

function convertAsArray(sourceObject, typeDescriptor, knownTypes, memberName, deserializer, memberOptions) {
  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ArrayTypeDescriptor)) {
    throw new TypeError(`Could not deserialize ${memberName} as Array: incorrect TypeDescriptor detected,` + ' please use proper annotation or function for this type');
  }

  if (!Array.isArray(sourceObject)) {
    deserializer.getErrorHandler()(new TypeError(makeTypeErrorMessage(Array, sourceObject.constructor, memberName)));
    return [];
  }

  if (typeDescriptor.elementType == null) {
    deserializer.getErrorHandler()(new TypeError(`Could not deserialize ${memberName} as Array: missing constructor reference of` + ` Array elements.`));
    return [];
  }

  return sourceObject.map((element, i) => {
    try {
      return deserializer.convertSingleValue(element, typeDescriptor.elementType, knownTypes, `${memberName}[${i}]`, memberOptions);
    } catch (e) {
      deserializer.getErrorHandler()(e);
      return undefined;
    }
  });
}

function convertAsSet(sourceObject, typeDescriptor, knownTypes, memberName, deserializer, memberOptions) {
  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.SetTypeDescriptor)) {
    throw new TypeError(`Could not deserialize ${memberName} as Set: incorrect TypeDescriptor detected,` + ` please use proper annotation or function for this type`);
  }

  if (!Array.isArray(sourceObject)) {
    deserializer.getErrorHandler()(new TypeError(makeTypeErrorMessage(Array, sourceObject.constructor, memberName)));
    return new Set();
  }

  if (typeDescriptor.elementType == null) {
    deserializer.getErrorHandler()(new TypeError(`Could not deserialize ${memberName} as Set: missing constructor reference of` + ` Set elements.`));
    return new Set();
  }

  const resultSet = new Set();
  sourceObject.forEach((element, i) => {
    try {
      resultSet.add(deserializer.convertSingleValue(element, typeDescriptor.elementType, knownTypes, `${memberName}[${i}]`, memberOptions));
    } catch (e) {
      deserializer.getErrorHandler()(e);
    }
  });
  return resultSet;
}

function isExpectedMapShape(source, expectedShape) {
  return expectedShape === 0 && Array.isArray(source) || expectedShape === 1 && typeof source === 'object';
}

function convertAsMap(sourceObject, typeDescriptor, knownTypes, memberName, deserializer, memberOptions) {
  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.MapTypeDescriptor)) {
    throw new TypeError(`Could not deserialize ${memberName} as Map: incorrect TypeDescriptor detected,` + 'please use proper annotation or function for this type');
  }

  const expectedShape = typeDescriptor.getCompleteOptions().shape;

  if (!isExpectedMapShape(sourceObject, expectedShape)) {
    const expectedType = expectedShape === 0 ? Array : Object;
    deserializer.getErrorHandler()(new TypeError(makeTypeErrorMessage(expectedType, sourceObject.constructor, memberName)));
    return new Map();
  }

  if (typeDescriptor.keyType == null) {
    deserializer.getErrorHandler()(new TypeError(`Could not deserialize ${memberName} as Map: missing key constructor.`));
    return new Map();
  }

  if (typeDescriptor.valueType == null) {
    deserializer.getErrorHandler()(new TypeError(`Could not deserialize ${memberName} as Map: missing value constructor.`));
    return new Map();
  }

  const keyMemberName = `${memberName}[].key`;
  const valueMemberName = `${memberName}[].value`;
  const resultMap = new Map();

  if (expectedShape === 1) {
    Object.keys(sourceObject).forEach(key => {
      try {
        const resultKey = deserializer.convertSingleValue(key, typeDescriptor.keyType, knownTypes, keyMemberName, memberOptions);

        if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(resultKey)) {
          resultMap.set(resultKey, deserializer.convertSingleValue(sourceObject[key], typeDescriptor.valueType, knownTypes, valueMemberName, memberOptions));
        }
      } catch (e) {
        deserializer.getErrorHandler()(e);
      }
    });
  } else {
    sourceObject.forEach(element => {
      try {
        const key = deserializer.convertSingleValue(element.key, typeDescriptor.keyType, knownTypes, keyMemberName, memberOptions);

        if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(key)) {
          resultMap.set(key, deserializer.convertSingleValue(element.value, typeDescriptor.valueType, knownTypes, valueMemberName, memberOptions));
        }
      } catch (e) {
        deserializer.getErrorHandler()(e);
      }
    });
  }

  return resultMap;
}

function deserializeDate(sourceObject, typeDescriptor, knownTypes, memberName) {
  if (typeof sourceObject === 'number') {
    const isInteger = sourceObject % 1 === 0;

    if (!isInteger) {
      throw new TypeError(`Could not deserialize ${memberName} as Date:` + ` expected an integer, got a number with decimal places.`);
    }

    return new Date(sourceObject);
  } else if (typeof sourceObject === 'string') {
    return new Date(sourceObject);
  } else if (sourceObject instanceof Date) {
    return sourceObject;
  } else {
    throwTypeMismatchError('Date', 'an ISO-8601 string', srcTypeNameForDebug(sourceObject), memberName);
  }
}

function stringToArrayBuffer(sourceObject, typeDescriptor, knownTypes, memberName) {
  if (typeof sourceObject !== 'string') {
    throwTypeMismatchError('ArrayBuffer', 'a string source', srcTypeNameForDebug(sourceObject), memberName);
  }

  return createArrayBufferFromString(sourceObject);
}

function stringToDataView(sourceObject, typeDescriptor, knownTypes, memberName) {
  if (typeof sourceObject !== 'string') {
    throwTypeMismatchError('DataView', 'a string source', srcTypeNameForDebug(sourceObject), memberName);
  }

  return new DataView(createArrayBufferFromString(sourceObject));
}

function createArrayBufferFromString(input) {
  const buf = new ArrayBuffer(input.length * 2);
  const bufView = new Uint16Array(buf);

  for (let i = 0, strLen = input.length; i < strLen; i++) {
    bufView[i] = input.charCodeAt(i);
  }

  return buf;
}

function convertAsFloatArray(sourceObject, typeDescriptor, knownTypes, memberName) {
  const constructor = typeDescriptor.ctor;

  if (Array.isArray(sourceObject) && sourceObject.every(elem => !isNaN(elem))) {
    return new constructor(sourceObject);
  }

  return throwTypeMismatchError(constructor.name, 'a numeric source array', srcTypeNameForDebug(sourceObject), memberName);
}

function convertAsUintArray(sourceObject, typeDescriptor, knownTypes, memberName) {
  const constructor = typeDescriptor.ctor;

  if (Array.isArray(sourceObject) && sourceObject.every(elem => !isNaN(elem))) {
    return new constructor(sourceObject.map(value => ~~value));
  }

  return throwTypeMismatchError(typeDescriptor.ctor.name, 'a numeric source array', srcTypeNameForDebug(sourceObject), memberName);
} //# sourceMappingURL=deserializer.js.map

/***/ }),

/***/ 1239:
/*!***************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/helpers.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LAZY_TYPE_EXPLANATION": () => (/* binding */ LAZY_TYPE_EXPLANATION),
/* harmony export */   "MISSING_REFLECT_CONF_MSG": () => (/* binding */ MISSING_REFLECT_CONF_MSG),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "isDirectlyDeserializableNativeType": () => (/* binding */ isDirectlyDeserializableNativeType),
/* harmony export */   "isDirectlySerializableNativeType": () => (/* binding */ isDirectlySerializableNativeType),
/* harmony export */   "isInstanceOf": () => (/* binding */ isInstanceOf),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isReflectMetadataSupported": () => (/* binding */ isReflectMetadataSupported),
/* harmony export */   "isSubtypeOf": () => (/* binding */ isSubtypeOf),
/* harmony export */   "isTypeTypedArray": () => (/* binding */ isTypeTypedArray),
/* harmony export */   "isValueDefined": () => (/* binding */ isValueDefined),
/* harmony export */   "logError": () => (/* binding */ logError),
/* harmony export */   "logMessage": () => (/* binding */ logMessage),
/* harmony export */   "logWarning": () => (/* binding */ logWarning),
/* harmony export */   "nameof": () => (/* binding */ nameof),
/* harmony export */   "parseToJSObject": () => (/* binding */ parseToJSObject),
/* harmony export */   "shouldOmitParseString": () => (/* binding */ shouldOmitParseString)
/* harmony export */ });
/* harmony import */ var _type_descriptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type-descriptor */ 1056);

const LAZY_TYPE_EXPLANATION = `If the type is not yet defined, for example due to circular \
references, add '() => ' before it. E.g. @jsonMember(() => Foo)`;
const MISSING_REFLECT_CONF_MSG = 'Make sure that you have both "experimentalDecorators"' + ' and "emitDecoratorMetadata" enabled in your tsconfig.json';
function isDirectlySerializableNativeType(type) {
  return [Date, Number, String, Boolean].indexOf(type) !== -1;
}
function isDirectlyDeserializableNativeType(type) {
  return [Number, String, Boolean].indexOf(type) !== -1;
}
function isTypeTypedArray(type) {
  return [Float32Array, Float64Array, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array].indexOf(type) !== -1;
}
function isObject(value) {
  return typeof value === 'object';
}
function shouldOmitParseString(jsonStr, expectedType) {
  const expectsTypesSerializedAsStrings = expectedType === String || expectedType === ArrayBuffer || expectedType === DataView;
  const hasQuotes = jsonStr.length >= 2 && jsonStr[0] === '"' && jsonStr[jsonStr.length - 1] === '"';

  if (expectedType === Date) {
    const isNumber = !isNaN(Number(jsonStr.trim()));
    return !hasQuotes && !isNumber;
  }

  return expectsTypesSerializedAsStrings && !hasQuotes;
}
function parseToJSObject(json, expectedType) {
  if (typeof json !== 'string' || shouldOmitParseString(json, expectedType)) {
    return json;
  }

  return JSON.parse(json);
}
function isSubtypeOf(A, B) {
  return A === B || A.prototype instanceof B;
}
function logError(message, ...optionalParams) {
  if (typeof console === 'object' && typeof console.error === 'function') {
    console.error(message, ...optionalParams);
  } else if (typeof console === 'object' && typeof console.log === 'function') {
    console.log(`ERROR: ${message}`, ...optionalParams);
  }
}
function logMessage(message, ...optionalParams) {
  if (typeof console === 'object' && typeof console.log === 'function') {
    console.log(message, ...optionalParams);
  }
}
function logWarning(message, ...optionalParams) {
  if (typeof console === 'object' && typeof console.warn === 'function') {
    console.warn(message, ...optionalParams);
  } else if (typeof console === 'object' && typeof console.log === 'function') {
    console.log(`WARNING: ${message}`, ...optionalParams);
  }
}
function isValueDefined(value) {
  return !(typeof value === 'undefined' || value === null);
}
function isInstanceOf(value, constructor) {
  if (constructor === _type_descriptor__WEBPACK_IMPORTED_MODULE_0__.AnyT.ctor) {
    return true;
  } else if (typeof value === 'number') {
    return constructor === Number;
  } else if (typeof value === 'string') {
    return constructor === String;
  } else if (typeof value === 'boolean') {
    return constructor === Boolean;
  } else if (isObject(value)) {
    return value instanceof constructor;
  }

  return false;
}
const isReflectMetadataSupported = typeof Reflect === 'object' && typeof Reflect.getMetadata === 'function';
function nameof(fn) {
  if (typeof fn.name === 'string') {
    return fn.name;
  }

  return 'undefined';
}
function identity(arg) {
  return arg;
} //# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 8772:
/*!*************************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/json-array-member.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createArrayType": () => (/* binding */ createArrayType),
/* harmony export */   "jsonArrayMember": () => (/* binding */ jsonArrayMember)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ 1239);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ 3547);
/* harmony import */ var _options_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options-base */ 2013);
/* harmony import */ var _type_descriptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type-descriptor */ 1056);




function jsonArrayMember(maybeTypeThunk, options = {}) {
  return (target, propKey) => {
    var _a;

    const decoratorName = `@jsonArrayMember on ${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(target.constructor)}.${String(propKey)}`;
    const typeThunk = (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeThunk)(maybeTypeThunk, decoratorName);
    const dimensions = options.dimensions == null ? 1 : options.dimensions;

    if (!isNaN(dimensions) && dimensions < 1) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: 'dimensions' option must be at least 1.`);
      return;
    }

    const reflectedType = _helpers__WEBPACK_IMPORTED_MODULE_0__.isReflectMetadataSupported ? Reflect.getMetadata('design:type', target, propKey) : null;

    if (reflectedType != null && reflectedType !== Array && reflectedType !== Object) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: property is not an Array. ${_helpers__WEBPACK_IMPORTED_MODULE_0__.MISSING_REFLECT_CONF_MSG}`);
      return;
    }

    (0,_metadata__WEBPACK_IMPORTED_MODULE_2__.injectMetadataInformation)(target, propKey, {
      type: () => createArrayType((0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeDescriptor)(typeThunk()), dimensions),
      emitDefaultValue: options.emitDefaultValue,
      isRequired: options.isRequired,
      options: (0,_options_base__WEBPACK_IMPORTED_MODULE_3__.extractOptionBase)(options),
      key: propKey.toString(),
      name: (_a = options.name) !== null && _a !== void 0 ? _a : propKey.toString(),
      deserializer: options.deserializer,
      serializer: options.serializer
    });
  };
}
function createArrayType(elementType, dimensions) {
  let type = new _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ArrayTypeDescriptor(elementType);

  for (let i = 1; i < dimensions; ++i) {
    type = new _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ArrayTypeDescriptor(type);
  }

  return type;
} //# sourceMappingURL=json-array-member.js.map

/***/ }),

/***/ 382:
/*!*******************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/json-member.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jsonMember": () => (/* binding */ jsonMember)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ 1239);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ 3547);
/* harmony import */ var _options_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options-base */ 2013);
/* harmony import */ var _type_descriptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type-descriptor */ 1056);




function jsonMember(optionsOrPrototype, propertyKeyOrOptions) {
  if (typeof propertyKeyOrOptions === 'string' || typeof propertyKeyOrOptions === 'symbol') {
    const property = propertyKeyOrOptions;
    const prototype = optionsOrPrototype;
    const decoratorName = `@jsonMember on ${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(prototype.constructor)}.${String(property)}`;

    if (!_helpers__WEBPACK_IMPORTED_MODULE_0__.isReflectMetadataSupported) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: ReflectDecorators is required if the type is not \
explicitly provided with e.g. @jsonMember(Number)`);
      return;
    }

    const reflectPropCtor = Reflect.getMetadata('design:type', prototype, property);

    if (reflectPropCtor == null) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: could not resolve detected property constructor at \
runtime. Potential solutions:
 - ${_helpers__WEBPACK_IMPORTED_MODULE_0__.LAZY_TYPE_EXPLANATION}
 - ${_helpers__WEBPACK_IMPORTED_MODULE_0__.MISSING_REFLECT_CONF_MSG}`);
      return;
    }

    const typeDescriptor = (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeDescriptor)(reflectPropCtor);

    if (isSpecialPropertyType(decoratorName, typeDescriptor)) {
      return;
    }

    (0,_metadata__WEBPACK_IMPORTED_MODULE_2__.injectMetadataInformation)(prototype, property, {
      type: () => typeDescriptor,
      key: propertyKeyOrOptions.toString(),
      name: propertyKeyOrOptions.toString()
    });
    return;
  }

  return jsonMemberDecoratorFactory(optionsOrPrototype, propertyKeyOrOptions);
}

function jsonMemberDecoratorFactory(optionsOrType, options) {
  return (target, property) => {
    var _a;

    const decoratorName = `@jsonMember on ${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(target.constructor)}.${String(property)}`;
    let typeThunk;

    if ((0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.isTypelike)(optionsOrType) || (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.isTypeThunk)(optionsOrType)) {
      typeThunk = (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeThunk)(optionsOrType, decoratorName);
    } else {
      options = optionsOrType;
    }

    options = options !== null && options !== void 0 ? options : {};

    if (Object.prototype.hasOwnProperty.call(options, 'constructor')) {
      if (typeThunk !== undefined) {
        throw new Error('Cannot both define constructor option and type. Only one allowed.');
      }

      if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(options.constructor)) {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: cannot resolve specified property constructor at \
runtime. ${_helpers__WEBPACK_IMPORTED_MODULE_0__.LAZY_TYPE_EXPLANATION}`);
        return;
      }

      const newTypeDescriptor = (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeDescriptor)(options.constructor);

      typeThunk = () => newTypeDescriptor;

      if (_helpers__WEBPACK_IMPORTED_MODULE_0__.isReflectMetadataSupported && !(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isSubtypeOf)(newTypeDescriptor.ctor, Reflect.getMetadata('design:type', target, property))) {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logWarning)(`${decoratorName}: detected property type does not match` + ` 'constructor' option.`);
      }
    } else if (typeThunk !== undefined) {} else if (_helpers__WEBPACK_IMPORTED_MODULE_0__.isReflectMetadataSupported) {
      const reflectCtor = Reflect.getMetadata('design:type', target, property);

      if (reflectCtor == null) {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: cannot resolve detected property constructor at \
runtime. ${_helpers__WEBPACK_IMPORTED_MODULE_0__.LAZY_TYPE_EXPLANATION}`);
        return;
      }

      typeThunk = () => (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeDescriptor)(reflectCtor);
    } else if (options.deserializer === undefined) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: Cannot determine type`);
      return;
    }

    const typeToTest = typeThunk === null || typeThunk === void 0 ? void 0 : typeThunk();

    if (typeToTest !== undefined && isSpecialPropertyType(decoratorName, typeToTest)) {
      return;
    }

    (0,_metadata__WEBPACK_IMPORTED_MODULE_2__.injectMetadataInformation)(target, property, {
      type: typeThunk === undefined ? undefined : () => (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeDescriptor)(typeThunk()),
      emitDefaultValue: options.emitDefaultValue,
      isRequired: options.isRequired,
      options: (0,_options_base__WEBPACK_IMPORTED_MODULE_3__.extractOptionBase)(options),
      key: property.toString(),
      name: (_a = options.name) !== null && _a !== void 0 ? _a : property.toString(),
      deserializer: options.deserializer,
      serializer: options.serializer
    });
  };
}

function isConstructorEqual(type, constructor) {
  return type instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.TypeDescriptor ? type.ctor === constructor : type === constructor;
}

function isSpecialPropertyType(decoratorName, typeDescriptor) {
  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ArrayTypeDescriptor) && isConstructorEqual(typeDescriptor, Array)) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: property is an Array. Use the jsonArrayMember decorator to` + ` serialize this property.`);
    return true;
  }

  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.SetTypeDescriptor) && isConstructorEqual(typeDescriptor, Set)) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: property is a Set. Use the jsonSetMember decorator to` + ` serialize this property.`);
    return true;
  }

  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.MapTypeDescriptor) && isConstructorEqual(typeDescriptor, Map)) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: property is a Map. Use the jsonMapMember decorator to` + ` serialize this property.`);
    return true;
  }

  return false;
} //# sourceMappingURL=json-member.js.map

/***/ }),

/***/ 8825:
/*!*******************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/json-object.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jsonObject": () => (/* binding */ jsonObject)
/* harmony export */ });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ 3547);
/* harmony import */ var _options_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options-base */ 2013);


function jsonObject(optionsOrTarget) {
  let options;

  if (typeof optionsOrTarget === 'function') {
    options = {};
  } else {
    options = optionsOrTarget !== null && optionsOrTarget !== void 0 ? optionsOrTarget : {};
  }

  function decorator(target) {
    const objectMetadata = _metadata__WEBPACK_IMPORTED_MODULE_0__.JsonObjectMetadata.ensurePresentInPrototype(target.prototype);
    objectMetadata.isExplicitlyMarked = true;
    objectMetadata.onDeserializedMethodName = options.onDeserialized;
    objectMetadata.beforeSerializationMethodName = options.beforeSerialization;

    if (options.typeResolver != null) {
      objectMetadata.typeResolver = options.typeResolver;
    }

    if (options.typeHintEmitter != null) {
      objectMetadata.typeHintEmitter = options.typeHintEmitter;
    }

    objectMetadata.initializerCallback = options.initializer;

    if (options.name != null) {
      objectMetadata.name = options.name;
    }

    const optionsBase = (0,_options_base__WEBPACK_IMPORTED_MODULE_1__.extractOptionBase)(options);

    if (optionsBase !== undefined) {
      objectMetadata.options = optionsBase;
    }

    if (options.knownTypes != null) {
      options.knownTypes.filter(knownType => Boolean(knownType)).forEach(knownType => objectMetadata.knownTypes.add(knownType));
    }
  }

  if (typeof optionsOrTarget === 'function') {
    decorator(optionsOrTarget);
  } else {
    return decorator;
  }
} //# sourceMappingURL=json-object.js.map

/***/ }),

/***/ 3547:
/*!****************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/metadata.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonObjectMetadata": () => (/* binding */ JsonObjectMetadata),
/* harmony export */   "METADATA_FIELD_KEY": () => (/* binding */ METADATA_FIELD_KEY),
/* harmony export */   "injectMetadataInformation": () => (/* binding */ injectMetadataInformation)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ 1239);

const METADATA_FIELD_KEY = '__typedJsonJsonObjectMetadataInformation__';
class JsonObjectMetadata {
  constructor(classType) {
    this.dataMembers = new Map();
    this.knownTypes = new Set();
    this.knownTypesDeferred = [];
    this.isExplicitlyMarked = false;
    this.isHandledWithoutAnnotation = false;
    this.classType = classType;
  }

  static getJsonObjectName(ctor) {
    const metadata = JsonObjectMetadata.getFromConstructor(ctor);
    return metadata === undefined ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(ctor) : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(metadata.classType);
  }

  static getFromConstructor(ctor) {
    const prototype = ctor.prototype;

    if (prototype == null) {
      return;
    }

    let metadata;

    if (Object.prototype.hasOwnProperty.call(prototype, METADATA_FIELD_KEY)) {
      metadata = prototype[METADATA_FIELD_KEY];
    }

    if ((metadata === null || metadata === void 0 ? void 0 : metadata.isExplicitlyMarked) === true) {
      return metadata;
    }

    if (JsonObjectMetadata.doesHandleWithoutAnnotation(ctor)) {
      const primitiveMeta = new JsonObjectMetadata(ctor);
      primitiveMeta.isExplicitlyMarked = true;
      return primitiveMeta;
    }
  }

  static ensurePresentInPrototype(prototype) {
    if (Object.prototype.hasOwnProperty.call(prototype, METADATA_FIELD_KEY)) {
      return prototype[METADATA_FIELD_KEY];
    }

    const objectMetadata = new JsonObjectMetadata(prototype.constructor);
    const parentMetadata = prototype[METADATA_FIELD_KEY];

    if (parentMetadata !== undefined) {
      parentMetadata.dataMembers.forEach((memberMetadata, propKey) => {
        objectMetadata.dataMembers.set(propKey, memberMetadata);
      });
      parentMetadata.knownTypes.forEach(knownType => {
        objectMetadata.knownTypes.add(knownType);
      });
      objectMetadata.typeResolver = parentMetadata.typeResolver;
      objectMetadata.typeHintEmitter = parentMetadata.typeHintEmitter;
    }

    Object.defineProperty(prototype, METADATA_FIELD_KEY, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: objectMetadata
    });
    return objectMetadata;
  }

  static getKnownTypeNameFromType(constructor) {
    const metadata = JsonObjectMetadata.getFromConstructor(constructor);
    return metadata === undefined ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(constructor) : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(metadata.classType);
  }

  static doesHandleWithoutAnnotation(ctor) {
    return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isDirectlySerializableNativeType)(ctor) || (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isTypeTypedArray)(ctor) || ctor === DataView || ctor === ArrayBuffer;
  }

  processDeferredKnownTypes() {
    this.knownTypesDeferred.forEach(typeThunk => {
      typeThunk().getTypes().forEach(ctor => this.knownTypes.add(ctor));
    });
    this.knownTypesDeferred = [];
  }

}
function injectMetadataInformation(prototype, propKey, metadata) {
  const decoratorName = `@jsonMember on ${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(prototype.constructor)}.${String(propKey)}`;

  if (typeof prototype === 'function') {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: cannot use a static property.`);
    return;
  }

  if (typeof prototype[propKey] === 'function') {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: cannot use a method property.`);
    return;
  }

  if (metadata == null || metadata.type === undefined && metadata.deserializer === undefined) {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.logError)(`${decoratorName}: JsonMemberMetadata has unknown type.`);
    return;
  }

  const objectMetadata = JsonObjectMetadata.ensurePresentInPrototype(prototype);

  if (metadata.deserializer === undefined) {
    objectMetadata.knownTypesDeferred.push(metadata.type);
  }

  Object.keys(metadata).forEach(key => metadata[key] === undefined && delete metadata[key]);
  objectMetadata.dataMembers.set(metadata.name, metadata);
} //# sourceMappingURL=metadata.js.map

/***/ }),

/***/ 2013:
/*!********************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/options-base.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extractOptionBase": () => (/* binding */ extractOptionBase),
/* harmony export */   "getDefaultOptionOf": () => (/* binding */ getDefaultOptionOf),
/* harmony export */   "getOptionValue": () => (/* binding */ getOptionValue),
/* harmony export */   "mergeOptions": () => (/* binding */ mergeOptions)
/* harmony export */ });
const kAllOptions = ['preserveNull'];
function extractOptionBase(from) {
  const options = Object.keys(from).filter(key => kAllOptions.indexOf(key) > -1).reduce((obj, key) => {
    obj[key] = from[key];
    return obj;
  }, {});
  return Object.keys(options).length > 0 ? options : undefined;
}
function getDefaultOptionOf(key) {
  switch (key) {
    case 'preserveNull':
      return false;
  }

  return null;
}
function getOptionValue(key, options) {
  if (options != null && options[key] != null) {
    return options[key];
  }

  return getDefaultOptionOf(key);
}
function mergeOptions(existing, moreSpecific) {
  return moreSpecific == null ? existing : Object.assign(Object.assign({}, existing), moreSpecific);
} //# sourceMappingURL=options-base.js.map

/***/ }),

/***/ 6283:
/*!**************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/parser.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypedJSON": () => (/* binding */ TypedJSON),
/* harmony export */   "defaultTypeEmitter": () => (/* reexport safe */ _serializer__WEBPACK_IMPORTED_MODULE_1__.defaultTypeEmitter),
/* harmony export */   "defaultTypeResolver": () => (/* reexport safe */ _deserializer__WEBPACK_IMPORTED_MODULE_0__.defaultTypeResolver)
/* harmony export */ });
/* harmony import */ var _deserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deserializer */ 8389);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ 1239);
/* harmony import */ var _json_array_member__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./json-array-member */ 8772);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ 3547);
/* harmony import */ var _options_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options-base */ 2013);
/* harmony import */ var _serializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serializer */ 3437);
/* harmony import */ var _type_descriptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./type-descriptor */ 1056);








let TypedJSON = /*#__PURE__*/(() => {
  class TypedJSON {
    constructor(rootConstructor, settings) {
      this.serializer = new _serializer__WEBPACK_IMPORTED_MODULE_1__.Serializer();
      this.deserializer = new _deserializer__WEBPACK_IMPORTED_MODULE_0__.Deserializer();
      this.globalKnownTypes = [];
      this.indent = 0;
      const rootMetadata = _metadata__WEBPACK_IMPORTED_MODULE_2__.JsonObjectMetadata.getFromConstructor(rootConstructor);

      if (rootMetadata === undefined || !rootMetadata.isExplicitlyMarked && !rootMetadata.isHandledWithoutAnnotation) {
        throw new TypeError('The TypedJSON root data type must have the @jsonObject decorator used.');
      }

      this.nameResolver = ctor => (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.nameof)(ctor);

      this.rootConstructor = rootConstructor;

      this.errorHandler = error => (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.logError)(error);

      this.config(settings);
    }

    static parse(object, rootType, settings) {
      return new TypedJSON(rootType, settings).parse(object);
    }

    static parseAsArray(object, elementType, settings, dimensions) {
      return new TypedJSON(elementType, settings).parseAsArray(object, dimensions);
    }

    static parseAsSet(object, elementType, settings) {
      return new TypedJSON(elementType, settings).parseAsSet(object);
    }

    static parseAsMap(object, keyType, valueType, settings) {
      return new TypedJSON(valueType, settings).parseAsMap(object, keyType);
    }

    static toPlainJson(object, rootType, settings) {
      return new TypedJSON(rootType, settings).toPlainJson(object);
    }

    static toPlainArray(object, elementType, dimensions, settings) {
      return new TypedJSON(elementType, settings).toPlainArray(object, dimensions);
    }

    static toPlainSet(object, elementType, settings) {
      return new TypedJSON(elementType, settings).toPlainSet(object);
    }

    static toPlainMap(object, keyCtor, valueCtor, settings) {
      return new TypedJSON(valueCtor, settings).toPlainMap(object, keyCtor);
    }

    static stringify(object, rootType, settings) {
      return new TypedJSON(rootType, settings).stringify(object);
    }

    static stringifyAsArray(object, elementType, dimensions, settings) {
      return new TypedJSON(elementType, settings).stringifyAsArray(object, dimensions);
    }

    static stringifyAsSet(object, elementType, settings) {
      return new TypedJSON(elementType, settings).stringifyAsSet(object);
    }

    static stringifyAsMap(object, keyCtor, valueCtor, settings) {
      return new TypedJSON(valueCtor, settings).stringifyAsMap(object, keyCtor);
    }

    static setGlobalConfig(config) {
      Object.assign(this._globalConfig, config);
    }

    static mapType(type, converters) {
      if (this._globalConfig.mappedTypes == null) {
        this._globalConfig.mappedTypes = new Map();
      }

      this._globalConfig.mappedTypes.set(type, converters);
    }

    config(settings) {
      settings = Object.assign(Object.assign({}, TypedJSON._globalConfig), settings);

      if (settings.knownTypes != null && TypedJSON._globalConfig.knownTypes != null) {
        settings.knownTypes = Array.from(new Set(settings.knownTypes.concat(TypedJSON._globalConfig.knownTypes)));
      }

      const options = (0,_options_base__WEBPACK_IMPORTED_MODULE_4__.extractOptionBase)(settings);
      this.serializer.options = options;
      this.deserializer.options = options;

      if (settings.errorHandler != null) {
        this.errorHandler = settings.errorHandler;
        this.deserializer.setErrorHandler(settings.errorHandler);
        this.serializer.setErrorHandler(settings.errorHandler);
      }

      if (settings.replacer != null) {
        this.replacer = settings.replacer;
      }

      if (settings.typeResolver != null) {
        this.deserializer.setTypeResolver(settings.typeResolver);
      }

      if (settings.typeHintEmitter != null) {
        this.serializer.setTypeHintEmitter(settings.typeHintEmitter);
      }

      if (settings.indent != null) {
        this.indent = settings.indent;
      }

      if (settings.mappedTypes != null) {
        settings.mappedTypes.forEach((upDown, type) => {
          this.setSerializationStrategies(type, upDown);
        });
      }

      if (settings.nameResolver != null) {
        this.nameResolver = settings.nameResolver;
        this.deserializer.setNameResolver(settings.nameResolver);
      }

      if (settings.knownTypes != null) {
        settings.knownTypes.forEach((knownType, i) => {
          if (typeof knownType === 'undefined' || knownType === null) {
            (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.logWarning)(`TypedJSON.config: 'knownTypes' contains an undefined/null value` + ` (element ${i}).`);
          }
        });
        this.globalKnownTypes = settings.knownTypes;
      }
    }

    mapType(type, converters) {
      this.setSerializationStrategies(type, converters);
    }

    parse(object) {
      const json = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.parseToJSObject)(object, this.rootConstructor);
      let result;

      try {
        result = this.deserializer.convertSingleValue(json, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.ensureTypeDescriptor)(this.rootConstructor), this.getKnownTypes());
      } catch (e) {
        this.errorHandler(e);
      }

      return result;
    }

    parseAsArray(object, dimensions = 1) {
      const json = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.parseToJSObject)(object, Array);
      return this.deserializer.convertSingleValue(json, (0,_json_array_member__WEBPACK_IMPORTED_MODULE_6__.createArrayType)((0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.ensureTypeDescriptor)(this.rootConstructor), dimensions), this._mapKnownTypes(this.globalKnownTypes));
    }

    parseAsSet(object) {
      const json = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.parseToJSObject)(object, Set);
      return this.deserializer.convertSingleValue(json, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.SetT)(this.rootConstructor), this._mapKnownTypes(this.globalKnownTypes));
    }

    parseAsMap(object, keyConstructor) {
      const json = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.parseToJSObject)(object, Map);
      return this.deserializer.convertSingleValue(json, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.MapT)(keyConstructor, this.rootConstructor), this._mapKnownTypes(this.globalKnownTypes));
    }

    toPlainJson(object) {
      try {
        return this.serializer.convertSingleValue(object, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.ensureTypeDescriptor)(this.rootConstructor));
      } catch (e) {
        this.errorHandler(e);
      }
    }

    toPlainArray(object, dimensions = 1) {
      try {
        return this.serializer.convertSingleValue(object, (0,_json_array_member__WEBPACK_IMPORTED_MODULE_6__.createArrayType)((0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.ensureTypeDescriptor)(this.rootConstructor), dimensions));
      } catch (e) {
        this.errorHandler(e);
      }
    }

    toPlainSet(object) {
      try {
        return this.serializer.convertSingleValue(object, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.SetT)(this.rootConstructor));
      } catch (e) {
        this.errorHandler(e);
      }
    }

    toPlainMap(object, keyConstructor) {
      try {
        return this.serializer.convertSingleValue(object, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.MapT)(keyConstructor, this.rootConstructor));
      } catch (e) {
        this.errorHandler(e);
      }
    }

    stringify(object) {
      const result = this.toPlainJson(object);

      if (result === undefined) {
        return '';
      }

      return JSON.stringify(result, this.replacer, this.indent);
    }

    stringifyAsArray(object, dimensions) {
      return JSON.stringify(this.toPlainArray(object, dimensions), this.replacer, this.indent);
    }

    stringifyAsSet(object) {
      return JSON.stringify(this.toPlainSet(object), this.replacer, this.indent);
    }

    stringifyAsMap(object, keyConstructor) {
      return JSON.stringify(this.toPlainMap(object, keyConstructor), this.replacer, this.indent);
    }

    getKnownTypes() {
      const rootMetadata = _metadata__WEBPACK_IMPORTED_MODULE_2__.JsonObjectMetadata.getFromConstructor(this.rootConstructor);
      const knownTypes = new Map();
      this.globalKnownTypes.filter(ktc => ktc).forEach(knownTypeCtor => {
        knownTypes.set(this.nameResolver(knownTypeCtor), knownTypeCtor);
      });

      if (rootMetadata !== undefined) {
        rootMetadata.processDeferredKnownTypes();
        rootMetadata.knownTypes.forEach(knownTypeCtor => {
          knownTypes.set(this.nameResolver(knownTypeCtor), knownTypeCtor);
        });
      }

      return knownTypes;
    }

    _mapKnownTypes(constructors) {
      const map = new Map();
      constructors.filter(ctor => ctor).forEach(ctor => map.set(this.nameResolver(ctor), ctor));
      return map;
    }

    setSerializationStrategies(type, converters) {
      if (converters.deserializer != null) {
        this.deserializer.setDeserializationStrategy(type, value => converters.deserializer(value, {
          fallback: (so, td) => this.deserializer.convertSingleValue(so, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.ensureTypeDescriptor)(td), this.getKnownTypes())
        }));
      }

      if (converters.serializer != null) {
        this.serializer.setSerializationStrategy(type, value => converters.serializer(value, {
          fallback: (so, td) => this.serializer.convertSingleValue(so, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_5__.ensureTypeDescriptor)(td))
        }));
      }
    }

  }

  TypedJSON._globalConfig = {}; //# sourceMappingURL=parser.js.map

  return TypedJSON;
})();

/***/ }),

/***/ 3437:
/*!******************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/serializer.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Serializer": () => (/* binding */ Serializer),
/* harmony export */   "defaultTypeEmitter": () => (/* binding */ defaultTypeEmitter)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ 1239);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metadata */ 3547);
/* harmony import */ var _options_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options-base */ 2013);
/* harmony import */ var _type_descriptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type-descriptor */ 1056);




function defaultTypeEmitter(targetObject, sourceObject, expectedSourceType, sourceTypeMetadata) {
  var _a;

  if (sourceObject.constructor !== expectedSourceType) {
    targetObject.__type = (_a = sourceTypeMetadata === null || sourceTypeMetadata === void 0 ? void 0 : sourceTypeMetadata.name) !== null && _a !== void 0 ? _a : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceObject.constructor);
  }
}
class Serializer {
  constructor() {
    this.typeHintEmitter = defaultTypeEmitter;
    this.errorHandler = _helpers__WEBPACK_IMPORTED_MODULE_0__.logError;
    this.serializationStrategy = new Map([[_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.AnyT.ctor, _helpers__WEBPACK_IMPORTED_MODULE_0__.identity], [Date, _helpers__WEBPACK_IMPORTED_MODULE_0__.identity], [Number, _helpers__WEBPACK_IMPORTED_MODULE_0__.identity], [String, _helpers__WEBPACK_IMPORTED_MODULE_0__.identity], [Boolean, _helpers__WEBPACK_IMPORTED_MODULE_0__.identity], [ArrayBuffer, convertAsArrayBuffer], [DataView, convertAsDataView], [Array, convertAsArray], [Set, convertAsSet], [Map, convertAsMap], [Float32Array, convertAsTypedArray], [Float64Array, convertAsTypedArray], [Int8Array, convertAsTypedArray], [Uint8Array, convertAsTypedArray], [Uint8ClampedArray, convertAsTypedArray], [Int16Array, convertAsTypedArray], [Uint16Array, convertAsTypedArray], [Int32Array, convertAsTypedArray], [Uint32Array, convertAsTypedArray]]);
  }

  setSerializationStrategy(type, serializer) {
    this.serializationStrategy.set(type, serializer);
  }

  setTypeHintEmitter(typeEmitterCallback) {
    if (typeof typeEmitterCallback !== 'function') {
      throw new TypeError('\'typeEmitterCallback\' is not a function.');
    }

    this.typeHintEmitter = typeEmitterCallback;
  }

  getTypeHintEmitter() {
    return this.typeHintEmitter;
  }

  setErrorHandler(errorHandlerCallback) {
    if (typeof errorHandlerCallback !== 'function') {
      throw new TypeError('\'errorHandlerCallback\' is not a function.');
    }

    this.errorHandler = errorHandlerCallback;
  }

  getErrorHandler() {
    return this.errorHandler;
  }

  retrievePreserveNull(memberOptions) {
    return (0,_options_base__WEBPACK_IMPORTED_MODULE_2__.getOptionValue)('preserveNull', (0,_options_base__WEBPACK_IMPORTED_MODULE_2__.mergeOptions)(this.options, memberOptions));
  }

  convertSingleValue(sourceObject, typeDescriptor, memberName = 'object', memberOptions) {
    if (this.retrievePreserveNull(memberOptions) && sourceObject === null) {
      return null;
    }

    if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(sourceObject)) {
      return;
    }

    if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(sourceObject, typeDescriptor.ctor)) {
      const expectedName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(typeDescriptor.ctor);
      const actualName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceObject.constructor);
      this.errorHandler(new TypeError(`Could not serialize '${memberName}': expected '${expectedName}',` + ` got '${actualName}'.`));
      return;
    }

    const serializer = this.serializationStrategy.get(typeDescriptor.ctor);

    if (serializer !== undefined) {
      return serializer(sourceObject, typeDescriptor, memberName, this, memberOptions);
    }

    if (typeof sourceObject === 'object') {
      return convertAsObject(sourceObject, typeDescriptor, memberName, this, memberOptions);
    }

    let error = `Could not serialize '${memberName}'; don't know how to serialize type`;

    if (typeDescriptor.hasFriendlyName()) {
      error += ` '${typeDescriptor.ctor.name}'`;
    }

    this.errorHandler(new TypeError(`${error}.`));
  }

}

function convertAsObject(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
  let sourceTypeMetadata;
  let targetObject;
  let typeHintEmitter = serializer.getTypeHintEmitter();

  if (sourceObject.constructor !== typeDescriptor.ctor && sourceObject instanceof typeDescriptor.ctor) {
    sourceTypeMetadata = _metadata__WEBPACK_IMPORTED_MODULE_3__.JsonObjectMetadata.getFromConstructor(sourceObject.constructor);
  } else {
    sourceTypeMetadata = _metadata__WEBPACK_IMPORTED_MODULE_3__.JsonObjectMetadata.getFromConstructor(typeDescriptor.ctor);
  }

  if (sourceTypeMetadata === undefined) {
    targetObject = Object.assign({}, sourceObject);
  } else {
    const beforeSerializationMethodName = sourceTypeMetadata.beforeSerializationMethodName;

    if (beforeSerializationMethodName != null) {
      if (typeof sourceObject[beforeSerializationMethodName] === 'function') {
        sourceObject[beforeSerializationMethodName]();
      } else if (typeof sourceObject.constructor[beforeSerializationMethodName] === 'function') {
        sourceObject.constructor[beforeSerializationMethodName]();
      } else {
        serializer.getErrorHandler()(new TypeError(`beforeSerialization callback '` + `${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceTypeMetadata.classType)}.${beforeSerializationMethodName}` + `' is not a method.`));
      }
    }

    const sourceMeta = sourceTypeMetadata;
    targetObject = {};
    const classOptions = (0,_options_base__WEBPACK_IMPORTED_MODULE_2__.mergeOptions)(serializer.options, sourceMeta.options);

    if (sourceMeta.typeHintEmitter != null) {
      typeHintEmitter = sourceMeta.typeHintEmitter;
    }

    sourceMeta.dataMembers.forEach(objMemberMetadata => {
      const objMemberOptions = (0,_options_base__WEBPACK_IMPORTED_MODULE_2__.mergeOptions)(classOptions, objMemberMetadata.options);
      let serialized;

      if (objMemberMetadata.serializer != null) {
        serialized = objMemberMetadata.serializer(sourceObject[objMemberMetadata.key], {
          fallback: (so, td) => serializer.convertSingleValue(so, (0,_type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ensureTypeDescriptor)(td))
        });
      } else if (objMemberMetadata.type == null) {
        throw new TypeError(`Could not serialize ${objMemberMetadata.name}, there is` + ` no constructor nor serialization function to use.`);
      } else {
        serialized = serializer.convertSingleValue(sourceObject[objMemberMetadata.key], objMemberMetadata.type(), `${(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(sourceMeta.classType)}.${objMemberMetadata.key}`, objMemberOptions);
      }

      if (serializer.retrievePreserveNull(objMemberOptions) && serialized === null || (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(serialized)) {
        targetObject[objMemberMetadata.name] = serialized;
      }
    });
  }

  typeHintEmitter(targetObject, sourceObject, typeDescriptor.ctor, sourceTypeMetadata);
  return targetObject;
}

function convertAsArray(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.ArrayTypeDescriptor)) {
    throw new TypeError(`Could not serialize ${memberName} as Array: incorrect TypeDescriptor detected, please` + ' use proper annotation or function for this type');
  }

  if (typeDescriptor.elementType == null) {
    throw new TypeError(`Could not serialize ${memberName} as Array: missing element type definition.`);
  }

  sourceObject.forEach((element, i) => {
    if (!(serializer.retrievePreserveNull(memberOptions) && element === null) && !(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(element, typeDescriptor.elementType.ctor)) {
      const expectedTypeName = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(typeDescriptor.elementType.ctor);
      const actualTypeName = element && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.nameof)(element.constructor);
      throw new TypeError(`Could not serialize ${memberName}[${i}]:` + ` expected '${expectedTypeName}', got '${actualTypeName}'.`);
    }
  });
  return sourceObject.map((element, i) => {
    return serializer.convertSingleValue(element, typeDescriptor.elementType, `${memberName}[${i}]`, memberOptions);
  });
}

function convertAsSet(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.SetTypeDescriptor)) {
    throw new TypeError(`Could not serialize ${memberName} as Set: incorrect TypeDescriptor detected, please` + ' use proper annotation or function for this type');
  }

  if (typeDescriptor.elementType == null) {
    throw new TypeError(`Could not serialize ${memberName} as Set: missing element type definition.`);
  }

  memberName += '[]';
  const resultArray = [];
  sourceObject.forEach(element => {
    const resultElement = serializer.convertSingleValue(element, typeDescriptor.elementType, memberName, memberOptions);

    if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(element) || (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(resultElement)) {
      resultArray.push(resultElement);
    }
  });
  return resultArray;
}

function convertAsMap(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
  if (!(typeDescriptor instanceof _type_descriptor__WEBPACK_IMPORTED_MODULE_1__.MapTypeDescriptor)) {
    throw new TypeError(`Could not serialize ${memberName} as Map: incorrect TypeDescriptor detected, please` + ' use proper annotation or function for this type');
  }

  if (typeDescriptor.valueType == null) {
    throw new TypeError(`Could not serialize ${memberName} as Map: missing value type definition.`);
  }

  if (typeDescriptor.keyType == null) {
    throw new TypeError(`Could not serialize ${memberName} as Map: missing key type definition.`);
  }

  const keyMemberName = `${memberName}[].key`;
  const valueMemberName = `${memberName}[].value`;
  const resultShape = typeDescriptor.getCompleteOptions().shape;
  const result = resultShape === 1 ? {} : [];
  const preserveNull = serializer.retrievePreserveNull(memberOptions);
  sourceObject.forEach((value, key) => {
    const resultKeyValuePairObj = {
      key: serializer.convertSingleValue(key, typeDescriptor.keyType, keyMemberName, memberOptions),
      value: serializer.convertSingleValue(value, typeDescriptor.valueType, valueMemberName, memberOptions)
    };
    const keyDefined = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(resultKeyValuePairObj.key);
    const valueDefined = resultKeyValuePairObj.value === null && preserveNull || (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isValueDefined)(resultKeyValuePairObj.value);

    if (keyDefined && valueDefined) {
      if (resultShape === 1) {
        result[resultKeyValuePairObj.key] = resultKeyValuePairObj.value;
      } else {
        result.push(resultKeyValuePairObj);
      }
    }
  });
  return result;
}

function convertAsTypedArray(sourceObject) {
  return Array.from(sourceObject);
}

function convertAsArrayBuffer(buffer) {
  return Array.from(new Uint16Array(buffer)).map(charCode => String.fromCharCode(charCode)).join('');
}

function convertAsDataView(dataView) {
  return convertAsArrayBuffer(dataView.buffer);
} //# sourceMappingURL=serializer.js.map

/***/ }),

/***/ 1056:
/*!***********************************************************!*\
  !*** ./node_modules/typedjson/lib/esm/type-descriptor.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnyT": () => (/* binding */ AnyT),
/* harmony export */   "ArrayT": () => (/* binding */ ArrayT),
/* harmony export */   "ArrayTypeDescriptor": () => (/* binding */ ArrayTypeDescriptor),
/* harmony export */   "ConcreteTypeDescriptor": () => (/* binding */ ConcreteTypeDescriptor),
/* harmony export */   "GenericTypeDescriptor": () => (/* binding */ GenericTypeDescriptor),
/* harmony export */   "MapT": () => (/* binding */ MapT),
/* harmony export */   "MapTypeDescriptor": () => (/* binding */ MapTypeDescriptor),
/* harmony export */   "SetT": () => (/* binding */ SetT),
/* harmony export */   "SetTypeDescriptor": () => (/* binding */ SetTypeDescriptor),
/* harmony export */   "TypeDescriptor": () => (/* binding */ TypeDescriptor),
/* harmony export */   "ensureTypeDescriptor": () => (/* binding */ ensureTypeDescriptor),
/* harmony export */   "ensureTypeThunk": () => (/* binding */ ensureTypeThunk),
/* harmony export */   "isTypeThunk": () => (/* binding */ isTypeThunk),
/* harmony export */   "isTypelike": () => (/* binding */ isTypelike)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ 1239);

class TypeDescriptor {
  constructor(ctor) {
    this.ctor = ctor;
  }

  getTypes() {
    return [this.ctor];
  }

  hasFriendlyName() {
    return this.ctor.name !== 'Object';
  }

}
class ConcreteTypeDescriptor extends TypeDescriptor {
  constructor(ctor) {
    super(ctor);
  }

}
class GenericTypeDescriptor extends TypeDescriptor {
  constructor(ctor) {
    super(ctor);
  }

}
class ArrayTypeDescriptor extends GenericTypeDescriptor {
  constructor(elementType) {
    super(Array);
    this.elementType = elementType;
  }

  getTypes() {
    return super.getTypes().concat(this.elementType.getTypes());
  }

}
function ArrayT(elementType) {
  return new ArrayTypeDescriptor(ensureTypeDescriptor(elementType));
}
class SetTypeDescriptor extends GenericTypeDescriptor {
  constructor(elementType) {
    super(Set);
    this.elementType = elementType;
  }

  getTypes() {
    return super.getTypes().concat(this.elementType.getTypes());
  }

}
function SetT(elementType) {
  return new SetTypeDescriptor(ensureTypeDescriptor(elementType));
}
class MapTypeDescriptor extends GenericTypeDescriptor {
  constructor(keyType, valueType, options) {
    super(Map);
    this.keyType = keyType;
    this.valueType = valueType;
    this.options = options;
  }

  getTypes() {
    return super.getTypes().concat(this.keyType.getTypes(), this.valueType.getTypes());
  }

  getCompleteOptions() {
    var _a, _b;

    return {
      shape: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.shape) !== null && _b !== void 0 ? _b : 0
    };
  }

}
function MapT(keyType, valueType, options) {
  return new MapTypeDescriptor(ensureTypeDescriptor(keyType), ensureTypeDescriptor(valueType), options);
}
const AnyT = new ConcreteTypeDescriptor(() => undefined);
function isTypelike(type) {
  return type != null && (typeof type === 'function' || type instanceof TypeDescriptor);
}
function isTypeThunk(candidate) {
  return typeof candidate === 'function' && candidate.name === '';
}
function ensureTypeDescriptor(type) {
  return type instanceof TypeDescriptor ? type : new ConcreteTypeDescriptor(type);
}
function ensureTypeThunk(typeThunkOrSerializable, decoratorName) {
  if (typeThunkOrSerializable == null) {
    throw new Error(`No type given on ${decoratorName}. ${_helpers__WEBPACK_IMPORTED_MODULE_0__.LAZY_TYPE_EXPLANATION}`);
  }

  if (isTypeThunk(typeThunkOrSerializable)) {
    return typeThunkOrSerializable;
  }

  return () => typeThunkOrSerializable;
} //# sourceMappingURL=type-descriptor.js.map

/***/ }),

/***/ 655:
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ })

}]);