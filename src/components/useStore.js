import { create } from 'zustand';

const useFlowStore = create((set) => ({
  nodes: [],
  edges: [],
  screenName :"",
  
  setNewNodes: (newNodes) => set({ nodes: newNodes }),
  setNewEdges: (newEdges) => set({ edges: newEdges }),
  addNode: (newNode) => set((state) => ({ nodes: [...state.nodes, newNode] })),
  addEdge: (newEdge) => set((state) => ({ edges: [...state.edges, newEdge] })),
  // resetFlow: () => set({ nodes: [], edges: [] }),
  setScreenName: (newScreenName) => set({ screenName: newScreenName }),

}));

export default useFlowStore;
