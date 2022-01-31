class AddInfoToRooms < ActiveRecord::Migration[7.0]
  def change
    add_column :rooms, :name, :string
        add_column :rooms, :description, :string
            add_column :rooms, :death_threshold, :integer
     add_column :rooms, :death_threshold_met, :string
      add_column :rooms, :intro_description, :string
 
  end
end
