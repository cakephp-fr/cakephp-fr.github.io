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

## Tasks and updates for developer

- Some tools are needed in development. You can use the package.json file
  to install them for the project, using: ``npm install``
  The following modules will be installed in node_modules:
      - bower : dependancy manager for assets
      - gulp : utility to execute some task like concatenation
      - gulp-sass
      - gulp-minify-css
      - gulp-concat
      - gulp-uglify
      - gulp-rename
      - bundle

- To update gem dependancies : ``bundle update``

- To update bower assets:     
      // update foundation with all its dependancies in ``bower_components``
      bower update
      // recreates the app.js file which groups all js files minified (js files from foundation, jquery, modernizr, fastclick, ...)
      gulp app.js
      // recreates the app.css file which groups all js files (css files from foundation)
      gulp app.css
