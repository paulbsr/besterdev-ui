export const getStatusByColourTaskText = (status) => {
    switch (status)
    {
      case 'START': return 'var(--task-start-text, #4D4D4D)';
      case 'WIP': return 'var(--task-wip-text, #0000ff)';
      case 'DONE': return 'var(--task-done-text, #00C800)';
      case 'N/A': return '#E8E7E7';
      case 'PROBLEM': return '#ff0000';
      case 'ARCHIVE': return '#B2B2B2';
      default: return '#000000';
    }
  }