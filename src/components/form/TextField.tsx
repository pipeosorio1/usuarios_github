import React from 'react';
import PropTypes from 'prop-types';
import { HelperText, Text, TextInput } from 'react-native-paper';

function TextField({
  field: { name, value, onChange },
  form: { touched, errors },
  label,
  disabled,
  passwordField,
  ...props
}) {
  const handleInputChange = (newValue: string) => {
    onChange(name)(newValue);
  };

  const hasError = touched[name] && Boolean(errors[name]);

  return (
    <>
      <TextInput
        value={value}
        onChangeText={handleInputChange}
        disabled={disabled}
        {...props}
      />
      <HelperText type="error" visible={hasError}>
        {errors[name] ?? ''}
      </HelperText>
    </>
  );
}

TextField.defaultProps = {
  disabled: false,
  passwordField: false,
};

TextField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  passwordField: PropTypes.bool,
};

export default TextField;
