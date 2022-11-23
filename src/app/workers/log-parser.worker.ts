/// <reference lib="webworker" />
import { TypedJSON } from 'typedjson';
import { Eventlog } from '../classes/models/eventlog/eventlog';
import { LogParser } from '../classes/parser/eventlog/logParser';

onmessage = function (data) {
    const parser = new LogParser();
    const result = parser.parse(data.data);
    const serializer = new TypedJSON(Eventlog);
    const jsonResult = serializer.stringify(result);
    postMessage(jsonResult);
};
