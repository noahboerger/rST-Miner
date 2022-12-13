/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4230:
/*!************************************************************************************!*\
  !*** ./src/app/classes/algorithms/concurrency-oracle/alpha-oracle/alpha-oracle.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlphaOracle": () => (/* binding */ AlphaOracle)
/* harmony export */ });
/* harmony import */ var _utility_relabeler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utility/relabeler */ 2909);
/* harmony import */ var _trace_cleaner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../trace-cleaner */ 3863);
/* harmony import */ var _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/concurrency/concurrency-relation */ 7077);
/* harmony import */ var _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/concurrency/occurrence-matrix */ 3651);




class AlphaOracle extends _trace_cleaner__WEBPACK_IMPORTED_MODULE_1__.TraceCleaner {
  constructor(config = {}) {
    super();
    this.config = config;
  }

  determineConcurrency(eventlog) {
    const eventlogTraces = eventlog.traces;

    if (eventlogTraces.length === 0) {
      return _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_2__.ConcurrencyRelation.noConcurrency();
    }

    const cleanedLog = this.cleanLog(eventlogTraces);
    const relabeler = new _utility_relabeler__WEBPACK_IMPORTED_MODULE_0__.Relabeler();

    if (!!this.config.distinguishSameLabels) {
      relabeler.uniquelyRelabelSequences(cleanedLog);
    } else {
      relabeler.relabelSequencesPreserveNonUniqueIdentities(cleanedLog);
    }

    const matrix = this.computeOccurrenceMatrix(cleanedLog, this.config.lookAheadDistance, this.config.distinguishSameLabels ? _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_3__.OccurenceMatrixType.UNIQUE : _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_3__.OccurenceMatrixType.WILDCARD);
    return _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_2__.ConcurrencyRelation.fromOccurrenceMatrix(matrix, relabeler);
  }

  computeOccurrenceMatrix(log, lookAheadDistance = 1, matrixType = _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_3__.OccurenceMatrixType.UNIQUE, cleanLog = false) {
    const matrix = new _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_3__.OccurrenceMatrix(matrixType);

    if (cleanLog) {
      log = this.cleanLog(log);
    }

    for (const trace of log) {
      const prefix = [];

      for (const step of trace.eventActivities) {
        if (prefix.length > lookAheadDistance) {
          prefix.shift();
        }

        for (const e of prefix) {
          matrix.add(e, step);
        }

        prefix.push(step);
      }
    }

    console.debug(matrix);
    return matrix;
  }

}

/***/ }),

/***/ 9394:
/*!******************************************************************************************!*\
  !*** ./src/app/classes/algorithms/concurrency-oracle/alpha-oracle/petri-net-sequence.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PetriNetSequence": () => (/* binding */ PetriNetSequence)
/* harmony export */ });
/* harmony import */ var _models_petri_net_petri_net__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/petri-net/petri-net */ 1509);
/* harmony import */ var _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/petri-net/place */ 9973);
/* harmony import */ var _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/petri-net/transition */ 2986);
/* harmony import */ var _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/eventlog/eventlog-trace */ 2289);
/* harmony import */ var _models_eventlog_eventlog_event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../models/eventlog/eventlog-event */ 9924);





class PetriNetSequence {
  constructor() {
    this._net = new _models_petri_net_petri_net__WEBPACK_IMPORTED_MODULE_0__.PetriNet();
    this._lastPlace = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__.Place();

    this._net.addPlace(this._lastPlace);

    this._trace = new _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_3__.EventlogTrace([], [], -1);
  }

  get net() {
    return this._net;
  }

  get trace() {
    return this._trace;
  }

  clone() {
    const clone = new PetriNetSequence();
    clone._net = this._net.clone();
    clone._lastPlace = clone._net.getPlace(this._lastPlace.getId());
    clone._trace = this._trace.clone();
    return clone;
  }

  appendEvent(label) {
    this._trace.events.push(new _models_eventlog_eventlog_event__WEBPACK_IMPORTED_MODULE_4__.EventlogEvent([], label));

    this.appendTransition(label);
  }

  appendTransition(label) {
    const t = new _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_2__.Transition(label);

    this._net.addTransition(t);

    this._net.addArc(this._lastPlace, t);

    this._lastPlace = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__.Place();

    this._net.addPlace(this._lastPlace);

    this._net.addArc(t, this._lastPlace);
  }

}

/***/ }),

/***/ 1604:
/*!**********************************************************************!*\
  !*** ./src/app/classes/algorithms/concurrency-oracle/log-cleaner.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogCleaner": () => (/* binding */ LogCleaner)
/* harmony export */ });
/* harmony import */ var _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/eventlog/eventlog-trace */ 2289);
/* harmony import */ var _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/eventlog/utils/lifecycle */ 7616);


class LogCleaner {
  cleanLog(log) {
    return log.map(t => this.cleanTrace(t));
  }

  cleanTrace(trace) {
    const cleanedEvents = trace.events.filter(e => e.lifecycle === undefined || e.lifecycle === _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_1__.Lifecycle.COMPLETE);
    return new _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_0__.EventlogTrace(trace.attributes, cleanedEvents, trace.caseId);
  }

}

/***/ }),

/***/ 3506:
/*!*******************************************************************************************!*\
  !*** ./src/app/classes/algorithms/concurrency-oracle/log-to-partial-order-transformer.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogToPartialOrderTransformer": () => (/* binding */ LogToPartialOrderTransformer)
/* harmony export */ });
/* harmony import */ var _utility_string_sequence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/string-sequence */ 5711);
/* harmony import */ var _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/petri-net/place */ 9973);
/* harmony import */ var _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/petri-net/transition */ 2986);
/* harmony import */ var _models_eventlog_eventlog_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/eventlog/eventlog-event */ 9924);
/* harmony import */ var _utility_map_set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utility/map-set */ 8977);
/* harmony import */ var _log_cleaner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./log-cleaner */ 1604);
/* harmony import */ var _models_petri_net_partial_order_net_with_contained_traces__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../models/petri-net/partial-order-net-with-contained-traces */ 6239);
/* harmony import */ var _utility_prefix_tree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utility/prefix-tree */ 4790);
/* harmony import */ var _alpha_oracle_petri_net_sequence__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alpha-oracle/petri-net-sequence */ 9394);









let LogToPartialOrderTransformer = /*#__PURE__*/(() => {
  class LogToPartialOrderTransformer extends _log_cleaner__WEBPACK_IMPORTED_MODULE_5__.LogCleaner {
    constructor(_pnIsomorphismService, _config = {}) {
      super();
      this._pnIsomorphismService = _pnIsomorphismService;
      this._config = _config;
    }

    transformToPartialOrders(eventlog, concurrencyRelation) {
      let eventlogTraces = eventlog.traces;

      if (eventlogTraces.length === 0) {
        return [];
      }

      if (!!this._config.cleanLog) {
        eventlogTraces = this.cleanLog(eventlogTraces);
      } else {
        console.warn(`relabeling a log with both 'start' and 'complete' events will result in unexpected label associations!`);
      }

      concurrencyRelation.relabeler.relabelSequencesPreserveNonUniqueIdentities(eventlogTraces);
      const sequences = this.convertLogToPetriNetSequences(eventlogTraces, !!this._config.discardPrefixes); // transitive reduction requires all places to be internal => always add start/stop and remove later

      sequences.forEach(seq => {
        LogToPartialOrderTransformer.addStartAndStopEvent(seq);
      });
      const partialOrders = this.convertSequencesToPartialOrders(sequences, concurrencyRelation);
      this.removeTransitiveDependencies(partialOrders);

      if (!this._config.addStartStopEvent) {
        partialOrders.forEach(po => {
          this.removeStartAndStopEvent(po);
        });
      }

      const result = this.filterAndCombinePartialOrderNets(partialOrders);
      concurrencyRelation.relabeler.undoSequencesLabeling(result.map(po => new _utility_string_sequence__WEBPACK_IMPORTED_MODULE_0__.EditableStringSequenceWrapper(po.net.getTransitions())));
      concurrencyRelation.relabeler.undoSequencesLabeling(result.flatMap(po => po.containedTraces));
      return result;
    }

    convertLogToPetriNetSequences(log, discardPrefixes) {
      const netSequences = new Set();
      const tree = new _utility_prefix_tree__WEBPACK_IMPORTED_MODULE_7__.PrefixTree(new _alpha_oracle_petri_net_sequence__WEBPACK_IMPORTED_MODULE_8__.PetriNetSequence());

      for (const trace of log) {
        tree.insert(trace, () => {
          throw new Error('should never be called');
        }, (node, treeNode) => {
          if (discardPrefixes && treeNode.hasChildren()) {
            node.net.frequency = 0;
            netSequences.delete(node);
          } else {
            node.net.frequency = node.net.frequency === undefined ? 1 : node.net.frequency + 1;
            netSequences.add(node);
          }
        }, discardPrefixes ? (s, node, treeNode) => {
          if (treeNode.hasChildren()) {
            node.net.frequency = 0;
            netSequences.delete(node);
          }
        } : undefined, (step, prefix, previousNode) => {
          const newNode = previousNode.clone();
          newNode.appendEvent(step);
          return newNode;
        });
      }

      return Array.from(netSequences);
    }

    static addStartAndStopEvent(sequence) {
      // add events to net
      const sequenceNet = sequence.net;
      const firstLast = sequenceNet.getPlaces().filter(p => p.ingoingArcs.length === 0 || p.outgoingArcs.length === 0);

      if (firstLast.length !== 2) {
        console.debug(sequenceNet);
        throw new Error('Illegal state. A sequence must have one start and one end place.');
      }

      let first, last;

      if (firstLast[0].ingoingArcs.length === 0) {
        first = firstLast[0];
        last = firstLast[1];
      } else {
        first = firstLast[1];
        last = firstLast[0];
      }

      const preStart = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__.Place();
      const start = new _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_2__.Transition(LogToPartialOrderTransformer.START_SYMBOL);
      sequenceNet.addPlace(preStart);
      sequenceNet.addTransition(start);
      sequenceNet.addArc(preStart, start);
      sequenceNet.addArc(start, first);
      const stop = new _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_2__.Transition(LogToPartialOrderTransformer.STOP_SYMBOL);
      const postStop = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__.Place();
      sequenceNet.addTransition(stop);
      sequenceNet.addPlace(postStop);
      sequenceNet.addArc(last, stop);
      sequenceNet.addArc(stop, postStop); // add events to trace

      sequence.trace.events.unshift(new _models_eventlog_eventlog_event__WEBPACK_IMPORTED_MODULE_3__.EventlogEvent([], LogToPartialOrderTransformer.START_SYMBOL));
      sequence.trace.events.push(new _models_eventlog_eventlog_event__WEBPACK_IMPORTED_MODULE_3__.EventlogEvent([], LogToPartialOrderTransformer.STOP_SYMBOL));
    }

    removeStartAndStopEvent(partialOrder) {
      // remove from net
      const partialOrderNet = partialOrder.net;

      if (partialOrderNet.inputPlaces.size !== 1 || partialOrderNet.outputPlaces.size !== 1) {
        console.debug(partialOrderNet);
        throw new Error('illegal state');
      }

      let startTransition = undefined;
      partialOrderNet.inputPlaces.forEach(id => {
        const inPlace = partialOrderNet.getPlace(id);
        startTransition = inPlace.outgoingArcs[0].destination;
        partialOrderNet.removePlace(id);
      });

      if (startTransition === undefined || startTransition.label !== LogToPartialOrderTransformer.START_SYMBOL) {
        throw new Error('illegal state');
      }

      partialOrderNet.removeTransition(startTransition);
      let stopTransition = undefined;
      partialOrderNet.outputPlaces.forEach(id => {
        const outPlace = partialOrderNet.getPlace(id);
        stopTransition = outPlace.ingoingArcs[0].source;
        partialOrderNet.removePlace(id);
      });

      if (stopTransition === undefined || stopTransition.label !== LogToPartialOrderTransformer.STOP_SYMBOL) {
        throw new Error('illegal state');
      }

      partialOrderNet.removeTransition(stopTransition); // remove from trace

      partialOrder.containedTraces[0].events.shift();
      partialOrder.containedTraces[0].events.pop();
    }

    convertSequencesToPartialOrders(sequences, concurrencyRelation) {
      return sequences.map(seq => this.convertSequenceToPartialOrder(seq, concurrencyRelation));
    }

    convertSequenceToPartialOrder(sequence, concurrencyRelation) {
      const net = sequence.net;
      const placeQueue = net.getPlaces();

      while (placeQueue.length > 0) {
        const place = placeQueue.shift();

        if (place.ingoingArcs.length === 0 || place.outgoingArcs.length === 0) {
          continue;
        }

        if (place.ingoingArcs.length > 1 || place.outgoingArcs.length > 1) {
          console.debug(place);
          console.debug(sequence);
          throw new Error('Illegal state. The processed net is not a partial order!');
        }

        const preEvent = place.ingoingArcs[0].source;
        const postEvent = place.outgoingArcs[0].destination;

        if (preEvent.label === postEvent.label || // no auto-concurrency
        !concurrencyRelation.isConcurrent(preEvent.label, postEvent.label) || !concurrencyRelation.isConcurrent(postEvent.label, preEvent.label)) {
          continue;
        }

        net.removePlace(place);

        for (const a of preEvent.ingoingArcs) {
          const inPlace = a.source;

          if (inPlace.ingoingArcs.length === 0 && postEvent.ingoingArcs.some(a => a.source.ingoingArcs.length === 0)) {
            continue;
          }

          if (inPlace.ingoingArcs.length > 0) {
            const inTransId = inPlace.ingoingArcs[0].sourceId;

            if (postEvent.ingoingArcs.some(a => {
              var _a;

              return ((_a = a.source.ingoingArcs[0]) === null || _a === void 0 ? void 0 : _a.sourceId) === inTransId;
            })) {
              continue;
            }
          }

          const clone = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__.Place();
          net.addPlace(clone);
          placeQueue.push(clone);

          if (inPlace.ingoingArcs.length > 0) {
            net.addArc(inPlace.ingoingArcs[0].source, clone);
          }

          net.addArc(clone, postEvent);
        }

        for (const a of postEvent.outgoingArcs) {
          const outPlace = a.destination;

          if (outPlace.outgoingArcs.length === 0 && preEvent.outgoingArcs.some(a => a.destination.outgoingArcs.length === 0)) {
            continue;
          }

          if (outPlace.outgoingArcs.length > 0) {
            const outTransId = outPlace.outgoingArcs[0].destinationId;

            if (preEvent.outgoingArcs.some(a => {
              var _a;

              return ((_a = a.destination.outgoingArcs[0]) === null || _a === void 0 ? void 0 : _a.destinationId) === outTransId;
            })) {
              continue;
            }
          }

          const clone = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_1__.Place();
          net.addPlace(clone);
          placeQueue.push(clone);

          if (outPlace.outgoingArcs.length > 0) {
            net.addArc(clone, outPlace.outgoingArcs[0].destination);
          }

          net.addArc(preEvent, clone);
        }
      }

      return new _models_petri_net_partial_order_net_with_contained_traces__WEBPACK_IMPORTED_MODULE_6__.PartialOrderNetWithContainedTraces(net, [sequence.trace]);
    }

    removeTransitiveDependencies(pos) {
      pos.forEach(po => this.performTransitiveReduction(po.net));
    }

    performTransitiveReduction(partialOrder) {
      // algorithm based on "Algorithm A" from https://www.sciencedirect.com/science/article/pii/0304397588900321
      // the paper itself offers an improvement over this Algorithm - might be useful if A proves to be too slow
      const reverseTransitionOrder = this.reverseTopologicalTransitionOrdering(partialOrder);
      const reverseOrder = new Map(reverseTransitionOrder.map((t, i) => [t.getId(), i]));
      const transitiveDescendants = new _utility_map_set__WEBPACK_IMPORTED_MODULE_4__.MapSet();
      const reducedDescendants = new _utility_map_set__WEBPACK_IMPORTED_MODULE_4__.MapSet();

      for (const t of reverseTransitionOrder) {
        transitiveDescendants.add(t.getId(), t.getId());
        const childrenIds = LogToPartialOrderTransformer.getChildIds(t).sort((id1, id2) => reverseOrder.get(id2) - reverseOrder.get(id1));

        for (const childId of childrenIds) {
          if (!transitiveDescendants.has(t.getId(), childId)) {
            transitiveDescendants.addAll(t.getId(), transitiveDescendants.get(childId));
            reducedDescendants.add(t.getId(), childId);
          }
        }
      } // remove transitive connections (places)


      for (const t of partialOrder.getTransitions()) {
        if (t.label === LogToPartialOrderTransformer.STOP_SYMBOL) {
          continue;
        }

        for (const a of t.outgoingArcs) {
          if (!reducedDescendants.has(t.getId(), a.destination.outgoingArcs[0].destinationId)) {
            partialOrder.removePlace(a.destinationId);
          }
        }
      }
    }

    static getChildIds(transition) {
      return transition.outgoingArcs.flatMap(a => a.destination.outgoingArcs.map(ta => ta.destination.getId()));
    }
    /**
     * Returns an array containing the transitions of the given net. The result is in reverse-topological order i.e.
     * transitions at the front of the Array appear later in the net.
     *
     * Implementation based on https://www.geeksforgeeks.org/topological-sorting/3
     * @param net a Petri Net representation of a partial order
     */


    reverseTopologicalTransitionOrdering(net) {
      const resultStack = [];
      const visited = new Set();

      for (const t of net.getTransitions()) {
        if (visited.has(t.getId())) {
          continue;
        }

        this.topologicalOrderingUtil(t, visited, resultStack);
      }

      return resultStack;
    }

    topologicalOrderingUtil(t, visited, resultStack) {
      var _a;

      visited.add(t.getId());

      for (const a of t.outgoingArcs) {
        const nextTransition = (_a = a.destination.outgoingArcs[0]) === null || _a === void 0 ? void 0 : _a.destination;

        if (nextTransition === undefined) {
          continue;
        }

        if (visited.has(nextTransition.getId())) {
          continue;
        }

        this.topologicalOrderingUtil(nextTransition, visited, resultStack);
      }

      resultStack.push(t);
    }

    filterAndCombinePartialOrderNets(partialOrders) {
      const unique = [partialOrders.shift()];

      for (const uncheckedOrder of partialOrders) {
        let discard = false;

        for (const uniqueOrder of unique) {
          if (this._pnIsomorphismService.arePartialOrderPetriNetsIsomorphic(uncheckedOrder.net, uniqueOrder.net)) {
            discard = true;
            uniqueOrder.net.frequency = uniqueOrder.net.frequency + uncheckedOrder.net.frequency;
            uniqueOrder.containedTraces.push(...uncheckedOrder.containedTraces);
            break;
          }
        }

        if (!discard) {
          unique.push(uncheckedOrder);
        }
      }

      return unique;
    }

  }

  LogToPartialOrderTransformer.START_SYMBOL = '▶';
  LogToPartialOrderTransformer.STOP_SYMBOL = '■';
  return LogToPartialOrderTransformer;
})();

/***/ }),

/***/ 8731:
/*!**********************************************************************************!*\
  !*** ./src/app/classes/algorithms/concurrency-oracle/none-oracle/none-oracle.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoneOracle": () => (/* binding */ NoneOracle)
/* harmony export */ });
/* harmony import */ var _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/concurrency/concurrency-relation */ 7077);
/* harmony import */ var _trace_cleaner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../trace-cleaner */ 3863);


class NoneOracle extends _trace_cleaner__WEBPACK_IMPORTED_MODULE_1__.TraceCleaner {
  determineConcurrency(eventlog) {
    return _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_0__.ConcurrencyRelation.noConcurrency();
  }

}

/***/ }),

/***/ 31:
/*!********************************************************************************************!*\
  !*** ./src/app/classes/algorithms/concurrency-oracle/timestamp-oracle/timestamp-oracle.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimestampOracle": () => (/* binding */ TimestampOracle)
/* harmony export */ });
/* harmony import */ var _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/concurrency/concurrency-relation */ 7077);
/* harmony import */ var _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/concurrency/occurrence-matrix */ 3651);
/* harmony import */ var _trace_cleaner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trace-cleaner */ 3863);
/* harmony import */ var _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/eventlog/utils/lifecycle */ 7616);
/* harmony import */ var _utility_relabeler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utility/relabeler */ 2909);





class TimestampOracle extends _trace_cleaner__WEBPACK_IMPORTED_MODULE_2__.TraceCleaner {
  constructor(config = {}) {
    super();
    this.config = config;
  }

  determineConcurrency(eventlog) {
    const eventlogTraces = eventlog.traces;

    if (eventlogTraces.length === 0) {
      return _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_0__.ConcurrencyRelation.noConcurrency();
    }

    eventlogTraces.forEach(t => {
      this.filterTraceAndPairStartCompleteEvents(t);
    });
    const relabeler = new _utility_relabeler__WEBPACK_IMPORTED_MODULE_4__.Relabeler();

    if (this.config.distinguishSameLabels) {
      this.relabelPairedLog(eventlogTraces, relabeler);
    } else {
      relabeler.relabelSequencesPreserveNonUniqueIdentities(eventlogTraces);
    }

    const matrix = this.constructOccurrenceMatrix(eventlogTraces, !!this.config.distinguishSameLabels);
    return _models_concurrency_concurrency_relation__WEBPACK_IMPORTED_MODULE_0__.ConcurrencyRelation.fromOccurrenceMatrix(matrix, relabeler);
  }

  filterTraceAndPairStartCompleteEvents(trace) {
    const startedEvents = new Map();

    for (const e of trace.events) {
      switch (e.lifecycle) {
        case _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_3__.Lifecycle.START:
          if (startedEvents.has(e.activity)) {
            throw new Error('TimestampOracle does not currently support auto-concurrency in the log!');
          }

          startedEvents.set(e.activity, e);
          break;

        case _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_3__.Lifecycle.COMPLETE:
          if (startedEvents.has(e.activity)) {
            const pair = startedEvents.get(e.activity);
            e.setPairEvent(pair);
            pair.setPairEvent(e);
            startedEvents.delete(e.activity);
          }

          break;
      }
    }

    if (startedEvents.size > 0) {
      // unpaired start events exist
      const unpaired = Array.from(startedEvents.values());
      trace.events = trace.events.filter(e => !unpaired.includes(e));
    }
  }

  relabelPairedLog(log, relabeler) {
    const filteredLog = this.cleanLog(log);
    relabeler.uniquelyRelabelSequences(filteredLog);

    for (const trace of filteredLog) {
      for (const event of trace.events) {
        const pair = event.getPairEvent();

        if (pair !== undefined) {
          pair.activity = event.activity;
        }
      }
    }
  }

