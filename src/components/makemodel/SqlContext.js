import React from 'react';
const SqlContext = React.createContext({
    data: null,
    setSqlContext: () => {},
})

export default SqlContext;