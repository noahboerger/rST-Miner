/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4373:
/*!******************************************************!*\
  !*** ./src/app/classes/parser/eventlog/logParser.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogParser": () => (/* binding */ LogParser)
/* harmony export */ });
/* harmony import */ var _models_eventlog_eventlog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/eventlog/eventlog */ 5081);
/* harmony import */ var _models_eventlog_eventlog_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/eventlog/eventlog-event */ 9924);
/* harmony import */ var _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/eventlog/eventlog-trace */ 2289);
/* harmony import */ var _models_eventlog_eventlog_attribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/eventlog/eventlog-attribute */ 1416);




class LogParser {
  constructor() {
    this._undefinedValue = "''";
    this._typeLogElement = '.type log';
    this._attributesElement = '.attributes';
    this._eventsElement = '.events';
    this._caseIdElement = 'case-id';
    this._activityElement = 'concept:name';
    this._lifecycleElement = 'lifecycle:transition';
    this._escapeString = "'";
  }
  /**
   * Liest einen String im .type log Format ein, das von Robin Bergenthum und Jakub Kovar definiert wurde und wandelt es in die
   * intern verwendete Repräsentation als {@link Eventlog} um
   *
   * @param text String im .type log Format, der geparst werden soll
   * @return interne Darstellung als {@link Eventlog}
   */


  parse(text) {
    if (text.trim() === '') {
      return new _models_eventlog_eventlog__WEBPACK_IMPORTED_MODULE_0__.Eventlog([], [], [], [], []);
    }

    const lines = text.split(/\r?\n/);
    let indexLog;

    try {
      indexLog = LogParser.indexOfTokenIfExists(lines, this._typeLogElement);
    } catch (e) {
      indexLog = -1;
    }

    const indexAttributes = LogParser.indexOfTokenIfExists(lines, this._attributesElement);
    const indexEvents = LogParser.indexOfTokenIfExists(lines, this._eventsElement);
    const max = lines.length;
    const keywordIndices = [indexLog, indexAttributes, indexEvents, max];
    const attributesLines = lines.slice(indexAttributes + 1, LogParser.nextKeyword(keywordIndices, indexAttributes));
    const headers = attributesLines.map(attribute => attribute.trim()); // Duplicate Attributes

    if (headers.filter((item, index) => headers.indexOf(item) !== index).length > 0) {
      throw LogParser.PARSING_ERROR;
    }

    const eventLines = lines.slice(indexEvents + 1, LogParser.nextKeyword(keywordIndices, indexEvents));
    const traces = this.parseTraces(headers, eventLines);
    return new _models_eventlog_eventlog__WEBPACK_IMPORTED_MODULE_0__.Eventlog([], [], [], traces, []);
  }

  parseTraces(headers, eventLines) {
    const asTable = eventLines.map(eventLine => this.splitEventLineString(eventLine));
    const dictCaseIdentifierToTrace = new Map();
    asTable.forEach(eventLineSplit => {
      var _a;

      if (eventLineSplit[headers.indexOf(this._caseIdElement)] === undefined || eventLineSplit[headers.indexOf(this._activityElement)] === undefined) {
        throw LogParser.PARSING_ERROR;
      }

      const caseId = parseInt(eventLineSplit[headers.indexOf(this._caseIdElement)]);
      const activity = eventLineSplit[headers.indexOf(this._activityElement)];
      let lifecycle = undefined;
      const lifecycleHeaderIndex = headers.indexOf(this._lifecycleElement);

      if (lifecycleHeaderIndex > -1 && lifecycleHeaderIndex < eventLineSplit.length) {
        lifecycle = eventLineSplit[lifecycleHeaderIndex];
      }

      const eventLogAttributes = headers.filter(header => ![this._caseIdElement, this._activityElement, this._lifecycleElement].includes(header)).filter(header => headers.indexOf(header) < eventLineSplit.length).filter(header => eventLineSplit[headers.indexOf(header)] !== this._undefinedValue).map(header => LogParser.eventLogAttributeOf(header, eventLineSplit[headers.indexOf(header)]));

      if (!dictCaseIdentifierToTrace.has(caseId)) {
        dictCaseIdentifierToTrace.set(caseId, new _models_eventlog_eventlog_trace__WEBPACK_IMPORTED_MODULE_2__.EventlogTrace([], [], caseId));
      }

      (_a = dictCaseIdentifierToTrace.get(caseId)) === null || _a === void 0 ? void 0 : _a.events.push(new _models_eventlog_eventlog_event__WEBPACK_IMPORTED_MODULE_1__.EventlogEvent(eventLogAttributes, activity, lifecycle));
    });
    return Array.from(dictCaseIdentifierToTrace.values());
  }

