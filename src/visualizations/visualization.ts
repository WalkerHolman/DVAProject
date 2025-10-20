declare const d3: any;

// Minimal force-directed graph framing
(function () {
    const svg = d3.select('#graph');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
  
    const nodes = [
      { id: 'Album A', group: 1 },
      { id: 'Album B', group: 1 },
      { id: 'Artist X', group: 2 },
    ];
  
    const links = [
      { source: 'Artist X', target: 'Album A' },
      { source: 'Artist X', target: 'Album B' },
    ];
  
    const color = d3.scaleOrdinal(d3.schemeSet2);
  
    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));
  
    const link = svg
      .append('g')
      .attr('stroke', '#9CA3AF')
      .attr('stroke-opacity', 0.7)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);
  
    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', d => color(d.group))
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );
  
    const labels = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('font-size', 12)
      .attr('dx', 12)
      .attr('dy', 4)
      .text(d => d.id);
  
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
  
      node.attr('cx', d => d.x).attr('cy', d => d.y);
      labels.attr('x', d => d.x).attr('y', d => d.y);
    });
  
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
  
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
  
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  })();
  
  
  