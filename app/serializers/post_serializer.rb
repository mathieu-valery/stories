class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :video_key, :created_at

  belongs_to :user
  has_many :likes
  has_many :comments
  
end
