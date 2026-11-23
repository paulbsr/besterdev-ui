export const getStatusColor = (status) => {

    switch (status)
  
    {
  
      case 'START': return '#c1c3c6';
  
      case 'WIP': return '#7c9fdb';
  
      case 'DONE': return '#87cf8a';
  
      case 'N/A': return '#dedede';
  
      case 'PROBLEM': return '#e97878';
  
      default:
  
        return '#fff';
  
    }
};

export const getStatusTextColor = (status) => {
    switch (status) {
      case 'START': return '#60666e';
      case 'WIP': return '#28528f';
      case 'DONE': return '#287533';
      case 'N/A': return '#6b7280';
      case 'PROBLEM': return '#a83232';
      default: return '#17202f';
    }
};