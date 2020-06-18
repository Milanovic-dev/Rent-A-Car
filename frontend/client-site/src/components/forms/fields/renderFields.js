import React from 'react';
import Text from './text';
import Image from './image';
import Select from './select';
import DateTime from './datePicker';
import Html from './html';
import Textarea from './textarea';


export const renderTextField = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error },
  disabled
}) => (
    <Text
      placeholder={placeholder}
      label={label}
      type={type}
      errorText={touched && error}
      error={touched && error}
      {...input}
      disabled={disabled}
    />
  )

export const renderTextareaField = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error },
  disabled
}) => (
    <Textarea
      placeholder={placeholder}
      label={label}
      type={type}
      errorText={touched && error}
      error={touched && error}
      {...input}
      disabled={disabled}
    />
  )

export const renderHtmlField = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error }
}) => (
    <Html
      placeholder={placeholder}
      label={label}
      type={type}
      errorText={touched && error}
      error={touched && error}
      {...input}
    />
  )

export const renderImageField = ({
  input,
  placeholder,
  meta: { touched, error }
}) => (
    <Image
      placeholder={placeholder}
      errorText={touched && error}
      error={touched && error}
      {...input}
    />
  )

export const renderSelectField = ({
  input,
  placeholder,
  label,
  meta: { touched, error },
  children,
  id
}) => (
    <Select
      placeholder={placeholder}
      label={label}
      id={id}
      errorText={touched && error}
      error={touched && error}
      {...input}
    >
      {children}
    </Select>
  )

export const renderDateTimeField = ({
  input,
  placeholder,
  label,
  meta: { touched, error },
}) => (

    <DateTime
      placeholder={placeholder}
      label={label}
      errorText={touched && error}
      error={touched && error}

      {...input}
    />
  )
