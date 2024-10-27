import React, { createContext, useContext, useReducer } from "react";


interface initialState {
  name: string;
  price: number | null;
  imageURL: string;
  isLoading: boolean;
}

type ACTIONTYPE =
  | { type: "productName"; payload: string }
  | { type: "productPrice"; payload: number | null }
  | { type: "productImageURL"; payload: string }
  | {type: "loadingState" ; payload: boolean};

// Define the context value type
type ProductContextType = {
    name: string;
    price: number | null;
    imageURL: string;
    isLoading: boolean;
    dispatch: React.Dispatch<ACTIONTYPE>;
  };
  

const initialState: initialState = {
  name: "",
  price: null,
  imageURL: "",
  isLoading : false
};

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "productName":
      return { ...state, name: action.payload };

    case "productPrice":
      return { ...state, price: action.payload };

    case "productImageURL":
      return { ...state, imageURL: action.payload };
    
    case "loadingState" : 
        return {...state, isLoading : action.payload}

    default:
      throw new Error("Action unkonwn");
  }
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);



const ProductProvider: React.FC<{ children: React.ReactNode }>  = ({children}) => {
  const [{ name, price, imageURL, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <ProductContext.Provider value={{ name, price, imageURL, isLoading ,dispatch }}> {children} </ProductContext.Provider>
  );
};

const useProduct = () : ProductContextType => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("ProductContext was used outside of the ProductProvider!");
    }
    return context;
}


export { ProductProvider, useProduct };