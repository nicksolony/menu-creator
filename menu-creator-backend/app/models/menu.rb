class Menu < ApplicationRecord
  has_many :menu_items
  validates :name, presence: true
  validates :name, uniqueness: true

end
