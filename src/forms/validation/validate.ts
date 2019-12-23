import { ValidationResult } from './ValidationResult'
import { ValidationStatus } from './ValidationStatus'
import { Validator } from './Validator'


export const validate = async (validators: Validator[], value: unknown): Promise<ValidationResult> => {
  const results: ValidationResult[] = []
  for (const validator of validators)
    results.push(await validator(value))

  const status = getValidationStatus(results)
  const message = getValidationMessage(results)

  return Promise.resolve({ status, message })
}

const getValidationStatus = (results: ValidationResult[]): ValidationStatus => {
  if (results.some(result => result.status === ValidationStatus.Error)) return ValidationStatus.Error

  if (results.some(result => result.status === ValidationStatus.Success)) return ValidationStatus.Success

  return ValidationStatus.None
}

const getValidationMessage = (results: ValidationResult[]): string =>
  results.filter(e => e.message).map(result => result.message).join(', ')
