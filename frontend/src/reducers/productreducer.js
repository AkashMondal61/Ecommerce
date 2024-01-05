import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET
} from "../constants/productconstants"
    export const productsReducer = (state = { products: [] }, action) => {
        switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.Products,
          productsCount: action.payload.productcount,
          elementperpage: action.payload.elementperpage,
          filterelement:action.payload.filterproducts,
        };
        case ALL_PRODUCT_FAIL: 
            return {
                loading: false,
                error: action.payload,
              };
     case CLEAR_ERRORS:
         return {
         ...state,
         error: null,
      };
      default:
        return state; 
  } }

  export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
case PRODUCT_DETAILS_REQUEST:
  return {
    loading: true,
    ...state,
  };
  case  PRODUCT_DETAILS_SUCCESS:
    return {
      loading: false,
      product: action.payload,
    };
    case PRODUCT_DETAILS_FAIL: 
        return {
            loading: false,
            error: action.payload,
          };
 case CLEAR_ERRORS:
     return {
     ...state,
     error: null,
  };
  default:
    return state; 
} }

export const reviewReducer = (state = {  }, action) => {
  switch (action.type) {
case NEW_REVIEW_REQUEST:
return {
  loading: true,
  ...state,
};
case  NEW_REVIEW_SUCCESS:
  return {
    loading: false,
     sucess: action.payload,
  };
  case NEW_REVIEW_FAIL: 
      return {
        ...state,
          loading: false,
          error: action.payload,
        };
        case NEW_REVIEW_RESET: 
      return {
        ...state,
        success: false,
        };
case CLEAR_ERRORS:
   return {
   ...state,
   error: null,
};
default:
  return state; 
} }