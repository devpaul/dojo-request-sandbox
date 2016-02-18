import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import request from 'dojo-core/request';
import { NodeRequestOptions } from 'dojo-core/request/node';
import WritableStream from 'dojo-core/streams/WritableStream';
import Promise from 'dojo-core/Promise';

const fileUrl = 'http://192.168.56.10/investigator/setup_invapp.exe';

class Stream<T> extends WritableStream<T> {
    close() {
        console.log('close');
        return super.close();
    }

    write(chunk: T): Promise<void> {
        console.log(`write ${(<any> chunk).length}`);
        return super.write(chunk);
    }
}

registerSuite({
    name: 'request test',

    'streamed request'() {
        const options: NodeRequestOptions<string> = {
            streamData: true,
            streamTarget: new Stream<string>()
        };
        return request(fileUrl, options).then(function (response) {
            console.log('response');
        });
    }
});
