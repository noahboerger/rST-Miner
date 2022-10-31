/// <reference lib="webworker" />
import { TypedJSON } from 'typedjson';
import { EventLog } from '../classes/EventLog/eventlog';
import { LogParser } from '../classes/parser/logParser';

onmessage = function (data) {
    const parser = new LogParser();
    const result = parser.parse(data.data);
    const serializer = new TypedJSON(EventLog);
    const jsonResult = serializer.stringify(result);
    postMessage(jsonResult);
};
