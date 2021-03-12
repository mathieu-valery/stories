class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user, :is_liked
  belongs_to :post
  belongs_to :user
end
