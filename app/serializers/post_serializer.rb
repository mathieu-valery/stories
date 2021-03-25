class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :video_key, :created_at

  belongs_to :user
  has_many :likes
  has_many :comments
  has_many :liking_users, :through => :likes, :source => :user
  
end
