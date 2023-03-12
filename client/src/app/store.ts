import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "../features/auth/login";
import { cartReducer } from "../features/cart/cart";
import { createReducer } from "../features/auth/create";
import { allEscortReducer } from "../features/user/getAllUser";
import { singleEscortReducer } from "../features/user/getSingleUser";

const persistConfig = {
	key: "root",
	storage,
};

let rootReducer = combineReducers({
	auth: authReducer,
	cartItems: cartReducer,
	create: createReducer,
	escort: allEscortReducer,
	singleEscort: singleEscortReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
export const persistor = persistStore(store);
