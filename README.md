# Reveal slides

this is a repository to store my presentations/talks/brownbaglunch made with [reveal.js](https://github.com/hakimel/reveal.js)

Everything is markdown, notation is strict (one line return = new slide stack, two line returns: new vertical slide

## Install

1. clone and install reveal.js repository

   git clone git@github.com:hakimel/reveal.js.git reveal

2. copy source presentation files

   cp \*.md reveal/

3. edit reveal/index.html

add markdown external https://github.com/hakimel/reveal.js#external-markdown

    replace the content of`<div class="slides">` with this:

```html
<section
  data-markdown="ANGULAR.md"
  data-separator="^\n\n\n"
  data-separator-vertical="^\n\n"
  data-separator-notes="^Note:"
  data-charset="UTF-8"
>
  <!--
        Note that Windows uses `\r\n` instead of `\n` as its linefeed character.
        For a regex that supports all operating systems, use `\r?\n` instead of `\n`.
    -->
</section>
```

4. install and start reveal

```
cd reveal/
npm i
npm start
```

5. present
* go to http://localhost:8000/
* press `s` key to open a presenter mode

## Edit

how to edit, recommanded tools :

VSCode + Markdown editor enheanced :

##

start

cd reveal/

cp ../\*.md .
