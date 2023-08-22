import React, { createContext, useContext, useReducer } from 'react'

export const CartStateContext = createContext(); // Define CartStateContext once
export const CartDispatchContext = createContext(); // Define CartDispatchContext once

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, qty: action.qty }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: (parseInt(action.qty) + parseInt( food.qty)), price: (action.price + food.price) }
                }
                
            })
            return arr
            
        case "DROP":
                let emptArray=[]
                return emptArray


        default:
            console.log("error in reducer");


    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