  splitEventLineString(eventLine) {
    let lineSplit = [];

    while (eventLine !== '') {
      let startIndex;
      let endIndex;
      let nextIndex;

      if (eventLine.startsWith(this._undefinedValue)) {
        lineSplit.push(this._undefinedValue);
        eventLine = eventLine.slice(this._undefinedValue.length + 1);
        continue;
      } else if (eventLine.startsWith(this._escapeString)) {
        startIndex = 1;

        for (let actIndex = startIndex; actIndex < eventLine.length; actIndex++) {
          if (eventLine.charAt(actIndex) == this._escapeString && eventLine.charAt(actIndex - 1) !== '\\') {
            endIndex = actIndex;
            nextIndex = endIndex + 2;
            break;
          }
        }

        if (endIndex === undefined || nextIndex === undefined) {
          throw LogParser.PARSING_ERROR;
        }
      } else {
        startIndex = 0;

        if (eventLine.indexOf(' ') === -1) {
          endIndex = eventLine.length;
        } else {
          endIndex = eventLine.indexOf(' ');
        }

        nextIndex = endIndex + 1;
      }

      lineSplit.push(eventLine.slice(startIndex, endIndex).replace(new RegExp("\\\\'", 'g'), "'"));
      eventLine = eventLine.slice(nextIndex);
    }

    return lineSplit;
  }

  static eventLogAttributeOf(key, value) {
    switch (value) {
      case 'true':
        return new _models_eventlog_eventlog_attribute__WEBPACK_IMPORTED_MODULE_3__.BooleanAttribute(true, key);

      case 'false':
        return new _models_eventlog_eventlog_attribute__WEBPACK_IMPORTED_MODULE_3__.BooleanAttribute(false, key);
    }

    if (value.includes('T') || value.includes(':') || value.includes('-')) {
      const timestamp = Date.parse(value);

      if (!isNaN(timestamp)) {
        return new _models_eventlog_eventlog_attribute__WEBPACK_IMPORTED_MODULE_3__.DateAttribute(new Date(timestamp), key);
      }
    }

    if (value.includes('.') || value.includes(',')) {
      const asFloat = parseFloat(value);

      if (!isNaN(asFloat)) {
        return new _models_eventlog_eventlog_attribute__WEBPACK_IMPORTED_MODULE_3__.FloatAttribute(asFloat, key);
      }
    }

    const asInt = parseInt(value);

    if (!isNaN(asInt)) {
      return new _models_eventlog_eventlog_attribute__WEBPACK_IMPORTED_MODULE_3__.IntAttribute(asInt, key);
    }

    return new _models_eventlog_eventlog_attribute__WEBPACK_IMPORTED_MODULE_3__.StringAttribute(value, key);
  }

  static indexOfTokenIfExists(lines, token) {
    const indexOfToken = lines.indexOf(token);

    if (indexOfToken === -1) {
      throw LogParser.PARSING_ERROR;
    }

    return indexOfToken;
  }

  static nextKeyword(keywordIndices, actKeyWord) {
    const result = Math.min(...keywordIndices.filter(value => value > actKeyWord));

    if (isNaN(result)) {
      throw LogParser.PARSING_ERROR;
    }

    return result;
  }

}
LogParser.PARSING_ERROR = new Error('given .type log string can not be parsed');

/***/ }),

/***/ 7722:
/*!**********************************************!*\
  !*** ./src/app/workers/log-parser.worker.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var typedjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typedjson */ 6283);
/* harmony import */ var _classes_models_eventlog_eventlog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/models/eventlog/eventlog */ 5081);
/* harmony import */ var _classes_parser_eventlog_logParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/parser/eventlog/logParser */ 4373);
/// <reference lib="webworker" />




onmessage = function (data) {
  const parser = new _classes_parser_eventlog_logParser__WEBPACK_IMPORTED_MODULE_1__.LogParser();
  const result = parser.parse(data.data);
  const serializer = new typedjson__WEBPACK_IMPORTED_MODULE_2__.TypedJSON(_classes_models_eventlog_eventlog__WEBPACK_IMPORTED_MODULE_0__.Eventlog);
  const jsonResult = serializer.stringify(result);
  postMessage(jsonResult);
};

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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [151], () => (__webpack_require__(7722)))
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
/******/ 			return "" + chunkId + "." + "05aed6202aeb524d" + ".js";
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
/******/ 			722: 1
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