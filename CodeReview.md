# Code Review 22.01.23

## Git
When working in teams on an app consider clear branch naming conventions

ex:

almog-feature-api_service
rivka-style-main_page

## Project readme
* Add some format and style
* Add an english section
* See here: [Vscode readme docs](https://code.visualstudio.com/docs/languages/markdown)

## Tests
* consider applying some tests...if not...deprecated all test related code ( ` setupTests.js , app.test.js etc` )

## Style

### Scss application
*  [_Variables](/holiday-app/src/Variables/_variables.scss) Is outside the Styles folder...(bad structure)
*  [HolidayDate](/holiday-app/src/Styles/HolidayDate.scss)    
   * use of capital case classnames...(bad practice)
      ```scss
      /** good */
        .parent {
          &:hover {
          /** do stuff */
          }
        }

        /** bad */
        .parent {
          /**/
        }
        .parent:hover {
          /** do stuff */
        }
      ```
* ### Unused css
    avoid import of unused code.(bundle size/maintainability)
* ### Improper application
    alot of the css is not nested! ( *this is a waste of scss power and makes readability and maintenance harder* )

## JS

### apply a linter
this will prevent a lot of the issues below:

### unused bootstrap!
`reactstrap` is used but never used.

### imports unused
`date-fns` under [DateRangePicker](/holiday-app/src/Components/DateRangePicker.js)

### use of loose equality
Avoid applying in favor of strict equality.
[Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