  constructOccurrenceMatrix(log, unique) {
    const matrix = new _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_1__.OccurrenceMatrix(unique ? _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_1__.OccurenceMatrixType.UNIQUE : _models_concurrency_occurrence_matrix__WEBPACK_IMPORTED_MODULE_1__.OccurenceMatrixType.WILDCARD);

    for (const trace of log) {
      const startedEvents = new Set();

      for (const event of trace.events) {
        switch (event.lifecycle) {
          case _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_3__.Lifecycle.START:
            this.addAllInProgressToMatrix(event.activity, startedEvents, matrix);
            startedEvents.add(event.activity);
            break;

          case _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_3__.Lifecycle.COMPLETE:
            if (startedEvents.has(event.activity)) {
              startedEvents.delete(event.activity);
            } else {
              // standalone
              this.addAllInProgressToMatrix(event.activity, startedEvents, matrix);
            }

            break;
        }
      }
    }

    return matrix;
  }

  addAllInProgressToMatrix(started, inProgress, matrix) {
    for (const progress of inProgress) {
      matrix.add(started, progress);
      matrix.add(progress, started);
    }
  }

}

/***/ }),

/***/ 3863:
/*!************************************************************************!*\
  !*** ./src/app/classes/algorithms/concurrency-oracle/trace-cleaner.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TraceCleaner": () => (/* binding */ TraceCleaner)
/* harmony export */ });
/* harmony import */ var _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/eventlog/eventlog-trace */ 2289);
/* harmony import */ var _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/eventlog/utils/lifecycle */ 7616);


class TraceCleaner {
  cleanLog(traces) {
    return traces.map(t => this.cleanTrace(t));
  }

  cleanTrace(trace) {
    const cleanedEvents = trace.events.filter(e => e.lifecycle === undefined || e.lifecycle === _models_eventlog_utils_lifecycle__WEBPACK_IMPORTED_MODULE_1__.Lifecycle.COMPLETE);
    return new _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_0__.EventlogTrace(trace.attributes, cleanedEvents, trace.caseId);
  }

}

/***/ }),

/***/ 9714:
/*!************************************************************************!*\
  !*** ./src/app/classes/algorithms/flow-network/max-flow-preflow-n3.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaxFlowPreflowN3": () => (/* binding */ MaxFlowPreflowN3)
/* harmony export */ });
class MaxFlowPreflowN3 {
  constructor(n) {
    this.n = n;
    this.cap = [];

    for (let i = 0; i < n; i++) {
      this.cap.push(new Array(n).fill(0));
    }
  }

  setCap(i, j, cap) {
    this.cap[i][j] = cap;
  }

  setUnbounded(i, j) {
    this.setCap(i, j, 20000);
  }

  getCap(i, j) {
    return this.cap[i][j];
  }

  maxFlow(s, t) {
    const h = new Array(this.n).fill(0);
    h[s] = this.n - 1;
    const maxh = new Array(this.n).fill(0);
    const f = [];

    for (let i = 0; i < this.n; i++) {
      f.push(new Array(this.n).fill(0));
    }

    const e = new Array(this.n).fill(0);

    for (let i = 0; i < this.n; i++) {
      f[s][i] = this.cap[s][i];
      f[i][s] = -f[s][i];
      e[i] = this.cap[s][i];
    }

    for (let sz = 0;;) {
      if (sz === 0) {
        for (let i = 0; i < this.n; i++) {
          if (i !== s && i !== t && e[i] > 0) {
            if (sz !== 0 && h[i] > h[maxh[0]]) {
              sz = 0;
            }

            maxh[sz++] = i;
          }
        }
      }

      if (sz === 0) {
        break;
      }

      while (sz !== 0) {
        let i = maxh[sz - 1];
        let pushed = false;

        for (let j = 0; j < this.n && e[i] !== 0; j++) {
          if (h[i] === h[j] + 1 && this.cap[i][j] - f[i][j] > 0) {
            const df = Math.min(this.cap[i][j] - f[i][j], e[i]);
            f[i][j] += df;
            f[j][i] -= df;
            e[i] -= df;
            e[j] += df;

            if (e[i] === 0) {
              sz--;
            }

            pushed = true;
          }
        }

        if (!pushed) {
          h[i] = 20000;

          for (let j = 0; j < this.n; j++) {
            if (h[i] > h[j] + 1 && this.cap[i][j] - f[i][j] > 0) {
              h[i] = h[j] + 1;
            }
          }

          if (h[i] > h[maxh[0]]) {
            sz = 0;
            break;
          }
        }
      }
    }

    let flow = 0;

    for (let i = 0; i < this.n; i++) {
      flow += f[s][i];
    }

    return flow;
  }

}

/***/ }),

/***/ 4171:
/*!*********************************************************************************************!*\
  !*** ./src/app/classes/algorithms/partial-order/isomorphism/model/isomorphism-candidate.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IsomorphismCandidate": () => (/* binding */ IsomorphismCandidate)
/* harmony export */ });
class IsomorphismCandidate {
  constructor(target, candidates) {
    this.target = target;
    this.candidates = candidates;
  }

}

/***/ }),

/***/ 6270:
/*!**************************************************************************************************!*\
  !*** ./src/app/classes/algorithms/partial-order/isomorphism/partial-order-isomorphism-tester.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PartialOrderIsomorphismTester": () => (/* binding */ PartialOrderIsomorphismTester)
/* harmony export */ });
/* harmony import */ var _model_isomorphism_candidate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/isomorphism-candidate */ 4171);

class PartialOrderIsomorphismTester {
  arePartialOrdersIsomorphic(partialOrderA, partialOrderB) {
    partialOrderA.determineInitialAndFinalEvents();
    partialOrderB.determineInitialAndFinalEvents();
    const unsolved = [];

    for (const initialEvent of partialOrderA.initialEvents) {
      unsolved.push(new _model_isomorphism_candidate__WEBPACK_IMPORTED_MODULE_0__.IsomorphismCandidate(initialEvent, Array.from(partialOrderB.initialEvents)));
    }

    const mappingAB = new Map();
    const mappingBA = new Map();
    const pushedToBack = new Set();

    while (unsolved.length > 0) {
      const problem = unsolved.shift();
      const previous = Array.from(problem.target.previousEvents);

      if (previous.some(p => !mappingAB.has(p.id))) {
        // pre-set was not yet determined, we have to wait
        if (pushedToBack.has(problem)) {
          return false;
        }

        pushedToBack.add(problem);
        unsolved.push(problem);
        continue;
      }

      problem.candidates = problem.candidates.filter(c => !mappingBA.has(c.id));
      const match = problem.candidates.find(c => {
        const sameLabel = c.label === problem.target.label;

        if (!sameLabel) {
          return false;
        }

        if (c.previousEvents.size !== problem.target.previousEvents.size) {
          return false;
        }

        if (c.nextEvents.size !== problem.target.nextEvents.size) {
          return false;
        }

        const previousLabels = new Set(Array.from(c.previousEvents).map(p => p.label));

        for (const p of problem.target.previousEvents) {
          if (!previousLabels.has(p.label)) {
            return false;
          }

          previousLabels.delete(p.label);
        }

        return true;
      });

      if (match === undefined) {
        return false;
      }

      pushedToBack.clear();
      mappingAB.set(problem.target.id, match);
      mappingBA.set(match.id, problem.target);

      for (const next of problem.target.nextEvents) {
        unsolved.push(new _model_isomorphism_candidate__WEBPACK_IMPORTED_MODULE_0__.IsomorphismCandidate(next, Array.from(match.nextEvents)));
      }
    }

    return true;
  }

}

/***/ }),

/***/ 1695:
/*!*************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/isomorphism/classes/mapping-counter.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MappingCounter": () => (/* binding */ MappingCounter)
/* harmony export */ });
class MappingCounter {
  constructor(mappedId, maximum) {
    this.mappedId = mappedId;
    this._maximum = maximum;
    this._currentChoice = 0;
  }

  current() {
    return this._currentChoice;
  }

  next() {
    this._currentChoice += 1;

    if (this._currentChoice > this._maximum) {
      this._currentChoice = 0;
    }

    return this._currentChoice;
  }

  isLastOption() {
    return this._currentChoice === this._maximum;
  }

}

/***/ }),

/***/ 4443:
/*!*************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/isomorphism/classes/mapping-manager.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MappingManager": () => (/* binding */ MappingManager)
/* harmony export */ });
/* harmony import */ var _mapping_counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapping-counter */ 1695);

class MappingManager {
  constructor(possibleMappings) {
    this._mappingCounters = [];

    for (const [id, mappableIds] of possibleMappings.entries()) {
      this._mappingCounters.push(new _mapping_counter__WEBPACK_IMPORTED_MODULE_0__.MappingCounter(id, mappableIds.size - 1));
    }

    this._mappingOrder = new Map(this._mappingCounters.map(choice => [choice.mappedId, Array.from(possibleMappings.get(choice.mappedId))]));
  }

  getCurrentMapping() {
    return new Map(this._mappingCounters.map(choice => [choice.mappedId, this._mappingOrder.get(choice.mappedId)[choice.current()]]));
  }
  /**
   * Increments the current mapping to the next possibility.
   *
   * @returns `true` if the final mapping was passed. `false` otherwise.
   */


  moveToNextMapping() {
    let incrementedIndex = 0;

    while (incrementedIndex < this._mappingCounters.length) {
      const carry = this._mappingCounters[incrementedIndex].isLastOption();

      this._mappingCounters[incrementedIndex].next();

      if (carry) {
        incrementedIndex++;
      } else {
        break;
      }
    }

    return incrementedIndex === this._mappingCounters.length;
  }

}

/***/ }),

/***/ 3614:
/*!******************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/isomorphism/petri-net-isomorphism-tester.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PetriNetIsomorphismTester": () => (/* binding */ PetriNetIsomorphismTester)
/* harmony export */ });
/* harmony import */ var _utility_map_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utility/map-set */ 8977);
/* harmony import */ var _classes_mapping_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/mapping-manager */ 4443);
/* harmony import */ var _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/petri-net/transition */ 2986);



class PetriNetIsomorphismTester {
  constructor(_pnToPoTransformer, _poIsomorphism) {
    this._pnToPoTransformer = _pnToPoTransformer;
    this._poIsomorphism = _poIsomorphism;
  }

  arePartialOrderPetriNetsIsomorphic(partialOrderA, partialOrderB) {
    if (!PetriNetIsomorphismTester.compareBasicNetProperties(partialOrderA, partialOrderB)) {
      return false;
    }

    return this._poIsomorphism.arePartialOrdersIsomorphic(this._pnToPoTransformer.transform(partialOrderA), this._pnToPoTransformer.transform(partialOrderB));
  }

  arePetriNetsIsomorphic(netA, netB) {
    if (!PetriNetIsomorphismTester.compareBasicNetProperties(netA, netB)) {
      return false;
    }

    const transitionMapping = PetriNetIsomorphismTester.determinePossibleTransitionMappings(netA, netB);

    if (transitionMapping === undefined) {
      return false;
    }

    const placeMapping = PetriNetIsomorphismTester.determinePossiblePlaceMappings(netA, netB);

    if (placeMapping === undefined) {
      return false;
    }

    const transitionMappingManager = new _classes_mapping_manager__WEBPACK_IMPORTED_MODULE_1__.MappingManager(transitionMapping);
    const placeMappingManager = new _classes_mapping_manager__WEBPACK_IMPORTED_MODULE_1__.MappingManager(placeMapping);
    let done = false;

    do {
      const transitionMapping = transitionMappingManager.getCurrentMapping();
      const uniqueTransitionsMapped = new Set(transitionMapping.values());

      if (transitionMapping.size === uniqueTransitionsMapped.size) {
        // bijective transition mapping
        const placeMapping = placeMappingManager.getCurrentMapping();
        const uniquePlacesMapped = new Set(placeMapping.values());

        if (placeMapping.size === uniquePlacesMapped.size && // bijective place mapping
        this.isMappingAPetriNetIsomorphism(netA, netB, transitionMapping, placeMapping)) {
          return true;
        }
      }

      const carry = transitionMappingManager.moveToNextMapping();

      if (carry) {
        done = placeMappingManager.moveToNextMapping();
      }
    } while (!done);

    return false;
  }

  static compareBasicNetProperties(netA, netB) {
    return netA.getTransitionCount() === netB.getTransitionCount() && netA.getPlaceCount() === netB.getPlaceCount() && netA.getArcCount() === netB.getArcCount() && netA.inputPlaces.size === netB.inputPlaces.size && netA.outputPlaces.size === netB.outputPlaces.size;
  }

  static determinePossibleTransitionMappings(netA, netB) {
    const transitionMapping = new _utility_map_set__WEBPACK_IMPORTED_MODULE_0__.MapSet();

    for (const tA of netA.getTransitions()) {
      let wasMapped = false;

      for (const tB of netB.getTransitions()) {
        if (tA.label === tB.label && tA.ingoingArcs.length === tB.ingoingArcs.length && tA.outgoingArcs.length === tB.outgoingArcs.length) {
          wasMapped = true;
          transitionMapping.add(tA.getId(), tB.getId());
        }
      }

      if (!wasMapped) {
        return undefined;
      }
    }

    return transitionMapping;
  }

  static determinePossiblePlaceMappings(netA, netB) {
    const placeMapping = new _utility_map_set__WEBPACK_IMPORTED_MODULE_0__.MapSet();

    for (const pA of netA.getPlaces()) {
      let wasMapped = false;

      for (const pB of netB.getPlaces()) {
        if (pA.marking === pB.marking && pA.ingoingArcs.length === pB.ingoingArcs.length && pA.outgoingArcs.length === pB.outgoingArcs.length) {
          wasMapped = true;
          placeMapping.add(pA.getId(), pB.getId());
        }
      }

      if (!wasMapped) {
        return undefined;
      }
    }

    return placeMapping;
  }

  isMappingAPartialOrderIsomorphism(partialOrderA, partialOrderB, transitionMapping) {
    const unmappedArcs = partialOrderB.getPlaces().filter(p => p.ingoingArcs.length !== 0 && p.outgoingArcs.length !== 0);

    for (const arc of partialOrderA.getPlaces()) {
      if (arc.ingoingArcs.length === 0 || arc.outgoingArcs.length === 0) {
        continue;
      }

      const preTransitionB = transitionMapping.get(arc.ingoingArcs[0].sourceId);
      const postTransitionB = transitionMapping.get(arc.outgoingArcs[0].destinationId);
      const fittingArcIndex = unmappedArcs.findIndex(unmapped => unmapped.ingoingArcs[0].sourceId === preTransitionB && unmapped.outgoingArcs[0].destinationId === postTransitionB);

      if (fittingArcIndex === -1) {
        return false;
      }

      unmappedArcs.splice(fittingArcIndex, 1);
    }

    return true;
  }

  isMappingAPetriNetIsomorphism(netA, netB, transitionMapping, placeMapping) {
    const unmappedArcs = netB.getArcs();

    for (const arc of netA.getArcs()) {
      let arcSourceId;
      let arcDestinationId;

      if (arc.source instanceof _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_2__.Transition) {
        arcSourceId = transitionMapping.get(arc.sourceId);
        arcDestinationId = placeMapping.get(arc.destinationId);
      } else {
        arcSourceId = placeMapping.get(arc.sourceId);
        arcDestinationId = transitionMapping.get(arc.destinationId);
      } // TODO arc weight is not considered when creating possible mappings. Inclusion of this property might make the algorithm more efficient


      const fittingArcIndex = unmappedArcs.findIndex(unmapped => unmapped.sourceId === arcSourceId && unmapped.destinationId === arcDestinationId && unmapped.weight === arc.weight);

      if (fittingArcIndex === -1) {
        return false;
      }

      unmappedArcs.splice(fittingArcIndex, 1);
    }

    return true;
  }

}

/***/ }),

/***/ 2543:
/*!*********************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/transformation/classes/arc-type.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArcType": () => (/* binding */ ArcType),
/* harmony export */   "getArcs": () => (/* binding */ getArcs),
/* harmony export */   "getTemplateArcs": () => (/* binding */ getTemplateArcs),
/* harmony export */   "reduceArcsToMapActivityKeyArcValue": () => (/* binding */ reduceArcsToMapActivityKeyArcValue)
/* harmony export */ });
/* harmony import */ var _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/petri-net/transition */ 2986);

var ArcType = /*#__PURE__*/(() => {
  (function (ArcType) {
    ArcType[ArcType["INGOING"] = 0] = "INGOING";
    ArcType[ArcType["OUTGOING"] = 1] = "OUTGOING";
  })(ArcType || (ArcType = {}));

  return ArcType;
})();
function getArcs(arcType, place) {
  if (arcType === ArcType.INGOING) {
    return place.ingoingArcs;
  } else {
    return place.outgoingArcs;
  }
}
function getTemplateArcs(arcType, templatePlace) {
  if (arcType === ArcType.INGOING) {
    return templatePlace.unconnectedIngoingTemplateArcs;
  } else {
    return templatePlace.unconnectedOutgoingTemplateArcs;
  }
}
function reduceArcsToMapActivityKeyArcValue(arcs) {
  return arcs.reduce(function (map, arc) {
    const transition = arc.source instanceof _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_0__.Transition ? arc.source : arc.destination;
    map.set(transition.label, arc);
    return map;
  }, new Map());
}

/***/ }),

/***/ 5763:
/*!****************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/transformation/classes/implicit-result.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplicitResult": () => (/* binding */ ImplicitResult)
/* harmony export */ });
class ImplicitResult {
  constructor(implicitPlace, substitutePlaces = []) {
    this.implicitPlace = implicitPlace;
    this.substitutePlaces = substitutePlaces;
  }

}

/***/ }),

/***/ 7934:
/*!*************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/transformation/classes/template-arc.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TemplateArc": () => (/* binding */ TemplateArc)
/* harmony export */ });
/* harmony import */ var _models_petri_net_arc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/petri-net/arc */ 6781);
 // Generated Place which is not yet connected with its arcs, so changing the component names is stil possible

class TemplateArc {
  constructor(source, destination, weight) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;

    if (source == null && destination == null || source != null && destination != null) {
      throw new Error('Only one of source or destination must be null!');
    }
  }

  buildArcForPlace(place) {
    if (this.source != null) {
      const arcId = 'i' + place.id + this.source.label;
      return new _models_petri_net_arc__WEBPACK_IMPORTED_MODULE_0__.Arc(arcId, this.source, place, this.weight);
    } else if (this.destination != null) {
      const arcId = 'o' + place.id + this.destination.label;
      return new _models_petri_net_arc__WEBPACK_IMPORTED_MODULE_0__.Arc(arcId, place, this.destination, this.weight);
    }

    throw new Error('Only one of source or destination must be null!');
  }

  static toSameUniqueString(arc) {
    return 'a{' + arc.weight + ',' + arc.source.label + ',' + arc.destination.label + '}';
  }

  toUniqueString() {
    var _a, _b;

    return 'a{' + this.weight + ',' + ((_a = this.source) === null || _a === void 0 ? void 0 : _a.label) + ',' + ((_b = this.destination) === null || _b === void 0 ? void 0 : _b.label) + '}';
  }

}

/***/ }),

/***/ 9605:
/*!***************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/transformation/classes/template-place.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TemplatePlace": () => (/* binding */ TemplatePlace)
/* harmony export */ });
/* harmony import */ var _models_petri_net_place__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/petri-net/place */ 9973);
/* harmony import */ var _template_arc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-arc */ 7934);
/* harmony import */ var _arc_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arc-type */ 2543);
/* harmony import */ var _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../models/petri-net/transition */ 2986);



 // Generated Place which is not yet connected with its arcs, so changing the component names is stil possible

class TemplatePlace {
  constructor(marking, unconnectedIngoingTemplateArcs = [], unconnectedOutgoingTemplateArcs = []) {
    this.marking = marking;
    this.unconnectedIngoingTemplateArcs = unconnectedIngoingTemplateArcs;
    this.unconnectedOutgoingTemplateArcs = unconnectedOutgoingTemplateArcs;
  }

  buildPlaceWithId(id) {
    const place = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_0__.Place(this.marking, id);
    this.unconnectedIngoingTemplateArcs.forEach(unconnectedIngoingTemplateArc => {
      place.addIngoingArc(unconnectedIngoingTemplateArc.buildArcForPlace(place));
    });
    this.unconnectedOutgoingTemplateArcs.forEach(unconnectedOutgoingTemplateArc => {
      place.addOutgoingArc(unconnectedOutgoingTemplateArc.buildArcForPlace(place));
    });
    return place;
  }

  static toSameUniqueString(place) {
    return 'p{' + place.marking + ',i:' + place.ingoingArcs.sort((e1, e2) => e1.source.label.localeCompare(e2.source.label)).map(tArc => _template_arc__WEBPACK_IMPORTED_MODULE_1__.TemplateArc.toSameUniqueString(tArc)).concat(',') + ',o:' + place.outgoingArcs.sort((e1, e2) => e1.destination.label.localeCompare(e2.destination.label)).map(tArc => _template_arc__WEBPACK_IMPORTED_MODULE_1__.TemplateArc.toSameUniqueString(tArc)).concat(',') + '}';
  }

  toUniqueString() {
    return 'p{' + this.marking + ',i:' + this.unconnectedIngoingTemplateArcs.sort((e1, e2) => e1.source.label.localeCompare(e2.source.label)).map(tArc => tArc.toUniqueString()).concat(',') + ',o:' + this.unconnectedOutgoingTemplateArcs.sort((e1, e2) => e1.destination.label.localeCompare(e2.destination.label)).map(tArc => tArc.toUniqueString()).concat(',') + '}';
  }

  equals(other) {
    return this.marking === other.marking && this.isTransitionsEquals(other, _arc_type__WEBPACK_IMPORTED_MODULE_2__.ArcType.INGOING) && this.isTransitionsEquals(other, _arc_type__WEBPACK_IMPORTED_MODULE_2__.ArcType.OUTGOING);
  }

  isTransitionsEquals(other, arcType) {
    function reduceArcsToMapTransitionKeyArcValue(arcs) {
      return arcs.reduce(function (map, arc) {
        const transition = arc.source instanceof _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_3__.Transition ? arc.source : arc.destination;
        map.set(transition, arc);
        return map;
      }, new Map());
    }

    if (this.unconnectedIngoingTemplateArcs.length !== other.unconnectedIngoingTemplateArcs.length || this.unconnectedOutgoingTemplateArcs.length !== other.unconnectedOutgoingTemplateArcs.length) {
      return false;
    }

    const p1TransToArcs = reduceArcsToMapTransitionKeyArcValue((0,_arc_type__WEBPACK_IMPORTED_MODULE_2__.getTemplateArcs)(arcType, this));
    const p2TransToArcs = reduceArcsToMapTransitionKeyArcValue((0,_arc_type__WEBPACK_IMPORTED_MODULE_2__.getTemplateArcs)(arcType, other));

    for (let p1Trans of p1TransToArcs.keys()) {
      if (!p2TransToArcs.has(p1Trans)) {
        return false;
      }

      const p1Arc = p1TransToArcs.get(p1Trans);
      const p2Arc = p2TransToArcs.get(p1Trans);

      if (p1Arc.weight !== p2Arc.weight) {
        return false;
      }
    }

    return true;
  }

}

