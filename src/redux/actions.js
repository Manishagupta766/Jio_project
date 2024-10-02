
export const ADD_NODE = 'ADD_NODE';
export const UPDATE_NODE = 'UPDATE_NODE';
export const ADD_EDGE = 'ADD_EDGE';
export const SET_NODES = 'SET_NODES';
export const SET_EDGES = 'SET_EDGES';

export const addNode = (node) => ({ type: ADD_NODE, payload: node });
export const updateNode = (node) => ({ type: UPDATE_NODE, payload: node });
export const addEdge = (edge) => ({ type: ADD_EDGE, payload: edge });
export const setNodes = (nodes) => ({ type: SET_NODES, payload: nodes });
export const setEdges = (edges) => ({ type: SET_EDGES, payload: edges });
