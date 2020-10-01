class Menu < ApplicationRecord
  has_many :menu_items
  has_many :items, :through => :menu_items
  has_many :categories, :through => :items
  validates :name, presence: true
  validates :name, uniqueness: true

end
