# Jeneric Web

jeneric web is a framework for building javascript frontend applications

# migrate from @jeneric/core/web 1.3 to @jeneric/web 2.0

1) replace dependency @jeneric/core with @jeneric/web in version 2.0
2) replace all require statements with new path to @jeneric/web folder in node_modules folder

example: 

require('@jeneric/core/web/abstract-application')

with

require('@jeneric/web/src/abstract-application');


