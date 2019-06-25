const XYdatasActions = {
    addGraphItem: (graphitemtype) => ({
        type: 'ADD_GRAPHS',
        payload: graphitemtype
    }),
    deleteGraphItem: () => ({
        type: 'DELETE_GRAPHS'
    }),
    addGraphItemXHeader: (header) => ({
        type: 'ADD_GRAPH_ITEM_XHEADER',
        payload: header
    }),
    addGraphItemYHeader: (header) => ({
        type: 'ADD_GRAPH_ITEM_YHEADER',
        payload: header
    }),
    deleteGraphItemXHeader: (index) => ({
        type: 'DELETE_GRAPH_ITEM_XHEADER',
        payload: index
    }),
    deleteGraphItemYHeader: (index) => ({
        type: 'DELETE_GRAPH_ITEM_YHEADER',
        payload: index
    }),
    changeCurrentGraphItem: (id) => ({
        type: 'CHANGE_CURRENT_GRAPH_ITEM',
        payload: id
    })
}

export default XYdatasActions;