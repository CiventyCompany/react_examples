import findIndex from 'lodash/findIndex';

import {
  SELECTIVE_GROUP,
} from '../names';

export class Graph {
  constructor({ nodes = [], edges = [] }) {
    this.nodes = nodes;
    this.edges = edges;
  }

  getNode(id) {
    return this.nodes[findIndex(this.nodes, { id })];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  linkNodes(fromNode, toNode) {
    this.edges.push({
      from: fromNode.id,
      to: toNode.id,
    });
  }

  removeNode(nodeId) {
    this.nodes = this.nodes.filter(({ id }) => id !== nodeId);
    this.edges = this.edges.filter(edge => edge.from === nodeId && edge.to !== nodeId);
  }

  getPureGraph() {
    return {
      nodes: [...this.nodes],
      edges: [...this.edges],
    };
  }

  enableSelection(form, type, state) {
    
    this.disableSelection();

    this.nodes = this.nodes.map(node => {
      if (node.canConnectNew(form, type, state)) {
        node._label = node.label;
        node.label = `${node._label} (selectable)`;
        node._group = node.group;
        node.group = SELECTIVE_GROUP;
      }
      return node;
    });

    return {
      nodes: this.nodes.filter(({ group }) => group === SELECTIVE_GROUP),
    };
  }

  disableSelection() {
    this.nodes = this.nodes.map((node) => {
      if (node.group === SELECTIVE_GROUP) {
        node.label = node._label;
        node.group = node._group;
        node._group = SELECTIVE_GROUP;
      }
      return node;
    });

    return {
      nodes: this.nodes.filter(({ _group }) => _group === SELECTIVE_GROUP),
    };
  }
}

export default Graph;
