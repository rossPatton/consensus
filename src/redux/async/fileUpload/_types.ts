export const FILE_UPLOAD_BEGIN = 'FILE_UPLOAD_BEGIN';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_FAILURE = 'FILE_UPLOAD_FAILURE';

export type tBeginAction = tAction<typeof FILE_UPLOAD_BEGIN>;
export type tSuccessAction = tAction<typeof FILE_UPLOAD_SUCCESS, tThunk<any>>;
export type tFailureAction = tAction<typeof FILE_UPLOAD_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
