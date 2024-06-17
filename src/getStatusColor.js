export const getStatusColor = (status) => {

    switch (status)
  
    {
  
      case 'START': return '#cfcfcf';
  
      case 'WIP': return '#a8bded';
  
      case 'DONE': return '#a8e3aa';
  
      case 'N/A': return '#eeeeee';
  
      case 'PROBLEM': return '#f78888';
  
      default:
  
        return '#fff';
  
    }
  
  }