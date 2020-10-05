# MENU CREATOR

Menu creator app, will allow users to print out simple menus based on added items in each particular menu.
See user stories and models below for more details on functionality.

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


## Installation
1. Clone git directory in the desired location.
2. App Directory have 2 inside menu-creator-backend and menu-creator-frontend
3. Open menu-creator-backend
4. Run bundle install
5. Run rails db:migrate - to create databases
6. Run rails db:seed - to populate sample data
7. Run rails s - to start server
8. When server is running navigate to menu-creator-frontend
9. Open index.html

## License
[MIT](https://choosealicense.com/licenses/mit/)
