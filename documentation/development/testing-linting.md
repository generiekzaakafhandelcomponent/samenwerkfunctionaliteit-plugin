# Testing & Linting

## Backend

### Testing

In the root folder of the project (`/samenwerkfunctionaliteit-plugin`), run the following command:

> `./gradlew :backend:plugin:test`

If building is successful this will generate test reports in `/backend/plugin/build/reports/tests/test`. You can review the `index.html` there for the results, or alternatively review `/.../build/test-results/test` for .xml formatted test results.  
You can run this from your IDEs Gradle panel too, under backend/plugin/tasks/verification/test

### Linting

From the root folder of the project you can run:

> `./gradlew :backend:plugin:check`

This will report code style violations on your command line. Alternatively, you can run this through your IDEs Gradle panel (under /backend/plugin/tasks/verification as `check`).

## Frontend

To improve the quality of our frontend we aim to add unit tests and adhere to the Angular style guide. To do so we should add spec files for new components, and run both the tests and linting before creating a pull request

### Testing

In the `/frontend` folder, run:  
> `npx ng test @valtimo-plugins/samenwerkfunctionaliteit-plugin --watch=false --browsers=ChromeHeadless`

This will run all frontend tests in a headless (no window) Chrome browser and will report the results on the command line.

### Linting

In the `/frontend` folder, run:  
> `npx ng lint @valtimo-plugins/samenwerkfunctionaliteit-plugin`

This will run the linting and return issues to review.