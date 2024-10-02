// src/redux/reducers.js
import { ADD_NODE, UPDATE_NODE, ADD_EDGE, SET_NODES, SET_EDGES } from './actions';

const initialState = {
  nodes: [],
  edges: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NODES:
      return { ...state, nodes: action.payload };
    case SET_EDGES:
      return { ...state, edges: action.payload };
    case ADD_NODE:
      return { ...state, nodes: [...state.nodes, action.payload] };
    case UPDATE_NODE:
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.id ? action.payload : node
        ),
      };
    case ADD_EDGE:
      return { ...state, edges: [...state.edges, action.payload] };
    default:
      return state;
  }
};

export default reducer;
