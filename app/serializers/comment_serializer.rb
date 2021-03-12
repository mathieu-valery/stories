class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user, :text
  belongs_to :post
  belongs_to :user
end
