# How to configure modules like javascript on Typescript

* Install **typescript-require**, used to utilize _require_ function in Typescript like Javascript

```shell
> npm install typescript-require
```
* Call the function **require** with the module _typescript-require_ to call others modules like Javascript.

```typescript
require('typescript-require');
```

* Complete Example:

```typescript
// Initialization
require('typescript-require');

//Calling Module
let color = require('cli-color');

//Test
console.log(color.green("Hello World!"));
```

**OBS**: use this only if you are creating a project without a Framework.