import { ValidationStatus } from '../validation/ValidationStatus'
import { Validator } from '../validation/Validator'

type RequiredConfiguration = {
  whitespace?: boolean,
  message?: string | React.ReactNode
}

export const required = (config: RequiredConfiguration = {}): Validator => value => {
  const isValid = typeof value === 'string' && Boolean(config.whitespace ? value.trim() : value)

  return isValid
    ? { message: '', status: ValidationStatus.None }
    : { message: config.message || 'Field doesn\'t match pattern', status: ValidationStatus.Error }
}
