class Item < ApplicationRecord
    has_many :inventories
    has_many :item_locations
    has_many :rooms, through: :item_locations
    has_many :users, through: :inventories
end 