/***/ }),

/***/ 1485:
/*!******************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/transformation/implicit-place-identifier.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplicitPlaceIdentifier": () => (/* binding */ ImplicitPlaceIdentifier)
/* harmony export */ });
/* harmony import */ var _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/petri-net/transition */ 2986);
/* harmony import */ var _classes_arc_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/arc-type */ 2543);
/* harmony import */ var _classes_implicit_result__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/implicit-result */ 5763);
/* harmony import */ var _classes_template_place__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/template-place */ 9605);
/* harmony import */ var _classes_template_arc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/template-arc */ 7934);





class ImplicitPlaceIdentifier {
  constructor(_transitions, _uniqueTraces) {
    this._transitions = _transitions;
    this._uniqueTraces = _uniqueTraces;
  }

  calculateImplicitPlacesFor(currentPlace, petriNet) {
    // place without outgoing arcs is always implicit
    if (currentPlace.outgoingArcs.length === 0) {
      return [new _classes_implicit_result__WEBPACK_IMPORTED_MODULE_2__.ImplicitResult(currentPlace)];
    }

    const implicitPlaces = [];
    const relatedPlaces = this.calculateRelatedPlaces(currentPlace, petriNet);

    for (const relatedPlace of relatedPlaces) {
      switch (this.testRelation(currentPlace, relatedPlace)) {
        // Neuer Platz eine Subregion vom relatedPlace
        case -1:
          implicitPlaces.push(new _classes_implicit_result__WEBPACK_IMPORTED_MODULE_2__.ImplicitResult(relatedPlace, [ImplicitPlaceIdentifier.buildCombinedPlace(relatedPlace, currentPlace)]));
          break;
        // Keine Beziehung zwischen den Plätzen

        case 0:
          break;
        // Neuer Platz eine Superregion vom relatedPlace

        case 1:
          const correspondingImplicitResult = implicitPlaces.find(value => value.implicitPlace === currentPlace);

          if (correspondingImplicitResult == null) {
            implicitPlaces.push(new _classes_implicit_result__WEBPACK_IMPORTED_MODULE_2__.ImplicitResult(currentPlace, [ImplicitPlaceIdentifier.buildCombinedPlace(currentPlace, relatedPlace)]));
          } else {
            correspondingImplicitResult.substitutePlaces.push(ImplicitPlaceIdentifier.buildCombinedPlace(currentPlace, relatedPlace));
          }

          break;

        default:
          // Places are behaving same related to the given eventlog
          if (ImplicitPlaceIdentifier.arePlaceEquals(currentPlace, relatedPlace)) {
            implicitPlaces.push(new _classes_implicit_result__WEBPACK_IMPORTED_MODULE_2__.ImplicitResult(currentPlace));
          } else {
            throw new Error('Unexpected place relation occurred in ImplicitPlaceIdentifier!');
          }

          break;
      }
    }

    return implicitPlaces;
  }

  calculateRelatedPlaces(place, petriNet) {
    return petriNet.getPlaces().filter(potentialPlace => potentialPlace !== place).filter(potentialPlace => ImplicitPlaceIdentifier.hasCommonTransition(potentialPlace, place));
  }

  static hasCommonTransition(p1, p2) {
    const p1Sources = p1.ingoingArcs.map(arc => arc.source);

    for (const p2InArc of p2.ingoingArcs) {
      const p2Source = p2InArc.source;

      if (p1Sources.includes(p2Source)) {
        return true;
      }
    }

    const p1Destinations = p1.outgoingArcs.map(arc => arc.destination);

    for (const p2OutArc of p2.outgoingArcs) {
      const p2Destination = p2OutArc.destination;

      if (p1Destinations.includes(p2Destination)) {
        return true;
      }
    }

    return false;
  }

  static arePlaceEquals(p1, p2) {
    return p1.marking === p2.marking && ImplicitPlaceIdentifier.isTransitionsEquals(p1, p2, _classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.ArcType.INGOING) && ImplicitPlaceIdentifier.isTransitionsEquals(p1, p2, _classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.ArcType.OUTGOING);
  }

  static isTransitionsEquals(p1, p2, arcType) {
    function reduceArcsToMapTransitionKeyArcValue(arcs) {
      return arcs.reduce(function (map, arc) {
        const transition = arc.source instanceof _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_0__.Transition ? arc.source : arc.destination;
        map.set(transition, arc);
        return map;
      }, new Map());
    }

    if (p1.ingoingArcs.length !== p2.ingoingArcs.length || p1.outgoingArcs.length !== p2.outgoingArcs.length) {
      return false;
    }

    const p1TransToArcs = reduceArcsToMapTransitionKeyArcValue((0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.getArcs)(arcType, p1));
    const p2TransToArcs = reduceArcsToMapTransitionKeyArcValue((0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.getArcs)(arcType, p2));

    for (let p1Trans of p1TransToArcs.keys()) {
      if (!p2TransToArcs.has(p1Trans)) {
        return false;
      }

      const p1Arc = p1TransToArcs.get(p1Trans);
      const p2Arc = p2TransToArcs.get(p1Trans);

      if (p1Arc.weight !== p2Arc.weight) {
        return false;
      }
    }

    return true;
  }

  testRelation(place1, place2) {
    let p1;
    let p2;
    let result = 2;

    for (let trace of this._uniqueTraces) {
      p1 = new FireablePlace(place1);
      p2 = new FireablePlace(place2); // Compare initial markings

      result = ImplicitPlaceIdentifier.compareMarkingsUpdateResult(p1, p2, result);

      if (result == 0) {
        return result;
      }

      for (let event of trace.events) {
        const activity = event.activity; //compare markings after consumption

        p1.consumeFire(activity);
        p2.consumeFire(activity);
        result = ImplicitPlaceIdentifier.compareMarkingsUpdateResult(p1, p2, result);

        if (result == 0) {
          return result;
        } //compare markings after production


        p1.produceFire(activity);
        p2.produceFire(activity);
        result = ImplicitPlaceIdentifier.compareMarkingsUpdateResult(p1, p2, result);

        if (result == 0) {
          return result;
        }
      }
    }

    return result;
  }

  static compareMarkingsUpdateResult(p1, p2, resultBefore) {
    const tempResult = FireablePlace.compareMarkings(p1, p2); //-1 for p1 < p2, 0 for p1 = p2, 1 for p1 > p2

    switch (tempResult) {
      case -1:
        //p1 < p2
        if (resultBefore == 2 || resultBefore == -1) {
          // first or consistent result
          return -1;
        } else {
          return 0;
        }

      case 0:
        // p1 = p2
        return resultBefore;

      case 1:
        // p1 > p2
        if (resultBefore == 2 || resultBefore == 1) {
          // first or consistent result
          return 1;
        } else {
          return 0;
        }

      default:
        return resultBefore;
    }
  } // Build the place resulting from p1 - p2


  static buildCombinedPlace(p1, p2) {
    const resultingMarking = p1.marking - p2.marking;
    const p1Ingoing = (0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.reduceArcsToMapActivityKeyArcValue)(p1.ingoingArcs);
    const p2Ingoing = (0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.reduceArcsToMapActivityKeyArcValue)(p2.ingoingArcs);
    const p1Outgoing = (0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.reduceArcsToMapActivityKeyArcValue)(p1.outgoingArcs);
    const p2Outgoing = (0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.reduceArcsToMapActivityKeyArcValue)(p2.outgoingArcs);
    const relevantActivities = new Set([...p1Ingoing.keys()].concat([...p2Ingoing.keys()]).concat([...p1Outgoing.keys()]).concat([...p2Outgoing.keys()]));
    const unconnectedIngoingArcs = [];
    const unconnectedOutgoingArcs = [];

    for (const activity of relevantActivities) {
      let transition = undefined; // Weight of ingoing pseudo transition

      let weightIn = 0;

      if (p1Ingoing.has(activity)) {
        transition = p1Ingoing.get(activity).source;
        weightIn = weightIn + p1Ingoing.get(activity).weight;
      }

      if (p2Ingoing.has(activity)) {
        transition = p2Ingoing.get(activity).source;
        weightIn = weightIn - p2Ingoing.get(activity).weight;
      } // Weight of outgoing pseudo transition


      let weightOut = 0;

      if (p1Outgoing.has(activity)) {
        transition = p1Outgoing.get(activity).destination;
        weightOut = weightOut + p1Outgoing.get(activity).weight;
      }

      if (p2Outgoing.has(activity)) {
        transition = p2Outgoing.get(activity).destination;
        weightOut = weightOut - p2Outgoing.get(activity).weight;
      }

      if (transition == null) {
        throw new Error('Invalid state');
      } // Keep self loops when both are positive (actIn & actOut)


      if (weightIn > 0 && weightOut > 0) {
        unconnectedIngoingArcs.push(new _classes_template_arc__WEBPACK_IMPORTED_MODULE_4__.TemplateArc(transition, undefined, weightIn));
        unconnectedOutgoingArcs.push(new _classes_template_arc__WEBPACK_IMPORTED_MODULE_4__.TemplateArc(undefined, transition, weightOut)); // otherwise no self loops and the weight of only one resulting arc can be calculated
      } else {
        const totalWeight = weightIn - weightOut;

        if (totalWeight > 0) {
          unconnectedIngoingArcs.push(new _classes_template_arc__WEBPACK_IMPORTED_MODULE_4__.TemplateArc(transition, undefined, totalWeight));
        } else if (totalWeight < 0) {
          unconnectedOutgoingArcs.push(new _classes_template_arc__WEBPACK_IMPORTED_MODULE_4__.TemplateArc(undefined, transition, Math.abs(totalWeight)));
        }
      }
    }

    return new _classes_template_place__WEBPACK_IMPORTED_MODULE_3__.TemplatePlace(resultingMarking, unconnectedIngoingArcs, unconnectedOutgoingArcs);
  }

}

class FireablePlace {
  constructor(place) {
    this.place = place;
    this._ingoingActivityToArcs = (0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.reduceArcsToMapActivityKeyArcValue)(place.ingoingArcs);
    this._outgoingActivityToArcs = (0,_classes_arc_type__WEBPACK_IMPORTED_MODULE_1__.reduceArcsToMapActivityKeyArcValue)(place.outgoingArcs);
    this.currentTokens = place.marking;
  }

  produceFire(activity) {
    if (this._ingoingActivityToArcs.has(activity)) {
      this.currentTokens += this._ingoingActivityToArcs.get(activity).weight;
    }
  }

  consumeFire(activity) {
    if (this._outgoingActivityToArcs.has(activity)) {
      this.currentTokens -= this._outgoingActivityToArcs.get(activity).weight;
    }
  }

  static compareMarkings(p1, p2) {
    let result = 0;
    const compareValue = p1.currentTokens - p2.currentTokens;

    if (compareValue < 0) {
      //p1 has less tokens than p2
      result = -1;
    } else if (compareValue > 0) {
      //p1 has more tokens than p2
      result = 1;
    }

    return result;
  }

}

/***/ }),

/***/ 457:
/*!****************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/validation/classes/lpo-place-validator.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LpoPlaceValidator": () => (/* binding */ LpoPlaceValidator)
/* harmony export */ });
/* harmony import */ var _models_partial_order_partial_order_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/partial-order/partial-order-event */ 5391);

class LpoPlaceValidator {
  constructor(lpo) {
    this.initialMarking = 'initial marking';
    this.finalMarking = 'final marking';
    this._lpo = lpo.clone();
    this.modifyLPO();
  }

  modifyLPO() {
    const initial = new _models_partial_order_partial_order_event__WEBPACK_IMPORTED_MODULE_0__.PartialOrderEvent(this.initialMarking, undefined);
    const final = new _models_partial_order_partial_order_event__WEBPACK_IMPORTED_MODULE_0__.PartialOrderEvent(this.finalMarking, undefined);

    for (const e of this._lpo.initialEvents) {
      initial.addNextEvent(e);
    }

    for (const e of this._lpo.finalEvents) {
      e.addNextEvent(final);
    }

    this._lpo.addEvent(initial);

    this._lpo.addEvent(final);
  }

  postUpdateModifiedLPO(toBeCheckedNet) {
    // cleanup for reuse and label splitting check
    this._lpo.events.forEach(e => e.transition = undefined);

    for (const e of this._lpo.events) {
      if (e.id === this.initialMarking || e.id === this.finalMarking) {
        continue;
      }

      for (const t of toBeCheckedNet.getTransitions()) {
        if (e.label === t.label) {
          if (e.transition !== undefined) {
            throw new Error(`The algorithm does not support label-splitted nets`);
          }

          e.transition = t;
        }
      }

      if (e.transition === undefined) {
        throw new Error(`The net does not contain a transition with the label '${e.label}' of the event '${e.id}'`);
      }
    }
  }

  get lpoFrequency() {
    return this._lpo.frequency;
  }

}

/***/ }),

/***/ 9391:
/*!**************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/validation/classes/validation-result.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationPhase": () => (/* binding */ ValidationPhase),
/* harmony export */   "ValidationResult": () => (/* binding */ ValidationResult)
/* harmony export */ });
class ValidationResult {
  constructor(valid, phase) {
    this.valid = valid;
    this.phase = phase;
  }

}
var ValidationPhase = /*#__PURE__*/(() => {
  (function (ValidationPhase) {
    ValidationPhase["FLOW"] = "flow";
    ValidationPhase["FORWARDS"] = "forwards";
    ValidationPhase["BACKWARDS"] = "backwards";
  })(ValidationPhase || (ValidationPhase = {}));

  return ValidationPhase;
})();

/***/ }),

/***/ 6595:
/*!*************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/validation/lpo-fire-place-validator.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LpoFirePlaceValidator": () => (/* binding */ LpoFirePlaceValidator)
/* harmony export */ });
/* harmony import */ var _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/validation-result */ 9391);
/* harmony import */ var _lpo_flow_place_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lpo-flow-place-validator */ 7888);


class LpoFirePlaceValidator extends _lpo_flow_place_validator__WEBPACK_IMPORTED_MODULE_1__.LpoFlowPlaceValidator {
  constructor(lpo) {
    super(lpo);
    this._totalOrder = this.buildTotalOrdering();
  }

  modifyLPO() {
    super.modifyLPO();

    this._lpo.determineInitialAndFinalEvents();
  }

  validate(toBeCheckedNet, toBeValidatedPlaceId, hasToBeEmptyAtEnd = false) {
    this.postUpdateModifiedLPO(toBeCheckedNet);
    const places = toBeCheckedNet.getPlaces();

    this._totalOrder.forEach(e => e.initializeLocalMarking(places.length));

    const toBeValidatedPlaceIndex = places.findIndex(value => value.id === toBeValidatedPlaceId); // build start event

    const initialEvent = this._totalOrder[0];

    for (let i = 0; i < places.length; i++) {
      initialEvent.localMarking[i] = places[i].marking;
    }

    const validPlaces = LpoFirePlaceValidator.newBoolArray(places, true);
    const complexPlaces = LpoFirePlaceValidator.newBoolArray(places, false);
    let queue = [...this._totalOrder];
    this.fireForwards(places, queue, validPlaces, complexPlaces);
    const finalEvent = [...this._lpo.finalEvents][0]; // valid place

    if (validPlaces[toBeValidatedPlaceIndex] && (!hasToBeEmptyAtEnd || finalEvent.localMarking[toBeValidatedPlaceIndex] === 0)) {
      return new _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationResult(true, _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationPhase.FORWARDS);
    } // not valid place


    if (finalEvent.localMarking[toBeValidatedPlaceIndex] < 0 || hasToBeEmptyAtEnd && finalEvent.localMarking[toBeValidatedPlaceIndex] !== 0) {
      return new _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationResult(false, _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationPhase.FORWARDS);
    } // Don't fire all backwards!


    queue = [finalEvent];

    for (let i = this._totalOrder.length - 2; i >= 0; i--) {
      this._totalOrder[i].initializeLocalMarking(places.length);

      queue.push(this._totalOrder[i]);
    }

    const backwardsValidPlaces = LpoFirePlaceValidator.newBoolArray(places, true);
    const backwardsComplexPlaces = LpoFirePlaceValidator.newBoolArray(places, false); // Is the final marking > 0 ?

    for (let i = 0; i < places.length; i++) {
      if (finalEvent.localMarking[i] < 0) {
        backwardsValidPlaces[i] = false;
      }
    }

    this.fireBackwards(places, queue, backwardsValidPlaces, backwardsComplexPlaces); // Backwards valid place

    if (backwardsValidPlaces[toBeValidatedPlaceIndex]) {
      return new _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationResult(true, _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationPhase.BACKWARDS);
    } // backwards not valid place


    const finalBackwardsEvent = [...this._lpo.initialEvents][0];

    if (finalBackwardsEvent.localMarking[toBeValidatedPlaceIndex] < 0) {
      return new _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationResult(false, _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationPhase.FORWARDS);
    } // otherwise with flow (already validated via forward multi-token-flow for hasToBeEmptyAtEnd=true if set)


    return new _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationResult(this.checkFlowForPlace(places[toBeValidatedPlaceIndex], this._lpo.events), _classes_validation_result__WEBPACK_IMPORTED_MODULE_0__.ValidationPhase.FLOW);
  }

  buildTotalOrdering() {
    const ordering = [...this._lpo.initialEvents];
    const contained = new Set(this._lpo.initialEvents);
    const examineLater = [...this._lpo.events];

    while (examineLater.length > 0) {
      const e = examineLater.shift();

      if (contained.has(e)) {
        continue;
      }

      let add = true;

      for (const pre of e.previousEvents) {
        if (!contained.has(pre)) {
          add = false;
          break;
        }
      }

      if (add) {
        ordering.push(e);
        contained.add(e);
      } else {
        examineLater.push(e);
      }
    }

    return ordering;
  }

  fireForwards(places, queue, validPlaces, complexPlaces) {
    this.fire(places, queue, validPlaces, complexPlaces, t => t.ingoingArcs, a => a.source, t => t.outgoingArcs, a => a.destination, e => e.nextEvents);
  }

  fireBackwards(places, queue, validPlaces, complexPlaces) {
    this.fire(places, queue, validPlaces, complexPlaces, t => t.outgoingArcs, a => a.destination, t => t.ingoingArcs, a => a.source, e => e.previousEvents);
  }

  fire(places, firingOrder, validPlaces, complexPlaces, preArcs, prePlace, postArcs, postPlace, nextEvents) {
    while (firingOrder.length > 0) {
      const e = firingOrder.shift(); // can fire?

      if (e.transition !== undefined) {
        // fire
        for (const arc of preArcs(e.transition)) {
          const pIndex = this.getPIndex(places, prePlace(arc));
          e.localMarking[pIndex] = e.localMarking[pIndex] - arc.weight;

          if (e.localMarking[pIndex] < 0) {
            validPlaces[pIndex] = false;
          }
        }

        for (const arc of postArcs(e.transition)) {
          const pIndex = this.getPIndex(places, postPlace(arc));
          e.localMarking[pIndex] = e.localMarking[pIndex] + arc.weight;
        }
      } // push to first later and check for complex places


      if (nextEvents(e).size > 0) {
        for (let i = 0; i < places.length; i++) {
          if (nextEvents(e).size > 1 && e.localMarking[i] > 0) {
            complexPlaces[i] = true;
          }

          const firstLater = [...nextEvents(e)][0];
          firstLater.localMarking[i] = firstLater.localMarking[i] + e.localMarking[i];
        }
      }
    }
  }

  getPIndex(places, p) {
    return places.findIndex(pp => pp === p);
  }

  static newBoolArray(places, fill) {
    return new Array(places.length).fill(fill);
  }

}

/***/ }),

/***/ 7888:
/*!*************************************************************************************!*\
  !*** ./src/app/classes/algorithms/petri-net/validation/lpo-flow-place-validator.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LpoFlowPlaceValidator": () => (/* binding */ LpoFlowPlaceValidator)
/* harmony export */ });
/* harmony import */ var _flow_network_max_flow_preflow_n3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../flow-network/max-flow-preflow-n3 */ 9714);
/* harmony import */ var _classes_lpo_place_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/lpo-place-validator */ 457);
/* harmony import */ var _classes_validation_result__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/validation-result */ 9391);



class LpoFlowPlaceValidator extends _classes_lpo_place_validator__WEBPACK_IMPORTED_MODULE_1__.LpoPlaceValidator {
  constructor(lpo) {
    super(lpo);
  }

  validate(toBeCheckedNet, toBeValidatedPlaceId) {
    this.postUpdateModifiedLPO(toBeCheckedNet);
    const toBeEvaluatedPlaceIndex = toBeCheckedNet.getPlaces().findIndex(value => value.id === toBeValidatedPlaceId);
    const toBeEvaluatedPlace = toBeCheckedNet.getPlaces()[toBeEvaluatedPlaceIndex];
    const events = this._lpo.events;
    return new _classes_validation_result__WEBPACK_IMPORTED_MODULE_2__.ValidationResult(this.checkFlowForPlace(toBeEvaluatedPlace, events), _classes_validation_result__WEBPACK_IMPORTED_MODULE_2__.ValidationPhase.FLOW);
  }

  checkFlowForPlace(place, events) {
    const n = events.length * 2 + 2;
    const SOURCE = 0;
    const SINK = n - 1;
    const network = new _flow_network_max_flow_preflow_n3__WEBPACK_IMPORTED_MODULE_0__.MaxFlowPreflowN3(n);

    for (let eIndex = 0; eIndex < events.length; eIndex++) {
      network.setUnbounded(LpoFlowPlaceValidator.eventStart(eIndex), LpoFlowPlaceValidator.eventEnd(eIndex));
      const event = events[eIndex];

      if (event.transition === undefined) {
        if (place.marking > 0) {
          network.setCap(SOURCE, LpoFlowPlaceValidator.eventEnd(eIndex), place.marking);
        }
      } else {
        for (const outArc of event.transition.outgoingArcs) {
          const postPlace = outArc.destination;

          if (postPlace === place) {
            network.setCap(SOURCE, LpoFlowPlaceValidator.eventEnd(eIndex), outArc.weight);
          }
        }

        for (const inArc of event.transition.ingoingArcs) {
          const prePlace = inArc.source;

          if (prePlace === place) {
            network.setCap(LpoFlowPlaceValidator.eventStart(eIndex), SINK, inArc.weight);
          }
        }
      }

      for (const postEvent of event.nextEvents) {
        network.setUnbounded(LpoFlowPlaceValidator.eventEnd(eIndex), LpoFlowPlaceValidator.eventStart(events.findIndex(e => e === postEvent)));
      }
    }

    let need = 0;

    for (let ii = 0; ii < n; ii++) {
      need += network.getCap(ii, SINK);
    }

    const f = network.maxFlow(SOURCE, SINK);
    console.debug(`flow ${place.id} ${f}`);
    console.debug(`need ${place.id} ${need}`);
    return need === f;
  }

