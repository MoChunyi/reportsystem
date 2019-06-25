import produce from 'immer';
const XYdatasReducer = (state={currentgraphitem: null, graphitems: []}, action) => {
    let newstate;
    switch(action.type) {
        case 'ADD_GRAPHS': {
            let graphitem = {
                id: `graphitem${state.graphitems.length}`,
                type: action.payload,
                xheaders: [],
                yheaders: [],
            };
            newstate = produce(state, draftState => {
                draftState.currentgraphitem = graphitem.id;
                draftState.graphitems.push(graphitem);
            });
            return newstate;
        }
        case 'DELETE_GRAPHS': {
            newstate = produce(state, draftState => {
    
            });
            return newstate;
        }
        case 'ADD_GRAPH_ITEM_XHEADER': {
            
            let currentgraphitemIndex = state.graphitems.findIndex(function(item, index, array) {
                if (item.id === state.currentgraphitem) return true;
            })
            newstate = produce(state, draftState => {
                draftState.graphitems[currentgraphitemIndex].xheaders.push(action.payload);
            });
            return newstate;
        }
        case 'ADD_GRAPH_ITEM_YHEADER': {
            
            let currentgraphitemIndex = state.graphitems.findIndex(function(item, index, array) {
                if (item.id === state.currentgraphitem) return true;
            })
            newstate = produce(state, draftState => {
                draftState.graphitems[currentgraphitemIndex].yheaders.push(action.payload);
            });
            return newstate;
        }
        case 'DELETE_GRAPH_ITEM_XHEADER': {
            let currentgraphitemIndex = state.graphitems.findIndex(function(item, index, array) {
                if (item.id === state.currentgraphitem) return true;
            })
            newstate = produce(state, draftState => {
                draftState.graphitems[currentgraphitemIndex].xheaders.splice(action.payload,1);
            });
            return newstate;
        }
        case 'DELETE_GRAPH_ITEM_YHEADER': {
            let currentgraphitemIndex = state.graphitems.findIndex(function(item, index, array) {
                if (item.id === state.currentgraphitem) return true;
            })
            newstate = produce(state, draftState => {
                draftState.graphitems[currentgraphitemIndex].yheaders.splice(action.payload,1);
            });
            return newstate;
        }
        case 'CHANGE_CURRENT_GRAPH_ITEM': {
            newstate = produce(state, draftState => {
                draftState.currentgraphitem = action.payload;
            });
            return newstate;
        }
        default: {
            return state;
        }
    }
}

export default XYdatasReducer;

