class AddIsFollowedToFollows < ActiveRecord::Migration[6.0]
  def change
    add_column :follows, :is_followed, :boolean
  end
end