  static eventStart(eventIndex) {
    return eventIndex * 2 + 1;
  }

  static eventEnd(eventIndex) {
    return eventIndex * 2 + 2;
  }

}

/***/ }),

/***/ 3807:
/*!**************************************************************************************!*\
  !*** ./src/app/classes/algorithms/rst-miner/generators/primitive-place-generator.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrimitivePlaceGenerator": () => (/* binding */ PrimitivePlaceGenerator)
/* harmony export */ });
/* harmony import */ var _models_petri_net_place__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/petri-net/place */ 9973);
/* harmony import */ var _models_petri_net_arc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/petri-net/arc */ 6781);


class PrimitivePlaceGenerator {
  constructor(_maximalInitialMarking, _ingoingConnectionProbability, _outgoingConnectionProbability, _maximalIngoingArcWeights, _maximalOutgoingArcWeights) {
    this._maximalInitialMarking = _maximalInitialMarking;
    this._ingoingConnectionProbability = _ingoingConnectionProbability;
    this._outgoingConnectionProbability = _outgoingConnectionProbability;
    this._maximalIngoingArcWeights = _maximalIngoingArcWeights;
    this._maximalOutgoingArcWeights = _maximalOutgoingArcWeights;
  }

  init(petriNet, partialOrders) {
    return 0; // TODO
  }

  insertRandomPlace(id, petriNet) {
    const newPlace = new _models_petri_net_place__WEBPACK_IMPORTED_MODULE_0__.Place(Math.floor(Math.random() * (this._maximalInitialMarking + 1)), id);
    petriNet.addPlace(newPlace);
    Array.from(petriNet.getTransitions()).filter(transition => Math.random() < this._ingoingConnectionProbability).map(transition => new _models_petri_net_arc__WEBPACK_IMPORTED_MODULE_1__.Arc('i' + id + transition.label, transition, newPlace, Math.floor(Math.random() * this._maximalIngoingArcWeights) + 1)).forEach(arc => petriNet.addArc(arc));
    Array.from(petriNet.getTransitions()).filter(transition => Math.random() < this._outgoingConnectionProbability).map(transition => new _models_petri_net_arc__WEBPACK_IMPORTED_MODULE_1__.Arc('o' + id + transition.label, newPlace, transition, Math.floor(Math.random() * this._maximalOutgoingArcWeights) + 1)).forEach(arc => petriNet.addArc(arc));
    return newPlace;
  }

}

/***/ }),

/***/ 6615:
/*!***************************************************************************************************!*\
  !*** ./src/app/classes/algorithms/rst-miner/implicit/implicit-place-identifier-config-wrapper.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplicitPlaceIdentifierConfigWrapper": () => (/* binding */ ImplicitPlaceIdentifierConfigWrapper)
/* harmony export */ });
/* harmony import */ var _petri_net_transformation_implicit_place_identifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../petri-net/transformation/implicit-place-identifier */ 1485);
/* harmony import */ var _petri_net_transformation_classes_template_place__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../petri-net/transformation/classes/template-place */ 9605);


class ImplicitPlaceIdentifierConfigWrapper {
  constructor(allTransitionActivities, allContainedTraces, rstMinerSettings) {
    this._alreadyImplicitPlaces = new Set();
    this._implicitPlaceIdentifier = new _petri_net_transformation_implicit_place_identifier__WEBPACK_IMPORTED_MODULE_0__.ImplicitPlaceIdentifier(allTransitionActivities, allContainedTraces);
    this._implicitPlaceIdentificationConfig = rstMinerSettings.implicitPlaceIdentification;
    this.maxIngoingArcWeights = rstMinerSettings.randomPlaceGenerator.maximalIngoingArcWeights;
    this.maxOutgoingArcWeights = rstMinerSettings.randomPlaceGenerator.maximalOutgoingArcWeights;
  }

  removeImplicitPlacesForAndIncreaseCounter(addedPlace, petriNet, counter) {
    return this.internalRemoveImplicitPlacesForAndIncreaseCounter(addedPlace, petriNet, counter, this._implicitPlaceIdentificationConfig.maxDeepness);
  }

  internalRemoveImplicitPlacesForAndIncreaseCounter(addedPlace, petriNet, counter, maxRemainingDept) {
    if (this._alreadyImplicitPlaces.has(_petri_net_transformation_classes_template_place__WEBPACK_IMPORTED_MODULE_1__.TemplatePlace.toSameUniqueString(addedPlace))) {
      petriNet.removePlace(addedPlace);
      return counter;
    }

    let implicitPlaces = this._implicitPlaceIdentifier.calculateImplicitPlacesFor(addedPlace, petriNet);

    if (this._implicitPlaceIdentificationConfig.isValidateSubstituteArcWeightsEnabled) {
      implicitPlaces = implicitPlaces.filter(implicitResult => this.checkSubstitutePlacesAreValidOrEmpty(implicitResult.substitutePlaces));
    } // remove all implicit places


    implicitPlaces.forEach(implicitResult => {
      this._alreadyImplicitPlaces.add(_petri_net_transformation_classes_template_place__WEBPACK_IMPORTED_MODULE_1__.TemplatePlace.toSameUniqueString(implicitResult.implicitPlace));

      petriNet.removePlace(implicitResult.implicitPlace);
    });

    if (this._implicitPlaceIdentificationConfig.isCalculateSubstitutePlacesEnabled && (maxRemainingDept > 0 || !this._implicitPlaceIdentificationConfig.isMaxDeepnessEnabled)) {
      let allNewSubstitutePlaces = implicitPlaces.flatMap(implicitResult => implicitResult.substitutePlaces);
      allNewSubstitutePlaces.forEach(substTemplatePlace => {
        if (!this._alreadyImplicitPlaces.has(substTemplatePlace.toUniqueString())) {
          const substPlace = substTemplatePlace.buildPlaceWithId('p' + counter++);
          petriNet.addPlace(substPlace);
          substPlace.ingoingArcs.forEach(arc => petriNet.addArc(arc));
          substPlace.outgoingArcs.forEach(arc => petriNet.addArc(arc));
          counter = this.internalRemoveImplicitPlacesForAndIncreaseCounter(substPlace, petriNet, counter, maxRemainingDept - 1);
        }
      });
    }

    return counter;
  }

  checkSubstitutePlacesAreValidOrEmpty(substitutePlaces) {
    if (substitutePlaces.length === 0) {
      return true;
    }

    for (const substitutePlace of substitutePlaces) {
      for (const inTempArc of substitutePlace.unconnectedIngoingTemplateArcs) {
        if (inTempArc.weight > this.maxIngoingArcWeights) {
          return false;
        }
      }

      for (const outTempArc of substitutePlace.unconnectedOutgoingTemplateArcs) {
        if (outTempArc.weight > this.maxOutgoingArcWeights) {
          return false;
        }
      }
    }

    return true;
  }

}

/***/ }),

/***/ 5091:
/*!***********************************************************!*\
  !*** ./src/app/classes/algorithms/rst-miner/rst-miner.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RstMiner": () => (/* binding */ RstMiner)
/* harmony export */ });
/* harmony import */ var _models_petri_net_petri_net__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/petri-net/petri-net */ 1509);
/* harmony import */ var _concurrency_oracle_log_to_partial_order_transformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../concurrency-oracle/log-to-partial-order-transformer */ 3506);
/* harmony import */ var _petri_net_isomorphism_petri_net_isomorphism_tester__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../petri-net/isomorphism/petri-net-isomorphism-tester */ 3614);
/* harmony import */ var _transformation_petri_net_to_partial_order_transformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../transformation/petri-net-to-partial-order-transformer */ 1630);
/* harmony import */ var _partial_order_isomorphism_partial_order_isomorphism_tester__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../partial-order/isomorphism/partial-order-isomorphism-tester */ 6270);
/* harmony import */ var _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/petri-net/transition */ 2986);
/* harmony import */ var _petri_net_validation_lpo_fire_place_validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../petri-net/validation/lpo-fire-place-validator */ 6595);
/* harmony import */ var _implicit_implicit_place_identifier_config_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./implicit/implicit-place-identifier-config-wrapper */ 6615);








class RstMiner {
  constructor(_minerSettings) {
    this._minerSettings = _minerSettings;
    this._counterTestedPlaces = 0;
    this._concurrencyOracle = _minerSettings.concurrencyOracle.generateConcurrencyOracle();
    this._petriNetToPartialOrderTransformer = new _transformation_petri_net_to_partial_order_transformer__WEBPACK_IMPORTED_MODULE_3__.PetriNetToPartialOrderTransformer();
    this._logToPartialOrderTransformer = new _concurrency_oracle_log_to_partial_order_transformer__WEBPACK_IMPORTED_MODULE_1__.LogToPartialOrderTransformer(new _petri_net_isomorphism_petri_net_isomorphism_tester__WEBPACK_IMPORTED_MODULE_2__.PetriNetIsomorphismTester(new _transformation_petri_net_to_partial_order_transformer__WEBPACK_IMPORTED_MODULE_3__.PetriNetToPartialOrderTransformer(), new _partial_order_isomorphism_partial_order_isomorphism_tester__WEBPACK_IMPORTED_MODULE_4__.PartialOrderIsomorphismTester()), _minerSettings.partialOrderTransformation.toConfig());
    this._randomPlaceGenerator = _minerSettings.randomPlaceGenerator.buildRandomPlaceGenerator();
    this._maxPlaceFailingPercentage = _minerSettings.noiseReduction.maxPlaceFailingPercentage;
  }

  mine(eventlog) {
    this._counterTestedPlaces = 0;
    eventlog = this._minerSettings.noiseReduction.preFilterNoise(eventlog);
    const totalTraces = eventlog.traces.length;

    const concurrencyRelation = this._concurrencyOracle.determineConcurrency(eventlog);

    const partialOrderNetsWithContainedTraces = this._logToPartialOrderTransformer.transformToPartialOrders(eventlog, concurrencyRelation);

    const partialOrders = partialOrderNetsWithContainedTraces.map(partialOrderNetWithContainedTraces => partialOrderNetWithContainedTraces.net).map(partialOrderNet => this._petriNetToPartialOrderTransformer.transform(partialOrderNet));
    const allTransitionActivities = RstMiner.calculateTransitionActivities(partialOrderNetsWithContainedTraces);
    const allContainedTraces = partialOrderNetsWithContainedTraces.flatMap(partialOrderNetsWithContainedTraces => partialOrderNetsWithContainedTraces.containedTraces);
    let implicitPlaceIdentifier;

    if (this._minerSettings.implicitPlaceIdentification.isPlaceRemovalEnabled) {
      implicitPlaceIdentifier = new _implicit_implicit_place_identifier_config_wrapper__WEBPACK_IMPORTED_MODULE_7__.ImplicitPlaceIdentifierConfigWrapper([...allTransitionActivities], allContainedTraces, this._minerSettings);
    } else {
      implicitPlaceIdentifier = undefined;
    }

    let petriNet = this.createFlowerModel(allTransitionActivities);
    const lpoFirePlaceValidators = partialOrders.map(partialOrder => new _petri_net_validation_lpo_fire_place_validator__WEBPACK_IMPORTED_MODULE_6__.LpoFirePlaceValidator(partialOrder)) // Sort desc, to fire less validators for reaching failed state for place
    .sort((a, b) => b.lpoFrequency - a.lpoFrequency);

    const terminationConditionReachedFct = this._minerSettings.terminationCondition.buildIsTerminationConditionReachedFunction();

    this._counterTestedPlaces = this._randomPlaceGenerator.init(petriNet, partialOrders);

    while (!terminationConditionReachedFct(petriNet, this.counterTestedPlaces)) {
      const clonedPetriNet = petriNet.clone();

      const addedPlace = this._randomPlaceGenerator.insertRandomPlace('p' + this._counterTestedPlaces++, clonedPetriNet);

      if (!this.isGeneratedPlaceValid(addedPlace, clonedPetriNet, lpoFirePlaceValidators, totalTraces)) {
        continue;
      }

      petriNet = clonedPetriNet;

      if (implicitPlaceIdentifier != null) {
        this._counterTestedPlaces = implicitPlaceIdentifier.removeImplicitPlacesForAndIncreaseCounter(addedPlace, petriNet, this._counterTestedPlaces);
      }
    }

    return petriNet;
  }

  static calculateTransitionActivities(partialOrders) {
    return new Set(partialOrders.flatMap(value => value.net.getTransitions()).map(transition => transition.label).filter(transitionActivity => transitionActivity != null).map(transitionActivity => transitionActivity));
  }

  createFlowerModel(transitionActivities) {
    const allTransitions = [...transitionActivities].map(activity => new _models_petri_net_transition__WEBPACK_IMPORTED_MODULE_5__.Transition(activity, activity));
    const petriNet = new _models_petri_net_petri_net__WEBPACK_IMPORTED_MODULE_0__.PetriNet();
    allTransitions.forEach(transition => {
      petriNet.addTransition(transition);
    });
    return petriNet;
  }

  isGeneratedPlaceValid(addedPlace, clonedPetriNet, lpoFirePlaceValidators, totalTraces) {
    let alreadyFailedTraces = 0;

    for (const lpoFirePlaceValidator of lpoFirePlaceValidators) {
      const validationResultForPlaceAndOrder = lpoFirePlaceValidator.validate(clonedPetriNet.clone(), addedPlace.id, this._minerSettings.processModelCharacteristics.placesEmptyAtEnd);

      if (!validationResultForPlaceAndOrder.valid) {
        alreadyFailedTraces += lpoFirePlaceValidator.lpoFrequency;

        if (alreadyFailedTraces / totalTraces > this._maxPlaceFailingPercentage) {
          return false;
        }
      }
    }

    return true;
  }

  get counterTestedPlaces() {
    return this._counterTestedPlaces;
  }

}
RstMiner.MINING_ERROR = new Error('given .type log string can not be parsed');

/***/ }),

/***/ 1630:
/*!*********************************************************************************************!*\
  !*** ./src/app/classes/algorithms/transformation/petri-net-to-partial-order-transformer.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PetriNetToPartialOrderTransformer": () => (/* binding */ PetriNetToPartialOrderTransformer)
/* harmony export */ });
/* harmony import */ var _models_partial_order_partial_order__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/partial-order/partial-order */ 6965);
/* harmony import */ var _models_partial_order_partial_order_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/partial-order/partial-order-event */ 5391);


class PetriNetToPartialOrderTransformer {
  transform(net) {
    var _a;

    const badPlace = net.getPlaces().find(p => p.ingoingArcs.length > 1 || p.outgoingArcs.length > 1 || p.ingoingArcs.length === 1 && p.outgoingArcs.length === 1 && p.ingoingArcs[0].sourceId === p.outgoingArcs[0].destinationId);

    if (badPlace !== undefined) {
      throw new Error(`The given Petri net is not a partial order! The place with id '${badPlace.id}' has too many in-/outgoing arcs or is part of a self-loop.`);
    }

    const badTransition = net.getTransitions().find(t => t.ingoingArcs.length === 0 || t.outgoingArcs.length === 0 || t.label === undefined);

    if (badTransition !== undefined) {
      throw new Error(`The given Petri net is not a partial order! The transition with id '${badTransition.id}' has an empty pre-/post-set or is unlabeled`);
    }

    const result = new _models_partial_order_partial_order__WEBPACK_IMPORTED_MODULE_0__.PartialOrder(net.frequency);

    for (const t of net.getTransitions()) {
      result.addEvent(new _models_partial_order_partial_order_event__WEBPACK_IMPORTED_MODULE_1__.PartialOrderEvent(t.id, t.label));
    }

    for (const t of net.getTransitions()) {
      const event = result.getEvent(t.id);

      for (const arc of t.outgoingArcs) {
        const nextTransitionId = (_a = arc.destination.outgoingArcs[0]) === null || _a === void 0 ? void 0 : _a.destinationId;

        if (nextTransitionId !== undefined) {
          event.addNextEvent(result.getEvent(nextTransitionId));
        }
      }
    }

    return result;
  }

}

/***/ }),

/***/ 7077:
/*!********************************************************************!*\
  !*** ./src/app/classes/models/concurrency/concurrency-relation.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConcurrencyRelation": () => (/* binding */ ConcurrencyRelation)
/* harmony export */ });
/* harmony import */ var _utility_relabeler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/relabeler */ 2909);
/* harmony import */ var _occurrence_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./occurrence-matrix */ 3651);


class ConcurrencyRelation {
  constructor(relabeler) {
    this._uniqueConcurrencyMatrix = {};
    this._wildcardConcurrencyMatrix = {};
    this._mixedConcurrencyMatrix = {};
    this._wildCardLabels = new Set();
    this._relabeler = relabeler.clone();
  }

  static noConcurrency() {
    return new ConcurrencyRelation(new _utility_relabeler__WEBPACK_IMPORTED_MODULE_0__.Relabeler());
  }

  static fromOccurrenceMatrix(matrix, relabeler) {
    const result = new ConcurrencyRelation(relabeler);
    const keys = Array.from(matrix.keys);

    for (let i = 0; i < keys.length; i++) {
      const k1 = keys[i];

      for (let j = i + 1; j < keys.length; j++) {
        const k2 = keys[j];

        if (matrix.get(k1, k2) && matrix.get(k2, k1)) {
          switch (matrix.type) {
            case _occurrence_matrix__WEBPACK_IMPORTED_MODULE_1__.OccurenceMatrixType.UNIQUE:
              result.setUniqueConcurrent(k1, k2, matrix.getOccurrenceFrequency(k1, k2), matrix.getOccurrenceFrequency(k2, k1));
              break;

            case _occurrence_matrix__WEBPACK_IMPORTED_MODULE_1__.OccurenceMatrixType.WILDCARD:
              result.setWildcardConcurrent(k1, k2, matrix.getOccurrenceFrequency(k1, k2), matrix.getOccurrenceFrequency(k2, k1));
              break;
          }
        }
      }
    }

    return result;
  }

  isConcurrent(labelA, labelB) {
    const unique = this.read(this._uniqueConcurrencyMatrix, labelA, labelB);

    if (unique) {
      return true;
    }

    const wildcardA = this.getWildcard(labelA);
    const wildcardB = this.getWildcard(labelB);

    if (!wildcardA && !wildcardB) {
      return false;
    } else if (wildcardA && wildcardB) {
      return this.read(this._wildcardConcurrencyMatrix, wildcardA, wildcardB);
    } else if (wildcardA && !wildcardB) {
      return this.read(this._mixedConcurrencyMatrix, wildcardA, labelB);
    } else {
      return this.read(this._mixedConcurrencyMatrix, wildcardB, labelA);
    }
  }

  setUniqueConcurrent(uniqueLabelA, uniqueLabelB, value = true, frequencyBA) {
    if (typeof value === 'boolean') {
      this.set(this._uniqueConcurrencyMatrix, uniqueLabelA, uniqueLabelB, value);
      this.set(this._uniqueConcurrencyMatrix, uniqueLabelB, uniqueLabelA, value);
    } else {
      this.set(this._uniqueConcurrencyMatrix, uniqueLabelA, uniqueLabelB, value);
      this.set(this._uniqueConcurrencyMatrix, uniqueLabelB, uniqueLabelA, frequencyBA);
    }
  }

  setWildcardConcurrent(wildcardLabelA, wildcardLabelB, value = true, frequencyBA) {
    if (typeof value === 'boolean') {
      this.set(this._wildcardConcurrencyMatrix, wildcardLabelA, wildcardLabelB, value);
      this.set(this._wildcardConcurrencyMatrix, wildcardLabelB, wildcardLabelA, value);
    } else {
      this.set(this._wildcardConcurrencyMatrix, wildcardLabelA, wildcardLabelB, value);
      this.set(this._wildcardConcurrencyMatrix, wildcardLabelB, wildcardLabelA, frequencyBA);
    }

    this._wildCardLabels.add(wildcardLabelA);

    this._wildCardLabels.add(wildcardLabelB);
  }

  set(matrix, uniqueLabelA, uniqueLabelB, value = true) {
    const row = matrix[uniqueLabelA];

    if (row === undefined) {
      matrix[uniqueLabelA] = {
        [uniqueLabelB]: value
      };
      return;
    }

    row[uniqueLabelB] = value;
  }

  read(matrix, row, column) {
    const matrixRow = matrix[row];

    if (matrixRow === undefined) {
      return false;
    }

    return !!matrixRow[column];
  }

  getWildcard(label) {
    const undone = this.relabeler.undoLabel(label);

    if (this._wildCardLabels.has(undone)) {
      return undone;
    }

    return undefined;
  }

  get relabeler() {
    return this._relabeler;
  }

  cloneConcurrencyMatrices() {
    return {
      unique: this.cloneMatrix(this._uniqueConcurrencyMatrix),
      wildcard: this.cloneMatrix(this._wildcardConcurrencyMatrix),
      mixed: this.cloneMatrix(this._mixedConcurrencyMatrix)
    };
  }

  cloneMatrix(matrix) {
    const result = {};

    for (const row of Object.keys(matrix)) {
      for (const column of Object.keys(matrix[row])) {
        if (!matrix[row][column]) {
          continue;
        }

        this.set(result, row, column, matrix[row][column]);
      }
    }

    return result;
  }

}

/***/ }),

/***/ 3651:
/*!*****************************************************************!*\
  !*** ./src/app/classes/models/concurrency/occurrence-matrix.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OccurenceMatrixType": () => (/* binding */ OccurenceMatrixType),
/* harmony export */   "OccurrenceMatrix": () => (/* binding */ OccurrenceMatrix)
/* harmony export */ });
var OccurenceMatrixType = /*#__PURE__*/(() => {
  (function (OccurenceMatrixType) {
    OccurenceMatrixType[OccurenceMatrixType["UNIQUE"] = 0] = "UNIQUE";
    OccurenceMatrixType[OccurenceMatrixType["WILDCARD"] = 1] = "WILDCARD";
  })(OccurenceMatrixType || (OccurenceMatrixType = {}));

  return OccurenceMatrixType;
})();
class OccurrenceMatrix {
  constructor(_type) {
    this._type = _type;
    this._matrix = {};
    this._keys = new Set();
  }

  get keys() {
    return this._keys;
  }

  get type() {
    return this._type;
  }

  add(e1, e2) {
    var _a;

    const row = this._matrix[e1];

    if (row === undefined) {
      this._matrix[e1] = {
        [e2]: 1
      };
    } else {
      row[e2] = ((_a = row[e2]) !== null && _a !== void 0 ? _a : 0) + 1;
    }

    this._keys.add(e1);

    this._keys.add(e2);
  }

