import { ValidationStatus } from '../validation/ValidationStatus'
import { Validator } from '../validation/Validator'

type PatternConfiguration = {
  pattern: RegExp,
  message?: string | React.ReactNode
}

export const pattern = (config: PatternConfiguration): Validator => value => {
  const isValid = typeof value === 'string' && config.pattern.test(value)

  return isValid
    ? { message: '', status: ValidationStatus.None }
    : { message: config.message || 'Field doesn\'t match pattern', status: ValidationStatus.Error }
}
