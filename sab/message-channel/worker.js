addEventListener(
  'message',
  ({ ports: [port] }) => {
    const data = new Int32Array(
      new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT)
    );
    console.log('sending message');
    postMessage('post is fine');
    port.postMessage(data); // this is not
    Atomics.wait(data, 0);
    console.log(data[1]);
  },
  { once: true }
);