  get(e1, e2) {
    const row = this._matrix[e1];

    if (row === undefined) {
      return false;
    }

    return !!row[e2];
  }

  getOccurrenceFrequency(e1, e2) {
    var _a, _b;

    return (_b = (_a = this._matrix) === null || _a === void 0 ? void 0 : _a[e1]) === null || _b === void 0 ? void 0 : _b[e2];
  }

}

/***/ }),

/***/ 3341:
/*!****************************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/concurrency-oracle-config.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlphaOracleConfig": () => (/* binding */ AlphaOracleConfig),
/* harmony export */   "ConcurrencyOracleConfig": () => (/* binding */ ConcurrencyOracleConfig),
/* harmony export */   "NoneOracleConfig": () => (/* binding */ NoneOracleConfig),
/* harmony export */   "TimestampOracleConfig": () => (/* binding */ TimestampOracleConfig)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typedjson */ 8825);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var _algorithms_concurrency_oracle_none_oracle_none_oracle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../algorithms/concurrency-oracle/none-oracle/none-oracle */ 8731);
/* harmony import */ var _algorithms_concurrency_oracle_alpha_oracle_alpha_oracle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../algorithms/concurrency-oracle/alpha-oracle/alpha-oracle */ 4230);
/* harmony import */ var _algorithms_concurrency_oracle_timestamp_oracle_timestamp_oracle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../algorithms/concurrency-oracle/timestamp-oracle/timestamp-oracle */ 31);
var NoneOracleConfig_1, AlphaOracleConfig_1, TimestampOracleConfig_1;





 // Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt

class ConcurrencyOracleConfig {}
let NoneOracleConfig = NoneOracleConfig_1 = class NoneOracleConfig extends ConcurrencyOracleConfig {
  get simpleName() {
    return NoneOracleConfig_1.SIMPLE_NAME;
  }

  generateConcurrencyOracle() {
    return new _algorithms_concurrency_oracle_none_oracle_none_oracle__WEBPACK_IMPORTED_MODULE_1__.NoneOracle();
  }

};
NoneOracleConfig.SIMPLE_NAME = 'None';
NoneOracleConfig = NoneOracleConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonObject], NoneOracleConfig);

let AlphaOracleConfig = AlphaOracleConfig_1 = class AlphaOracleConfig extends ConcurrencyOracleConfig {
  constructor(lookAheadDistance = AlphaOracleConfig_1.DEFAULT_LOOK_AHEAD_DISTANCE, distinguishSameEvents = AlphaOracleConfig_1.DEFAULT_DISTINGUISH_SAME_EVENTS) {
    super();
    this._lookAheadDistance = lookAheadDistance;
    this.distinguishSameEvents = distinguishSameEvents;
  }

  get simpleName() {
    return AlphaOracleConfig_1.SIMPLE_NAME;
  }

  get lookAheadDistance() {
    return this._lookAheadDistance;
  }

  set lookAheadDistance(value) {
    if (value == null || value < 0) {
      this._lookAheadDistance = AlphaOracleConfig_1.DEFAULT_LOOK_AHEAD_DISTANCE;
    }

    this._lookAheadDistance = value;
  }

  generateConcurrencyOracle() {
    return new _algorithms_concurrency_oracle_alpha_oracle_alpha_oracle__WEBPACK_IMPORTED_MODULE_2__.AlphaOracle({
      lookAheadDistance: this._lookAheadDistance,
      distinguishSameLabels: this.distinguishSameEvents
    });
  }

};
AlphaOracleConfig.SIMPLE_NAME = 'Alpha';
AlphaOracleConfig.DEFAULT_LOOK_AHEAD_DISTANCE = 1;
AlphaOracleConfig.DEFAULT_DISTINGUISH_SAME_EVENTS = false;

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Number)], AlphaOracleConfig.prototype, "_lookAheadDistance", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Boolean)], AlphaOracleConfig.prototype, "distinguishSameEvents", void 0);

AlphaOracleConfig = AlphaOracleConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [Number, Boolean])], AlphaOracleConfig);

let TimestampOracleConfig = TimestampOracleConfig_1 = class TimestampOracleConfig extends ConcurrencyOracleConfig {
  constructor(distinguishSameEvents = TimestampOracleConfig_1.DEFAULT_DISTINGUISH_SAME_EVENTS) {
    super();
    this.distinguishSameEvents = distinguishSameEvents;
  }

  get simpleName() {
    return TimestampOracleConfig_1.SIMPLE_NAME;
  }

  generateConcurrencyOracle() {
    return new _algorithms_concurrency_oracle_timestamp_oracle_timestamp_oracle__WEBPACK_IMPORTED_MODULE_3__.TimestampOracle({
      distinguishSameLabels: this.distinguishSameEvents
    });
  }

};
TimestampOracleConfig.SIMPLE_NAME = 'Timestamp';
TimestampOracleConfig.DEFAULT_DISTINGUISH_SAME_EVENTS = false;

(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_6__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", Boolean)], TimestampOracleConfig.prototype, "distinguishSameEvents", void 0);

TimestampOracleConfig = TimestampOracleConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_5__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [Boolean])], TimestampOracleConfig);


/***/ }),

/***/ 2782:
/*!***************************************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/implicit-place-identification-config.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImplicitPlaceIdentificationConfig": () => (/* binding */ ImplicitPlaceIdentificationConfig)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 8825);
var ImplicitPlaceIdentificationConfig_1;



let ImplicitPlaceIdentificationConfig = ImplicitPlaceIdentificationConfig_1 = class ImplicitPlaceIdentificationConfig {
  constructor(isEnabled = ImplicitPlaceIdentificationConfig_1.DEFAULT_IS_ENABLED, isCalculateSubstitutePlacesEnabled = ImplicitPlaceIdentificationConfig_1.DEFAULT_IS_CALCULATE_SUBSTITUTE_PLACES_ENABLED, isValidateSubstituteArcWeightsEnabled = ImplicitPlaceIdentificationConfig_1.DEFAULT_IS_VALIDATE_SUBSTITUTE_ARC_WEIGHTS_ENABLED, isMaxDeepnessEnabled = ImplicitPlaceIdentificationConfig_1.DEFAULT_IS_MAX_DEEPNESS_ENABLED, maxDeepness = ImplicitPlaceIdentificationConfig_1.DEFAULT_MAX_DEEPNESS) {
    this.isPlaceRemovalEnabled = isEnabled;
    this.isCalculateSubstitutePlacesEnabled = isCalculateSubstitutePlacesEnabled;
    this.isValidateSubstituteArcWeightsEnabled = isValidateSubstituteArcWeightsEnabled;
    this.isMaxDeepnessEnabled = isMaxDeepnessEnabled;
    this._maxDeepness = maxDeepness;
  }

  get maxDeepness() {
    return this._maxDeepness;
  }

  set maxDeepness(value) {
    if (value < 1) {
      this._maxDeepness = ImplicitPlaceIdentificationConfig_1.DEFAULT_MAX_DEEPNESS;
    } else {
      this._maxDeepness = value;
    }
  }

};
ImplicitPlaceIdentificationConfig.DEFAULT_IS_ENABLED = true;
ImplicitPlaceIdentificationConfig.DEFAULT_IS_CALCULATE_SUBSTITUTE_PLACES_ENABLED = true;
ImplicitPlaceIdentificationConfig.DEFAULT_IS_VALIDATE_SUBSTITUTE_ARC_WEIGHTS_ENABLED = true;
ImplicitPlaceIdentificationConfig.DEFAULT_IS_MAX_DEEPNESS_ENABLED = false;
ImplicitPlaceIdentificationConfig.DEFAULT_MAX_DEEPNESS = 3;

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], ImplicitPlaceIdentificationConfig.prototype, "isPlaceRemovalEnabled", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], ImplicitPlaceIdentificationConfig.prototype, "isCalculateSubstitutePlacesEnabled", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], ImplicitPlaceIdentificationConfig.prototype, "isValidateSubstituteArcWeightsEnabled", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], ImplicitPlaceIdentificationConfig.prototype, "isMaxDeepnessEnabled", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Number)], ImplicitPlaceIdentificationConfig.prototype, "_maxDeepness", void 0);

ImplicitPlaceIdentificationConfig = ImplicitPlaceIdentificationConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Boolean, Boolean, Boolean, Boolean, Number])], ImplicitPlaceIdentificationConfig);


/***/ }),

/***/ 3671:
/*!*************************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/noise-reduction-config.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoNoiseReductionConfig": () => (/* binding */ NoNoiseReductionConfig),
/* harmony export */   "NoiseReductionConfig": () => (/* binding */ NoiseReductionConfig),
/* harmony export */   "PlaceEvaluationNoiseReductionConfig": () => (/* binding */ PlaceEvaluationNoiseReductionConfig),
/* harmony export */   "PreprocessingNoiseReductionConfig": () => (/* binding */ PreprocessingNoiseReductionConfig)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 8825);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 382);
var NoNoiseReductionConfig_1, PreprocessingNoiseReductionConfig_1, PlaceEvaluationNoiseReductionConfig_1;


 // Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt

class NoiseReductionConfig {}
let NoNoiseReductionConfig = NoNoiseReductionConfig_1 = class NoNoiseReductionConfig extends NoiseReductionConfig {
  get simpleName() {
    return NoNoiseReductionConfig_1.SIMPLE_NAME;
  }

  preFilterNoise(toBeFiltered) {
    return toBeFiltered;
  }

  get maxPlaceFailingPercentage() {
    return 0;
  }

};
NoNoiseReductionConfig.SIMPLE_NAME = 'None ';
NoNoiseReductionConfig = NoNoiseReductionConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonObject], NoNoiseReductionConfig);

let PreprocessingNoiseReductionConfig = PreprocessingNoiseReductionConfig_1 = class PreprocessingNoiseReductionConfig extends NoiseReductionConfig {
  constructor(fittingProportion = PreprocessingNoiseReductionConfig_1.DEFAULT_FITTING_PROPORTION) {
    super();
    this._fittingProportion = fittingProportion;
  }

  get simpleName() {
    return PreprocessingNoiseReductionConfig_1.SIMPLE_NAME;
  }

  get fittingProportion() {
    return this._fittingProportion;
  }

  set fittingProportion(value) {
    if (value < 0 || value > 1) {
      this._fittingProportion = PreprocessingNoiseReductionConfig_1.DEFAULT_FITTING_PROPORTION;
    } else {
      this._fittingProportion = value;
    }
  }

  preFilterNoise(toBeFiltered) {
    const numContainedTraces = toBeFiltered.traces.length;
    const traceVariants = toBeFiltered.sortedTraceVariants; // take mostly occurred variants until limit reached, then only take the ones with last taken occurrences

    let alreadyProcessed = 0;
    let alsoTake = -1;
    const relevantTraces = traceVariants.filter(value => {
      const take = alreadyProcessed / numContainedTraces < this._fittingProportion || value.length == alsoTake;
      alreadyProcessed += value.length;

      if (take) {
        alsoTake = value.length;
      }

      return take;
    }).flatMap(value => value);
    toBeFiltered.traces = relevantTraces;
    return toBeFiltered;
  }

  get maxPlaceFailingPercentage() {
    return 0;
  }

};
PreprocessingNoiseReductionConfig.SIMPLE_NAME = 'Preprocessing ';
PreprocessingNoiseReductionConfig.DEFAULT_FITTING_PROPORTION = 0.8;

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Number)], PreprocessingNoiseReductionConfig.prototype, "_fittingProportion", void 0);

PreprocessingNoiseReductionConfig = PreprocessingNoiseReductionConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Number])], PreprocessingNoiseReductionConfig);

let PlaceEvaluationNoiseReductionConfig = PlaceEvaluationNoiseReductionConfig_1 = class PlaceEvaluationNoiseReductionConfig extends NoiseReductionConfig {
  constructor(fittingProportion = PlaceEvaluationNoiseReductionConfig_1.DEFAULT_FITTING_PROPORTION) {
    super();
    this._fittingProportion = fittingProportion;
  }

  get simpleName() {
    return PlaceEvaluationNoiseReductionConfig_1.SIMPLE_NAME;
  }

  get fittingProportion() {
    return this._fittingProportion;
  }

  set fittingProportion(value) {
    if (value < 0 || value > 1) {
      this._fittingProportion = PlaceEvaluationNoiseReductionConfig_1.DEFAULT_FITTING_PROPORTION;
    } else {
      this._fittingProportion = value;
    }
  }

  preFilterNoise(toBeFiltered) {
    return toBeFiltered;
  }

  get maxPlaceFailingPercentage() {
    return 1 - this._fittingProportion;
  }

};
PlaceEvaluationNoiseReductionConfig.SIMPLE_NAME = 'Place Evaluation';
PlaceEvaluationNoiseReductionConfig.DEFAULT_FITTING_PROPORTION = 0.8;

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Number)], PlaceEvaluationNoiseReductionConfig.prototype, "_fittingProportion", void 0);

PlaceEvaluationNoiseReductionConfig = PlaceEvaluationNoiseReductionConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Number])], PlaceEvaluationNoiseReductionConfig);


/***/ }),

/***/ 6278:
/*!**************************************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/partial-order-transformation-config.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PartialOrderTransformationConfig": () => (/* binding */ PartialOrderTransformationConfig)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 8825);
var PartialOrderTransformationConfig_1;



let PartialOrderTransformationConfig = PartialOrderTransformationConfig_1 = class PartialOrderTransformationConfig {
  constructor(cleanLifecycle = PartialOrderTransformationConfig_1.DEFAULT_CLEAN_LIFECYCLE, addStartStopEvent = PartialOrderTransformationConfig_1.DEFAULT_ADD_START_STOP_EVENT, discardPrefixes = PartialOrderTransformationConfig_1.DEFAULT_DISCARD_PREFIXES) {
    this.cleanLifecycle = cleanLifecycle;
    this.addStartStopEvent = addStartStopEvent;
    this.discardPrefixes = discardPrefixes;
  }

  toConfig() {
    return {
      cleanLog: this.cleanLifecycle,
      addStartStopEvent: this.addStartStopEvent,
      discardPrefixes: this.discardPrefixes
    };
  }

};
PartialOrderTransformationConfig.DEFAULT_CLEAN_LIFECYCLE = true;
PartialOrderTransformationConfig.DEFAULT_ADD_START_STOP_EVENT = false;
PartialOrderTransformationConfig.DEFAULT_DISCARD_PREFIXES = true;

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], PartialOrderTransformationConfig.prototype, "cleanLifecycle", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], PartialOrderTransformationConfig.prototype, "addStartStopEvent", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], PartialOrderTransformationConfig.prototype, "discardPrefixes", void 0);

PartialOrderTransformationConfig = PartialOrderTransformationConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Boolean, Boolean, Boolean])], PartialOrderTransformationConfig);


/***/ }),

/***/ 1173:
/*!***************************************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/process-model-characteristics-config.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcessModelCharacteristicsConfig": () => (/* binding */ ProcessModelCharacteristicsConfig)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 8825);
var ProcessModelCharacteristicsConfig_1;



let ProcessModelCharacteristicsConfig = ProcessModelCharacteristicsConfig_1 = class ProcessModelCharacteristicsConfig {
  constructor(placesEmptyAtEnd = ProcessModelCharacteristicsConfig_1.DEFAULT_PLACES_EMPTY_AT_END, workflowNet = ProcessModelCharacteristicsConfig_1.DEFAULT_WORKFLOW_NET) {
    this.placesEmptyAtEnd = placesEmptyAtEnd;
    this.workflowNet = workflowNet;
  }

};
ProcessModelCharacteristicsConfig.DEFAULT_PLACES_EMPTY_AT_END = false;
ProcessModelCharacteristicsConfig.DEFAULT_WORKFLOW_NET = false;

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], ProcessModelCharacteristicsConfig.prototype, "placesEmptyAtEnd", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_2__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:type", Boolean)], ProcessModelCharacteristicsConfig.prototype, "workflowNet", void 0);

ProcessModelCharacteristicsConfig = ProcessModelCharacteristicsConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)("design:paramtypes", [Boolean, Boolean])], ProcessModelCharacteristicsConfig);


/***/ }),

/***/ 185:
/*!********************************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/random-place-generator-config.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrimitiveGeneratorConfig": () => (/* binding */ PrimitiveGeneratorConfig),
/* harmony export */   "RandomPlaceGeneratorConfig": () => (/* binding */ RandomPlaceGeneratorConfig)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 8825);
/* harmony import */ var _algorithms_rst_miner_generators_primitive_place_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../algorithms/rst-miner/generators/primitive-place-generator */ 3807);
var PrimitiveGeneratorConfig_1;



 // Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt

class RandomPlaceGeneratorConfig {}
let PrimitiveGeneratorConfig = PrimitiveGeneratorConfig_1 = class PrimitiveGeneratorConfig extends RandomPlaceGeneratorConfig {
  constructor(maximalInitialMarking = PrimitiveGeneratorConfig_1.DEFAULT_MAXIMAL_INITIAL_MARKING, ingoingConnectionProbability = PrimitiveGeneratorConfig_1.DEFAULT_INGOING_CONNECTION_PROBABILITY, outgoingConnectionProbability = PrimitiveGeneratorConfig_1.DEFAULT_OUTGOING_CONNECTION_PROBABILITY, maximalIngoingArcWeights = PrimitiveGeneratorConfig_1.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS, maximalOutgoingArcWeights = PrimitiveGeneratorConfig_1.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS) {
    super();
    this._maximalInitialMarking = maximalInitialMarking;
    this._ingoingConnectionProbability = ingoingConnectionProbability;
    this._outgoingConnectionProbability = outgoingConnectionProbability;
    this._maximalIngoingArcWeights = maximalIngoingArcWeights;
    this._maximalOutgoingArcWeights = maximalOutgoingArcWeights;
  }

  get simpleName() {
    return PrimitiveGeneratorConfig_1.SIMPLE_NAME;
  }

  get ingoingConnectionProbability() {
    return this._ingoingConnectionProbability;
  }

  set ingoingConnectionProbability(value) {
    if (value == null || value < 0 || value > 1) {
      this._ingoingConnectionProbability = PrimitiveGeneratorConfig_1.DEFAULT_INGOING_CONNECTION_PROBABILITY;
    } else {
      this._ingoingConnectionProbability = value;
    }
  }

  get outgoingConnectionProbability() {
    return this._outgoingConnectionProbability;
  }

  set outgoingConnectionProbability(value) {
    if (value == null || value < 0 || value > 1) {
      this._outgoingConnectionProbability = PrimitiveGeneratorConfig_1.DEFAULT_OUTGOING_CONNECTION_PROBABILITY;
    } else {
      this._outgoingConnectionProbability = value;
    }
  }

  get maximalInitialMarking() {
    return this._maximalInitialMarking;
  }

  set maximalInitialMarking(value) {
    if (value == null || value < 0 || value > 100) {
      this._maximalInitialMarking = PrimitiveGeneratorConfig_1.DEFAULT_MAXIMAL_INITIAL_MARKING;
    } else {
      this._maximalInitialMarking = value;
    }
  }

  get maximalIngoingArcWeights() {
    return this._maximalIngoingArcWeights;
  }

  set maximalIngoingArcWeights(value) {
    if (value == null || value < 1 || value > 100) {
      this._maximalIngoingArcWeights = PrimitiveGeneratorConfig_1.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS;
    } else {
      this._maximalIngoingArcWeights = value;
    }
  }

  get maximalOutgoingArcWeights() {
    return this._maximalOutgoingArcWeights;
  }

  set maximalOutgoingArcWeights(value) {
    if (value == null || value < 1 || value > 100) {
      this._maximalOutgoingArcWeights = PrimitiveGeneratorConfig_1.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS;
    } else {
      this._maximalOutgoingArcWeights = value;
    }
  }

  buildRandomPlaceGenerator() {
    return new _algorithms_rst_miner_generators_primitive_place_generator__WEBPACK_IMPORTED_MODULE_1__.PrimitivePlaceGenerator(this._maximalInitialMarking, this._ingoingConnectionProbability, this._outgoingConnectionProbability, this._maximalIngoingArcWeights, this._maximalOutgoingArcWeights);
  }

};
PrimitiveGeneratorConfig.SIMPLE_NAME = 'Primitive';
PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INITIAL_MARKING = 1;
PrimitiveGeneratorConfig.DEFAULT_INGOING_CONNECTION_PROBABILITY = 0.3;
PrimitiveGeneratorConfig.DEFAULT_OUTGOING_CONNECTION_PROBABILITY = 0.3;
PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS = 1;
PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS = 1;

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], PrimitiveGeneratorConfig.prototype, "_maximalInitialMarking", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], PrimitiveGeneratorConfig.prototype, "_ingoingConnectionProbability", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], PrimitiveGeneratorConfig.prototype, "_outgoingConnectionProbability", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], PrimitiveGeneratorConfig.prototype, "_maximalIngoingArcWeights", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], PrimitiveGeneratorConfig.prototype, "_maximalOutgoingArcWeights", void 0);

PrimitiveGeneratorConfig = PrimitiveGeneratorConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [Number, Number, Number, Number, Number])], PrimitiveGeneratorConfig);


/***/ }),

/***/ 611:
/*!*********************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/rst-miner-settings.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RstMinerSettings": () => (/* binding */ RstMinerSettings)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! typedjson */ 8825);
/* harmony import */ var _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./termination-condition-config */ 2519);
/* harmony import */ var _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./concurrency-oracle-config */ 3341);
/* harmony import */ var _partial_order_transformation_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./partial-order-transformation-config */ 6278);
/* harmony import */ var _random_place_generator_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./random-place-generator-config */ 185);
/* harmony import */ var _implicit_place_identification_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./implicit-place-identification-config */ 2782);
/* harmony import */ var _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./noise-reduction-config */ 3671);
/* harmony import */ var _process_model_characteristics_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./process-model-characteristics-config */ 1173);
var RstMinerSettings_1;










