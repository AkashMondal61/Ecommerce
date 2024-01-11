import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST,  CREATE_ORDER_SUCCESS,CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_FAIL,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS, 
  ORDER_DETAILS_FAIL,
  ALL_ORDER_FAIL,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_REQUEST,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL} from "../constants/Orderconstants";


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case  CREATE_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case CREATE_ORDER_FAIL:
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
    }
  };

  export const myOrderReducer = (state = { orders: []}, action) => {
    switch (action.type) {
      case MY_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case  MY_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case MY_ORDER_FAIL:
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
    }
  };
  export const OrderReducer = (state = {detailorder: []}, action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case  ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          detailorder: action.payload,
        };
  
      case ORDER_DETAILS_FAIL:
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
    }
  }

  export const AllOrderReducer = (state = {allOrder: []}, action) => {
    switch (action.type) {
      case ALL_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case  ALL_ORDER_SUCCESS:
        return {
          loading: false,
          allOrder: action.payload,
        };
  
      case ALL_ORDER_FAIL:
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
    }
  }


  export const deleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ORDER_REQUEST:
        return {
          loading: true,
        };
  
      case  DELETE_ORDER_SUCCESS:
        return {
          loading: false,
          success:true,
          allOrder: action.payload,
        };
        case DELETE_ORDER_RESET:
          return {
            ...state,
            success:false,
            isDeleted: false,
          };
      case DELETE_ORDER_FAIL:
        return {
          loading: false,
          success:false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  }