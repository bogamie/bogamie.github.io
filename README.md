# bogamiee.github.io

https://bogamiee.github.io

# When Commit your code...

## Step 1

&nbsp;&nbsp;Open git bash and type `git status` to check which files will be committed.
```
git status
```

<br>

## Step 2

&nbsp;&nbsp;If you want to commit all changed files, use `git add .`. However, if you only want to add specific files, use `git add (file name)`.

```
git add .
```

or 

```
git add lib/main.dart
```

<br>

## Step 3

&nbsp;&nbsp;Write the revised contents. This is the most important step in the entire process. Use concise and clear expressions to make it easier to understand each time you read them.

&nbsp;&nbsp;First put `git commit` and press enter. This will open "COMMIT_EDITMSG" file, where you can type your commit messages.

```
git commit
```

<br>

Here are several rules to write commit messages.

1. Seperate the title and body with a blank line.
2. Limit the title to 50 characters or less.
3. Begin the title with a capital letter.
4. Don't include '.' at the end of the title.
5. Use imperative sentence for the title and avoid using the past tense.
6. Limit each line of the body to 72 characters.
7. Focus on what and why rather than how when explaining.
8. Headers are compulsory, but bodies and footers are optinal.

```
(Type): (Title) // Header

(Content) // Body

(Footer) // Footer
```

<br>

### Type

| Commit Type | Title                    | Description                                                                                                 
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- 
| `feat`      | Features                 | A new feature                                                                                               
| `fix`       | Bug Fixes                | A bug Fix                                                                                                   
| `docs`      | Documentation            | Documentation only changes                                                                                  
| `style`     | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   
| `perf`      | Performance Improvements | A code change that improves performance                                                                     
| `test`      | Tests                    | Adding missing tests or correcting existing tests                                                           
| `build`     | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         
| `ci`        | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) 
| `chore`     | Chores                   | Other changes that don't modify src or test files                                                           
| `revert`    | Reverts                  | Reverts a previous commit                                                                                   

<br>

#### Example

```
Refactor: Separate AppBar as a class

Create another dart file with AppBar class to make reusable appbar.
From now on, the reuse_element file will contain frequently used elements.
```

<br>

## Step 4

&nbsp;&nbsp;When you finished writing messages, close editor screen and push them.
```
git push
```
<br>

```
bundle exec jekyll serve --host 0.0.0.0
```