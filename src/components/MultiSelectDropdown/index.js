import React from 'react';
import './index.css'; // Optional: for custom styling

class MultiSelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOptions: []
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

  handleOptionChange = (option) => {
    const { selectedOptions } = this.state;
    let updatedSelected;

    if (selectedOptions.includes(option)) {
      // Remove if already selected
      updatedSelected = selectedOptions.filter((item) => item !== option);
    } else {
      // Add if not selected
      updatedSelected = [...selectedOptions, option];
    }

    // Update state, then notify parent via onChange if provided
    this.setState({ selectedOptions: updatedSelected }, () => {
      if (this.props.onChange) {
        this.props.onChange(updatedSelected);
      }
    });
  };

  removeTag = (option) => {
    const { selectedOptions } = this.state;
    const updatedSelected = selectedOptions.filter((item) => item !== option);

    this.setState({ selectedOptions: updatedSelected }, () => {
      if (this.props.onChange) {
        this.props.onChange(updatedSelected);
      }
    });
  };

  // Clears all selected options
  clearAllSelected = () => {
    this.setState({ selectedOptions: [] }, () => {
      if (this.props.onChange) {
        this.props.onChange([]);
      }
    });
  };

  render() {
    const { isOpen, selectedOptions } = this.state;
    const { options, placeholder = 'Select...' } = this.props;

    return (
      <div className="multi-select-dropdown" ref={this.dropdownRef}>
        <div
          className="multi-select-dropdown__input"
          onClick={this.toggleDropdown}
        >
          {/* If no selections, show placeholder */}
          {selectedOptions.length === 0 && (
            <span className="placeholder">{placeholder}</span>
          )}

          {/* Display each selected option as a tag */}
          {selectedOptions.map((option) => (
            <div className="tag" key={option}>
              {option}
              <span
                className="tag-close"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggling the dropdown
                  this.removeTag(option);
                }}
              >
                &times;
              </span>
            </div>
          ))}

          {/* "x" icon to clear all selections, only show if there are selections */}
          {selectedOptions.length > 0 && (
            <span
              className="clear-all"
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling the dropdown
                this.clearAllSelected();
              }}
            >
              &times;
            </span>
          )}
        </div>

        {/* Dropdown list of checkboxes */}
        {isOpen && (
          <div className="multi-select-dropdown__menu">
            {options.map((option) => (
              <label className="multi-select-dropdown__option" key={option}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => this.handleOptionChange(option)}
                />
                <span className='dropdown-option-content'>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MultiSelectDropdown;
