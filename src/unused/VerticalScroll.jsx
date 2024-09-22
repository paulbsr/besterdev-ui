import React from 'react';
import './VerticalScroll.css'; // Import the CSS file for styling

class VerticalScroll extends React.Component {
  render() {
    const { cyclopediadata } = this.props; // Destructure cyclopediadata from props
    return (
      <div className="scrolling-container">
        <div className="scrolling-content">
          {cyclopediadata.map((rowc, index) => (
            <tr key={index}>
              <td className="fphover">
                {rowc && (
                  <div style={{ cursor: 'pointer'}}>
                    <b>{rowc.cyclopedia_name}:</b>&nbsp;<i>{rowc.cyclopedia_desc}</i>
                    <div className='Font-Spacer-White'>Make this spacer white</div>
                  </div>
                )}
              </td>
            </tr>
          ))}

        </div>
      </div>
    );
  }
}

export default VerticalScroll;