let RstMinerSettings = RstMinerSettings_1 = class RstMinerSettings {
  constructor(processModelCharacteristics = new _process_model_characteristics_config__WEBPACK_IMPORTED_MODULE_7__.ProcessModelCharacteristicsConfig(), noiseReduction = new _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.NoNoiseReductionConfig(), concurrencyOracle = new _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.NoneOracleConfig(), partialOrderTransformationConfig = new _partial_order_transformation_config__WEBPACK_IMPORTED_MODULE_3__.PartialOrderTransformationConfig(), randomPlaceGenerator = new _random_place_generator_config__WEBPACK_IMPORTED_MODULE_4__.PrimitiveGeneratorConfig(), terminationCondition = new _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.TimeBasedTerminationConfig(), implicitPlaceIdentification = new _implicit_place_identification_config__WEBPACK_IMPORTED_MODULE_5__.ImplicitPlaceIdentificationConfig(), isDebugModusEnabled = RstMinerSettings_1.DEFAULT_DEBUG_MODUS_ENABLED) {
    this.processModelCharacteristics = processModelCharacteristics;
    this.noiseReduction = noiseReduction;
    this.concurrencyOracle = concurrencyOracle;
    this.partialOrderTransformation = partialOrderTransformationConfig;
    this.randomPlaceGenerator = randomPlaceGenerator;
    this.terminationCondition = terminationCondition;
    this.implicitPlaceIdentification = implicitPlaceIdentification;
    this.isDebugModusEnabled = isDebugModusEnabled;
  }

};
RstMinerSettings.DEFAULT_DEBUG_MODUS_ENABLED = false;
RstMinerSettings.noiseReductionTypesSimpleNames = [_noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.NoNoiseReductionConfig.SIMPLE_NAME, _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.PreprocessingNoiseReductionConfig.SIMPLE_NAME, _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.PlaceEvaluationNoiseReductionConfig.SIMPLE_NAME];
RstMinerSettings.concurrencyOracleTypesSimpleNames = [_concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.NoneOracleConfig.SIMPLE_NAME, _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.AlphaOracleConfig.SIMPLE_NAME, _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.TimestampOracleConfig.SIMPLE_NAME];
RstMinerSettings.terminationTypesSimpleNames = [_termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.LoopBasedTerminationConfig.SIMPLE_NAME, _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.EvaluatedPlacesTerminationConfig.SIMPLE_NAME, _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.TimeBasedTerminationConfig.SIMPLE_NAME];
RstMinerSettings.randomPlaceGeneratorTypesSimpleNames = [_random_place_generator_config__WEBPACK_IMPORTED_MODULE_4__.PrimitiveGeneratorConfig.SIMPLE_NAME];

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(_process_model_characteristics_config__WEBPACK_IMPORTED_MODULE_7__.ProcessModelCharacteristicsConfig), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", _process_model_characteristics_config__WEBPACK_IMPORTED_MODULE_7__.ProcessModelCharacteristicsConfig)], RstMinerSettings.prototype, "processModelCharacteristics", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(_noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.NoiseReductionConfig), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.NoiseReductionConfig)], RstMinerSettings.prototype, "noiseReduction", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(_concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.ConcurrencyOracleConfig), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.ConcurrencyOracleConfig)], RstMinerSettings.prototype, "concurrencyOracle", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(_partial_order_transformation_config__WEBPACK_IMPORTED_MODULE_3__.PartialOrderTransformationConfig), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", _partial_order_transformation_config__WEBPACK_IMPORTED_MODULE_3__.PartialOrderTransformationConfig)], RstMinerSettings.prototype, "partialOrderTransformation", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(_random_place_generator_config__WEBPACK_IMPORTED_MODULE_4__.RandomPlaceGeneratorConfig), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", _random_place_generator_config__WEBPACK_IMPORTED_MODULE_4__.RandomPlaceGeneratorConfig)], RstMinerSettings.prototype, "randomPlaceGenerator", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(_termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.TerminationConditionConfig), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.TerminationConditionConfig)], RstMinerSettings.prototype, "terminationCondition", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(_implicit_place_identification_config__WEBPACK_IMPORTED_MODULE_5__.ImplicitPlaceIdentificationConfig), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", _implicit_place_identification_config__WEBPACK_IMPORTED_MODULE_5__.ImplicitPlaceIdentificationConfig)], RstMinerSettings.prototype, "implicitPlaceIdentification", void 0);

(0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_9__.jsonMember)(Boolean), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:type", Boolean)], RstMinerSettings.prototype, "isDebugModusEnabled", void 0);

RstMinerSettings = RstMinerSettings_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_10__.jsonObject)({
  knownTypes: [_noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.NoNoiseReductionConfig, _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.PreprocessingNoiseReductionConfig, _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.PlaceEvaluationNoiseReductionConfig, _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.NoneOracleConfig, _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.AlphaOracleConfig, _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.TimestampOracleConfig, _random_place_generator_config__WEBPACK_IMPORTED_MODULE_4__.PrimitiveGeneratorConfig, _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.LoopBasedTerminationConfig, _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.EvaluatedPlacesTerminationConfig, _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.TimeBasedTerminationConfig]
}), (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__metadata)("design:paramtypes", [_process_model_characteristics_config__WEBPACK_IMPORTED_MODULE_7__.ProcessModelCharacteristicsConfig, _noise_reduction_config__WEBPACK_IMPORTED_MODULE_6__.NoiseReductionConfig, _concurrency_oracle_config__WEBPACK_IMPORTED_MODULE_2__.ConcurrencyOracleConfig, _partial_order_transformation_config__WEBPACK_IMPORTED_MODULE_3__.PartialOrderTransformationConfig, _random_place_generator_config__WEBPACK_IMPORTED_MODULE_4__.RandomPlaceGeneratorConfig, _termination_condition_config__WEBPACK_IMPORTED_MODULE_1__.TerminationConditionConfig, _implicit_place_identification_config__WEBPACK_IMPORTED_MODULE_5__.ImplicitPlaceIdentificationConfig, Boolean])], RstMinerSettings);


/***/ }),

/***/ 2519:
/*!*******************************************************************************!*\
  !*** ./src/app/classes/models/miner-settings/termination-condition-config.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EvaluatedPlacesTerminationConfig": () => (/* binding */ EvaluatedPlacesTerminationConfig),
/* harmony export */   "LoopBasedTerminationConfig": () => (/* binding */ LoopBasedTerminationConfig),
/* harmony export */   "TerminationConditionConfig": () => (/* binding */ TerminationConditionConfig),
/* harmony export */   "TimeBasedTerminationConfig": () => (/* binding */ TimeBasedTerminationConfig)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 655);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ 3037);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typedjson */ 382);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 8825);
/* harmony import */ var ts_duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-duration */ 3997);
var LoopBasedTerminationConfig_1, EvaluatedPlacesTerminationConfig_1, TimeBasedTerminationConfig_1;




let TerminationConditionConfig = /*#__PURE__*/(() => {
  class TerminationConditionConfig {
    constructor(noChangeSinceEnabled = TerminationConditionConfig.DEFAULT_NO_CHANGE_SINCE_ENABLED) {
      this._noChangeSinceEnabled = noChangeSinceEnabled;
    }

    buildIsTerminationConditionReachedFunction() {
      if (!this._noChangeSinceEnabled) {
        return this.toIsTerminationConditionReachedFunction();
      } else {
        function calculateLastChangedPlace(petriNet) {
          const placeNumbers = petriNet.getPlaces().map(place => Number.parseInt(place.id.substring(1))); // remove p-prefix

          if (placeNumbers.length > 0) {
            return placeNumbers.sort((a, b) => b - a)[0];
          }

          return -1;
        }

        const subCondition = this;
        let prevLastChangedPlace = -1;
        let subConditionReachedFct = subCondition.toIsTerminationConditionReachedFunction();
        return function (actState, numPlacesEvaluated) {
          let lastChangedPlace = calculateLastChangedPlace(actState);
          const changed = prevLastChangedPlace !== lastChangedPlace; // reset of terminationReachedFct

          if (changed) {
            prevLastChangedPlace = lastChangedPlace;
            subConditionReachedFct = subCondition.toIsTerminationConditionReachedFunction();
          } // also need to calculate places evaluated since last change


          const numPlacesEvaluatedSinceLastChange = numPlacesEvaluated - prevLastChangedPlace;
          return subConditionReachedFct(actState, numPlacesEvaluatedSinceLastChange);
        };
      }
    }

    get noChangeSinceEnabled() {
      return this._noChangeSinceEnabled;
    }

    set noChangeSinceEnabled(value) {
      this._noChangeSinceEnabled = value;
    }

  }

  TerminationConditionConfig.DEFAULT_NO_CHANGE_SINCE_ENABLED = false;
  return TerminationConditionConfig;
})();
let LoopBasedTerminationConfig = LoopBasedTerminationConfig_1 = class LoopBasedTerminationConfig extends TerminationConditionConfig {
  constructor(loopAmount = LoopBasedTerminationConfig_1.DEFAULT_ITERATIONS) {
    super();
    this._loopAmount = loopAmount;
  }

  get simpleName() {
    return LoopBasedTerminationConfig_1.SIMPLE_NAME;
  }

  get loopAmount() {
    return this._loopAmount;
  }

  set loopAmount(value) {
    if (value == null || value <= 0) {
      this._loopAmount = LoopBasedTerminationConfig_1.DEFAULT_ITERATIONS;
    } else {
      this._loopAmount = value;
    }
  }

  toIsTerminationConditionReachedFunction() {
    const loopAmount = this._loopAmount;
    let actLoop = 0;
    return function (actState, numPlacesEvaluated) {
      actLoop++;
      return actLoop >= loopAmount;
    };
  }

};
LoopBasedTerminationConfig.SIMPLE_NAME = 'Loop Iterations';
LoopBasedTerminationConfig.DEFAULT_ITERATIONS = 10000;

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], LoopBasedTerminationConfig.prototype, "_loopAmount", void 0);

LoopBasedTerminationConfig = LoopBasedTerminationConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [Number])], LoopBasedTerminationConfig);

let EvaluatedPlacesTerminationConfig = EvaluatedPlacesTerminationConfig_1 = class EvaluatedPlacesTerminationConfig extends TerminationConditionConfig {
  constructor(amountOfPlaces = EvaluatedPlacesTerminationConfig_1.DEFAULT_AMOUNT_EVALUATED_OF_PLACES) {
    super();
    this._amountOfEvaluatedPlaces = amountOfPlaces;
  }

  get simpleName() {
    return EvaluatedPlacesTerminationConfig_1.SIMPLE_NAME;
  }

  get amountOfEvaluatedPlaces() {
    return this._amountOfEvaluatedPlaces;
  }

  set amountOfEvaluatedPlaces(value) {
    if (value == null || value <= 0) {
      this._amountOfEvaluatedPlaces = EvaluatedPlacesTerminationConfig_1.DEFAULT_AMOUNT_EVALUATED_OF_PLACES;
    } else {
      this._amountOfEvaluatedPlaces = value;
    }
  }

  toIsTerminationConditionReachedFunction() {
    const amountOfPlaces = this._amountOfEvaluatedPlaces;
    return function (actState, numPlacesEvaluated) {
      return numPlacesEvaluated >= amountOfPlaces;
    };
  }

};
EvaluatedPlacesTerminationConfig.SIMPLE_NAME = 'Evaluated Places';
EvaluatedPlacesTerminationConfig.DEFAULT_AMOUNT_EVALUATED_OF_PLACES = 500000;

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], EvaluatedPlacesTerminationConfig.prototype, "_amountOfEvaluatedPlaces", void 0);

EvaluatedPlacesTerminationConfig = EvaluatedPlacesTerminationConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [Number])], EvaluatedPlacesTerminationConfig);

let TimeBasedTerminationConfig = TimeBasedTerminationConfig_1 = class TimeBasedTerminationConfig extends TerminationConditionConfig {
  constructor(duration = TimeBasedTerminationConfig_1.DEFAULT_DURATION) {
    super();
    this._durationInMs = duration.milliseconds;
  }

  get simpleName() {
    return TimeBasedTerminationConfig_1.SIMPLE_NAME;
  }

  get duration() {
    return ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration.millisecond(this._durationInMs);
  }

  set duration(value) {
    if (value == null || value.milliseconds < 0) {
      this._durationInMs = TimeBasedTerminationConfig_1.DEFAULT_DURATION.milliseconds;
    } else {
      this._durationInMs = value.milliseconds;
    }
  }

  getDurationIn(timeUnit) {
    switch (timeUnit) {
      case TimeBasedTerminationConfig_1.MILLISECONDS:
        return this.duration.milliseconds;

      case TimeBasedTerminationConfig_1.SECONDS:
        return this.duration.seconds;

      case TimeBasedTerminationConfig_1.MINUTES:
        return this.duration.minutes;

      case TimeBasedTerminationConfig_1.HOURS:
        return this.duration.hours;
    }

    return -1;
  }

  setDurationIn(timeUnit, value) {
    if (value == null || value < 0) {
      this.duration = TimeBasedTerminationConfig_1.DEFAULT_DURATION;
    } else {
      switch (timeUnit) {
        case TimeBasedTerminationConfig_1.MILLISECONDS:
          this.duration = ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration.millisecond(value);
          break;

        case TimeBasedTerminationConfig_1.SECONDS:
          this.duration = ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration.second(value);
          break;

        case TimeBasedTerminationConfig_1.MINUTES:
          this.duration = ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration.minute(value);
          break;

        case TimeBasedTerminationConfig_1.HOURS:
          this.duration = ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration.hour(value);
          break;
      }
    }
  }

  toIsTerminationConditionReachedFunction() {
    const durationInMs = this._durationInMs;
    const startTime = new Date();
    return function (actState, numPlacesEvaluated) {
      return ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration.since(startTime).milliseconds >= durationInMs;
    };
  }

};
TimeBasedTerminationConfig.SIMPLE_NAME = 'Time Duration';
TimeBasedTerminationConfig.DEFAULT_DURATION = ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration.second(30);
TimeBasedTerminationConfig.MILLISECONDS = 'ms';
TimeBasedTerminationConfig.SECONDS = 's';
TimeBasedTerminationConfig.MINUTES = 'm';
TimeBasedTerminationConfig.HOURS = 'h';
TimeBasedTerminationConfig.SUPPORTED_TIME_UNITS = [TimeBasedTerminationConfig_1.MILLISECONDS, TimeBasedTerminationConfig_1.SECONDS, TimeBasedTerminationConfig_1.MINUTES, TimeBasedTerminationConfig_1.HOURS];

(0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,typedjson__WEBPACK_IMPORTED_MODULE_3__.jsonMember)(Number), (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Number)], TimeBasedTerminationConfig.prototype, "_durationInMs", void 0);

TimeBasedTerminationConfig = TimeBasedTerminationConfig_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([typedjson__WEBPACK_IMPORTED_MODULE_4__.jsonObject, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [ts_duration__WEBPACK_IMPORTED_MODULE_1__.Duration])], TimeBasedTerminationConfig);


/***/ }),

/***/ 5391:
/*!*********************************************************************!*\
  !*** ./src/app/classes/models/partial-order/partial-order-event.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PartialOrderEvent": () => (/* binding */ PartialOrderEvent)
/* harmony export */ });
class PartialOrderEvent {
  constructor(id, label) {
    this._id = id;
    this._label = label;
    this._nextEvents = new Set();
    this._previousEvents = new Set();
  }

  get id() {
    return this._id;
  }

  get label() {
    return this._label;
  }

  get nextEvents() {
    return this._nextEvents;
  }

  get previousEvents() {
    return this._previousEvents;
  }

  get transition() {
    return this._transition;
  }

  set transition(value) {
    this._transition = value;
  }

  get localMarking() {
    return this._localMarking;
  }

  addNextEvent(event) {
    this._nextEvents.add(event);

    event.addPreviousEvent(this);
  }

  addPreviousEvent(event) {
    this._previousEvents.add(event);
  }

  initializeLocalMarking(size) {
    this._localMarking = new Array(size).fill(0);
  }

}

/***/ }),

/***/ 6965:
/*!***************************************************************!*\
  !*** ./src/app/classes/models/partial-order/partial-order.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PartialOrder": () => (/* binding */ PartialOrder)
/* harmony export */ });
/* harmony import */ var _partial_order_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partial-order-event */ 5391);

class PartialOrder {
  constructor(frequency = 0) {
    this.frequency = frequency;
    this._events = new Map();
    this._initialEvents = new Set();
    this._finalEvents = new Set();
  }

  get initialEvents() {
    return this._initialEvents;
  }

  get finalEvents() {
    return this._finalEvents;
  }

  get events() {
    return Array.from(this._events.values());
  }

  getEvent(id) {
    return this._events.get(id);
  }

  addEvent(event) {
    if (this._events.has(event.id)) {
      throw new Error(`An event with id '${event.id}' already exists in this partial order!`);
    }

    this._events.set(event.id, event);
  }

  determineInitialAndFinalEvents() {
    this._initialEvents.clear();

    this._finalEvents.clear();

    for (const e of this._events.values()) {
      if (e.previousEvents.size === 0) {
        this._initialEvents.add(e);
      }

      if (e.nextEvents.size === 0) {
        this._finalEvents.add(e);
      }
    }
  }

  clone() {
    const result = new PartialOrder(this.frequency);

    for (const e of this._events.values()) {
      result.addEvent(new _partial_order_event__WEBPACK_IMPORTED_MODULE_0__.PartialOrderEvent(e.id, e.label));
    }

    for (const e of this._events.values()) {
      const cloneE = result.getEvent(e.id);

      for (const nextE of e.nextEvents) {
        cloneE.addNextEvent(result.getEvent(nextE.id));
      }
    }

    result.determineInitialAndFinalEvents();
    return result;
  }

}

/***/ }),

/***/ 6781:
/*!*************************************************!*\
  !*** ./src/app/classes/models/petri-net/arc.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Arc": () => (/* binding */ Arc)
/* harmony export */ });
/* harmony import */ var _utility_get_by_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/get-by-id */ 5487);

class Arc extends _utility_get_by_id__WEBPACK_IMPORTED_MODULE_0__.Identifiable {
  constructor(id, source, destination, weight = 1) {
    super(id);
    this._source = source;
    this._destination = destination;
    this._weight = weight;

    this._source.addOutgoingArc(this);

    this._destination.addIngoingArc(this);
  }

  get sourceId() {
    return this._source.getId();
  }

  get destinationId() {
    return this._destination.getId();
  }

  get source() {
    return this._source;
  }

  get destination() {
    return this._destination;
  }

  get weight() {
    return this._weight;
  }

  set weight(value) {
    this._weight = value;
  }

}

/***/ }),

/***/ 2294:
/*!*****************************************************!*\
  !*** ./src/app/classes/models/petri-net/marking.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Marking": () => (/* binding */ Marking)
/* harmony export */ });
class Marking {
  constructor(marking) {
    this._marking = Object.assign({}, marking instanceof Marking ? marking._marking : marking);
  }

  get(placeId) {
    return this._marking[placeId];
  }

  set(placeId, tokens) {
    this._marking[placeId] = tokens;
  }

  equals(marking) {
    const [myKeys, otherKeys] = this.getComparisonKeys(marking);

    if (myKeys.length !== otherKeys.size) {
      return false;
    }

    for (const key of myKeys) {
      if (this.get(key) !== marking.get(key)) {
        return false;
      }

      otherKeys.delete(key);
    }

    return otherKeys.size === 0;
  }

  isGreaterThan(marking) {
    const [myKeys, otherKeys] = this.getComparisonKeys(marking);

    if (myKeys.length !== otherKeys.size) {
      return false;
    }

    let isGreater = false;

    for (const key of myKeys) {
      const thisM = this.get(key);
      const otherM = marking.get(key);

      if (thisM === undefined || otherM === undefined) {
        return false;
      }

      if (thisM < otherM) {
        return false;
      } else if (thisM > otherM) {
        isGreater = true;
      }

      otherKeys.delete(key);
    }

    return otherKeys.size === 0 && isGreater;
  }

  introduceOmegas(smallerMarking) {
    if (!this.isGreaterThan(smallerMarking)) {
      return;
    }

    const myKeys = Object.keys(this._marking);

    for (const key of myKeys) {
      if (this.get(key) > smallerMarking.get(key)) {
        this.set(key, Number.POSITIVE_INFINITY);
      }
    }
  }

  getKeys() {
    return Object.keys(this._marking);
  }

  getComparisonKeys(marking) {
    const myKeys = this.getKeys();
    const otherKeys = new Set(marking.getKeys());
    return [myKeys, otherKeys];
  }

}

/***/ }),

/***/ 1226:
/*!**************************************************!*\
  !*** ./src/app/classes/models/petri-net/node.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* binding */ Node)
/* harmony export */ });
/* harmony import */ var _utility_get_by_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/get-by-id */ 5487);

class Node extends _utility_get_by_id__WEBPACK_IMPORTED_MODULE_0__.Identifiable {
  constructor(id) {
    super(id);
    this._ingoingArcs = new Map();
    this._outgoingArcs = new Map();
    this._ingoingArcWeights = new Map();
    this._outgoingArcWeights = new Map();
  }

  get ingoingArcs() {
    return Array.from(this._ingoingArcs.values());
  }

  get outgoingArcs() {
    return Array.from(this._outgoingArcs.values());
  }

  get ingoingArcWeights() {
    return this._ingoingArcWeights;
  }

  get outgoingArcWeights() {
    return this._outgoingArcWeights;
  }

  addOutgoingArc(arc) {
    this._outgoingArcs.set(arc.getId(), arc);

    this._outgoingArcWeights.set(arc.destinationId, arc.weight);
  }

  addIngoingArc(arc) {
    this._ingoingArcs.set(arc.getId(), arc);

    this._ingoingArcWeights.set(arc.sourceId, arc.weight);
  }

  removeArc(arc) {
    let a = (0,_utility_get_by_id__WEBPACK_IMPORTED_MODULE_0__.getById)(this._ingoingArcs, arc);

    if (a !== undefined) {
      this._ingoingArcs.delete(a.getId());

      this._ingoingArcWeights.delete(a.getId());
    }

    a = (0,_utility_get_by_id__WEBPACK_IMPORTED_MODULE_0__.getById)(this._outgoingArcs, arc);

    if (a !== undefined) {
      this._outgoingArcs.delete(a.getId());

      this._outgoingArcWeights.delete(a.getId());
    }
  }

}

/***/ }),

/***/ 6239:
/*!*************************************************************************************!*\
  !*** ./src/app/classes/models/petri-net/partial-order-net-with-contained-traces.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PartialOrderNetWithContainedTraces": () => (/* binding */ PartialOrderNetWithContainedTraces)
/* harmony export */ });
class PartialOrderNetWithContainedTraces {
  constructor(net, containedTraces) {
    this.net = net;
    this.containedTraces = containedTraces;
  }

}

/***/ }),

/***/ 1509:
/*!*******************************************************!*\
  !*** ./src/app/classes/models/petri-net/petri-net.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PetriNet": () => (/* binding */ PetriNet)
/* harmony export */ });
/* harmony import */ var _place__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./place */ 9973);
/* harmony import */ var _transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition */ 2986);
/* harmony import */ var _arc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arc */ 6781);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 6758);
/* harmony import */ var _utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utility/incrementing-counter */ 1746);
/* harmony import */ var _utility_get_by_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utility/get-by-id */ 5487);
/* harmony import */ var _marking__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./marking */ 2294);







class PetriNet {
  constructor() {
    this._placeCounter = new _utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__.IncrementingCounter();
    this._transitionCounter = new _utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__.IncrementingCounter();
    this._arcCounter = new _utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__.IncrementingCounter();
    this._places = new Map();
    this._transitions = new Map();
    this._arcs = new Map();
    this._kill$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._redraw$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._inputPlaces = new Set();
    this._outputPlaces = new Set();
  }

