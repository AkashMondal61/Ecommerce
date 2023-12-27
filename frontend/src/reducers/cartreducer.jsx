import { ADD_TO_CART } from "../constants/cartconstants";
export const addcartreducer=(state={cartItems:[]},action)=>{
switch(action.type)
{
    case ADD_TO_CART:
        const item=action.payload;
        const isPresent=cartItems.find((i)=>i.id==item.id)
        if(isPresent)
        {
          return{
            ...state,
            cartItems:[...state.cartItems,item],
          }
        }
        else{
            return{
                ...state,
                cartItems:[...state.cartItems,item],
            }
        }

}
}