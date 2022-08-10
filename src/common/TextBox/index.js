import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { validator } from './validation';
import debounce from 'lodash.debounce';

const StyledDiv = styled.div`
  color: black;
  max-width: ${props => (props.width ? props.width : 'auto')};
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => (props.mbottom ? props.mbottom : '15px')};
  margin-top: ${props => (props.mtop ? props.mtop : '4px')};
`;
const ErrorP = styled.p`
  color: red;
  border: none;
`;
const StyledInput = styled.input`
  max-width: ${props => (props.width ? props.width : 'auto')};
  height: ${props => (props.height ? props.height : '50px')};
  border: 1px solid;
  border-color: ${props => (props.error ? 'red' : '#bbbbbb')};
  border-radius: 5px;
  background: #ffffff 0% 0% no-repeat padding-box;
  font-size: 1rem;
`;
const Label = styled.label`
  text-align: left;
  font: normal normal normal 16px Roboto;
  letter-spacing: 0px;
  color: #000000;
  height: 16px;
  margin-bottom: 6px;
`;

export const TextBox = ({
  type,
  width,
  label,
  elementId,
  height,
  value,
  setValue,
  placeholder = '',
  required = true,
  onChangeFlag = false,
  onBlurFlag = false,
  debounceInterval = 250,
}) => {
  let fieldType;
  useEffect(() => {
    switch (type) {
      case 'name':
        fieldType = 'text';
        break;
      case 'email':
        fieldType = 'email';
        break;
      case 'password':
        fieldType = 'password';
        break;
      default:
        fieldType = 'text';
        break;
    }
  }, []);
  const onChangeDefault = debounce(enteredValue => {
    setValue(p => ({ ...p, value: enteredValue }));
    validator(type, enteredValue, setValue, required, label);
    console.log(enteredValue);
  }, debounceInterval);

  const onBlur = e => {
    const fieldValue = e.target.value;
    setValue(p => ({ ...p, value: fieldValue }));
    validator(type, fieldValue, setValue, required, label);
    console.log(fieldValue);
  };
  const onChangeParameter = onChangeFlag
    ? {
        onChange: e => {
          onChangeDefault(e.target.value);
        },
      }
    : {
        onChange: e => {
          setValue(p => ({ ...p, value: e.target.value }));
          console.log(e.target.value);
        },
      };
  const onBlurParameter = onBlurFlag
    ? { onBlur }
    : {
        onBlur: e => {
          setValue(p => ({ ...p, value: e.target.value }));
        },
      };
  const valueObject = onChangeFlag ? {} : { value: value.value };
  const inputParameters = {
    type,
    id: elementId,
    height,
    width,
    error: Boolean(value.errorMessage),
    ...valueObject,
    ...onBlurParameter,
    required,
    placeholder,
    ...onChangeParameter,
  };
  return (
    <StyledDiv width={width}>
      {label && <Label htmlFor={elementId}>{label}</Label>}
      <StyledInput {...inputParameters} />
      {Boolean(value.errorMessage) && <ErrorP>{value.errorMessage}</ErrorP>}
    </StyledDiv>
  );
};
