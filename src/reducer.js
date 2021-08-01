export const initialState = {
    basket:[],
    user:null,
    searchProduct:""
}

//# basket:[{id,title,image,price,rating}]
//# user: {displayName, email, photoURL,refreshToken} 

export const getBasketTotal = (basket) => 
    basket?.reduce(
                    (initialAmt,arrayIndex) => 
                    arrayIndex.price + initialAmt , 0
                ) 

const reducer = (state,action) => {
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            }

        case "REMOVE_FROM_BASKET":
           const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
           let newBasket = [...state.basket];
            if(index >= 0) {
                newBasket.splice(index,1)
            } else {
                console.warn("Product not in basket"); 
            }

            return {
                ...state,
                basket: newBasket
            }

        case "EMPTY_CART":
            return {
                ...state,
                basket:[]
            }

        case "SET_USER": 
            return {
                ...state,
                user:action.user
            }

        case "SEARCH_PRODUCT":
            return{
                ...state,
                searchProduct: action.searchProduct
            }

    }
}

export default reducer;