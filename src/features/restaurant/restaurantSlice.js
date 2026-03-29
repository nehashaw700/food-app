import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMenuCategories,
  getRestaurantById,
  getRestaurantList,
} from "../../services/restaurantService";

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      return await getRestaurantList();
    } catch (error) {
      return rejectWithValue("Unable to load restaurants right now.");
    }
  },
  {
    condition: (_, { getState }) => {
      const { restaurant } = getState();
      return restaurant.status !== "loading" && restaurant.list.length === 0;
    },
  }
);

export const fetchRestaurantMenu = createAsyncThunk(
  "restaurant/fetchRestaurantMenu",
  async (resId, { rejectWithValue }) => {
    try {
      const restaurant = getRestaurantById(resId);

      if (!restaurant) {
        return rejectWithValue("Restaurant details were not found.");
      }

      return {
        resId,
        restaurant,
        categories: getMenuCategories(),
      };
    } catch (error) {
      return rejectWithValue("Unable to load the restaurant menu right now.");
    }
  },
  {
    condition: (resId, { getState }) => {
      const menuEntry = getState().restaurant.menuById[resId];
      // Avoid duplicate requests when a menu is already loading or has already
      // been cached for the selected restaurant.
      return !menuEntry || (menuEntry.status !== "loading" && !menuEntry.loaded);
    },
  }
);

const initialState = {
  list: [],
  status: "idle",
  error: null,
  menuById: {},
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load restaurants.";
      })
      .addCase(fetchRestaurantMenu.pending, (state, action) => {
        const resId = action.meta.arg;

        state.menuById[resId] = {
          ...state.menuById[resId],
          status: "loading",
          error: null,
          loaded: false,
        };
      })
      .addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
        const { resId, restaurant, categories } = action.payload;

        state.menuById[resId] = {
          status: "succeeded",
          error: null,
          loaded: true,
          restaurant,
          categories,
        };
      })
      .addCase(fetchRestaurantMenu.rejected, (state, action) => {
        const resId = action.meta.arg;

        state.menuById[resId] = {
          ...state.menuById[resId],
          status: "failed",
          error: action.payload || "Unable to load menu.",
          loaded: false,
        };
      });
  },
});

export default restaurantSlice.reducer;
