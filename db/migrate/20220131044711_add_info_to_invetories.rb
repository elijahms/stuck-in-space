class AddInfoToInvetories < ActiveRecord::Migration[7.0]
  def change
         add_column :inventories, :user_id, :integer
      add_column :inventories, :item_id, :integer
       add_column :inventories, :has, :boolean
  end
end
