class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user
  belongs_to :post
  belongs_to :user
end
