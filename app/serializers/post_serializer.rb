class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :video_key

  belongs_to :user
  has_many :likes
  has_many :comments
  
end