  static createFromArcSubset(net, arcs) {
    const result = new PetriNet();
    net.getPlaces().forEach(p => {
      result.addPlace(new _place__WEBPACK_IMPORTED_MODULE_0__.Place(p.marking, p.id));
    });
    net.getTransitions().forEach(t => {
      result.addTransition(new _transition__WEBPACK_IMPORTED_MODULE_1__.Transition(t.label, t.id));
    });
    arcs.forEach(a => {
      let source;
      let destination;

      if (a.source instanceof _place__WEBPACK_IMPORTED_MODULE_0__.Place) {
        source = result.getPlace(a.sourceId);
        destination = result.getTransition(a.destinationId);
      } else {
        source = result.getTransition(a.sourceId);
        destination = result.getPlace(a.destinationId);
      }

      result.addArc(new _arc__WEBPACK_IMPORTED_MODULE_2__.Arc(a.getId(), source, destination, a.weight));
    });
    return result;
  }

  static netUnion(a, b) {
    const result = a.clone();
    const counter = new _utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__.IncrementingCounter();
    const placeMap = new Map();
    const transitionMap = new Map();
    b.getPlaces().forEach(p => {
      let mappedId = p.getId();

      while (result.getPlace(mappedId) !== undefined) {
        mappedId = p.getId() + counter.next();
      }

      placeMap.set(p.getId(), mappedId);
      result.addPlace(new _place__WEBPACK_IMPORTED_MODULE_0__.Place(p.marking, mappedId));
    });
    b.getTransitions().forEach(t => {
      let mappedId = t.getId();

      while (result.getTransition(mappedId) !== undefined) {
        mappedId = t.getId() + counter.next();
      }

      transitionMap.set(t.getId(), mappedId);
      result.addTransition(new _transition__WEBPACK_IMPORTED_MODULE_1__.Transition(t.label, mappedId));
    });
    b.getArcs().forEach(arc => {
      let arcId = arc.getId();

      while (result.getArc(arcId) !== undefined) {
        arcId = arc.getId() + counter.next();
      }

      if (arc.source instanceof _place__WEBPACK_IMPORTED_MODULE_0__.Place) {
        result.addArc(new _arc__WEBPACK_IMPORTED_MODULE_2__.Arc(arcId, result.getPlace(placeMap.get(arc.sourceId)), result.getTransition(transitionMap.get(arc.destinationId)), arc.weight));
      } else {
        result.addArc(new _arc__WEBPACK_IMPORTED_MODULE_2__.Arc(arcId, result.getTransition(transitionMap.get(arc.sourceId)), result.getPlace(placeMap.get(arc.destinationId)), arc.weight));
      }
    });
    const inputPlacesB = new Set(result._inputPlaces);
    const outputPlacesB = new Set(result._outputPlaces);
    a.inputPlaces.forEach(p => {
      inputPlacesB.delete(p);
    });
    a.outputPlaces.forEach(p => {
      outputPlacesB.delete(p);
    });
    return {
      net: result,
      inputPlacesB,
      outputPlacesB
    };
  }

  static fireTransitionInMarking(net, transitionId, marking) {
    const transition = net.getTransition(transitionId);

    if (transition === undefined) {
      throw new Error(`The given net does not contain a transition with id '${transitionId}'`);
    }

    const newMarking = new _marking__WEBPACK_IMPORTED_MODULE_5__.Marking(marking);

    for (const inArc of transition.ingoingArcs) {
      const m = marking.get(inArc.sourceId);

      if (m === undefined) {
        throw new Error(`The transition with id '${transitionId}' has an incoming arc from a place with id '${inArc.sourceId}' but no such place is defined in the provided marking!`);
      }

      if (m - inArc.weight < 0) {
        throw new Error(`The transition with id '${transitionId}' is not enabled in the provided marking! The place with id '${inArc.sourceId}' contains ${m} tokens, but the arc weight is ${inArc.weight}.`);
      }

      newMarking.set(inArc.sourceId, m - inArc.weight);
    }

    for (const outArc of transition.outgoingArcs) {
      const m = marking.get(outArc.destinationId);

      if (m === undefined) {
        throw new Error(`The transition with id '${transitionId}' has an outgoing arc to a place with id '${outArc.destinationId}' but no such place is defined in the provided marking!`);
      }

      newMarking.set(outArc.destinationId, m + outArc.weight);
    }

    return newMarking;
  }

  static getAllEnabledTransitions(net, marking) {
    return net.getTransitions().filter(t => PetriNet.isTransitionEnabledInMarking(net, t.id, marking));
  }

  static isTransitionEnabledInMarking(net, transitionId, marking) {
    const transition = net.getTransition(transitionId);

    if (transition === undefined) {
      throw new Error(`The given net does not contain a transition with id '${transitionId}'`);
    }

    for (const inArc of transition.ingoingArcs) {
      const m = marking.get(inArc.sourceId);

      if (m === undefined) {
        throw new Error(`The transition with id '${transitionId}' has an incoming arc from a place with id '${inArc.sourceId}' but no such place is defined in the provided marking!`);
      }

      if (m - inArc.weight < 0) {
        return false;
      }
    }

    return true;
  }

  static determineInOut(p, input, output) {
    if (p.ingoingArcs.length === 0) {
      input.add(p.getId());
    }

    if (p.outgoingArcs.length === 0) {
      output.add(p.getId());
    }
  }

  getTransition(id) {
    return this._transitions.get(id);
  }

  getTransitions() {
    return Array.from(this._transitions.values());
  }

  getTransitionCount() {
    return this._transitions.size;
  }

  addTransition(transition) {
    if (transition.id === undefined) {
      transition.id = (0,_utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__.createUniqueString)('t', this._transitions, this._transitionCounter);
    }

    this._transitions.set(transition.id, transition);
  }

  removeTransition(transition) {
    const t = (0,_utility_get_by_id__WEBPACK_IMPORTED_MODULE_4__.getById)(this._transitions, transition);

    if (t === undefined) {
      return;
    }

    transition = t;

    this._transitions.delete(transition.getId());

    transition.outgoingArcs.forEach(a => {
      this.removeArc(a);
    });
    transition.ingoingArcs.forEach(a => {
      this.removeArc(a);
    });
  }

  getPlace(id) {
    return this._places.get(id);
  }

  getPlaces() {
    return Array.from(this._places.values());
  }

  getPlaceCount() {
    return this._places.size;
  }

  addPlace(place) {
    if (place.id === undefined) {
      place.id = (0,_utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__.createUniqueString)('p', this._places, this._placeCounter);
    }

    this._places.set(place.id, place);

    this._inputPlaces.add(place.id);

    this._outputPlaces.add(place.id);
  }

  removePlace(place) {
    const p = (0,_utility_get_by_id__WEBPACK_IMPORTED_MODULE_4__.getById)(this._places, place);

    if (p === undefined) {
      return;
    }

    place = p;

    this._places.delete(place.getId());

    place.outgoingArcs.forEach(a => {
      this.removeArc(a);
    });
    place.ingoingArcs.forEach(a => {
      this.removeArc(a);
    });

    this._inputPlaces.delete(place.getId());

    this._outputPlaces.delete(place.getId());
  }

  getArc(id) {
    return this._arcs.get(id);
  }

  getArcs() {
    return Array.from(this._arcs.values());
  }

  getArcCount() {
    return this._arcs.size;
  }

  addArc(arcOrSource, destination, weight = 1) {
    if (arcOrSource instanceof _arc__WEBPACK_IMPORTED_MODULE_2__.Arc) {
      this._arcs.set(arcOrSource.getId(), arcOrSource);

      if (arcOrSource.source instanceof _place__WEBPACK_IMPORTED_MODULE_0__.Place) {
        this._outputPlaces.delete(arcOrSource.sourceId);
      } else if (arcOrSource.destination instanceof _place__WEBPACK_IMPORTED_MODULE_0__.Place) {
        this._inputPlaces.delete(arcOrSource.destinationId);
      }
    } else {
      this.addArc(new _arc__WEBPACK_IMPORTED_MODULE_2__.Arc((0,_utility_incrementing_counter__WEBPACK_IMPORTED_MODULE_3__.createUniqueString)('a', this._arcs, this._arcCounter), arcOrSource, destination, weight));
    }
  }

  removeArc(arc) {
    const a = (0,_utility_get_by_id__WEBPACK_IMPORTED_MODULE_4__.getById)(this._arcs, arc);

    if (a === undefined) {
      return;
    }

    arc = a;

    this._arcs.delete(arc.getId());

    arc.source.removeArc(arc);
    arc.destination.removeArc(arc);

    if (arc.source instanceof _place__WEBPACK_IMPORTED_MODULE_0__.Place && arc.source.outgoingArcs.length === 0) {
      this._outputPlaces.add(arc.sourceId);
    } else if (arc.destination instanceof _place__WEBPACK_IMPORTED_MODULE_0__.Place && arc.destination.ingoingArcs.length === 0) {
      this._inputPlaces.add(arc.destinationId);
    }
  }

  get frequency() {
    return this._frequency;
  }

  set frequency(value) {
    this._frequency = value;
  }

  get inputPlaces() {
    return this._inputPlaces;
  }

  get outputPlaces() {
    return this._outputPlaces;
  }

  getInitialMarking() {
    const m = new _marking__WEBPACK_IMPORTED_MODULE_5__.Marking({});
    this.getPlaces().forEach(p => {
      m.set(p.id, p.marking);
    });
    return m;
  }

  isEmpty() {
    return this._places.size === 0 && this._transitions.size === 0;
  }

  clone() {
    return PetriNet.createFromArcSubset(this, this.getArcs());
  }

  destroy() {
    if (!this._kill$.closed) {
      this._kill$.next();

      this._kill$.complete();
    }

    this._redraw$.complete();
  }

}

/***/ }),

/***/ 9973:
/*!***************************************************!*\
  !*** ./src/app/classes/models/petri-net/place.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Place": () => (/* binding */ Place)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ 1226);

class Place extends _node__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor(marking = 0, id) {
    super(id);
    this._marking = marking;
  }

  get marking() {
    return this._marking;
  }

  set marking(value) {
    this._marking = value;
  }

}

/***/ }),

/***/ 2986:
/*!********************************************************!*\
  !*** ./src/app/classes/models/petri-net/transition.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transition": () => (/* binding */ Transition)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ 1226);

class Transition extends _node__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor(label, id) {
    super(id);
    this._label = label;
  }

  get label() {
    return this._label;
  }

  get isSilent() {
    return this._label === undefined;
  }

  set label(value) {
    this._label = value;
  }

  getString() {
    const l = this.label;

    if (l === undefined) {
      throw new Error('Transition label is undefined');
    }

    return l;
  }

  setString(value) {
    this.label = value;
  }

}

/***/ }),

/***/ 2017:
/*!*********************************************!*\
  !*** ./src/app/classes/serde/block-type.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlockType": () => (/* binding */ BlockType)
/* harmony export */ });
var BlockType = /*#__PURE__*/(() => {
  (function (BlockType) {
    BlockType["TRANSITIONS"] = ".transitions";
    BlockType["PLACES"] = ".places";
    BlockType["ARCS"] = ".arcs";
    BlockType["FREQUENCY"] = ".frequency";
  })(BlockType || (BlockType = {}));

  return BlockType;
})();

/***/ }),

/***/ 9149:
/*!**********************************************************!*\
  !*** ./src/app/classes/serde/petri-net-serialisation.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialisePetriNet": () => (/* binding */ serialisePetriNet)
/* harmony export */ });
/* harmony import */ var _utility_abstract_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/abstract-parser */ 2292);
/* harmony import */ var _block_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block-type */ 2017);


function serialisePetriNet(net) {
  return `${_utility_abstract_parser__WEBPACK_IMPORTED_MODULE_0__.AbstractParser.TYPE_BLOCK} pn\n` + serialiseFrequency(net.frequency) + serialiseTransitions(net.getTransitions()) + serialisePlaces(net.getPlaces()) + serialiseArcs(net.getArcs());
}

function serialiseFrequency(frequency) {
  if (frequency === undefined) {
    return '';
  }

  return `${_block_type__WEBPACK_IMPORTED_MODULE_1__.BlockType.FREQUENCY} ${frequency}\n`;
}

function serialiseTransitions(transitions) {
  let result = `${_block_type__WEBPACK_IMPORTED_MODULE_1__.BlockType.TRANSITIONS}\n`;
  transitions.forEach(t => {
    var _a;

    result += `${removeSpaces(t.getId(), t.getId())} ${removeSpaces((_a = t.label) !== null && _a !== void 0 ? _a : '', t.getId())}\n`;
  });
  return result;
}

function serialisePlaces(places) {
  let result = `${_block_type__WEBPACK_IMPORTED_MODULE_1__.BlockType.PLACES}\n`;
  places.forEach(p => {
    result += `${removeSpaces(p.getId(), p.getId())} ${p.marking}\n`;
  });
  return result;
}

function serialiseArcs(arcs) {
  let result = `${_block_type__WEBPACK_IMPORTED_MODULE_1__.BlockType.ARCS}\n`;
  arcs.forEach(a => {
    result += `${removeSpaces(a.sourceId, a.getId())} ${removeSpaces(a.destinationId, a.getId())}`;

    if (a.weight > 1) {
      result += ` ${a.weight}`;
    }

    result += '\n';
  });
  return result;
}

function removeSpaces(str, id) {
  if (str.includes(' ')) {
    console.warn(`Petri net element with id '${id}' contains a spaces in its definition! Replacing spaces with underscores, no uniqueness check is performed!`);
    return str.replace(/ /g, '_');
  } else {
    return str;
  }
}

/***/ }),

/***/ 2292:
/*!****************************************************!*\
  !*** ./src/app/classes/utility/abstract-parser.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractParser": () => (/* binding */ AbstractParser)
/* harmony export */ });
let AbstractParser = /*#__PURE__*/(() => {
  class AbstractParser {
    constructor(allowedTypes) {
      this._allowedTypes = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
    }

    parse(text) {
      const lines = text.split('\n');

      if (!lines[0].startsWith(AbstractParser.TYPE_BLOCK)) {
        console.debug('file does not specify type in first line');
        return;
      }

      if (!this._allowedTypes.includes(lines[0].trimEnd().slice(AbstractParser.TYPE_BLOCK.length + 1))) {
        console.debug('bad file type');
        return;
      }

      lines.shift();
      return this.processFileLines(lines);
    }

  }

  AbstractParser.TYPE_BLOCK = '.type';
  return AbstractParser;
})();

/***/ }),

/***/ 5487:
/*!**********************************************!*\
  !*** ./src/app/classes/utility/get-by-id.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Identifiable": () => (/* binding */ Identifiable),
/* harmony export */   "getById": () => (/* binding */ getById)
/* harmony export */ });
class Identifiable {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  getId() {
    if (this._id === undefined) {
      throw new Error('id is undefined');
    }

    return this._id;
  }

}
function getById(map, object) {
  if (typeof object === 'string') {
    return map.get(object);
  } else {
    return map.get(object.getId());
  }
}

/***/ }),

/***/ 1746:
/*!*********************************************************!*\
  !*** ./src/app/classes/utility/incrementing-counter.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncrementingCounter": () => (/* binding */ IncrementingCounter),
/* harmony export */   "createUniqueString": () => (/* binding */ createUniqueString)
/* harmony export */ });
class IncrementingCounter {
  constructor() {
    this.value = 0;
  }

  next() {
    return this.value++;
  }

  current() {
    return this.value;
  }

  reset() {
    this.value = 0;
  }

  setCurrentValue(value) {
    this.value = value;
  }

}
function createUniqueString(prefix, existingNames, counter) {
  let result;

  do {
    result = `${prefix}${counter.next()}`;
  } while (existingNames.has(result));

  return result;
}

/***/ }),

/***/ 6800:
/*!********************************************!*\
  !*** ./src/app/classes/utility/iterate.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iterate": () => (/* binding */ iterate)
/* harmony export */ });
function iterate(iterable, consumer) {
  const iterator = iterable[Symbol.iterator]();
  let it = iterator.next();

  while (!it.done) {
    consumer(it.value);
    it = iterator.next();
  }
}

/***/ }),

/***/ 8977:
/*!********************************************!*\
  !*** ./src/app/classes/utility/map-set.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapSet": () => (/* binding */ MapSet)
/* harmony export */ });
/* harmony import */ var _iterate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iterate */ 6800);

class MapSet {
  constructor() {
    this._map = new Map();
  }

  add(key, value) {
    if (this._map.has(key)) {
      this._map.get(key).add(value);
    } else {
      this._map.set(key, new Set([value]));
    }
  }

  addAll(key, values) {
    if (this._map.has(key)) {
      const set = this._map.get(key);

      (0,_iterate__WEBPACK_IMPORTED_MODULE_0__.iterate)(values, v => {
        set.add(v);
      });
    } else {
      this._map.set(key, new Set(values));
    }
  }

  has(key, value) {
    return this._map.has(key) && this._map.get(key).has(value);
  }

  get(key) {
    const set = this._map.get(key);

    if (set === undefined) {
      return new Set();
    }

    return set;
  }

  entries() {
    return this._map.entries();
  }

}

/***/ }),

/***/ 4790:
/*!************************************************!*\
  !*** ./src/app/classes/utility/prefix-tree.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrefixTree": () => (/* binding */ PrefixTree),
/* harmony export */   "PrefixTreeNode": () => (/* binding */ PrefixTreeNode)
/* harmony export */ });
class PrefixTreeNode {
  constructor(content) {
    this._children = new Map();
    this.content = content;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  getChild(key) {
    return this._children.get(key);
  }

  addChild(key, content) {
    const child = new PrefixTreeNode(content);

    this._children.set(key, child);

    return child;
  }

  hasChildren() {
    return this._children.size !== 0;
  }

}
class PrefixTree {
  constructor(rootContent) {
    this._root = new PrefixTreeNode(rootContent);
  }

  insert(path, newNodeContent, updateNodeContent, stepReaction = () => {}, newStepNode = () => undefined) {
    let currentNode = this._root;
    const prefix = [];

    for (let i = 0; i < path.length(); i++) {
      const step = path.get(i);
      stepReaction(step, currentNode.content, currentNode);
      let child = currentNode.getChild(step);

      if (child === undefined) {
        currentNode = currentNode.addChild(step, newStepNode(step, [...prefix], currentNode.content));
      } else {
        currentNode = child;
      }

      prefix.push(step);
    }

    if (currentNode.content !== undefined) {
      updateNodeContent(currentNode.content, currentNode);
    } else {
      currentNode.content = newNodeContent();
    }
  }

}

/***/ }),

/***/ 2909:
/*!**********************************************!*\
  !*** ./src/app/classes/utility/relabeler.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Relabeler": () => (/* binding */ Relabeler)
/* harmony export */ });
/* harmony import */ var _incrementing_counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./incrementing-counter */ 1746);
/* harmony import */ var _iterate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterate */ 6800);


class Relabeler {
  constructor() {
    this._existingLabels = new Set();
    this._labelCounter = new _incrementing_counter__WEBPACK_IMPORTED_MODULE_0__.IncrementingCounter();
    this._labelMapping = new Map();
    this._labelOrder = new Map();
    this._nonUniqueIdentities = new Set();
    this._labelOrderIndex = new Map();
  }

  clone() {
    const result = new Relabeler();

    this._existingLabels.forEach(l => {
      result._existingLabels.add(l);
    });

    result._labelCounter.setCurrentValue(this._labelCounter.current());

    this._labelMapping.forEach((v, k) => {
      result._labelMapping.set(k, v);
    });

    this._labelOrder.forEach((v, k) => {
      result._labelOrder.set(k, [...v]);
    });

    this._nonUniqueIdentities.forEach(nui => {
      result._nonUniqueIdentities.add(nui);
    });

    return result;
  }

  getNewUniqueLabel(oldLabel) {
    return this.getNewLabel(oldLabel, false);
  }

  getNewLabelPreserveNonUniqueIdentities(oldLabel) {
    return this.getNewLabel(oldLabel, true);
  }

  getNewLabel(oldLabel, preserveNonUniqueIdentities) {
    if (!this._existingLabels.has(oldLabel)) {
      // label encountered for the first time
      this._existingLabels.add(oldLabel);

      this._labelMapping.set(oldLabel, oldLabel);

      if (preserveNonUniqueIdentities) {
        this._nonUniqueIdentities.add(oldLabel);
      } else {
        this._labelOrder.set(oldLabel, [oldLabel]);

        this._labelOrderIndex.set(oldLabel, 1);
      }

      return oldLabel;
    } else {
      // relabeling required
      let newLabelIndex = this._labelOrderIndex.get(oldLabel);

      if (newLabelIndex === undefined) {
        newLabelIndex = 0;
      }

      let relabelingOrder = this._labelOrder.get(oldLabel);

      if (relabelingOrder === undefined) {
        // relabeling collision or non-unique identity
        if (preserveNonUniqueIdentities && this._nonUniqueIdentities.has(oldLabel)) {
          return oldLabel;
        }

        relabelingOrder = [];

        this._labelOrder.set(oldLabel, relabelingOrder);

        newLabelIndex = 0;
      }

      if (newLabelIndex >= relabelingOrder.length) {
        // new label must be generated
        const newLabel = (0,_incrementing_counter__WEBPACK_IMPORTED_MODULE_0__.createUniqueString)(oldLabel, this._existingLabels, this._labelCounter);

        this._existingLabels.add(newLabel);

        relabelingOrder.push(newLabel);

        this._labelMapping.set(newLabel, oldLabel);
      }

      this._labelOrderIndex.set(oldLabel, newLabelIndex + 1);

      return relabelingOrder[newLabelIndex];
    }
  }

  restartSequence() {
    this._labelOrderIndex.clear();
  }

  getLabelMapping() {
    return this._labelMapping;
  }

  getLabelOrder() {
    return this._labelOrder;
  }

  uniquelyRelabelSequence(sequence) {
    this.relabel(sequence, false);
  }

  uniquelyRelabelSequences(sequences) {
    (0,_iterate__WEBPACK_IMPORTED_MODULE_1__.iterate)(sequences, s => {
      this.uniquelyRelabelSequence(s);
    });
  }

  relabelSequencePreserveNonUniqueIdentities(sequence) {
    this.relabel(sequence, true);
  }

  relabelSequencesPreserveNonUniqueIdentities(sequences) {
    (0,_iterate__WEBPACK_IMPORTED_MODULE_1__.iterate)(sequences, s => {
      this.relabelSequencePreserveNonUniqueIdentities(s);
    });
  }

  relabel(sequence, preserveIdentities) {
    this.restartSequence();

    for (let i = 0; i < sequence.length(); i++) {
      sequence.set(i, this.getNewLabel(sequence.get(i), preserveIdentities));
    }
  }

