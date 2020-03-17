import React, { Component } from "react";
import {
  TextField,
  MenuItem,
  FormHelperText
} from "@material-ui/core";

class Autocomplete extends Component {
  popperNode = null;
  handleStateChange = changes => {
    const { onChange } = this.props;
    if (changes.hasOwnProperty("selectedItem")) {
      onChange(changes.selectedItem.value);
    } else if (changes.hasOwnProperty("inputValue")) {
      onChange(changes.inputValue);
    }
  };
  getError = errors => {
    if (errors) {
      return errors.map(info => (
        <FormHelperText style={{ color: "red", fontSize: 12 }} key={info}>
          {info}
        </FormHelperText>
      ));
    }
    return null;
  };
  render() {
    return (
   
      null
    );
  }
}

export default Autocomplete;

// function renderInput(inputProps) {
//   const { InputProps, ref, style = {}, ...other } = inputProps;
//   return (
//     <TextField
//       InputProps={{
//         inputRef: ref,
//         ...InputProps,
//         style: {
//           fontSize: 14,
//           ...style
//         }
//       }}
//       {...other}
//     />
//   );
// }
// function renderSuggestion({
//   suggestion,
//   index,
//   itemProps,
//   highlightedIndex,
//   selectedItem,
//   suggestionComponent,
//   isItemSelected
// }) {
//   const isHighlighted = highlightedIndex === index;
//   const isSelected = isItemSelected(selectedItem, suggestion); // (selectedItem || "").indexOf(suggestion.label) > -1;
//   const SuggestionComponent = suggestionComponent;
//   return (
//     <MenuItem
//       {...itemProps}
//       key={suggestion.label}
//       selected={isHighlighted}
//       component="div"
//       style={{
//         fontWeight: isSelected ? 500 : 400
//       }}
//     >
//       <SuggestionComponent suggestion={suggestion} />
//     </MenuItem>
//   );
// }
