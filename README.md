# danieljost.com [![Travis](https://img.shields.io/travis/PxlBuzzard/danieljost.com.svg)](https://travis-ci.org/PxlBuzzard/danieljost.com) [![Appveyor](https://ci.appveyor.com/api/projects/status/x6j8kby99cixv6ro?svg=true)](https://ci.appveyor.com/project/PxlBuzzard/danieljost-com)

This is the source code for my website, [danieljost.com](http://danieljost.com).

## What can be reused?

Thank you for reading this and not just stealing things. Everything is fair game, **except** for the following:

* Project information in `/src/documents/games/index.html.swig`
* Project information in `/src/documents/websites/index.html.swig`
* Anything in `/src/public/download/`
* Personal identifying information in `/src/partials/`

## How to compile the source

1. Clone the repo and run `npm install` in the directory.
2. Install Broccoli globally using `npm install -g broccoli-cli`.
3. To compile the site, use `broccoli build out`.

## Technology being used

* [Broccoli](https://github.com/broccolijs/broccoli) as the build system.
* [SCSS](http://sass-lang.com/)
* [Bourbon](http://bourbon.io/)
* [Bourbon Neat](http://neat.bourbon.io/)
* [SidebarTransitions](https://github.com/codrops/SidebarTransitions)
* [Symbolset Social Circle Icons](https://symbolset.com/icons/social-circle)
