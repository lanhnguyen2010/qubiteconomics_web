import React from 'react';
import './index.css'; // Optional: for custom styling

class SingleSelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: props.value || null // Initialize with the provided value
    };
    this.dropdownRef = React.createRef();
  }

  // Update state when props change
  componentDidUpdate(prevProps) {
    // If the value prop changed, update the internal state
    if (this.props.value !== prevProps.value) {
      this.setState({ selectedOption: this.props.value });
    }
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
    this.setState({ selectedOption: optionObject, isOpen: false }, () => {
      if (this.props.onChange) {
        this.props.onChange(optionObject);
      }
    });
  };

  clearSelection = (event) => {
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
        <div className="single-select-dropdown__input" onClick={this.toggleDropdown}>
          {selectedOption === null ? (
            <span className="placeholder">{placeholder}</span>
          ) : (
            <span className="selected-text">{selectedOption.label}</span>
          )}

          <span className={`single-select-dropdown__caret ${isOpen ? 'open' : ''}`} />
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="single-select-dropdown__menu">
            {options.map((optionObject) => (
              <div
                className="single-select-dropdown__option"
                key={optionObject.value} 
                onClick={() => this.handleOptionSelect(optionObject)}
              >
                {optionObject.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SingleSelectDropdown;