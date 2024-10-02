// reducers/workflowReducer.js
const initialState = {
    selectedWorkflow: null,
    // other state
  };
  
  const workflowReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SELECTED_WORKFLOW':
        return {
          ...state,
          selectedWorkflow: action.payload,
        };
      // other cases
      default:
        return state;
    }
  };
  
  export default workflowReducer;
  