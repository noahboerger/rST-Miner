/// <reference lib="webworker" />
import { XesParser } from '../classes/parser/xesParser';
import { TypedJSON } from 'typedjson';
import { EventLog } from '../classes/EventLog/eventlog';

onmessage = function (data) {
    const parser = new XesParser();
    const result = parser.parse(data.data);
    const serializer = new TypedJSON(EventLog);
    const jsonResult = serializer.stringify(result);
    postMessage(jsonResult);
};
