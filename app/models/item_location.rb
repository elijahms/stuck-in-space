class ItemLocation < ApplicationRecord
    belongs_to :item
    belongs_to :room
end 