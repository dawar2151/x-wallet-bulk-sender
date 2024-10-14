// @ts-nocheck

import { useContext, useEffect } from 'react';
import * as d3 from 'd3';
import { BulkSenderStateContext } from '../providers';

const MovingGraph = () => {
  const {isDarkMode} = useContext(BulkSenderStateContext);
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select('#d3-moving-graph')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .style('z-index', '-1')

    const nodes = Array.from({ length: 50 }, (_, i) => ({ id: i, r: Math.random() * 10 + 5 }));
    const links = Array.from({ length: 80 }, () => ({
      source: Math.floor(Math.random() * nodes.length),
      target: Math.floor(Math.random() * nodes.length),
    }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(0, 0)) // Start from the top-left corner
      .force('collision', d3.forceCollide().radius(d => d.r + 2)) // Avoid overlap
      .alphaTarget(0.3)  // Keep the graph moving
      .on('tick', ticked);

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d3.interpolateCool(Math.random()))  // Random colors
      .call(drag(simulation));

    node.append('title')
      .text(d => `Node ${d.id}`);

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    // Drag behavior to move nodes
    function drag(simulation) {
      return d3.drag()
        .on('start', event => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on('drag', event => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on('end', event => {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        });
    }
  }, []);

  return <svg id="d3-moving-graph"></svg>;
};

export default MovingGraph;
