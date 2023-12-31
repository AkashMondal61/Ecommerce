import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartconstants";
export const addcartreducer=(state={cartItems:[]},action)=>{
switch(action.type)
{
    case ADD_TO_CART:
        const item=action.payload;
        const isPresent= state.cartItems.find((i)=>i.product===item.product)
        if(isPresent)
        {
          return{
            ...state,
            cartItems: state.cartItems.map((e)=>e.product===item.product?item:e  ),
          }
        }
        else{
            return{
                ...state,
                cartItems:[...state.cartItems,item],
            }
        }
        case REMOVE_CART_ITEM:
          const items=action.payload;
            return{
              ...state,
              cartItems: state.cartItems.filter((e)=>e.product!==items.product ),
            }
        case SAVE_SHIPPING_INFO:
          return{
            ...state,
            shippingInfo:action.payload,
          }
    default:
      return state;

}
}