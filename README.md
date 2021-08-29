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

One of our friends has an overwhelming fear of spiders. There hasn't been any deaths from a spider bite in Australia since 1979, but that's no comfort. The fear is irrational, persistent, and sometimes overwhelming. They, and an estimated **10% of all people**, have a **phobia**, an anxiety disorder characterised as a fear of a specific thing or setting. Phobias aren't a joke and seriously affect people's lives by causing them to unhealthily avoid harmless situations.

Luckily, there's a solution! **Exposure theory** is a behaviour therapy that has been highly effective in treating anxiety disorders such as phobias. It works by safely confronting the patient with the source of their anxiety, especially by gradually increasing the frightfulness of chosen stimuli. However, exposure theory isn't particularly easy to access, particularly during a worldwide pandemic...

## What it does
**Phobos** (named after the Greek god of fear) is our solution to help bring exposure theory to everyone who wishes they could be free from a phobia. It's a simple web app built on psychological methods that gives users control. Once landing on the home page, a user will:

1. Click on a specific phobia.
2. Adjust settings such as the frightfulness of incoming images.
3. Confront a scary image.
4. Zoom in/out until they're able to witness the image at maximum zoom for some time.
5. Rate the scariness of the image.
6. Continue exposing themselves to more images.
7. Finally see statistics describing how they responded.

Crucially, **images first appear super zoomed-out so the user doesn't panic**. They can then magnify the visual at their own pace. When they muster the courage to stay on maximum zoom for some time, the user is moved onto the next stimulus. This design smooths out the progression of scariness, which is a key quality of gradated exposure therapies, and maximises a sense of control and safety.

Users also get to rate how scary they find each image. This data is fed into the recommendation system and informs the user's final results screen.

We've built our app around a **memory based, collaborative filtering recommendation system using adjusted cosine similarity**. This recommends images at just the right level of frightfulness to maximise psychological benefit, lowering/raising scariness depending on the user's ratings.

## How we built it
Phobos is a full stack web app built in TypeScript using a React frontend and a Node Express backend. We've crafted a minimalist user experience in the Material UI design system. Also, we've used Python scripts to call the Reddit API to create sample image sets for different phobias.

## What's next for Phobos
Due to the time limit of this hackathon, we were constrained to the minimal features that best represent our vision of this product. In the future, we aim to diversify the experience by adding:

- Support for more phobias.
- Videos and VR experiences.
- Improved scariness calculation and service algorithms.
- Community suggestions and voting for phobia images.
- Accounts and gamification to motivate our users.

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
