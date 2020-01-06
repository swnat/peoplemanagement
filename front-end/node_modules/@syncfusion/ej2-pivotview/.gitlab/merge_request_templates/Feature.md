### Feature description

Clearly and concisely describe the problem or feature (this cannot be empty).

### Analysis and design

If there is an external design, link to its project documentation area.
If there is an internal discussion on the forum, provide the link.

### Solution description

Describe your code changes in detail for reviewers.

### Output screenshots

Post the output screenshots if an UI is affected or added due to this feature.

### Areas affected and ensured

List the areas affected by your code changes.

```md
Note: Ensure this from feature matrix
```

[Feature Matrix](https://syncfusion.atlassian.net/wiki/spaces/BI/pages/1151566023/EJ2+Pivot+Table+-+Feature+matrix)

### Test cases

Provide the unit testing written file details to understand the use cases considered in this implementation.
If there is no TDD (if it’s not possible to follow), provide the UI automation script location and the Excel file that contains the use cases considered in this implementation.
Provide the test cases Excel file alone if the feature cannot be automated in any case.

### Test bed sample location

Provide the test bed sample location where code reviewers can review the new feature’s behaviors. This depends on the CI process that your team follows. It can be from NPMCI, HockeyApp, staging site, local server, etc.

For Merge Request Template use this file: feature-request-template.md

### Additional checklist

```md
Note: Don’t delete the template here. If they are not applicable keep them unchecked
```

* [ ] Code doesn’t have memory leak. 
* [ ] Have you added or updated API comments if it is new API or behavior change? 
* [ ] Localization aspect ensured? 
* [ ] Globalization aspect ensured. Ensure culture based testing? 
* [ ] If changes are made in theme files, did you updated in all themes. 
* [ ] Feature matrix 
* [ ] Web accessibility 
* [ ] Responsive with different devices
* [ ] Touch support, Keyboard
* [ ] RTL
* [ ] Cross browsers[Chrome, Firefox, IE, Opera, Safari]
