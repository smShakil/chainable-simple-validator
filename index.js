/*
 * Title: Validator
 * Description:  Validator function which basically returns an object includes 
 * the validation methods, errors & the value on which the validations are applied.
 * Author: S.M. Shakil
 * Date: 07/02/2024
 */

const validator = (el) => {
  const actions = {}
  actions.value = el ?? null
  actions.errors = []
  let isNullable = false

  actions.nullable = (nullable = true) => {
    isNullable = nullable
    return actions
  }
  actions.type = (expectedType) => {
    if (isNullable && actions.value === null) return actions
    const type = expectedType.toLowerCase()
    if (typeof el === type) return actions
    else if (type === 'array' && Array.isArray(el)) return actions
    else {
      actions.errors.push(`Type not matched. Expected ${type}, got ${typeof el}`)
      return actions
    }
  }
  actions.max = (max) => {
    if (isNullable && actions.value === null) return actions
    if (el.length <= max) return actions
    else {
      actions.errors.push(`Max length must not exceed ${max}`)
      return actions
    }
  }
  actions.min = (min) => {
    if (isNullable && actions.value === null) return actions
    if (el.length >= min) return actions
    else {
      actions.errors.push(`Min length must be ${min}`)
      return actions
    }
  }
  actions.exact = (exact) => {
    if (isNullable && actions.value === null) return actions
    if (el.length == exact) return actions
    else {
      actions.errors.push(`Length must be ${exact}`)
      return actions
    }
  }

  return actions
}

module.exports = validator
