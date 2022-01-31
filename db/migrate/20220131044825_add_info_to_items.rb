class AddInfoToItems < ActiveRecord::Migration[7.0]
  def change
        add_column :items, :name, :string
     add_column :items, :is_takeable, :boolean
      add_column :items, :description, :string
       add_column :items, :inspect_choice_1, :string
        add_column :items, :inspect_choice_2, :string
            add_column :items, :is_talkable, :boolean
     add_column :items, :talk_response, :string
      add_column :items, :talk_choice_1, :string
          add_column :items, :talk_choice_2, :string
     add_column :items, :is_attakable, :boolean
      add_column :items, :attack_response, :string
       add_column :items, :durability, :float
        add_column :items, :catalyst_item, :integer
            add_column :items, :catalyst_response, :string
     add_column :items, :exit_trigger, :boolean
      add_column :items, :triggers_on, :string
              add_column :items, :death_trigger, :string
            add_column :items, :has_been_taken, :boolean
     add_column :items, :has_been_attacked, :boolean
      add_column :items, :has_been_talked, :boolean
   

  end
end
