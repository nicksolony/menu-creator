# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## User Stories
* A user is able to view dishes, add new dish, edit dish and delete dish
* A user is able to view categories, add new categories, edit categories and delete categories
* A user is able to view menus, create a new menu, edit a menu, or delete a menu
* A user can view dishes on a menu, add a dish to a menu, delete a dish from the menu

## Models
* dish
  * Name
  * Category (belongs to)
  * Description
  * Price
  * menus (has many through menu_dishes)
  * menu_dishes (has many)
* menu
  * Name
  * Dishes (has many through menu_dishes)
  * menu_dishes (has many)
  * categories through dishes (has many through)
* category
  * Name
  * Dishes (has many)
* menu_dish
  * menus (belongs_to)
  * dishes (belongs_to)
