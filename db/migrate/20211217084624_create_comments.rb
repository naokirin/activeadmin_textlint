class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :comment, null: false, comment: 'コメント'

      t.timestamps
    end
  end
end
