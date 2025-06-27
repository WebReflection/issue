const bc = new BroadcastChannel('test');

// in Firefox, with Atomics.wait everything is fine
// with Atomics.pause() it might take "forever" ... just wait for it
const wait = Atomics.pause ?
  ((view, index) => {
    while (view[index] === 0)
      Atomics.pause();
  }) :
  Atomics.wait
;

addEventListener(
  'message',
  () => {
    const view = new Int32Array(
      new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT)
    );
    console.log('sending message');
    // pass the view here for browsers incapable of sending via bc
    postMessage({ message: 'post is fine', view });
    // try to send it via bc
    bc.postMessage(view);
    wait(view, 0);
    console.log('roundtrip for', view[1]);
    postMessage({ message: 'done' });
  },
  { once: true }
);
