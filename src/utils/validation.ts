// Validation
export interface validatable {
  value: string | number,
  required: boolean,
  minLength?: number,
  maxLength?: number,
  min?: number,
  max?: number
}

export function validate(validatableObject: validatable)  {
  let isValid = true
  if (validatableObject.required) {
    isValid = isValid && validatableObject.value.toString().trim().length !== 0
  }
  if (validatableObject.minLength != null && typeof validatableObject.value === 'string') {
    isValid = isValid && validatableObject.value.trim().length >= validatableObject.minLength
  }
  if (validatableObject.maxLength != null && typeof validatableObject.value === 'string') {
    isValid = isValid && validatableObject.value.trim().length <= validatableObject.maxLength
  }
  if (validatableObject.min != null && typeof validatableObject.value === 'number') {
    isValid = isValid && validatableObject.value >= validatableObject.min
  }
  if (validatableObject.max != null && typeof validatableObject.value === 'number') {
    isValid = isValid && validatableObject.value <= validatableObject.max
  }
  return isValid
}