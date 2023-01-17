import {XesParser} from "../../parser/eventlog/xesParser";

describe('rST-Miner-Performance', () => {



    it('other simple mining test', () => {
        const request = new XMLHttpRequest();
        request.open('GET', 'base/' + 'test/assets/repairExample.xes', false);
        request.send(null)

        const eventlogString = request.response.toString()
        console.log(eventlogString)
    });


    it('simple mining test', (done) => {
        const filePath = 'test/assets/repairExample.xes';
        const request: XMLHttpRequest = createRequest(filePath);

        request.onload = r => {
            const xes = new XesParser().parse(request.response.toString());
            console.log(xes.traces.length)
            done();
        };

        // trigger
        request.send(null);
    });

    function createRequest(filePath: string): XMLHttpRequest {
        const request = new XMLHttpRequest();
        request.open('GET', 'base/' + filePath, true);
        request.responseType = 'text';
        return request;
    };
});
