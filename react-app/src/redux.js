import {
    createStore,
} from 'redux';
import update from 'react-addons-update';

export const addToTab = (payload) => ({
    type: 'ADD_TAB',   
    payload                     // <-- action.type
});
export const addTabList = (payload) => ({
    type: 'ADD_TAB_LIST',   
    payload                     // <-- action.type
});

export const updateTabDetails = (payload) => ({
    type: 'UPDATE_TAB_DETAILS',   
    payload                     // <-- action.type
});

export const tabReducer=(state =initialState, action)=>{
    console.log("reducer state",state,action.type);
    switch (action.type) {
        
      case 'UPDATE_TAB_DETAILS':
           const tabItems= state.tabItems.map( tabItem => {
            if (tabItem.id === action.payload.id) {
                return update(tabItem,{tablist:{$push: [action.payload.newItemlist]}})
            }
             return tabItem;
           })
            return Object.assign({},
                                state,
                                {tabItems:tabItems,nextID:state.nextID})
      case 'ADD_TAB':

            return Object.assign({},
                                 state,
                                 { tabItems:[...state.tabItems,action.payload],nextID:state.nextID+1}
                                )
      case 'ADD_TAB_LIST':
            return Object.assign({},
                                 state,
                                 { tabItems:action.payload,nextID:action.payload[action.payload.length-1].id+1}
                                                    )                         
       default:
            return state;
    }
}



const initialState = { 
    tabItems: [],
     nextID:0             
};

export function configureStore(initialState = initialState) { // initialState = initialState | {}
    const store = createStore(tabReducer,initialState);
    return store;
};

export const store = configureStore();
