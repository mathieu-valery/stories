class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :posts, :dependent => :destroy
  has_many :received_follows, foreign_key: :followed_user_id, class_name: "Follow"
  has_many :followers, through: :received_follows, source: :follower
  has_many :follows, foreign_key: :follower_id, class_name: "Follow"
  has_many :followed_users, through: :follows
  has_many :comments, :dependent => :destroy
  has_many :likes, :dependent => :destroy
  has_many :liked_posts, :through => :likes, :source => :post
  has_one_attached :photo

  validates :username, presence: true, uniqueness: true
  validates :photo, attached: true, content_type: [:png, :jpg, :jpeg] #added thanks to active_storage_validations gem

  def photo_key
    self.photo.key
  end
end
