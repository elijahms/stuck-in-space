class User < ApplicationRecord
    has_many :inventories
    has_many :items, through: :inventories
    validates :name, uniqueness: true
end
