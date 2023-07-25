Hello Welcom to this Pokedex Project :)

# Installation

Clone this repo in your local and execute one of these commands :

I used yarn for this project

```shell
yarn install
```

```shell
npm install
```

## How it works

This application has 3 different views<br/>
Technologie used : Typescript, vue3, tailwind, css, jest, vue-test-utils, Pinia, vite, git<br/>
Breakpoints for small medium and large screens<br/>

### Home

Route ("/") and automatically redirect to our next view (pokemonListView)<br/><br/>

The purpose of this route ? well we need a "/" to call home don't we :) <br/>
Just joking,<br/>
This route can be used in the future as a presentation page not directly showing pokemons :)

### Pokemon list

Route ("/pokemons/:page")<br/>

This route is responsible for showing the pokemons => view : (PokemonListView)<br/>
contain 2 main components in our application<br/>

#### Left panel manager<br/>

I have one main component that manage the state of all the filters on the left panel<br/>
Each filter has it's own component and own test<br/>

##### Logic

Filter use score system<br/>
It depends on how many filters at once are used, the result can be different<br/>
The more accurate is the search by name system alone<br/>
Else combined it shows all the pokemons sorted by score depends of the filters ( name +1, each type +1, weight +1)

#### Pokemon list view

This view manage all the content and handle the state management for the pokemon list<br/>

#### Pagination

The footer folder contain our pagination system, easy enough to understand,<br/>
Logic :<br/>

- Get the total pokemons and generate the pages possible to navigate

#### The navbar

A small component i created for navigation purpose ( maybe futur ideas :)<br/>

### Details page for unique pokemon

This view is responsible for showing one unique pokemon in a card, with his attributes, => view :(/PokemonView/:id)<br/>

### Unit Testing

I used jest and vue-test-utils for the tests<br/>

To launch all the tests : <br/>

```shell
yarn test
```

or

```shell
npm run test
```

## Build

```shell
yarn build
```

or

```shell
npm run build
```

## To start the build

i use Serve if you don't have it you can execute the commande needed :<br/>

```shell
yarn add serve
```

```shell
npm install --global serve
```

and finally start the server with the argument -s as a single page application
<br/>

Note that without the -s argument, you might experience some problemes going the the pokemons list directly, you'll have to go to "/" first to be redirected

```shell
serve -s dist
```

Hope you like it ! :)<br>
Peace and Pokemon <br>
