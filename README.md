# FEC Temple of Artemis

Create a modern client-facing retail web portal that improves the user experience and increases sales for the company. The website consists of four main components: the Overview section, Related Items, Questions and Answers, and Ratings and Reviews.

Upon entering the website, users can interact with existing items, view different styles in an image gallery, select styles and add them to the cart.
Following the Overview, another section is the Related Items carousel, where users will see additional items related to the current overview in a carousel-style layout and be able to add items to their personal Your Outfit section.
In addition, each item will have a questions and answers section where users can interact with other users to gain more information about a particular product and share their current experiences.
Lastly, users can share reviews on a product they have already purchased with other users and rate the item on many features.

## Team Members

  - Davyd Zakorchennyi
  - Utku Ozkan
  - Val Pizzo
  - Ben Thornton

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Important
config.js structure(must create in the root directory yourself):

<module.exports = {
  TOKEN: 'git_api_token',
  PORT: 'port',
};>


## Description

> E-commerce website that features:
> 1. Overview section
> 2. Related Products section
> 3. Q&A section
> 4. Reviews section
>> **Screenshots to be added:**

<!-- ## Usage -->

<!-- > Some usage instructions -->

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Yarn
- Code Editor(Vim, VsCode etc)

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
yarn install -g webpack
yarn install
```

### Installation Steps
- Fork master from org (https://github.com/TempleOfArtemis)
- Create feature branch to work from ``` git checkout -b feature/example ```
- Push to user repo feature branch in Github
- Submit pull request to develop branch in org for peer review
- After develop branch has been verified and tested, pull request into master branch in org
