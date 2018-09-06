export const setIntervalTimes = (fn, interval, times) => {
  let count = 0
  const clock = setInterval(() => {
    fn()
    count += 1
    if (times && count >= times) {
      clearInterval(clock)
    }
  }, interval)
  return clock
}

export const deepFirst = (rootId, nodes, fn) => {
  const rootNode = nodes[rootId]
  fn(rootId, rootNode)
  for (const id of rootNode.children) {
    deepFirst(id, nodes, fn)
  }
}

export const widthFirst = (rootId, nodes, fn) => {
  const queue = []
  queue.push({
    id: rootId,
    node: nodes[rootId],
    index: 0,
    level: 0
  })
  while (queue.length > 0) {
    const { id, node, index, level } = queue.splice(0, 1)[0]
    fn({ id, node, index, level })
    if (node.children) {
      let i = 0
      for (const id of node.children) {
        queue.push({
          id,
          node: nodes[id],
          index: i,
          level: level + 1
        })
        i += 1
      }
    }
  }
}

export const sortChildrenByDepth = (nodeId, nodes) => {
  const node = nodes[nodeId]
  if (node.children.length === 0) {
    node.depth = 1
    return node.depth
  }
  const tmp = []
  for (const id of node.children) {
    tmp.push(sortChildrenByDepth(id, nodes))
  }
  node.children.sort(function(a, b) {
    return nodes[b].depth - nodes[a].depth
  })
  node.depth = Math.max(...tmp) + 1
  return node.depth
}
