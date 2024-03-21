'use client'
import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "../storage";

const rootPersistConfig = {
  key: 'root',
  version: 1,
  blacklist: [],
  storage
}

const rootReducer = combineReducers({
  authReducer: auth
})

export default persistReducer(rootPersistConfig, rootReducer)