import React from 'react';
import Text from './text';
import Image from './image';
import Gallery from './gallery';
import Select from './select';
import Check from './check';
import DateTime from './date_picker';
import Option from './2letters_option';
import MultiSelect from './multiSelect';
import Html from './html';
import Textarea from './textarea';
// import Date from './fields/date';



export const renderMultiSelectField = ({
  input,
  placeholder,
  label,
  meta: { touched, error },
  children,
  id
}) => (
    <MultiSelect
      placeholder={placeholder}
      label={label}
      id={id}
      errorText={touched && error}
      error={touched && error}
      {...input}
    >
      {children}
    </MultiSelect>
  )

// export const renderDateField = ({
//   input,
//   placeholder,
//   label,
//   type,
//   meta: { touched, error },
// }) => (
//     <Date
//       placeholder={placeholder}
//       label={label}
//       errorText={touched && error}
//       type={type}
//       error={touched && error}
//       {...input}
//     />
//   )

export const renderGalleryField = ({
  input,
  placeholder,
  label,
  meta: { touched, error },
  lang,
  multilang
}) => (

      <Gallery
          placeholder={placeholder}
          label={label}
          errorText={touched && error}
          error={touched && error}
          lang={lang}
          multilang={multilang}
          {...input}
      />
  )

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

export const renderCheckField = ({
  input,
  label,
  meta: { touched, error }
}) => (
    <Check
      label={label}
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


export const render2letterOption = ({
  input,
  placeholder,
  label,
  meta: { touched, error },
}) => (

    <Option
      placeholder={placeholder}
      label={label}
      errorText={touched && error}
      error={touched && error}

      {...input}
    />
  )

