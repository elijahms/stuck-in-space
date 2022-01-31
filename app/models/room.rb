class Room < ApplicationRecord
    has_many :item_locations
    has_many :items, through: :item_locations
end 