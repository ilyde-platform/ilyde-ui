import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { EnvironmentsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';

const hwtiersAdapter = createEntityAdapter();

const initialState = hwtiersAdapter.getInitialState({
  status: 'idle',
  total: 0,
  error: null,
});

export const fetchHwtiers = createAsyncThunk('hwtiers/fetchHwtiers', async () => {
  const apiConfig = getIlydeApiConfiguration();
  const environmentsApi = new EnvironmentsApi(apiConfig);
  const hwtiers = environmentsApi.listHardwaretiers(100, 1).then((response) => {
    return response.data;
  });
  return hwtiers;
});

export const addNewHwtier = createAsyncThunk(
  'hwtiers/addNewHwtier',
  async (body, { rejectWithValue }) => {
    const apiConfig = getIlydeApiConfiguration();
    const environmentsApi = new EnvironmentsApi(apiConfig);
    const hwtier = environmentsApi.createHardwaretier(body).then((response) => {
      return response.data;
    });
    return hwtier;
  }
);

const hwtiersSlice = createSlice({
  name: 'hwtiers',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHwtiers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchHwtiers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.total = action.payload.total;
      hwtiersAdapter.upsertMany(state, action.payload.data);
    },
    [fetchHwtiers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewHwtier.fulfilled]: hwtiersAdapter.addOne,
  },
});

const hwtiersReducer = hwtiersSlice.reducer;
export default hwtiersReducer;

export const {
  selectAll: selectAllHwtiers,
  selectById: selectHwtierById,
} = hwtiersAdapter.getSelectors((state) => state.hwtiers);

export const selectHwtierByDeployment = createSelector(
  [selectAllHwtiers, (state, isDeployment) => isDeployment],
  (hwtiers, isDeployment) => hwtiers.filter((hwtier) => hwtier.deployment === isDeployment)
);
