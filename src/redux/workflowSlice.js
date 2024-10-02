import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workflows: [],
  selectedWorkflow: null,
  nodes: [],
  edges: [],
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setWorkflows: (state, action) => {
      state.workflows = action.payload;
    },
    setSelectedWorkflow: (state, action) => {
      state.selectedWorkflow = action.payload;
    },
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    appendNodeAndEdge: (state, action) => {
      const { nodes, edges } = action.payload;
      const workflow = state.workflows.find(
        (w) => w.workflowName === state.selectedWorkflow
      );
      if (workflow) {
        workflow.flow = [
          ...workflow.flow,
          ...nodes.map((node) => ({
            id: node.id,
            name: node.data.label,
          })),
          ...edges.map((edge) => ({
            source: edge.source,
            target: edge.target,
            id: edge.id,
          })),
        ];
      }
    },
  },
});

export const {
  setWorkflows,
  setSelectedWorkflow,
  setNodes,
  setEdges,
  appendNodeAndEdge,
} = workflowSlice.actions;

export default workflowSlice.reducer;
