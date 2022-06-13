# FEC Project Atelier - Temple of Artemis

Create a modern client-facing retail web portal that improves the user experience and increases sales for the company. The website consists of four main components: the Overview section, Related Items, Questions and Answers, and Ratings and Reviews.

Upon entering the website, users can interact with existing items, view different styles in an image gallery, select styles and add them to the cart.
Following the Overview, another section is the Related Items carousel, where users will see additional items related to the current overview in a carousel-style layout and be able to add items to their personal Your Outfit section.
In addition, each item will have a questions and answers section where users can interact with other users to gain more information about a particular product and share their current experiences.
Lastly, users can share reviews on a product they have already purchased with other users and rate the item on many features.

## Team Members 

| Name  | Widget | 
| ------------- | ------------- |
| Davyd Zakorchennyi  | Overview  |
| Utku Ozkan  | Questions & Answers  |
| Val Pizzo  | Related Items  |
| Ben Thornton | Ratings & Reviews  |

## Table of Contents

1. [Application Overview](#application-overview)
2. [Requirements](#requirements)
3. [Development](#development)



## Application Overview
- **Product Overview**: The opening widget on the application provides detailed information on the current product displayed.User is able to select different styles , colors, sizes and quantities from a selection menu.The widget uses a carousel to move around different images available for the specified product.User is able to add items to a cart where a checkout prompt will displayed when clicked upon the shopping cart.

![Screen Shot 2022-06-12 at 10 07 58 PM](https://user-images.githubusercontent.com/98296753/173268045-edb0e91b-0041-4dad-8f96-66e5c7331499.jpg)

- **Related Items**: The second widget available on the application is the Related Items section.This widget will display a carousel of images of related items as well as a user created outift Your Outfits section where user can display their products of interest.

![Screen Shot 2022-06-12 at 10 09 51 PM](https://user-images.githubusercontent.com/98296753/173268385-3dd88186-e01a-4bc6-ab16-dd8e096e04dd.jpg)

- **Questions & Answers**: Provides users with the ability to search for questions and answers on selected product. User is also able to ask questions, add answers/photos to questions , mark answers/questions as helpful and finally report answers.

![Screen Shot 2022-06-12 at 10 15 08 PM](https://user-images.githubusercontent.com/98296753/173268810-61e1596b-8e84-4084-bb1e-52909aae5ed7.jpg)![Screen Shot 2022-06-12 at 10 26 57 PM](https://user-images.githubusercontent.com/98296753/173268828-e05a0a06-f353-4bc7-8487-edba8fd9c328.jpg)

- **Ratings & Reviews**: Allows users to view and submit reviews for the selected product.User is able to see the average star rating for a specific product , view characteristic breakdowns , search for reviews , sort reviews based on helpfulness, newest or relevance.

![Screen Shot 2022-06-12 at 10 15 22 PM](https://user-images.githubusercontent.com/98296753/173269420-8d6be41e-a466-49ff-9b86-02df0e010461.jpg)



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
