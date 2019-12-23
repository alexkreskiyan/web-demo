import { ValidationResult } from './ValidationResult'


export type Validator = (value: unknown) => ValidationResult | Promise<ValidationResult>
