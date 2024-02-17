/*
 * Title: Validator
 * Description:  Validator function which basically returns an object includes 
 * the validation methods, errors & the value on which the validations are applied.
 * Author: S.M. Shakil
 * Date: 07/02/2024
 */

// Dependencies
const {email, alphaNum, alphaNumWithHyphenUnderscore, URL} = require('./validatorRegex')

const checkLength = (el) => {
  let length = 0
  switch(true) {
    case !el:
    case typeof el === 'boolean':
    case typeof el === 'symbol':
      length = 0
      break

    case typeof el === 'string':
    case Array.isArray(el):
      length = el.length
      break

    case typeof el === 'object':
      length = Object.keys(el).length
      break
    
    case typeof el === 'number':
    case typeof el === 'bigint':
      length = `${el}`.length
      break

    default:
      length = 0
  }

  return length
}

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
    if (checkLength(el) <= max) return actions
    else {
      actions.errors.push(`Max length must not exceed ${max}`)
      return actions
    }
  }
  actions.min = (min) => {
    if (isNullable && actions.value === null) return actions
    if (checkLength(el) >= min) return actions
    else {
      actions.errors.push(`Min length must be ${min}`)
      return actions
    }
  }
  actions.exact = (exact) => {
    if (isNullable && actions.value === null) return actions
    if (checkLength(el) == exact) return actions
    else {
      actions.errors.push(`Length must be ${exact}`)
      return actions
    }
  }
  actions.isEmail = () => {
    if (isNullable && actions.value === null) return actions
    if (email.test(el)) return actions
    else {
      actions.errors.push(`This is not a valid email`)
      return actions
    } 
  }
  actions.isAlphaNumeric = () => {
    if (isNullable && actions.value === null) return actions
    if (alphaNum.test(el)) return actions
    else {
      actions.errors.push(`This only accepts alpha-numeric value`)
      return actions
    } 
  }
  actions.isAlphaNumericWithHyphenUnderscore = () => {
    if (isNullable && actions.value === null) return actions
    if (alphaNumWithHyphenUnderscore.test(el)) return actions
    else {
      actions.errors.push(`This only accepts alpha-numeric value with hyphen & underscore`)
      return actions
    } 
  }
  actions.isURL = () => {
    if (isNullable && actions.value === null) return actions
    if (URL.test(el)) return actions
    else {
      actions.errors.push(`This is not valid URL`)
      return actions
    } 
  }

  return actions
}

module.exports = validator
