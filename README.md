siteweb
=======

Community website for cakephp-fr

## Development

The site is built with Jekyll and hosted on Github Pages.
If you want to contribute and test your changes locally, use docker and run:

```
docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll \
  -it -p $(docker-machine ip `docker-machine active`):4000:4000 \
    jekyll/jekyll
```

et voilà! The site should be available at `http://machine_ip:4000`.

For further information, please read [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/) and [Using Jekyll with Docker](https://github.com/jekyll/docker)

## Tasks and updates for developer

- Some tools are needed in development. You can install them using ``npm install``. The list of the packages that will be installed in ``node_modules`` can be found in the ``package.json`` file. Here is a short list with description of the packages:
    - bower : dependancy manager for assets
    - gulp : utility to execute some task like concatenation for assets

- To update assets:
      // update foundation with all its dependancies in ``bower_components``
      ./node_modules/.bin/bower update
      // recreates the app.js file which groups all js files minified (js files from foundation, jquery, modernizr, fastclick, ...)
      ./node_modules/.bin/gulp app.js
      // recreates the app.css file which groups all js files (css files from foundation)
      ./node_modules/.bin/gulp app.css
