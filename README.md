# Phobos

A web app to help overcome phobias.

Entry into SYNCSHACK 2021.

## Contributors

- [Gribbenator](https://github.com/Gribbenator)
- [dustbringer](https://github.com/dustbringer)
- [Meteorah](https://github.com/Meteorah)
- [Corrade](https://github.com/Corrade)
- [mr-inaank](https://github.com/mr-inaank)

## Inspiration

One of our friends has an overwhelming fear of spiders. There hasn't been any deaths from a spider bite in Australia since 1979 but that's no comfort. The fear is irrational, persistent, and sometimes overwhelming. They and an estimated **10% of all people** have a **phobia**, an anxiety disorder characterised as a fear of a specific thing or setting. They aren't a joke and seriously affect some people's lives so much so they unhealthily avoid harmless situations.

Luckily, there is a solution! **Exposure theory** is a behaviour theory to treat anxiety disorders like phobia. It works by simply bringing the patient close to the anxiety source without any danger. However, exposure theory isn't super easy to access, particularly during a world wide pandemic...

## What does it do?

**Phobos** is our solution to bring exposure theory to everyone who needs it. It's a simple web app built on psychological principles that gives patients control. Once landing on the home page, a patient will:

1. Click on a specific phobia.
2. Adjust settings such as their level of fear.
3. See **zoomed out** images of their fear.
4. Gradually zoom in and accostom to the fear.
5. Rate the scariness of the image and move on.
6. 

We've built our app around a memory based, collaborative filtering recommendation system using adjusted cosine similarity. This 

## How did we build it?

**Phobos** is a full stack web app built in TypeScript using a React frontend and a Node Express backend. We've crafted a minimalist user experience in the Material UI design system. Also, we've used Python scripts to call the Reddit API to create an image set of different phobias.

## Available Scripts

In the project directory, you can run:

### `yarn lint`

Lints the project.\
Check `.eslintrc.js` to change coding standards.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
