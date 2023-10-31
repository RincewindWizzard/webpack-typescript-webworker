const worker = new Worker('./worker.bundle.js');

type FibonacciCallback = (result: number) => void

interface FibonacciRequest {
    requested: number,
    callback: FibonacciCallback
}

interface FibonacciResponse {
    requested: number,
    result: number
}


function postRequest(req: FibonacciRequest): void {
    callbacks.push(req)
    worker.postMessage({type: 'request', payload: req.requested});
}

const callbacks: FibonacciRequest[] = []

function postResponse(resp: FibonacciResponse) {
    let filteredCallbacks: (FibonacciRequest | null)[] = callbacks.map((cb) => {
        if (cb.requested == resp.requested) {
            cb.callback(resp.result)
            return null
        } else {
            return cb
        }
    })
    callbacks.length = 0
    filteredCallbacks.forEach((cb) => {
        if (cb) {
            callbacks.push(cb);
        }
    });
}

worker.onmessage = (event) => {
    const message = event.data
    if (message.type === 'response') {
        const payload = message.payload
        postResponse({
            requested: payload.num,
            result: payload.fib
        })
    }
}

export const calculate_fibonacci = (num: number, cb: FibonacciCallback) => {
    postRequest({
        requested: num,
        callback: cb
    })
};