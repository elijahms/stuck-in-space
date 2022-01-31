class RenameItemsIsAttakableToIsAttackable < ActiveRecord::Migration[7.0]
  def change
    rename_column :items, :is_attakable, :is_attackable
  end
end
