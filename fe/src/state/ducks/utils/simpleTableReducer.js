import produce from "immer";

const initState = {
   loading: false,
   data: null,
   total: 0,
   query: { page: 1, limit: 10 }
};

const simpleTableReducer = (tableName, loadAction, successAction, failAction) => {
   const data = produce((draff, action) => {
      const { type, payload } = action;

      switch (type) {
         case loadAction:
            draff.loading = true;
            draff.query = action.meta.body;
            return;
         case successAction:
            let data = payload.result;
            draff.loading = false;
            draff.data = data[tableName];
            draff.total = data.total;
            return;
         case failAction:
            draff = initState;
            draff.loading = false;
            return;
         default:
            return draff;
      }
   }, initState);

   return data;
};

export const selector = (state, reducer) => ({
   total: state[reducer].total,
   data: state[reducer].data,
   loading: state[reducer].loading,
   query: state[reducer].query
});

export default simpleTableReducer;
