import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IUser, IStateUser } from '@/models'

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (url: string, thunkAPI) => {
    const response = await fetch(url, {
      signal: thunkAPI.signal,
    })

    const data: IUser[] = await response.json()

    return data
  }
)

const initialState: IStateUser = {
  users: [],
  loading: true,
  error: '',
  filters: [],
}

const usersSlice = createSlice({
  name: '@users',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = [...state.filters, action.payload.name]
    },
    removeFilter: (state, action) => {
      state.filters = state.filters.filter(
        (item) => item !== action.payload.name
      )
    },
    clearFilter: (state) => {
      state.filters = []
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        state.error = 'Запрос прерван'
      } else {
        const error = new Error(
          'Извините, в данный момент сервис не работает, попробуйте позже!'
        )
        state.error = error.message
        state.loading = false
      }
    })
  },
})

export const { setFilter, removeFilter, clearFilter } = usersSlice.actions
export default usersSlice.reducer
