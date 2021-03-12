class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :photo_key

  has_many :posts
  has_many :received_follows, foreign_key: :followed_user_id, class_name: "Follow"
  has_many :followers, through: :received_follows, source: :follower
  has_many :comments
  has_many :likes
end
