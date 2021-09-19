# KT Unit and integration Tests

( in typescript projects )

- Why tests ? What types of tests ?
- Unit tests vs Integration tests
- Tests with jest on apollo project
- Integration tests with cucumber



# devops Testing

- why test
- when ?
- what (should we test)
- how ?
- tdd
- focus on automated unit testing


![](/talks/tests/testing-in-devops-1.jpg)


![](/talks/tests/testing-in-devops-2.jpg)


## Why (unit) test  ?

- risks of failure
- risks of failure everywhere
- regressions


## Why automate tests ?

- testing is important
- testing is repetitive
- testing is boring
- automate !



## Kind of tests

![](/talks/tests/pyramid.png)


### Current state on apollo

![](/talks/tests/pyramid-now.png)


### Different kind of tests

- unit tests
- integration tests
- performance test
- end to end (functional tests)
- a11y tests (axe)


## Unit test

- test an unit (duh)
- a function
- a class
- isolated from the rest of the system


### unit test principles

- isolate
- simulate
- reproduce
- fake inputs
- verify outputs


## Integration test

- test several units
  - a group of components / service interactions
  - a full route from controller to db access.
  - a dac worker with several transformers
- still isolated, but from the rest of the system
  - fake inputs
  - mock requested services
  - but at the network request level


## Acceptance tests

- should verify the functional spec, not the code.
- user-oriented
- needs the full stack available


## Main focus of this presentation

- unit tests with jest
- integration tests with cucumber / protractor and jest.expect



# Unit tests - jest

- practical examples
- daily commands
- basic api
- tips and tricks



## Jest - Test structure

Example of unit test with jest (or jasmine, or mocha)

```typescript
describe("MySuperComponent", () => {
  it("should do something", () => {
    // prepare
    const expectedValue = 42;
    const parameter = "something";
    // execute the code
    const resultValue = callTheCode(parameter);
    // verify
    expect(resultValue).toBe(expectedValue);
  });
  it("should do another thing", () => {
    // etc...
  });
});
```


### Test structure - good practice

```typescript
describe("MySuperComponent", () => {
  let commonVar;
  beforeEach(() => {
    // do something before all other it()
    commonVar = "initialized";
  });
  it("should do something", () => {
    // etc...
  });
  it("should do another thing", () => {
    // etc...
  });
});
```


### Test structure - good practice

- You can imbricate describe to make phrases
- Bonus: BDD and readability
- DO NOT IMBRICATE `it()` or `test()` methods

```typescript
describe("Given i have a SuperComponent", () => {
  describe("Given it is in a certain state", () => {
    beforeEach(); // init the given state
    describe("When some action occurs", () => {
      beforeEach(); // do the action
      it("Then it should match first expectation", () => {});
      it("Then it should match second  expectation", () => {});
    });
  });
});
```


### Test structure - hook methods

```typescript
describe("MySuperComponent", () => {
  beforeAll(() => console.log("A"));
  beforeEach(() => console.log("B"));
  test("something", () => console.log("C"));
  test("something", () => console.log("D"));
  afterEach(() => console.log("E"));
  afterAll(() => console.log("F"));
});
```


```
A
B
C
E
B
D
E
F
```



## Jest - expectations

https://jestjs.io/docs/expect

```typescript
expect(value).toBeDefined();
expect(value).toBeInstanceOf()
```


### Jest - expectations (2)

https://jestjs.io/docs/expect#tothrowerror

```typescript
expect(() => {
  executeCode();
}).toThrow();
```
Note:
- this is simpler than adding a try / catch in your tests


### Jest - expectations (3)

https://jestjs.io/docs/expect#tobeclosetonumber-numdigits

```typescript
const result: number = 4.2 + 0.3; 
expect(result).toBeCloseTo(4.5, 2); // second args is numDigits
```


### Jest - .fn() and toHaveBeenCalled

```typescript
function drinkAll(callback, flavour) {
  if (flavour !== 'octopus') {
    callback(flavour);
  }
}

describe('drinkAll', () => {
  test('drinks something lemon-flavoured', () => {
    const drink = jest.fn();
    drinkAll(drink, 'lemon');
    expect(drink).toHaveBeenCalled();
  });

  test('does not drink something octopus-flavoured', () => {
    const drink = jest.fn();
    drinkAll(drink, 'octopus');
    expect(drink).not.toHaveBeenCalled();
  });
});
```


