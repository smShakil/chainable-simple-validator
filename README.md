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
const { value, errors } = validator("01234567890").type("string").exact(11);

// With minimum & maximum boundary
const { value, errors } = validator("password").type("string").min(6).max(10);

// If it's optional
const { value, errors } = validator(true).nullable().type("boolean");
```

#### Full example

```js
const body = {
  firstName: 'Jhon',
  lastName: 'Smith',
  phone: '01234567890',
  password: '123456',
  termsConditions: true
}

const { value: firstName, errors: fErrors } = validator(body.firstName).type('string')
const { value: lastName, errors: lErrors } = validator(body.lastName).nullable().type('string')
const { value: phone, errors: pErrors } = validator(body.phone).type('string').exact(11)
const { value: password, errors: passErrors } = validator(body.password).type('string').min(6).max(10)
const { value: termsConditions, errors: tcErrors } = validator(body.termsConditions).type('boolean')

  if ([fErrors, lErrors, pErrors, passErrors, tcErrors].some((err) => err.length)) {
    console.log(error: {
        firstName: fErrors,
        lastName: lErrors,
        phone: pErrors,
        password: passErrors,
        termsConditions: tcErrors,
      })
  }
```

### Methods

| Methods   | Description                                                                                                                                                                                             |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| validator | The main contructor method which accepts an argument of any valid js data type.                                                                                                                         |
| nullable  | Only if the value is NOT `null` or `undefind`, validators will be applicable. Apply it if the value is optional. Notice the position above, it's important. Always apply it as second method if needed. |
| type      | It can check any valid JS data type.                                                                                                                                                                    |
| min       | Checks if the value has satisfied the minimum length.                                                                                                                                                   |
| max       | Checks whether the value has exceeded the maximum length or not.                                                                                                                                        |
| exact     | Checks whether the value has matched the exact length or not.                                                                                                                                           |

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
];
```

## Contributing

Feel free to submit a pull request.

## Authors

- **S.M. Shakil** - _Initial work_ - [S.M.Shakil](https://github.com/smShakil)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
