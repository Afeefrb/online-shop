import React, {createContext, useContext, useReducer} from 'react';

//prepares the data layer
export const StateContext = createContext();  

//wraps your app and provides the data layer
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//Pulls data from the data layer
export const UseStateValue = () => useContext(StateContext);