### Jest - expectations (4)

```typescript
test('onPress gets called with the right thing', () => {
  const onPress = jest.fn();
  simulatePresses(onPress);
  expect(onPress).toBeCalledWith(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }),
  );
});
```



## Jest - tips & tricks

- *`npx jest`* to launch local jest
- *`npm i -g jest`* to install it globally


### Jest - launch commands

https://jestjs.io/docs/cli#jest-regexfortestfiles
```bash
jest --watch glob-pattern
```


### --collectcoverage
https://jestjs.io/docs/cli#--collectcoveragefromglob
```bash
jest src/app/my-components/* --collectCoverage --collectCoverageFrom=src/app/my-components
```


### --changedSince
https://jestjs.io/docs/cli#--changedsince
```bash
jest --changedSince=origin/develop
```
also, `lastCommit` , `onlyChanged`


### entracte
- questions ?



# Integration testing on RDR

- cucumber / gherkin
- protractor, uses a real browser
- goTo url / navigate
- mocks api-manager calls with [mockttp](https://github.com/httptoolkit/mockttp)
- verify page content/ manipulate a browser with protractor


## Cucumber-js

https://cucumber.io/docs/guides/

- writing tests scenario in natural language
- each phrase (step) is implemented with functions 
- BDD ( Given / WHen / Then ) approach
- mainly written in `*.feature` files


## Gherkin language

https://cucumber.io/docs/gherkin/reference/

- Feature: high-level, group tests scenarios
- Scenario: 
- Given / When / Then => steps.


## Feature files

```gherkin
Feature: Home page

    Scenario: Home page on mobile

        Given as a "unknown" user
        And I have a "mobile" device
        And the api is "running"
        And the api responds ok to common requests
        When I visit the "home" page
        Then the page loads
        And the notification overlay is not shown
        And I take a screenshot
```



## Tests implementation
![](/talks/tests/e2e-launch.svg.png)



### Steps

```typescript
import { Given } from "@cucumber/cucumber";

Given(`The api responds to /product`, async function () {
  await this.server.onGet("/product").thenReply(() => ({id: 42}))
});
```


### Steps

```typescript
import { When } from "@cucumber/cucumber";

When(`The user clicks on the add to cart button`, async function () {
  await this.pageObject.clickOnButton()
});
```


### Steps
```typescript
import { Then } from "@cucumber/cucumber";

Then(`The given element contains {string}`, async function (text: string) {
  const element = await this.pageObject.getSpecificElement();
  expect(element.getText()).toContain(text);
});
```



### World

- object shared between steps
- simple typescript class given to constructor
- scope per scenario
- given as the `this` contextual object
- this is why we can't have ~nice things~ arrow methods


``` typescript
import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";

export class BrowserWorld extends World {
    public server: Mockttp;
    public page: PageObject;
    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(BrowserWorld);

```


``` typescript
import { Then } from "@cucumber/cucumber";

Then("classical function works", function () {
  this.page.navigate(); // page is defined, this is the nWorld instance
});
Then("arrow function works",  () => {
  this.page.navigate(); // error, page is not defined, this is the parent context (module file)
});
```



### Hooks

- hooks are methods that are run before or after each scenarios

```typescript
import { After, Before } from "@cucumber/cucumber";

import { getLocal } from "mockttp";

Before(function () {
    this.server = getLocal();
});

After(function () {
    this.server.stop();
});
```
also available: `BeforeAll`, `AfterAll`, `BeforeStep`, `AfterStep`



### Page Objects

- page objects are abstraction to represent a page and its possible interactions
- main goal is to simplify steps, by exposing common reusable elements
- simple typescript class


### Page Objects - example
```typescript
import { browser } from "protractor";
import { BasePageObject, PageObject } from "./base.po";

export class GridPageObject extends BasePageObject implements PageObject {
    constructor() {
        super();
    }

    public async navigateTo(categoryPath: string): Promise<void> {
        return await browser.get(`${this.baseUrl}/category/${categoryPath}`);
    }
}
```


### Protractor APi

https://www.protractortest.org/#/api

- find element by id, class, tag name, binding.
- manipulate browser


### Mockttp

https://github.com/httptoolkit/mockttp#mockttp----

- used to launch a fake http server in each tests


### Fixtures

- you'll find JSON files in the `fixtures` folder
- they represent raw outputs from the api-manager
- used in mocked http requests


### Code overview & demo

demo



### Questions ?

