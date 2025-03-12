import React from 'react';
import './index.css'; // Optional: for custom styling

class SingleSelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: null // Will hold the full { key, value } object
    };
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  handleOptionSelect = (optionObject) => {
    // optionObject = { key, value }
    this.setState({ selectedOption: optionObject, isOpen: false }, () => {
      // Notify parent of the change if onChange is provided
      if (this.props.onChange) {
        this.props.onChange(optionObject);
      }
    });
  };

  clearSelection = (event) => {
    // Prevent toggling the dropdown when clicking "x"
    event.stopPropagation();
    this.setState({ selectedOption: null }, () => {
      if (this.props.onChange) {
        this.props.onChange(null);
      }
    });
  };

  render() {
    const { isOpen, selectedOption } = this.state;
    const { options, placeholder = 'Select...' } = this.props;

    return (
      <div className="single-select-dropdown" ref={this.dropdownRef}>
        {/* Input area (click to toggle dropdown) */}
        <div className="single-select-dropdown__input" onClick={this.toggleDropdown}>
          {/* Show placeholder if nothing is selected */}
          {selectedOption === null ? (
            <span className="placeholder">{placeholder}</span>
          ) : (
            // Display the value of the selected object
            <span className="selected-text">{selectedOption.value}</span>
          )}

          {/* "x" to clear selection if something is selected */}
          {selectedOption !== null && (
            <span className="clear-single" onClick={this.clearSelection}>
              &times;
            </span>
          )}
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="single-select-dropdown__menu">
            {options.map((optionObject) => (
              <div
                className="single-select-dropdown__option"
                key={optionObject.key} 
                onClick={() => this.handleOptionSelect(optionObject)}
              >
                {optionObject.value}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SingleSelectDropdown;
