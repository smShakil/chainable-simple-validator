# chainable-simple-validator

A chain-able validator plugin, ideal for using to validate any field, form-data or body of node based api routes.

## Getting Started

### Installation

```bash
// with npm
$ npm install chainable-simple-validator

// with yarn
$ yarn add chainable-simple-validator
```

### Usage

#### Import

```js
// CommonJS module
const validator = require("chainable-simple-validator");

// ES module
import validator from "chainable-simple-validator";
```

#### Application

```js
// Basic type checking
const { value, errors } = validator("First Name").type("string");

// Type checking & when we need exact length
const { value, errors } = validator(01234567890).type("number").exact(11);

// With minimum & maximum boundary
const { value, errors } = validator([1, 2, 3]).type("array").min(3).max(6);

// If it's optional
const { value, errors } = validator(true).nullable().type("boolean");

// If it's an email
const { value, errors } = validator(true).type("string").isEmail();

// Or, pass a custom validator
const { value, errors } = validator(2)
  .type("number")
  .custom((el) => el % 1 === 0, "Must be a whole number");
```

#### Full example

```js
const body = {
  name: 'Jhon Smith',
  email: 'john@smith.com',
  password: 'j123456s',
  termsConditions: true,
  profile: 'www.john-smith.com',
  method: 'get'
}

const { value: name, errors: nErrors } = validator(body.name).type('string')
const { value: email, errors: mailErrors } = validator(body.email).isEmail()
const { value: password, errors: passErrors } = validator(body.password).type('string').min(6).max(10).isAlphaNumeric()
const { value: tc, errors: tcErrors } = validator(body.termsConditions).nullable().type('boolean')
const { value: profile, errors: proErrors } = validator(body.profile).nullable().isURL()
const { value: method, errors: mErrors } = validator(body.method).custom(customValidator) // See below example

  if ([nErrors, mailErrors, pErrors, passErrors, tcErrors, proErrors].some((err) => err.length)) {
    console.log(error: {
        firstName: fErrors,
        email: mailErrors,
        password: passErrors,
        termsConditions: tcErrors,
        profile: proErrors,
        method: mErrors,
      })
  }
```

#### Custom Method example

```js
const methods = ['get', 'post', 'put', 'delete']
const customValidator (el) => methods.includes(el.toLowerCase()) // This must return boolean
const { errors } = validator('GET').custom(customValidator)
```

### Methods

| Methods                            | Description                                                                                                                                                                                                                                                                                                     |
| :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validator                          | The main contructor method which accepts an argument of any valid js data type.                                                                                                                                                                                                                                 |
| nullable                           | Only if the value is NOT `null` or `undefind`, validators will be applicable. Apply it if the value is optional. Notice the position above, it's important. Always apply it as second method if needed.                                                                                                         |
| type                               | It can check any valid JS data type including `Array` & `Object`.                                                                                                                                                                                                                                               |
| min                                | Checks if the value has satisfied the minimum length.                                                                                                                                                                                                                                                           |
| max                                | Checks whether the value has exceeded the maximum length or not.                                                                                                                                                                                                                                                |
| exact                              | Checks whether the value has matched the exact length or not.                                                                                                                                                                                                                                                   |
| isEmail                            | Checks whether it's a valid email or not.                                                                                                                                                                                                                                                                       |
| isAlphaNumeric                     | Checks if the value contains only alpha-numeric characters.                                                                                                                                                                                                                                                     |
| isAlphaNumericWithHyphenUnderscore | Checks if the value contains only alpha-numeric characters, hyphen & underscore.                                                                                                                                                                                                                                |
| isURL                              | Checks whether it's a valid URL or not.                                                                                                                                                                                                                                                                         |
| custom                             | It is also possible to pass your own validator if needed. This method accepts a `handler` as first argument & a string (optional) as second argument which will be returned in `errors` array if the logic not meet. The `handler` must return a boolean. It is also possbile to chain multiple custom methods. |

### Responses

Response is returned as an object which includes the followings:

| Responses | Description                                        |
| :-------- | :------------------------------------------------- |
| value     | The `value` passed to validator method.            |
| errors    | Errors are retured as an array. See below example. |

#### Error example

```js
[
  "Type not matched. Expected string, got number",
  "Max length must not exceed 10",
  "Min length must be 6",
  "Length must be 11",
  "This only accepts alpha-numeric value with hyphen & underscore",
  "This is not valid URL",
];
```

## Contributing

Feel free to submit a pull request.

## Authors

- **S.M. Shakil** - _Initial work_ - [S.M.Shakil](https://github.com/smShakil)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
