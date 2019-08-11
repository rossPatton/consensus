# /
All redux logic should go here. Group actions/reducers/thunks together logically by the state they change or the type of request being made (getting a user is a different interaction than updating an existing user).

The top level is also where we initialize the store, combine our reducers and apply our middleware.

# async/
Async actions + reducers go here (ie, thunks). 1 folder per interaction, with actions/reducers/thunk inside. Use the redux-thunk template of BEGIN | SUCCESS | FAILURE.

Because we combine reducers, even key of state is tied to 1 reducer. Usually associated with a thunk. You can update things syncronously by calling async actions directly, no need to create new sync actions.

# middleware/
Redux middleware goes here, 1 middleware per file. All middleware is global so this is the only location any middleware should go.

# sync/
Non-thunk actions + reducers go here. Just use the standard redux template. Should be kept as simple as possible.
