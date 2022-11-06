/// <reference lib="webworker" />
import { XesParser } from '../classes/parser/xesParser';
import { TypedJSON } from 'typedjson';
import { Eventlog } from '../classes/eventlog/eventlog';

onmessage = function (data) {
    const parser = new XesParser();
    const result = parser.parse(data.data);
    const serializer = new TypedJSON(Eventlog);
    const jsonResult = serializer.stringify(result);
    postMessage(jsonResult);
};
