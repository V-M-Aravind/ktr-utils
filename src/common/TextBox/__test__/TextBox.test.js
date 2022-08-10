import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElement,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TextBox } from '..';
import { useState } from 'react';

afterEach(() => {
  cleanup();
});

const RenderTextBox = ({
  type,
  width,
  label,
  elementId,
  height = null,
  placeholder = '',
  required = true,
  onChangeFlag = false,
  onBlurFlag = false,
  debounceInterval,
}) => {
  const [value, setValue] = useState({ value: '', errorMessage: '' });
  return (
    <TextBox
      width={width}
      label={label}
      value={value}
      setValue={setValue}
      type={type}
      elementId={elementId}
      height={height}
      placeholder={placeholder}
      required={required}
      onChangeFlag={onChangeFlag}
      onBlurFlag={onBlurFlag}
      debounceInterval={debounceInterval}
    />
  );
};
describe('Test the TextBox Component for name', () => {
  test('Test label present', () => {
    render(
      <RenderTextBox
        type="name"
        width="300px"
        label="First Name"
        elementId="fname"
      />
    );
    const element = screen.getByLabelText('First Name');
    console.log(element);
    expect(element).toBeInTheDocument();
  });
  test('Test input name entered', () => {
    render(
      <RenderTextBox
        type="name"
        width="300px"
        label="First Name"
        elementId="fname"
        onChangeFlag={true}
        onBlurFlag={true}
      />
    );
    const element = screen.getByLabelText('First Name');
    fireEvent.change(element, { target: { value: 'aravind' } });
    expect(element.value).toBe('aravind');
    const error = screen.queryByText(/first name cannot be/i);
    expect(error).toBeNull(); //toBeTruthy();
  });
  test('Test input name entered with valiadtion error on blur =>length', () => {
    render(
      <RenderTextBox
        type="name"
        width="300px"
        label="First Name"
        elementId="fname"
        onChangeFlag={false}
        onBlurFlag={true}
      />
    );
    const element = screen.getByLabelText('First Name');
    fireEvent.change(element, { target: { value: ' ' } });
    fireEvent.blur(element);
    const error = screen.queryByText(/first name cannot be/i);
    expect(error).toBeTruthy();
  });
  test('Test input name entered with onchange valiadtion error =>number', async () => {
    render(
      <RenderTextBox
        type="name"
        width="300px"
        label="First Name"
        elementId="fname"
        onChangeFlag={true}
        onBlurFlag={true}
      />
    );
    const element = screen.getByLabelText('First Name');
    fireEvent.change(element, { target: { value: '6ertyyy' } });
    await waitFor(() => {
      expect(screen.queryByText(/first name should/i)).toBeTruthy();
    });
  });
  test('Test input name entered with valiadtion onchange error disabled =>length error', () => {
    render(
      <RenderTextBox
        type="name"
        width="300px"
        label="First Name"
        elementId="fname"
        onChangeFlag={false}
        onBlurFlag={true}
      />
    );
    const element = screen.getByLabelText('First Name');
    fireEvent.change(element, { target: { value: ' ' } });
    const error = screen.queryByText(/first name cannot be/i);
    expect(error).toBeNull();
  });
  test('Test input name entered with valiadtion onchange and onBlur error disabled =>length error', () => {
    render(
      <RenderTextBox
        type="name"
        width="300px"
        label="First Name"
        elementId="fname"
        onChangeFlag={false}
        onBlurFlag={false}
      />
    );
    const element = screen.getByLabelText('First Name');
    fireEvent.change(element, { target: { value: ' ' } });
    fireEvent.blur(element);
    const error = screen.queryByText(/first name cannot be/i);
    expect(error).toBeNull();
  });
});
