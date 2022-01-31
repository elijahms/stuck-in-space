class CreateItemLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :item_locations do |t|

      t.timestamps
    end
  end
end
