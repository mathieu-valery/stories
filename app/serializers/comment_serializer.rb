class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user, :text, :created_at
  belongs_to :post
  belongs_to :user
end
