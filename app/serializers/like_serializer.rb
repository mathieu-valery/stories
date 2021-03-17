class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user, :is_liked, :post
  belongs_to :post
  belongs_to :user
end
