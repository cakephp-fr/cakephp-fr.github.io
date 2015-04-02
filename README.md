siteweb
=======

Community website for cakephp-fr

## Development

The site is built with Jekyll and hosted on Github Pages.
If you want to contribute and test your changes locally, clone the repository and run:

```
bundle install
bundle exec jekyll serve
```

et voilà! The site should be available at `http://localhost:4000`.

For further information, please read [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/)

## Update

To update foundation with all its dependancy in bower_components

```
bower update
```

Before pushing to deploy : run these 2 gulp commands

```
gulp app.js // recreates the app.js file which groups all js files minified (js files from foundation, jquery, modernizr, fastclick, ...)
gulp app.css // recreates the app.css file which groups all js files (css files from foundation)
```
