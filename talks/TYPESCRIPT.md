# Typescript



## Who am I ?
* Benjamin Legrand
* web developer since the 90's
* professional XP in java/web.
* typescript user since angular 4 (2015?)



## What is typescript ?
* History
* https://www.typescriptlang.org/
* Goals
Note:
- developed by microsoft, first version 2012
- secure javascript development
- based on futurejs implementations


### Alternatives
* Flow
* Dart (R.I.P)
* Babel
* Coffeescript ? (R.I.P)
Note:
- TS solve each differently.
- flow is for typing javascript
- dart was kinda same attempt.
- babel has same role of providing future language spec for devs and and serving old es5 code instead.


### Compilation != Transpilation
* Typescript "transpile" the code to javascript
* compilation is a language abuse 
Note:
Typescript compiler (tsc) is a "Transpiler" : transform from a language to another


### Execution Environments
Two use cases / final dest, same code :
* Browser engines
* Node.js server runtime
Note:
- not the same apis available


### Compilation target
* plain old javascript (es5)
* js with modern features (es6 / es2015)
* es2017
* es2018 
* etc...



## What is it not ?
* Typescript is not:
  * Java
  * PHP
  * C++
Note:
- just forget some pre-conceptions you had about the language you were using.
- same c like syntax. lots of patterns found in other languages.


### Not a compiled language
  * transpilation !== compilation
  * The Language VM = javascript engine.
  * bytecode => javascript
  * JIT / AOT
  * class vs protoypes
Note:
- insist on not compilation
- web distribution (es5 compiled, sourcemaps)
- jit: Just In Time compilation, transform as bytecode before interpreting by browser engine / framework (angular)
- aot: Ahead Of Time Compilation: used by 



## Conclusion
Of the introduction


### Advantages
  * just javascript (that scales)
  * with optional strong typing
  * build step
Note:
- those can all be inconvenient


### Why use it ?
* Better type safety
* Refactoring
* Testing
* Tooling
Note:
* providing type security for js code.
  * better alerts and error detection than with plain old js
* expressing generics, class hierarchies, object 
* annotations and AOP (called decorators)!!



## VSCode
[https://code.visualstudio.com/](https://code.visualstudio.com/).


### plugins :
Mandatory:
- [Tslint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) : Linting / check code for potential errors and code conventions.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) : Code formatting.
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) : Validation des templates / components
Optional:
- [Angular v7 Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2): code snippets
- [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)
- [Jest](https://marketplace.visualstudio.com/items?itemName=orta.vscode-jest)



## Tooling
```bash
npm i -g typescript @angular/cli ts-node
echo "console.log('Hello world')" > myscript.ts
ts-node myscript
```


## Typescript Features
* also, ecmascript2015 features.
* also, node.js and future ecmascript versions.
* still "babelisable"



### Feature: module
```typescript
import { stuff } from "library";
export { MaClass as MonAlias } from "./another-module";
```
Note:
- convertit en module js
- pas de "./" = import de library
- "./" import de fichiers relatifs.


## Javascript
* (almost) the same as in ecmascript 2015
* can compile to IIFC pattern for es5.



### Feature: function, let const

### Javascript (es6)
``` javascript
let maVar = 3;
const MA_CONSTANTE = "chut";
function maFonction(in) {
    return in.replace(/\s/,"");
}
const monAutreFonction = () => {
    return 42;
}
```


### Typescript
```typescript
let maVar: number = 3;
const MA_CONSTANTE: string = "chut";
function maFonction(in: string): string {
    return in.replace(/\s/,"");
}
const monAutreFonction = (): number => 42;
```
Note:
- several ways of writing a function
- type declarations.




### Feature: spread syntax
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


#### destructuration
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment


####  REST parameters
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters



### Feature: interface
``` typescript
export interface MonInterface{
    id: number;
}
 // should error : id 
const obj: MonInterface = {};
// good : id is defined
const obj: MonInterface = {
    id: 42
}; 
```
Note:
- interfaces do not exists.


#### Interfaces DO NOT EXIST in typescript


#### So what are they for ?
* object type declaration
* type safety
* interfaces can inherit each other.
Note:



### Feature: Enumeration
``` typescript
export enum MyAnumeration{
    ValueAlpha,
    ValueBeta,
}
```



### Feature: Class
``` typescript
export class MaClasse{
    private why: number;
    constructor() {
        this.why = 42;
    }
}
```
Note: 
- class is a bad keyword
- javascript prototype inheritance still applies.


#### Tips: dependency injection in constructor
``` typescript
export class MaClasse{
    constructor(private why: number = 42) {
    }
}
```



### Feature: Class inheritance

* still js prototype inheritance
* frontjs : don't do it



#### Feature: member visibility
``` typescript
class {
    private a: number;
    protected b: string;
    public c: boolean;
}
```
Note:
- visibility don't matter in JS
- all the stuff are still public



### Feature: generics
``` typescript
export class Callable<T>{
    call(t: T): T {
        // do stuff and
        return t;
    }
}
const myInstance = new Callable<Event>();
const result: Event = myInstance.call(new Event());
```
Note: 
- indispensable in any big codebase
- angular is full



### Feature: union types
```typescript
interface Clickable {}
interface Touchable {}
type Enable = Clickable | Touchable;
```


### Feature: value types
```typescript
interface Clickable {}
interface Touchable {}
type MyValue = "alpha" | "beta" | "gamma";
let val: MyValue = "alpha"; //ok
let val: MyValue = "alpha"; //ok
```


### Feature: inheritance
* typescript inheritance = javascript prototoype inheritance


#### Class inheritance
```typescript
class Animal{}
class Dog extends Animal{}
```
Note:
- simple, basique


#### Interface inheritance
```typescript
interface Animal{
    sku: string
}
interface Dog extends Animal{}
class ConcreteDog implements Dog {}
// error, ConcreteDog should have sku attribute
```



### Feature: decorators
```typescript
@Component({})
export class MyComponent{
    @Input()
    public myInput: number;
    @Ouput()
    public myOutput: number;
    constructor(@Inject() attr: any) { }
}
```
Note:
- class decorator
- attribute decorator
- parameter decorator



### Usage in apollo
* backjs : node.js / restify / axios
* frontjs: angular (developed in typescript)
* AWS lambdas ? (aws-sdk typescript definitions)


#### Angular / Rework frontjs

* projet démarré Avril 2018
* rewrite frontend
* universal express app


#### Angular / builder / server

* [frontjs](https://src.tools.hermes.com/projects/APL/repos/hermes.apollo.dac/browse)
* builder.ts
* server.ts



#### Node.js / backjs

* [backjs](https://src.tools.hermes.com/projects/APL/repos/hermes.apollo.front.backend/browse)
* [Node.js](https://nodejs.org/en/docs/)



#### Lambda AWS

* [dac](https://src.tools.hermes.com/projects/APL/repos/hermes.apollo.dac/browse)


## Tips and tricks
* follow tslint rules
* don't overthink your types
* don't use any.


## Demo Questions.

