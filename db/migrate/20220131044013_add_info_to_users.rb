class AddInfoToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string
     add_column :users, :health, :string
      add_column :users, :score, :integer
       add_column :users, :is_dead, :boolean
        add_column :users, :room_id, :integer
            add_column :users, :email, :string
     add_column :users, :minutes_in_game, :integer
      add_column :users, :seconds_in_game, :integer
  end
end
