# BroadcastChannel + Atomics.pause gotchas

You need headers that enable SharedArray buffer to test this project.

[Live demo](https://webreflection.github.io/issue/sab/broadcast-channel/?sw)

One easy way to do it is via *mini-coi*:

```sh
# from the root of this repo
npx mini-coi ./sab/message-channel
```

You can reach `http://localhost:8080/` and see in Chrome the following output:

```
sending message
post is fine
data received directly / via postMessage
roundtrip for 123
```

You will never see anything after *sending message* and *post is fine* in Firefox though, because the `bc.postMessage` is never actually executed.
