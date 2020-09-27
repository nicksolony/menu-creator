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
* A user is able to view items, add new item, edit item and delete item
* A user is able to view categories, add new categories, edit categories and delete categories
* A user is able to view menus, create a new menu, edit a menu, or delete a menu
* A user can view items on a menu, add a item to a menu, delete a item from the menu

## Models
* Item
  * Name
  * Category (belongs to)
  * Description
  * Price
  * menus (has many through menu_items)
  * menu_items (has many)
* menu
  * Name
  * Items (has many through menu_items)
  * menu_items (has many)
  * categories through items (has many through)
* category
  * Name
  * Items (has many)
* menu_item
  * menus (belongs_to)
  * items (belongs_to)