  undoSequenceLabeling(sequence) {
    for (let i = 0; i < sequence.length(); i++) {
      sequence.set(i, this.undoLabel(sequence.get(i)));
    }
  }

  undoSequencesLabeling(sequences) {
    (0,_iterate__WEBPACK_IMPORTED_MODULE_1__.iterate)(sequences, s => {
      this.undoSequenceLabeling(s);
    });
  }

  undoLabel(label) {
    var _a;

    return (_a = this._labelMapping.get(label)) !== null && _a !== void 0 ? _a : label;
  }

}

/***/ }),

/***/ 5711:
/*!****************************************************!*\
  !*** ./src/app/classes/utility/string-sequence.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditableStringSequenceWrapper": () => (/* binding */ EditableStringSequenceWrapper)
/* harmony export */ });
class EditableStringSequenceWrapper {
  constructor(array) {
    this._array = array;
  }

  get(i) {
    return this._array[i].getString();
  }

  length() {
    return this._array.length;
  }

  set(i, value) {
    this._array[i].setString(value);
  }

}

/***/ }),

/***/ 4180:
/*!*********************************************!*\
  !*** ./src/app/workers/rst-miner.worker.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typedjson */ 6283);
/* harmony import */ var _classes_models_eventlog_eventlog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/models/eventlog/eventlog */ 5081);
/* harmony import */ var _classes_models_miner_settings_rst_miner_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/models/miner-settings/rst-miner-settings */ 611);
/* harmony import */ var _classes_algorithms_rst_miner_rst_miner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/algorithms/rst-miner/rst-miner */ 5091);
/* harmony import */ var _classes_serde_petri_net_serialisation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../classes/serde/petri-net-serialisation */ 9149);
/// <reference lib="webworker" />






onmessage = function (data) {
  const minerSettings = new typedjson__WEBPACK_IMPORTED_MODULE_4__.TypedJSON(_classes_models_miner_settings_rst_miner_settings__WEBPACK_IMPORTED_MODULE_1__.RstMinerSettings).parse(data.data[0]);
  const eventlog = new typedjson__WEBPACK_IMPORTED_MODULE_4__.TypedJSON(_classes_models_eventlog_eventlog__WEBPACK_IMPORTED_MODULE_0__.Eventlog).parse(data.data[1]);

  if (minerSettings == null || eventlog == null) {
    throw _classes_algorithms_rst_miner_rst_miner__WEBPACK_IMPORTED_MODULE_2__.RstMiner.MINING_ERROR;
  }

  const rstMiner = new _classes_algorithms_rst_miner_rst_miner__WEBPACK_IMPORTED_MODULE_2__.RstMiner(minerSettings);
  const resultingPetriNet = rstMiner.mine(eventlog);
  console.log('rST-Miner: Evaluated ' + rstMiner.counterTestedPlaces + ' places');
  postMessage((0,_classes_serde_petri_net_serialisation__WEBPACK_IMPORTED_MODULE_3__.serialisePetriNet)(resultingPetriNet));
};

/***/ }),

/***/ 3395:
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/NotificationFactories.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_NOTIFICATION": () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   "createNotification": () => (/* binding */ createNotification),
/* harmony export */   "errorNotification": () => (/* binding */ errorNotification),
/* harmony export */   "nextNotification": () => (/* binding */ nextNotification)
/* harmony export */ });
const COMPLETE_NOTIFICATION = (() => createNotification('C', undefined, undefined))();
function errorNotification(error) {
  return createNotification('E', undefined, error);
}
function nextNotification(value) {
  return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
} //# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ 9751:
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/Observable.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ 3934);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ 6921);
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ 8822);
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ 9635);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ 2416);
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ 576);
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ 2806);







let Observable = /*#__PURE__*/(() => {
  class Observable {
    constructor(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }

    lift(operator) {
      const observable = new Observable();
      observable.source = this;
      observable.operator = operator;
      return observable;
    }

    subscribe(observerOrNext, error, complete) {
      const subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
      (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(() => {
        const {
          operator,
          source
        } = this;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? this._subscribe(subscriber) : this._trySubscribe(subscriber));
      });
      return subscriber;
    }

    _trySubscribe(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    }

    forEach(next, promiseCtor) {
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor((resolve, reject) => {
        const subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
          next: value => {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        this.subscribe(subscriber);
      });
    }

    _subscribe(subscriber) {
      var _a;

      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    }

    [_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable]() {
      return this;
    }

    pipe(...operations) {
      return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
    }

    toPromise(promiseCtor) {
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor((resolve, reject) => {
        let value;
        this.subscribe(x => value = x, err => reject(err), () => resolve(value));
      });
    }

  }

  Observable.create = subscribe => {
    return new Observable(subscribe);
  };

  return Observable;
})();

function getPromiseCtor(promiseCtor) {
  var _a;

  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}

function isObserver(value) {
  return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}

function isSubscriber(value) {
  return value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber || isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value);
} //# sourceMappingURL=Observable.js.map

/***/ }),

/***/ 6758:
/*!********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/Subject.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnonymousSubject": () => (/* binding */ AnonymousSubject),
/* harmony export */   "Subject": () => (/* binding */ Subject)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable */ 9751);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ 6921);
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ 7448);
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/arrRemove */ 8737);
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/errorContext */ 2806);





let Subject = /*#__PURE__*/(() => {
  class Subject extends _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable {
    constructor() {
      super();
      this.closed = false;
      this.currentObservers = null;
      this.observers = [];
      this.isStopped = false;
      this.hasError = false;
      this.thrownError = null;
    }

    lift(operator) {
      const subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    }

    _throwIfClosed() {
      if (this.closed) {
        throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
      }
    }

    next(value) {
      (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(() => {
        this._throwIfClosed();

        if (!this.isStopped) {
          if (!this.currentObservers) {
            this.currentObservers = Array.from(this.observers);
          }

          for (const observer of this.currentObservers) {
            observer.next(value);
          }
        }
      });
    }

    error(err) {
      (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(() => {
        this._throwIfClosed();

        if (!this.isStopped) {
          this.hasError = this.isStopped = true;
          this.thrownError = err;
          const {
            observers
          } = this;

          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    }

    complete() {
      (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(() => {
        this._throwIfClosed();

        if (!this.isStopped) {
          this.isStopped = true;
          const {
            observers
          } = this;

          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    }

    unsubscribe() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    }

    get observed() {
      var _a;

      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }

    _trySubscribe(subscriber) {
      this._throwIfClosed();

      return super._trySubscribe(subscriber);
    }

    _subscribe(subscriber) {
      this._throwIfClosed();

      this._checkFinalizedStatuses(subscriber);

      return this._innerSubscribe(subscriber);
    }

    _innerSubscribe(subscriber) {
      const {
        hasError,
        isStopped,
        observers
      } = this;

      if (hasError || isStopped) {
        return _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
      }

      this.currentObservers = null;
      observers.push(subscriber);
      return new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(() => {
        this.currentObservers = null;
        (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(observers, subscriber);
      });
    }

    _checkFinalizedStatuses(subscriber) {
      const {
        hasError,
        thrownError,
        isStopped
      } = this;

      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    }

    asObservable() {
      const observable = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
      observable.source = this;
      return observable;
    }

  }

  Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
  };

  return Subject;
})();
class AnonymousSubject extends Subject {
  constructor(destination, source) {
    super();
    this.destination = destination;
    this.source = source;
  }

  next(value) {
    var _a, _b;

    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  }

  error(err) {
    var _a, _b;

    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  }

  complete() {
    var _a, _b;

    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  }

  _subscribe(subscriber) {
    var _a, _b;

    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
  }

} //# sourceMappingURL=Subject.js.map

/***/ }),

/***/ 3934:
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/Subscriber.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_OBSERVER": () => (/* binding */ EMPTY_OBSERVER),
/* harmony export */   "SafeSubscriber": () => (/* binding */ SafeSubscriber),
/* harmony export */   "Subscriber": () => (/* binding */ Subscriber)
/* harmony export */ });
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/isFunction */ 576);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscription */ 6921);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ 2416);
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/reportUnhandledError */ 7849);
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/noop */ 5032);
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationFactories */ 3395);
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ 3410);
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/errorContext */ 2806);








class Subscriber extends _Subscription__WEBPACK_IMPORTED_MODULE_0__.Subscription {
  constructor(destination) {
    super();
    this.isStopped = false;

    if (destination) {
      this.destination = destination;

      if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_0__.isSubscription)(destination)) {
        destination.add(this);
      }
    } else {
      this.destination = EMPTY_OBSERVER;
    }
  }

  static create(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  }

  next(value) {
    if (this.isStopped) {
      handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_1__.nextNotification)(value), this);
    } else {
      this._next(value);
    }
  }

  error(err) {
    if (this.isStopped) {
      handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_1__.errorNotification)(err), this);
    } else {
      this.isStopped = true;

      this._error(err);
    }
  }

  complete() {
    if (this.isStopped) {
      handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_1__.COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;

      this._complete();
    }
  }

  unsubscribe() {
    if (!this.closed) {
      this.isStopped = true;
      super.unsubscribe();
      this.destination = null;
    }
  }

  _next(value) {
    this.destination.next(value);
  }

  _error(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  }

  _complete() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }

}
const _bind = Function.prototype.bind;

function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}

class ConsumerObserver {
  constructor(partialObserver) {
    this.partialObserver = partialObserver;
  }

  next(value) {
    const {
      partialObserver
    } = this;

    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  }

  error(err) {
    const {
      partialObserver
    } = this;

    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  }

  complete() {
    const {
      partialObserver
    } = this;

    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  }

}

class SafeSubscriber extends Subscriber {
  constructor(observerOrNext, error, complete) {
    super();
    let partialObserver;

    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_2__.isFunction)(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined,
        error: error !== null && error !== void 0 ? error : undefined,
        complete: complete !== null && complete !== void 0 ? complete : undefined
      };
    } else {
      let context;

      if (this && _config__WEBPACK_IMPORTED_MODULE_3__.config.useDeprecatedNextContext) {
        context = Object.create(observerOrNext);

        context.unsubscribe = () => this.unsubscribe();

        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context),
          error: observerOrNext.error && bind(observerOrNext.error, context),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }

    this.destination = new ConsumerObserver(partialObserver);
  }

}

function handleUnhandledError(error) {
  if (_config__WEBPACK_IMPORTED_MODULE_3__.config.useDeprecatedSynchronousErrorHandling) {
    (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_4__.captureError)(error);
  } else {
    (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_5__.reportUnhandledError)(error);
  }
}

function defaultErrorHandler(err) {
  throw err;
}

function handleStoppedNotification(notification, subscriber) {
  const {
    onStoppedNotification
  } = _config__WEBPACK_IMPORTED_MODULE_3__.config;
  onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_6__.timeoutProvider.setTimeout(() => onStoppedNotification(notification, subscriber));
}

const EMPTY_OBSERVER = {
  closed: true,
  next: _util_noop__WEBPACK_IMPORTED_MODULE_7__.noop,
  error: defaultErrorHandler,
  complete: _util_noop__WEBPACK_IMPORTED_MODULE_7__.noop
}; //# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ 6921:
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/Subscription.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_SUBSCRIPTION": () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   "Subscription": () => (/* binding */ Subscription),
/* harmony export */   "isSubscription": () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/isFunction */ 576);
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/UnsubscriptionError */ 7896);
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/arrRemove */ 8737);



class Subscription {
  constructor(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }

  unsubscribe() {
    let errors;

    if (!this.closed) {
      this.closed = true;
      const {
        _parentage
      } = this;

      if (_parentage) {
        this._parentage = null;

        if (Array.isArray(_parentage)) {
          for (const parent of _parentage) {
            parent.remove(this);
          }
        } else {
          _parentage.remove(this);
        }
      }

      const {
        initialTeardown: initialFinalizer
      } = this;

      if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__.UnsubscriptionError ? e.errors : [e];
        }
      }

      const {
        _finalizers
      } = this;

      if (_finalizers) {
        this._finalizers = null;

        for (const finalizer of _finalizers) {
          try {
            execFinalizer(finalizer);
          } catch (err) {
            errors = errors !== null && errors !== void 0 ? errors : [];

            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__.UnsubscriptionError) {
              errors = [...errors, ...err.errors];
            } else {
              errors.push(err);
            }
          }
        }
      }

      if (errors) {
        throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__.UnsubscriptionError(errors);
      }
    }
  }

  add(teardown) {
    var _a;

    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }

          teardown._addParent(this);
        }

        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  }

  _hasParent(parent) {
    const {
      _parentage
    } = this;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  }

  _addParent(parent) {
    const {
      _parentage
    } = this;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  }

  _removeParent(parent) {
    const {
      _parentage
    } = this;

    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(_parentage, parent);
    }
  }

  remove(teardown) {
    const {
      _finalizers
    } = this;
    _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(_finalizers, teardown);

    if (teardown instanceof Subscription) {
      teardown._removeParent(this);
    }
  }

}

Subscription.EMPTY = (() => {
  const empty = new Subscription();
  empty.closed = true;
  return empty;
})();

const EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value.unsubscribe);
}

function execFinalizer(finalizer) {
  if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
} //# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ 2416:
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/config.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
const config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: undefined,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
}; //# sourceMappingURL=config.js.map

/***/ }),

/***/ 3410:
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/scheduler/timeoutProvider.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutProvider": () => (/* binding */ timeoutProvider)
/* harmony export */ });
const timeoutProvider = {
  setTimeout(handler, timeout, ...args) {
    const {
      delegate
    } = timeoutProvider;

    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout(handler, timeout, ...args);
    }

    return setTimeout(handler, timeout, ...args);
  },

  clearTimeout(handle) {
    const {
      delegate
    } = timeoutProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },

  delegate: undefined
}; //# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ 8822:
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/symbol/observable.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observable": () => (/* binding */ observable)
/* harmony export */ });
const observable = (() => typeof Symbol === 'function' && Symbol.observable || '@@observable')(); //# sourceMappingURL=observable.js.map

/***/ }),

/***/ 7448:
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/ObjectUnsubscribedError.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectUnsubscribedError": () => (/* binding */ ObjectUnsubscribedError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ 3888);

const ObjectUnsubscribedError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(_super => function ObjectUnsubscribedErrorImpl() {
  _super(this);

  this.name = 'ObjectUnsubscribedError';
  this.message = 'object unsubscribed';
}); //# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),

/***/ 7896:
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/UnsubscriptionError.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsubscriptionError": () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ 3888);

const UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(_super => function UnsubscriptionErrorImpl(errors) {
  _super(this);

  this.message = errors ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}` : '';
  this.name = 'UnsubscriptionError';
  this.errors = errors;
}); //# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ 8737:
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/arrRemove.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrRemove": () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
  if (arr) {
    const index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
} //# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ 3888:
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/createErrorClass.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createErrorClass": () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
  const _super = instance => {
    Error.call(instance);
    instance.stack = new Error().stack;
  };

  const ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
} //# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ 2806:
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/errorContext.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "captureError": () => (/* binding */ captureError),
/* harmony export */   "errorContext": () => (/* binding */ errorContext)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ 2416);

let context = null;
function errorContext(cb) {
  if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
    const isRoot = !context;

    if (isRoot) {
      context = {
        errorThrown: false,
        error: null
      };
    }

    cb();

    if (isRoot) {
      const {
        errorThrown,
        error
      } = context;
      context = null;

      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
} //# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ 4671:
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/identity.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
  return x;
} //# sourceMappingURL=identity.js.map

/***/ }),

/***/ 576:
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/isFunction.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
  return typeof value === 'function';
} //# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ 5032:
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/noop.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
function noop() {} //# sourceMappingURL=noop.js.map

/***/ }),

/***/ 9635:
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/pipe.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "pipeFromArray": () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ 4671);

function pipe(...fns) {
  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input) {
    return fns.reduce((prev, fn) => fn(prev), input);
  };
} //# sourceMappingURL=pipe.js.map

/***/ }),

/***/ 7849:
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/util/reportUnhandledError.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportUnhandledError": () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ 2416);
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ 3410);


function reportUnhandledError(err) {
  _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(() => {
    const {
      onUnhandledError
    } = _config__WEBPACK_IMPORTED_MODULE_1__.config;

    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
} //# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ 379:
/*!***************************************************!*\
  !*** ./node_modules/ts-duration/dist/duration.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Duration = void 0;
const NANOSECOND = 1;
const MICROSECOND = 1000 * NANOSECOND;
const MILLISECOND = 1000 * MICROSECOND;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const UNIT_NANOSECOND = 'ns';
const UNIT_MICROSECOND = 'μs';
const UNIT_MILLISECOND = 'ms';
const UNIT_SECOND = 's';
const UNIT_MINUTE = 'm';
const UNIT_HOUR = 'h';

class Duration {
  constructor(value) {
    this.value = value;
  }
  /**
   * Create a new Duration instance representing d nanoseconds
   *
   * @param d - nanoseconds
   * @returns a Duration representing d nanoseconds
   */


  static nanosecond(d) {
    return new Duration(d * NANOSECOND);
  }
  /**
   * Create a new Duration instance representing d microseconds
   *
   * @param d - microseconds
   * @returns a Duration representing d microseconds
   */


  static microsecond(d) {
    return new Duration(d * MICROSECOND);
  }
  /**
   * Create a new Duration instance representing d milliseconds
   *
   * @param d - milliseconds
   * @returns a Duration representing d milliseconds
   */


  static millisecond(d) {
    return new Duration(d * MILLISECOND);
  }
  /**
   * Create a new Duration instance representing d seconds
   *
   * @param d - seconds
   * @returns a Duration representing d seconds
   */


  static second(d) {
    return new Duration(d * SECOND);
  }
  /**
   * Create a new Duration instance representing d minutes
   *
   * @param d - minutes
   * @returns a Duration representing d minutes
   */


  static minute(d) {
    return new Duration(d * MINUTE);
  }
  /**
   * Create a new Duration instance representing d hours
   *
   * @param d - hours
   * @returns a Duration representing d hours
   */


  static hour(d) {
    return new Duration(d * HOUR);
  }
  /**
   * Calculate the duration until the Date t
   *
   * @param t - a Date
   * @returns The Duration until t
   */


  static until(t) {
    const now = this.millisecond(new Date().getTime());
    const then = this.millisecond(t.getTime());
    return then.sub(now);
  }
  /**
   * Calculate the duration since the Date t
   *
   * @param t - a Date
   * @returns The Duration since t
   */


  static since(t) {
    const now = this.millisecond(new Date().getTime());
    const then = this.millisecond(t.getTime());
    return now.sub(then);
  }
  /**
   * Get the duration as nanoseconds
   *
   * @returns duration in nanoseconds
   */


  get nanoseconds() {
    return this.value;
  }
  /**
   * Get the duration as microseconds
   *
   * @returns duration in microseconds
   */


  get microseconds() {
    return this.value / MICROSECOND;
  }
  /**
   * Get the duration as milliseconds
   *
   * @returns duration in milliseconds
   */


  get milliseconds() {
    return this.value / MILLISECOND;
  }
  /**
   * Get the duration as seconds
   *
   * @returns duration in seconds
   */


  get seconds() {
    return this.value / SECOND;
  }
  /**
   * Get the duration as minutes
   *
   * @returns duration in minutes
   */


  get minutes() {
    return this.value / MINUTE;
  }
  /**
   * Get the duration as hours
   *
   * @returns duration in hours
   */


  get hours() {
    return this.value / HOUR;
  }
  /**
   * Return a string representing the duration in the form "72h3m0.5s".
   * Leading zero units are omitted. As a special case, durations less than
   * one second format use a smaller unit (milli-, micro-, or nanoseconds)
   * to ensure that the leading digit is non-zero. The zero duration
   * formats as 0s.
   *
   * @returns a string representing the duration
   */


  toString() {
    const abs = Math.abs(this.value);
    const prefix = this.value < 0 ? '-' : '';

    if (this.value === 0) {
      return `0${UNIT_SECOND}`;
    }

    if (abs < MICROSECOND) {
      return `${prefix}${abs}${UNIT_NANOSECOND}`;
    } else if (abs < MILLISECOND) {
      return `${prefix}${abs / MICROSECOND}${UNIT_MICROSECOND}`;
    } else if (abs < SECOND) {
      return `${prefix}${abs / MILLISECOND}${UNIT_MILLISECOND}`;
    } else if (abs < MINUTE) {
      return `${prefix}${abs / SECOND}${UNIT_SECOND}`;
    } else if (abs < HOUR) {
      const seconds = abs % MINUTE / SECOND;
      const minutes = Math.floor(abs / MINUTE);
      return `${prefix}${minutes}${UNIT_MINUTE}${seconds}${UNIT_SECOND}`;
    } else {
      const seconds = abs % MINUTE / SECOND;
      const minutes = Math.floor(abs % HOUR / MINUTE);
      const hours = Math.floor(abs / HOUR);
      return `${prefix}${hours}${UNIT_HOUR}${minutes}${UNIT_MINUTE}${seconds}${UNIT_SECOND}`;
    }
  }
  /**
   * Addition with the specified duration: this + d
   *
   * @param d - the duration to add to the current
   * @returns the sum this + d
   */


  add(d) {
    return new Duration(this.value + d.value);
  }
  /**
   * Subtraction of the specified duration: this - d
   *
   * @param d - the duration to remove from the current
   * @returns the difference this - d
   */


  sub(d) {
    return new Duration(this.value - d.value);
  }
  /**
   * Rounds the duration to the nearest multiple of the specified duration.
   * If m is zero or negative, the duration is unchanged.
   *
   * @param m - the duration multiple to round to
   * @returns this duration rounded to the nearest multiple of m
   */


  round(m) {
    if (m.value <= 0) {
      return this;
    }

    let remainder = this.value % m.value;

    if (this.value >= 0) {
      if (remainder + remainder < m.value) {
        return new Duration(this.value - remainder);
      } else {
        return new Duration(this.value + m.value - remainder);
      }
    } else {
      remainder = -remainder;

      if (remainder + remainder < m.value) {
        return new Duration(this.value + remainder);
      } else {
        return new Duration(this.value - m.value + remainder);
      }
    }
  }

}

exports.Duration = Duration;

/***/ }),

/***/ 3997:
/*!************************************************!*\
  !*** ./node_modules/ts-duration/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Duration = void 0;

var duration_1 = __webpack_require__(/*! ./duration */ 379);

Object.defineProperty(exports, "Duration", ({
  enumerable: true,
  get: function () {
    return duration_1.Duration;
  }
}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [151], () => (__webpack_require__(4180)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + "52733c23d7401077" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	(() => {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = () => {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScriptURL: (url) => (url)
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("angular#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script url */
/******/ 	(() => {
/******/ 		__webpack_require__.tu = (url) => (__webpack_require__.tt().createScriptURL(url));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			180: 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.tu(__webpack_require__.p + __webpack_require__.u(chunkId)));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkrST_Miner"] = self["webpackChunkrST_Miner"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e(151).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;