# monorepo-boilerplate

A simple monorepo boilerplate based on [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)


## Get started

### Monorepo setup

To initialize the monorepo for the first time, run the following command:
```
yarn run bootstrap
```

Please read *lerna*'s [documentation](https://github.com/lerna/lerna) to learn more.

#### Global dependencies

To add some global dependencies and automatically link them around workspace packages, run:
```
yarn add -W [module, ...]
```
or (for dev dependencies):
```
yarn add -DW [module, ...]
```

💡 Notice: those dependencies will be added to the *package.json* and installed in the *node_modules* located at the monorepo root. This means that despite they'll always be available in the workspace context during development, they'll result missing in the single package context in production if the monorepo is used to maintain a collection of independent modules. Please read the *yarn*'s [*workspaces* documentation](https://classic.yarnpkg.com/en/docs/workspaces/) to learn more.


### Adding packages

To create a new module, simply run the command below:

```
yarn run new-packages [name]
```

It will create a *packages/[name]* folder and some essential files within.

#### Package dependencies

Since there is *lerna* behind the scenes, it's highly recommended to use it to add dependencies to single packages instead of running *npm install* directly in their directories. To do it, simply run (from the root):
```
lerna add [module] --scope=[package]
```
where *module* is the dependency name and *package* is your package name indicated in its own *package.json* file.


### Development

This boilerplate includes a simple *webpack* configuration useful to make packages development more comfortable. To use it, simply run (from the root):
```
yarn run dev
```

Now, the *index.html*, *index.js* and *style.css* files located at the monorepo root can be used to perform live tests during packages development.

Also, the boilerplate already comes along with *jest*, so you can launch your code tests by running the command below:
```
yarn run test
```

Since the built-in configurations are basic, feel free to customize them to better suite your needs.

### Publishing

Once again, let *lerna* handle packages publishing for us. Simply run (always from the root):
```
yarn run publish
```
and follow *lerna* wizard for packages versioning.

💡 Notice: the versioning mode is set, by default, to *independent*, so each package will be handled separately for version attribution.
Check the *lerna.json* file and read *lerna*'s [documentation](https://github.com/lerna/lerna) documentation to learn more about packages publishing and versioning.
