import { isEqual, omit } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, {
  Children,
  cloneElement,
  memo,
  ReactElement,
  SyntheticEvent,
  useContext,
} from 'react'

import { context } from './Form'
import { FormState } from './FormState'
import { validate } from './validation/validate'
import { ValidationResult } from './validation/ValidationResult'
import { ValidationStatus } from './validation/ValidationStatus'
import { Validator } from './validation/Validator'

type Props = {
  name: string
  valueProp?: string
  changeProp?: string
  validators?: Validator[] | Validator
  messageProp?: string
  helperProp?: string
  children: ReactElement
  readValue?(value: unknown): unknown
  checkValue?(value: unknown): boolean
  parseValue?(value: unknown): unknown
}

export const Field = observer((props: Props) => {
  const form = useContext<FormState<Object>>(context)

  return (
    <InternalField
      {...props}
      form={form}
      value={form.getField(props.name) as unknown}
      validationResult={form.getFieldValidation(props.name)}
    />
  )
})

type InternalProps = {
  form: FormState<Object>
  value: unknown
  validationResult?: ValidationResult
}

const InternalField = memo(
  ({
    name,
    valueProp = 'value',
    changeProp = 'onChange',
    validators,
    messageProp = 'error',
    helperProp = 'helperText',
    children,
    readValue = defaultReadValue,
    checkValue = defaultCheckValue,
    parseValue = defaultParseValue,
    form,
    value,
    validationResult,
  }: Props & InternalProps) => {

    const child = Children.only(children)

    const props: { [key: string]: unknown } = {
      [valueProp]: value,
      [changeProp]: handleChange(
        form,
        name,
        readValue,
        checkValue,
        parseValue,
        validators,
      ),
    }

    if (validationResult) {
      props[messageProp] = validationResult.status === ValidationStatus.Error
      props[helperProp] = validationResult.message
    }

    return cloneElement(child, props)
  },
  (prev, next) => isEqual(omit(next, ['children']), omit(prev, ['children'])),
)

const handleChange = (
  form: FormState<Object>,
  name: string,
  readValue: (value: unknown) => unknown,
  checkValue: (value: unknown) => boolean,
  parseValue: (value: unknown) => unknown,
  validators: Props['validators'],
) => (value: unknown) => {
  const interim = readValue(value)
  if (!checkValue(interim)) return

  const result = parseValue(interim)

  form.setField(name, result)

  form.setFieldTouched(name)

  if (validators)
    validate(
      Array.isArray(validators) ? validators : [validators],
      result,
    )
      .then(validationResult => form.setFieldValidation(name, validationResult))
}

const defaultReadValue = (event: unknown) => {
  if ((event as SyntheticEvent).nativeEvent instanceof Event) {
    const target = (event as SyntheticEvent).target
    if (target instanceof HTMLInputElement)
      switch (target.type) {
        case 'checkbox':
          return target.checked
        case 'file':
          if (target.multiple)
            return target.files ? Array.from(target.files) : []
          else
            return target.files && target.files.length
              ? target.files.item(0)
              : null
        default:
          return target.value
      }
  }

  return event
}

const defaultCheckValue = () => true

const defaultParseValue = (value: unknown) => value
