# /
All redux logic should go here. Group actions/reducers/thunks together logically by the state key they change, then by REST action (GET|POST|PATCH|DELETE).

So for example, if you had an action that affected the `example` state key by POSTing to an api endpoint, you would place that in `./example/post/actions.ts` and so on for every type of state change.

And if you wanted to make a sync action that changes the same `example` sttae key, you could place that in `./example/actions.ts`.

The top level is also where we export actions, initialize the store, combine our reducers and apply our middleware.

# middleware/
Redux middleware goes here, 1 middleware per file.
