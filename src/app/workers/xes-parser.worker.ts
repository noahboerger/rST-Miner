/// <reference lib="webworker" />
import { XesParser } from '../classes/parser/eventlog/xesParser';
import { TypedJSON } from 'typedjson';
import { Eventlog } from '../classes/models/eventlog/eventlog';

onmessage = function (data) {
    const parser = new XesParser();
    const result = parser.parse(data.data);
    const serializer = new TypedJSON(Eventlog);
    const jsonResult = serializer.stringify(result);
    postMessage(jsonResult);
};
