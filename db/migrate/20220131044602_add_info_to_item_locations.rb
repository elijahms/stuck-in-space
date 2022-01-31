class AddInfoToItemLocations < ActiveRecord::Migration[7.0]
  def change
     add_column :item_locations, :item_id, :integer
      add_column :item_locations, :room_id, :integer
       add_column :item_locations, :is_in, :boolean
  end
end
