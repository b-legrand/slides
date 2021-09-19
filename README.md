# Reveal slides

this is a repository to store my presentations/talks/brownbaglunch made with [reveal.js](https://github.com/hakimel/reveal.js)

Everything is markdown, notation is strict (one line return = new slide stack, two line returns: new vertical slide

## Install

#### 1. clone and install this repository

  npm install

#### 2. copy source presentation files

edit or add a markdown file in [talks/](./talks/) directory

- 2 empty lines separate vertical slides
- 3 empty lines separate horizontal slides
- add Note: to separate between slide and empty note.

#### 3. edit src/index.html

add markdown external https://github.com/hakimel/reveal.js#external-markdown

    replace the `data-markdown` of`<div class="slides">` with the reference to your file:

```html
<section
  data-markdown="/talks/ANGULAR.md"
  data-separator="^\n\n\n"
  data-separator-vertical="^\n\n"
  data-separator-notes="^Note:"
  data-charset="UTF-8"
>
</section>
```

#### 4. install and start reveal

```
cd reveal/
npm i
npm start
```

#### 5. speak
* go to http://localhost:8000/
* press `s` key to open a presenter mode

## Edit

how to edit, recommended tools :

VSCode + Markdown editor enhanced :

