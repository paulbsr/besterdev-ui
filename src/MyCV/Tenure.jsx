import React from 'react';

class Tenure extends React.Component {
  render() {
    // Destructure props to get the two numbers
    const { startYear, endYear } = this.props;

    // Check if both startYear and endYear are defined
    if (startYear !== undefined && endYear !== undefined) {
      // Calculate the tenure by subtracting startYear from endYear
      const tenure = endYear - startYear;

      // Render the result
      return (
        // <div>
          <>{tenure} years</>
        // </div>
      );
    } else {
      // Handle case where startYear or endYear is not defined
      return (
        <div>
          <p>Incomplete data for calculating tenure</p>
        </div>
      );
    }
  }
}

export default Tenure;
